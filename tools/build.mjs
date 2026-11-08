// ZÜGELKLAR — Seiten synchronisieren (kein Framework, keine Abhängigkeiten).
// HTML bleibt die Quelle. Das Script ersetzt nur markierte gemeinsame Blöcke
// (<!-- zk:name --> … <!-- /zk:name -->), Breadcrumbs, JSON-LD-Breadcrumb/Service,
// Offerte-Links, Robots-Meta und erzeugt sitemap.xml + robots.txt.
// Aufruf: node tools/build.mjs        (schreibt)
//         node tools/build.mjs --check (meldet nur, ob etwas veraltet ist; Exit 1)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, NEARBY, byPath, fileOf, urlOf, depthOf, ORIGIN, ORG_ID, INDEXABLE, PLAUSIBLE_DOMAIN } from './site-data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const partial = n => readFileSync(join(ROOT, '_partials', n + '.html'), 'utf8').trimEnd();
const WA_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function offerHref(p, R) {
  const q = p.leistung ? '?leistung=' + p.leistung : '';
  return R + 'offerte/' + q;
}
function render(name, p) {
  const R = '../'.repeat(depthOf(p));
  return partial(name)
    .replaceAll('{{WA}}', WA_ICON)
    .replaceAll('{{OFFER}}', offerHref(p, R))
    .replaceAll('{{ROOT}}', R || './')
    .replaceAll('{{R}}', R);
}

// Ausgeglichenen Block ab Index i finden (<tag …> … </tag>)
function blockEnd(html, start, tag) {
  const re = new RegExp('<(/?)' + tag + '\\b[^>]*>', 'gi');
  re.lastIndex = start; let depth = 0, m;
  while ((m = re.exec(html))) {
    if (m[1]) { depth--; if (depth === 0) return re.lastIndex; } else depth++;
  }
  throw new Error('Block nicht geschlossen: ' + tag);
}
function setBlock(html, name, content, find) {
  const open = `<!-- zk:${name} -->`, close = `<!-- /zk:${name} -->`;
  const wrapped = `${open}\n${content}\n${close}`;
  const a = html.indexOf(open);
  if (a > -1) {
    const b = html.indexOf(close, a);
    return html.slice(0, a) + wrapped + html.slice(b + close.length);
  }
  const loc = find(html);
  if (!loc) return null;
  return html.slice(0, loc[0]) + wrapped + html.slice(loc[1]);
}
const findTag = (startStr, tag) => html => {
  const i = html.indexOf(startStr); if (i < 0) return null;
  return [i, blockEnd(html, i, tag)];
};
function removeTag(html, startStr, tag) {
  const i = html.indexOf(startStr); if (i < 0) return html;
  const e = blockEnd(html, i, tag);
  return html.slice(0, i) + html.slice(e).replace(/^\s*\n/, '\n');
}

function crumbTrail(p) {
  const trail = [byPath['']];
  const chain = []; let cur = p;
  while (cur && cur.parent) { cur = byPath[cur.parent]; if (cur) chain.unshift(cur); }
  return trail.concat(chain, p.type === 'home' ? [] : [p]);
}
function crumbHtml(p) {
  const R = '../'.repeat(depthOf(p));
  const t = crumbTrail(p);
  return '<div class="crumb">' + t.map((x, i) => i === t.length - 1
    ? `<span aria-current="page">${esc(x.crumb)}</span>`
    : `<a href="${x.path ? R + x.path + '/' : (R || './')}">${esc(x.crumb)}</a>`).join(' › ') + '</div>';
}
function crumbLd(p) {
  const t = crumbTrail(p);
  return { '@type': 'BreadcrumbList', itemListElement: t.map((x, i) => {
    const o = { '@type': 'ListItem', position: i + 1, name: x.crumb };
    if (i < t.length - 1) o.item = urlOf(x); else o.item = urlOf(p);
    return o;
  }) };
}
function serviceLd(p, h1) {
  if (!['service', 'b2b', 'city'].includes(p.type) || p.path === 'grossauftraege') return null;
  const area = p.type === 'city'
    ? { '@type': 'City', name: p.cityName, containedInPlace: { '@type': 'AdministrativeArea', name: 'Kanton ' + p.canton } }
    : [{ '@type': 'AdministrativeArea', name: 'Kanton Aargau' }, { '@type': 'AdministrativeArea', name: 'Kanton Zürich' }];
  return { '@type': 'Service', '@id': urlOf(p) + '#service', name: h1, serviceType: p.type === 'city' ? 'Umzug' : p.crumb,
    url: urlOf(p), provider: { '@id': ORG_ID }, areaServed: area };
}
function nearbyHtml(p) {
  const R = '../'.repeat(depthOf(p));
  const list = (NEARBY[p.city] || []).map(s => byPath['umzug-' + s]).filter(Boolean);
  return '<h2>Umzüge in der Nähe</h2>\n<p>Von Mellingen aus fahren wir auch regelmässig in die Nachbarorte:</p>\n<div class="nearby">'
    + list.map(c => `<a class="region" href="${R}${c.path}/">Umzug in ${esc(c.cityName)}</a>`).join('')
    + `<a class="region" href="${R}einsatzgebiet/">Alle Orte im Einsatzgebiet</a></div>`;
}

// Sichtbaren Text in Klartext (für Schema) umwandeln
const plain = s => s.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '')
  .replace(/&shy;/g, '').replace(/&nbsp;/g, ' ').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ').trim();
// FAQ aus dem sichtbaren Text – Schema und Seite können so nicht mehr auseinanderlaufen
function visibleFaq(html) {
  const out = [];
  for (const block of html.matchAll(/<div class="faq">([\s\S]*?)\n\s*<\/div>/g)) {
    for (const d of block[1].matchAll(/<details[^>]*>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)) {
      out.push({ '@type': 'Question', name: plain(d[1]), acceptedAnswer: { '@type': 'Answer', text: plain(d[2]) } });
    }
  }
  return out;
}

function updateJsonLd(html, p) {
  const h1 = plain((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, p.crumb])[1]);
  const faq = visibleFaq(html);
  let done = false;
  html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (all, js) => {
    let data; try { data = JSON.parse(js); } catch { return all; }
    if (data['@type'] === 'FAQPage') {
      if (!faq.length) return all;
      data.mainEntity = faq;
      return '<script type="application/ld+json">\n' + JSON.stringify(data, null, 1) + '\n</script>';
    }
    if (data['@graph']) data['@graph'].forEach(n => { if (n['@type'] === 'FAQPage' && faq.length) n.mainEntity = faq; });
    if (data['@type'] === 'MovingCompany' && p.type === 'home') {
      data['@id'] = ORG_ID;
      data.alternateName = ['Zügelklar', 'Zuegelklar'];
      data.email = 'info@zuegelklar.ch';
      return '<script type="application/ld+json">\n' + JSON.stringify(data, null, 1) + '\n</script>';
    }
    const graph = data['@graph'] || (data['@type'] === 'BreadcrumbList' ? [data] : null);
    if (!graph) return all;
    let g = graph.filter(n => n['@type'] !== 'BreadcrumbList' && n['@type'] !== 'Service');
    if (p.type !== 'home') g.unshift(crumbLd(p));
    const s = serviceLd(p, h1); if (s) g.splice(1, 0, s);
    done = true;
    return '<script type="application/ld+json">\n' + JSON.stringify({ '@context': 'https://schema.org', '@graph': g }, null, 1) + '\n</script>';
  });
  if (!done && p.type !== 'home') {
    const g = [crumbLd(p)]; const s = serviceLd(p, h1); if (s) g.push(s);
    html = html.replace('</body>', '<script type="application/ld+json">\n' + JSON.stringify({ '@context': 'https://schema.org', '@graph': g }, null, 1) + '\n</script>\n</body>');
  }
  return html;
}

function processPage(p) {
  const file = join(ROOT, fileOf(p));
  if (!existsSync(file)) return { p, missing: true };
  const before = readFileSync(file, 'utf8');
  let html = before;
  const R = '../'.repeat(depthOf(p));

  // Robots-Meta nach Launch-Schalter
  const robots = INDEXABLE && p.type !== '404' ? 'index,follow' : 'noindex,nofollow';
  html = html.replace(/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${robots}" />`);

  if (p.type !== 'legal' && p.type !== '404') {
    // body-Daten für site.js
    const attrs = [['type', p.type], ['service', p.leistung], ['city', p.city], ['wa', p.wa]]
      .filter(a => a[1]).map(a => ` data-${a[0]}="${esc(a[1])}"`).join('');
    html = html.replace(/<body[^>]*>/, `<body${attrs}>`);

    // Gemeinsame Blöcke
    html = setBlock(html, 'topbar', render('topbar', p), findTag('<div class="topbar">', 'div')) ?? html;
    if (html.indexOf('<!-- zk:header -->') < 0) html = removeTag(html, '<div class="drawer" id="drawer"', 'div');
    html = setBlock(html, 'header', render('header', p), findTag('<header class="hdr">', 'header')) ?? html;
    html = setBlock(html, 'footer', render('footer', p), findTag('<footer class="ftr">', 'footer')) ?? html;
    html = setBlock(html, 'mbar', render('mbar', p), findTag('<div class="mbar">', 'div')) ?? html;
    if (html.includes('class="sp-aside"') || html.includes('<!-- zk:aside -->'))
      html = setBlock(html, 'aside', render(p.aside === 'b2b' ? 'aside-b2b' : 'aside', p), findTag('<aside class="sp-aside"', 'aside')) ?? html;
    if (html.includes('id="offerForm"') || html.includes('<!-- zk:offerform -->'))
      html = setBlock(html, 'offerform', render('offerform', p), findTag('<form id="offerForm"', 'form')) ?? html;
    if (p.type === 'city' && (html.includes('<!-- zk:nearby -->') || html.includes('<h2>Passend dazu</h2>')))
      html = setBlock(html, 'nearby', nearbyHtml(p), h => { const i = h.indexOf('<h2>Passend dazu</h2>'); return i < 0 ? null : [i, i]; }) ?? html;

    // Breadcrumb
    if (p.type !== 'home') html = html.replace(/<div class="crumb">[\s\S]*?<\/div>/, crumbHtml(p));

    // Offerte-Links aus dem Inhalt (Startseite: In-Page-Anker bleibt)
    if (p.type !== 'home') {
      html = html.replace(/href="(?:\.\.\/)*#offerte"/g, `href="${offerHref(p, R)}"`)
                 .replace(/href="(?:\.\.\/)+offerte\/(?:\?[^"]*)?"/g, m => m.includes('?') || !p.leistung ? m : `href="${offerHref(p, R)}"`);
    }
    html = html.replace(/>Anfrage stellen</g, '>Offerte anfragen<');

    // Altes Inline-Script der Startseite entfernen, site.js einbinden
    html = html.replace(/<script>\s*\(function \(\) \{\s*var burger[\s\S]*?<\/script>\s*/, '');
    if (!html.includes('assets/site.js')) html = html.replace('</body>', `<script src="${R}assets/site.js" defer></script>\n</body>`);

    // V15: Stile (Startseite bringt ihre eigenen mit) und Schnellanfrage auf jeder Seite
    const anchor = p.type === 'home' ? /<link rel="stylesheet" href="[^"]*fonts\/fonts\.css" \/>/ : /<link rel="stylesheet" href="[^"]*assets\/site\.css" \/>/;
    const css = ['v15-chrome.css', ...(p.type === 'home' ? [] : ['v15-site.css']), 'quick.css']
      .map(c => `<link rel="stylesheet" href="${R}assets/${c}" />`).join('\n');
    html = setBlock(html, 'v15css', css, h => { const m = anchor.exec(h); if (!m) return null; const e = m.index + m[0].length + 1; return [e, e]; }) ?? html;
    html = html.replace(/<meta name="theme-color" content="[^"]*" \/>/, '<meta name="theme-color" content="#0F0F13" />');
    if (!html.includes('assets/quick.js')) html = html.replace('</body>', `<script src="${R}assets/quick.js" data-base="${R || './'}" defer></script>\n</body>`);
  }

  // Besucher-Statistik: nur wenn PLAUSIBLE_DOMAIN gesetzt ist (sonst wird ein alter Block entfernt)
  html = html.replace(/<!-- zk:stats -->[\s\S]*?<!-- \/zk:stats -->\n?/, '');
  if (PLAUSIBLE_DOMAIN && p.type !== '404') html = html.replace('</head>', `<!-- zk:stats -->\n<script defer data-domain="${PLAUSIBLE_DOMAIN}" src="https://plausible.io/js/script.outbound-links.js"></script>\n<script>window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); };</script>\n<!-- /zk:stats -->\n</head>`);

  if (p.type !== 'legal' && p.type !== '404') html = updateJsonLd(html, p);
  if (html !== before) { if (!CHECK) writeFileSync(file, html); return { p, changed: true }; }
  return { p, changed: false };
}

function lastmod(p) {
  try {
    const d = execSync(`git log -1 --format=%cs -- "${fileOf(p)}"`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    return d || new Date().toISOString().slice(0, 10);
  } catch { return new Date().toISOString().slice(0, 10); }
}

const results = PAGES.map(processPage);
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + PAGES.filter(p => !p.noSitemap && existsSync(join(ROOT, fileOf(p))))
    .map(p => `  <url><loc>${urlOf(p)}</loc><lastmod>${lastmod(p)}</lastmod></url>`).join('\n') + '\n</urlset>\n';
const robotsTxt = INDEXABLE
  ? `# ZÜGELKLAR — robots.txt (Live)\nUser-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`
  : `# ZÜGELKLAR — robots.txt\n# STATUS: PREVIEW. Die Seite ist bewusst für Suchmaschinen gesperrt.\n# Freigabe NUR über tools/site-data.mjs (INDEXABLE = true) und danach\n# \`node tools/build.mjs\`. Das setzt robots.txt UND das robots-Meta aller Seiten.\n# Voraussetzung: docs/reinit/10_PRELAUNCH_GATE.md vollständig grün.\n\nUser-agent: *\nDisallow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`;
let stale = results.filter(r => r.changed).map(r => fileOf(r.p));
for (const [f, c] of [['sitemap.xml', sitemap], ['robots.txt', robotsTxt]]) {
  const fp = join(ROOT, f); const cur = existsSync(fp) ? readFileSync(fp, 'utf8') : '';
  // lastmod-Abweichungen allein gelten im Check-Modus nicht als veraltet
  const norm = s => s.replace(/<lastmod>[^<]*<\/lastmod>/g, '');
  if (norm(cur) !== norm(c) || (!CHECK && cur !== c)) { if (!CHECK) writeFileSync(fp, c); if (norm(cur) !== norm(c)) stale.push(f); }
}
const missing = results.filter(r => r.missing).map(r => fileOf(r.p));
if (missing.length) console.log('Fehlt (noch nicht angelegt):', missing.join(', '));
if (CHECK) {
  if (stale.length) { console.log('✖ Veraltet, bitte `node tools/build.mjs` ausführen:\n  ' + stale.join('\n  ')); process.exit(1); }
  console.log('✔ Alle Seiten synchron.');
} else console.log(`✔ ${stale.length} Datei(en) aktualisiert.`);
