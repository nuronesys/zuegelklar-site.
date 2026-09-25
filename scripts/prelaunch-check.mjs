#!/usr/bin/env node
/**
 * ZÜGELKLAR — Pre-Launch / Production Guard
 *
 *   node scripts/prelaunch-check.mjs           normale Prüfung
 *   node scripts/prelaunch-check.mjs --launch  zusätzlich die Go-live-Gates
 *
 * Exit 0 = sauber (Warnungen erlaubt) · Exit 1 = Blocker gefunden.
 *
 * Geprüft werden ausschliesslich Produktionsdateien im Repo-Root.
 * Markdown unter docs/ und LAUNCH-CHECKLIST.md werden bewusst NICHT geprüft:
 * dort sind Platzhalter-Namen Dokumentation, kein Leak.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LAUNCH = process.argv.includes('--launch');

const blockers = [];
const warnings = [];
const notes = [];
const add = (list, file, line, rule, msg) =>
  list.push({ file, line, rule, msg });

/* ───────────────────────── Dateien einsammeln ───────────────────────── */
const SKIP_DIRS = new Set(['.git', 'node_modules', 'docs', 'scripts', '.github']);
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const all = walk(ROOT);
const rel = (p) => p.slice(ROOT.length + 1).replaceAll('\\', '/');
const htmlFiles = all.filter((p) => extname(p) === '.html');

if (htmlFiles.length === 0) {
  console.error('Keine HTML-Dateien gefunden — läuft das Script im Repo-Root?');
  process.exit(1);
}

/** Kommentare entfernen, Zeilennummern erhalten (damit Doku-Blöcke kein Leak sind). */
const stripComments = (s) =>
  s.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));

const lineOf = (text, index) => text.slice(0, index).split('\n').length;

/* ───────────────────────── 1. Platzhalter-Leaks ──────────────────────── */
const PLACEHOLDERS = [
  { re: /\[TELEFON[^\]]*\]/g, rule: 'placeholder:telefon' },
  { re: /\[E-MAIL\]/g,        rule: 'placeholder:email' },
  { re: /\[ADRESSE\]/g,       rule: 'placeholder:adresse' },
  { re: /\[STANDORT\]/g,      rule: 'placeholder:standort' },
  { re: /\[NAME DES INHABERS\]/g, rule: 'placeholder:name' },
  { re: /\[\[FOTO-\d+\]\]/g,  rule: 'placeholder:foto' },
  { re: /CHE-123\.456\.789/g, rule: 'placeholder:uid' },
  { re: /CHE-xxx\.xxx\.xxx/gi, rule: 'placeholder:uid' },
  { re: /ab CHF\s*_{2,}/g,    rule: 'placeholder:preis' },
  { re: /\bTODO\b|\bTBD\b|PLACEHOLDER/g, rule: 'placeholder:todo' },
  { re: /example\.com|\.invalid\b/g, rule: 'placeholder:dummy-domain' },
];

for (const f of htmlFiles) {
  const raw = readFileSync(f, 'utf8');
  const live = stripComments(raw);
  for (const { re, rule } of PLACEHOLDERS) {
    for (const m of live.matchAll(re)) {
      add(blockers, rel(f), lineOf(live, m.index), rule, `sichtbarer Platzhalter: ${m[0]}`);
    }
  }
  // dieselben Muster im Kommentar -> nur Warnung (Aufräumen vor Launch)
  for (const { re, rule } of PLACEHOLDERS) {
    const onlyComments = raw.replace(/<!--[\s\S]*?-->/g, (x) => x);
    const commentText = [...raw.matchAll(/<!--([\s\S]*?)-->/g)].map((x) => x[1]).join('\n');
    for (const m of commentText.matchAll(re)) {
      add(warnings, rel(f), 0, rule + ':comment', `Platzhalter im Kommentar: ${m[0]}`);
      break; // pro Regel einmal melden, sonst Rauschen
    }
    void onlyComments;
  }
}

/* ───────────────────────── 2. Tote Links / Anker ─────────────────────── */
const idsPerFile = new Map();
for (const f of htmlFiles) {
  const live = stripComments(readFileSync(f, 'utf8'));
  const ids = [...live.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  idsPerFile.set(rel(f), ids);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) add(blockers, rel(f), 0, 'duplicate-id', `doppelte id="${id}"`);
    seen.add(id);
  }
}

for (const f of htmlFiles) {
  const live = stripComments(readFileSync(f, 'utf8'));
  for (const m of live.matchAll(/\shref="([^"]*)"/g)) {
    const href = m[1];
    const ln = lineOf(live, m.index);
    if (href === '#') {
      add(blockers, rel(f), ln, 'dead-link', 'href="#" — Link führt nirgendwohin');
      continue;
    }
    if (href.startsWith('#')) {
      // legitimer Anker: Ziel muss in derselben Datei existieren
      const target = href.slice(1);
      if (target && !idsPerFile.get(rel(f)).includes(target))
        add(blockers, rel(f), ln, 'broken-anchor', `Anker #${target} existiert nicht`);
      continue;
    }
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      if (/^tel:\[/.test(href)) add(blockers, rel(f), ln, 'dead-link', `tel: mit Platzhalter (${href})`);
      continue;
    }
    // lokale Datei
    const p = join(ROOT, href.split('#')[0].split('?')[0]);
    if (!existsSync(p)) add(blockers, rel(f), ln, 'missing-file', `verlinkte Datei fehlt: ${href}`);
  }
}

/* ───────────────────────── 3. Lokale Assets ──────────────────────────── */
for (const f of htmlFiles) {
  const live = stripComments(readFileSync(f, 'utf8'));
  for (const attr of ['src', 'srcset']) {
    for (const m of live.matchAll(new RegExp(`\\s${attr}="([^"]+)"`, 'g'))) {
      for (const cand of m[1].split(',').map((s) => s.trim().split(' ')[0])) {
        if (!cand || /^(https?:|data:)/.test(cand)) continue;
        if (!existsSync(join(ROOT, cand)))
          add(blockers, rel(f), lineOf(live, m.index), 'missing-asset', `Asset fehlt: ${cand}`);
      }
    }
  }
}

/* ───────────────────────── 4. Bilder ─────────────────────────────────── */
for (const f of htmlFiles) {
  const live = stripComments(readFileSync(f, 'utf8'));
  for (const m of live.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    const ln = lineOf(live, m.index);
    if (!/\salt="/.test(tag)) add(blockers, rel(f), ln, 'img-alt', 'img ohne alt-Attribut');
    if (!/\swidth="/.test(tag) || !/\sheight="/.test(tag))
      add(warnings, rel(f), ln, 'img-dimensions', 'img ohne width/height (Layout-Shift-Risiko)');
    if (/fetchpriority="high"/.test(tag) && /loading="lazy"/.test(tag))
      add(blockers, rel(f), ln, 'img-lcp', 'LCP-Bild darf nicht loading="lazy" sein');
  }
}

/* ───────────────────────── 5. SEO-Kopf ───────────────────────────────── */
const titles = new Map();
const canonicals = new Map();
for (const f of htmlFiles) {
  const raw = readFileSync(f, 'utf8');
  const live = stripComments(raw);
  const r = rel(f);
  const get = (re) => (live.match(re) || [])[1];

  const title = get(/<title>([^<]*)<\/title>/);
  const desc = get(/name="description"\s+content="([^"]*)"/) || get(/content="([^"]*)"\s+name="description"/);
  const canon = get(/rel="canonical"\s+href="([^"]*)"/) || get(/href="([^"]*)"\s+rel="canonical"/);
  const robots = get(/name="robots"\s+content="([^"]*)"/) || get(/content="([^"]*)"\s+name="robots"/);

  if (!title) add(blockers, r, 0, 'seo-title', '<title> fehlt');
  else {
    if (title.length > 65) add(warnings, r, 0, 'seo-title', `Title ${title.length} Zeichen (>65, wird gekürzt)`);
    if (titles.has(title)) add(blockers, r, 0, 'seo-title-dup', `Title identisch mit ${titles.get(title)}`);
    titles.set(title, r);
  }
  if (!desc) add(blockers, r, 0, 'seo-description', 'meta description fehlt');
  else if (desc.length > 170) add(warnings, r, 0, 'seo-description', `Description ${desc.length} Zeichen (>170)`);

  if (!canon) add(blockers, r, 0, 'seo-canonical', 'canonical fehlt');
  else {
    if (!canon.startsWith('https://zuegelklar.ch/'))
      add(blockers, r, 0, 'seo-canonical', `canonical zeigt nicht auf zuegelklar.ch: ${canon}`);
    if (canonicals.has(canon)) add(blockers, r, 0, 'seo-canonical-dup', `canonical identisch mit ${canonicals.get(canon)}`);
    canonicals.set(canon, r);
  }
  if (!/<html[^>]+lang="de"/.test(live)) add(blockers, r, 0, 'seo-lang', 'lang="de" fehlt am <html>');
  if (!/name="viewport"/.test(live)) add(blockers, r, 0, 'seo-viewport', 'viewport-Meta fehlt');

  const h1 = [...live.matchAll(/<h1\b/g)].length;
  if (h1 === 0) add(blockers, r, 0, 'seo-h1', 'kein H1');
  else if (h1 > 1) add(blockers, r, 0, 'seo-h1', `${h1} H1 auf einer Seite`);

  // Domain-Altlasten
  for (const bad of ['nuronesys.github.io', 'http://zuegelklar.ch', 'www.zuegelklar.ch'])
    if (live.includes(bad)) add(warnings, r, 0, 'stale-domain', `alte Domain-Referenz: ${bad}`);

  notes.push(`${r}: robots=${robots ?? '—'}`);

  if (LAUNCH && /noindex/.test(robots ?? '')) add(blockers, r, 0, 'launch-noindex', 'noindex ist beim Go-live nicht erlaubt');
}

/* ───────────────────────── 6. robots.txt / sitemap.xml ───────────────── */
const robotsPath = join(ROOT, 'robots.txt');
if (!existsSync(robotsPath)) add(blockers, 'robots.txt', 0, 'robots', 'robots.txt fehlt');
else {
  const t = readFileSync(robotsPath, 'utf8');
  const disallowAll = /^\s*Disallow:\s*\/\s*$/m.test(t);
  if (!/Sitemap:\s*https:\/\/zuegelklar\.ch\/sitemap\.xml/.test(t))
    add(warnings, 'robots.txt', 0, 'robots', 'Sitemap-Zeile fehlt oder zeigt woandershin');
  if (LAUNCH && disallowAll) add(blockers, 'robots.txt', 0, 'launch-robots', '"Disallow: /" ist beim Go-live nicht erlaubt');
  notes.push(`robots.txt: Disallow-all=${disallowAll}`);
}

const smPath = join(ROOT, 'sitemap.xml');
if (!existsSync(smPath)) add(blockers, 'sitemap.xml', 0, 'sitemap', 'sitemap.xml fehlt');
else {
  const t = readFileSync(smPath, 'utf8');
  if (!t.trimStart().startsWith('<?xml')) add(blockers, 'sitemap.xml', 0, 'sitemap', 'XML-Deklaration fehlt');
  if (!/xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/.test(t))
    add(blockers, 'sitemap.xml', 0, 'sitemap', 'falscher oder fehlender Sitemap-Namespace');
  const opens = (t.match(/<url>/g) || []).length;
  const closes = (t.match(/<\/url>/g) || []).length;
  if (opens !== closes) add(blockers, 'sitemap.xml', 0, 'sitemap', '<url>-Tags nicht ausgeglichen');
  for (const m of t.matchAll(/<loc>([^<]+)<\/loc>/g))
    if (!m[1].startsWith('https://zuegelklar.ch/'))
      add(blockers, 'sitemap.xml', 0, 'sitemap', `loc ausserhalb der Domain: ${m[1]}`);
  notes.push(`sitemap.xml: ${opens} URL(s)`);
}

/* ───────────────────────── Ausgabe ───────────────────────────────────── */
const fmt = (x) => `  ${x.file}${x.line ? ':' + x.line : ''}  [${x.rule}]  ${x.msg}`;
console.log(`\nZÜGELKLAR Pre-Launch Check${LAUNCH ? ' (--launch)' : ''}`);
console.log(`geprüfte HTML-Dateien: ${htmlFiles.map(rel).join(', ')}\n`);

if (blockers.length) {
  console.log(`BLOCKER (${blockers.length})`);
  blockers.forEach((b) => console.log(fmt(b)));
  console.log('');
}
if (warnings.length) {
  console.log(`WARNUNGEN (${warnings.length})`);
  warnings.forEach((w) => console.log(fmt(w)));
  console.log('');
}
console.log('STATUS');
notes.forEach((n) => console.log('  ' + n));

console.log(
  `\n${blockers.length ? '✖ FEHLGESCHLAGEN' : '✔ BESTANDEN'} — ` +
  `${blockers.length} Blocker, ${warnings.length} Warnungen\n`
);
process.exit(blockers.length ? 1 : 0);
