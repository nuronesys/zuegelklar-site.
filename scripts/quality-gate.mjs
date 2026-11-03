#!/usr/bin/env node
/**
 * ZÜGELKLAR — Quality Gate (docs/reinit/04_PROGRAMMATIC_SEO_GUARDRAILS.md)
 * Prüft Ortsseiten gegen Doorway-Muster, alle Seiten gegen verbotene Claims,
 * Symbolbild-Kennzeichnung, FAQ-Schema = sichtbarer Text und veraltete Bausteine.
 * Aufruf: node scripts/quality-gate.mjs   → Exit 1 bei Blockern
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { PAGES, fileOf } from '../tools/site-data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const B = [], W = [];
const block = (f, m) => B.push(`${f}: ${m}`), warn = (f, m) => W.push(`${f}: ${m}`);
const plain = s => s.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&shy;/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

const pages = PAGES.filter(p => existsSync(join(ROOT, fileOf(p)))).map(p => {
  const html = readFileSync(join(ROOT, fileOf(p)), 'utf8');
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) || [, html])[1]
    .replace(/<!-- zk:aside -->[\s\S]*?<!-- \/zk:aside -->/g, '')
    .replace(/<ul class="src">[\s\S]*?<\/ul>/g, '')
    .replace(/<div class="ctabox">[\s\S]*?<\/div>\s*<\/div>/g, '');
  return { p, f: fileOf(p), html, main, text: plain(main) };
});

/* 1 — Eindeutigkeit Title / H1 / Description */
for (const key of ['title', 'h1', 'desc']) {
  const seen = new Map();
  for (const x of pages) {
    if (x.p.type === '404') continue;
    const v = key === 'title' ? (x.html.match(/<title>([^<]*)/) || [])[1]
      : key === 'h1' ? plain((x.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1])
      : (x.html.match(/name="description" content="([^"]*)"/) || [])[1];
    if (!v) { if (x.p.type !== 'legal' || key !== 'desc') block(x.f, `${key} fehlt`); continue; }
    if (seen.has(v)) block(x.f, `${key} identisch mit ${seen.get(v)}`); else seen.set(v, x.f);
  }
}

/* 2 — Ortsseiten */
const shingles = (t, n = 5) => { const w = t.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, ' ').split(/\s+/).filter(Boolean); const s = new Set(); for (let i = 0; i + n <= w.length; i++) s.add(w.slice(i, i + n).join(' ')); return s; };
const cities = pages.filter(x => x.p.type === 'city').map(x => {
  const names = [x.p.cityName, x.p.cityName + 'er', x.p.cityName.replace('ü', 'ue')];
  let t = x.text; for (const n of names) t = t.split(n).join('ORT');
  return { ...x, norm: t, sh: shingles(t) };
});
for (const c of cities) {
  const words = c.text.split(' ').length;
  if (words < 450) block(c.f, `Haupttext nur ${words} Wörter (<450)`); else if (words < 600) warn(c.f, `Haupttext ${words} Wörter (<600)`);
  if (c.p.city !== 'mellingen' && !/(keine?n? (Filiale|Standort|Niederlassung)|Einsatzgebiet, das wir|von Mellingen aus|kein(en)? eigenen? Standort)/i.test(c.text))
    block(c.f, 'Einsatzgebiet-Satz fehlt (kein Standort / von Mellingen aus)');
  const nearby = (c.main.match(/href="\.\.\/umzug-[a-z]+\/"/g) || []).length;
  if (nearby < 2) block(c.f, `nur ${nearby} Link(s) zu anderen Ortsseiten im Inhalt (min. 2)`);
  if (!/href="\.\.\/einsatzgebiet\/"/.test(c.main)) warn(c.f, 'kein Link zum Einsatzgebiet-Hub im Inhalt');
  const src = (c.html.match(/<ul class="src">([\s\S]*?)<\/ul>/) || [, ''])[1];
  const official = (src.match(/<li>/g) || []).length - (src.match(/wikipedia/gi) || []).length;
  if (official < 2) block(c.f, `nur ${official} amtliche Quelle(n) (min. 2, Ziel 3)`); else if (official < 3) warn(c.f, `${official} amtliche Quellen (Ziel 3)`);
  if (!/Stand:/.test(c.html)) block(c.f, '«Stand:» fehlt');
  const faqN = (c.main.match(/<details/g) || []).length;
  if (faqN < 3) block(c.f, `nur ${faqN} FAQ (min. 3)`);
  if (/LocalBusiness|"MovingCompany"|AggregateRating|"Review"/.test(c.html)) block(c.f, 'verbotenes Schema auf Ortsseite');
  for (const o of cities) {
    if (o === c || o.f < c.f) continue;
    let inter = 0; for (const s of c.sh) if (o.sh.has(s)) inter++;
    const jac = inter / (c.sh.size + o.sh.size - inter);
    if (jac >= 0.35) block(c.f, `Ähnlichkeit ${(jac * 100).toFixed(1)} % mit ${o.f}`);
    else if (jac >= 0.20) warn(c.f, `Ähnlichkeit ${(jac * 100).toFixed(1)} % mit ${o.f}`);
  }
  const lead = plain((c.main.match(/<p class="lead">([\s\S]*?)<\/p>/) || [, ''])[1]);
  for (const sent of lead.split(/(?<=[.!?])\s+/).filter(s => s.length > 40)) {
    for (const o of cities) if (o !== c && o.text.includes(sent)) warn(c.f, `Lead-Satz auch auf ${o.f}: «${sent.slice(0, 60)}…»`);
  }
}

/* 3 — Claims-Denylist (sichtbarer Text aller Seiten ausser Recht) */
const deny = [
  [/\b(versichert|zertifiziert|Testsieger|Nr\. ?1)\b/i, 'unbelegter Claim'],
  [/\b\d+\s*(zufriedene\s+)?Kunden\b/i, 'Kundenzahl'],
  [/ab CHF ?\d+/i, 'eigener Preis (erst nach Pricing-Phase)'],
  [/innert 24\s*(Stunden|h)/i, 'Antwortfrist 24 h (vom Owner gestrichen)'],
  [/Wir machen Unmögliches möglich/i, 'Slogan nur im Footer']
];
for (const x of pages) {
  if (x.p.type === 'legal') continue;
  for (const [re, label] of deny) {
    // nur <main> prüfen: Footer (Slogan) und Navigation sind erlaubt
    const m = plain(x.main).match(re);
    if (m) block(x.f, `${label}: «${m[0]}»`);
  }
  for (const sent of x.text.split(/(?<=[.!?])\s+/)) {
    const f = sent.match(/(Filiale|Niederlassung) in (?!Mellingen)[A-ZÄÖÜ]\w+/);
    if (f && !/\b(nicht|keinen?|keine)\b/i.test(sent)) warn(x.f, `prüfen: «${f[0]}»`);
  }
}

/* 4 — Symbolbild: jedes Bild in assets/*.webp (KI) braucht «Symbolbild» im Alt-Text */
const AI = ['cleaning', 'clearing', 'consult', 'handover', 'hero-desktop', 'hero-mobile', 'international', 'montage', 'packing', 'privatumzug', 'team'];
for (const x of pages) {
  for (const m of x.html.matchAll(/<img\b[^>]*>/g)) {
    const src = (m[0].match(/src="([^"]+)"/) || [])[1] || '';
    if (AI.some(n => src.endsWith(n + '.webp')) && !/alt="Symbolbild/.test(m[0])) block(x.f, `KI-Bild ohne «Symbolbild» im Alt-Text: ${src}`);
  }
}

/* 5 — FAQ-Schema = sichtbarer Text */
for (const x of pages) {
  // nur echte FAQ-Blöcke (nicht das aufklappbare Formularfeld)
  const faqHtml = [...x.main.matchAll(/<div class="faq">([\s\S]*?)\n\s*<\/div>/g)].map(m => m[1]).join('');
  const vis = [...faqHtml.matchAll(/<details[^>]*>\s*<summary>([\s\S]*?)<\/summary>/g)].map(m => plain(m[1]));
  if (!vis.length) continue;
  const ld = [...x.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => { try { return JSON.parse(m[1]); } catch { block(x.f, 'JSON-LD ungültig'); return {}; } });
  const nodes = ld.flatMap(d => d['@graph'] || [d]).filter(n => n['@type'] === 'FAQPage');
  const q = nodes.flatMap(n => n.mainEntity || []).map(e => e.name);
  if (!nodes.length) { warn(x.f, 'FAQ sichtbar, aber kein FAQPage-Schema'); continue; }
  if (q.join('|') !== vis.join('|')) block(x.f, 'FAQPage-Schema weicht vom sichtbaren FAQ ab (node tools/build.mjs)');
}

/* 6 — Gemeinsame Bausteine aktuell? */
try { execFileSync(process.execPath, [join(ROOT, 'tools', 'build.mjs'), '--check'], { stdio: 'pipe' }); }
catch (e) { block('tools/build.mjs', 'Seiten nicht synchron – `node tools/build.mjs` ausführen'); }

console.log(`\nQuality Gate: ${pages.length} Seiten, davon ${cities.length} Ortsseiten`);
if (W.length) console.log('\nWARNUNG (' + W.length + ')\n  ' + W.join('\n  '));
if (B.length) { console.log('\nBLOCKER (' + B.length + ')\n  ' + B.join('\n  ')); console.log('\n✖ FEHLGESCHLAGEN'); process.exit(1); }
console.log('\n✔ BESTANDEN');
