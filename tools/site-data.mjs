// Seitenregister — eine Zeile pro URL. Quelle für Breadcrumbs, Schema, CTAs, Sitemap.
// type: home | hub | service | b2b | city | ratgeber-hub | ratgeber | offerte | about | legal | 404
export const ORIGIN = 'https://zuegelklar.ch';
export const ORG_ID = ORIGIN + '/#organization';

// Launch-Schalter: erst auf true setzen, wenn docs/reinit/10_PRELAUNCH_GATE.md grün ist.
export const INDEXABLE = false;

const svc = (path, crumb, leistung, wa, extra = {}) => ({ path, type: 'service', crumb, leistung, wa, parent: 'leistungen', ...extra });
const b2b = (path, crumb, leistung, wa) => ({ path, type: 'b2b', crumb, leistung, wa, parent: 'grossauftraege', aside: 'b2b' });
const city = (slug, name, canton = 'Aargau') => ({
  path: 'umzug-' + slug, type: 'city', crumb: 'Umzug ' + name, leistung: 'privatumzug', city: slug, cityName: name, canton,
  wa: 'einen Umzug in ' + name, parent: 'einsatzgebiet'
});
const rg = (slug, crumb) => ({ path: 'ratgeber/' + slug, type: 'ratgeber', crumb, parent: 'ratgeber', wa: 'eine Offerte' });

export const PAGES = [
  { path: '', type: 'home', crumb: 'Startseite', wa: 'eine Offerte für meinen Umzug' },
  { path: 'leistungen', type: 'hub', crumb: 'Leistungen', wa: 'eine Offerte' },
  svc('umzug', 'Privatumzug', 'privatumzug', 'einen Privatumzug'),
  svc('umzugsreinigung', 'Umzugsreinigung', 'umzugsreinigung', 'eine Umzugsreinigung mit Abnahmegarantie'),
  svc('raeumung-entsorgung', 'Räumung & Entsorgung', 'raeumung_entsorgung', 'eine Räumung und Entsorgung'),
  svc('montage', 'Demontage & Montage', 'montage', 'Demontage und Montage von Möbeln'),
  svc('international', 'Umzug ins Ausland', 'international', 'einen Umzug ins Ausland'),
  svc('seniorenumzug', 'Seniorenumzug', 'seniorenumzug', 'einen Seniorenumzug'),
  svc('kleinumzug', 'Kleinumzug', 'kleinumzug', 'einen Kleinumzug'),
  svc('klaviertransport', 'Klaviertransport', 'klaviertransport', 'einen Klaviertransport'),
  { path: 'grossauftraege', type: 'b2b', crumb: 'Grossaufträge', parent: 'leistungen', aside: 'b2b', wa: 'einen Grossauftrag' },
  b2b('villen-anwesen', 'Villen & Anwesen', 'villa_anwesen', 'einen Umzug aus einer Villa oder einem Anwesen'),
  b2b('museum-kunst', 'Museen & Kunst', 'museum_kunst', 'einen Kunst- oder Sammlungstransport'),
  b2b('firmenumzug', 'Firmenumzug', 'firmenumzug', 'einen Firmenumzug'),
  { path: 'einsatzgebiet', type: 'hub', crumb: 'Einsatzgebiet', wa: 'eine Offerte' },
  city('mellingen', 'Mellingen'),
  city('baden', 'Baden'),
  city('wettingen', 'Wettingen'),
  city('brugg', 'Brugg'),
  city('lenzburg', 'Lenzburg'),
  city('aarau', 'Aarau'),
  city('wohlen', 'Wohlen'),
  city('bremgarten', 'Bremgarten'),
  city('dietikon', 'Dietikon', 'Zürich'),
  city('zuerich', 'Zürich', 'Zürich'),
  city('zug', 'Zug', 'Zug'),
  { path: 'ratgeber', type: 'ratgeber-hub', crumb: 'Ratgeber', wa: 'eine Offerte' },
  rg('umzugscheckliste', 'Umzugscheckliste'),
  rg('wohnungsabgabe', 'Wohnungsabgabe'),
  rg('halteverbot-umzug', 'Halteverbot beim Umzug'),
  rg('umzugskosten', 'Umzugskosten: die Faktoren'),
  rg('firmenumzug-planen', 'Firmenumzug planen'),
  rg('villa-umzug-vorbereiten', 'Villa-Umzug vorbereiten'),
  { path: 'offerte', type: 'offerte', crumb: 'Offerte anfragen', wa: 'eine Offerte' },
  { path: 'ueber-uns', type: 'about', crumb: 'Über uns', wa: 'eine Offerte' },
  { path: 'agb.html', type: 'legal', crumb: 'AGB', file: 'agb.html' },
  { path: 'datenschutz.html', type: 'legal', crumb: 'Datenschutz', file: 'datenschutz.html' },
  { path: 'impressum.html', type: 'legal', crumb: 'Impressum', file: 'impressum.html' },
  { path: '404.html', type: '404', crumb: 'Seite nicht gefunden', file: '404.html', noSitemap: true, wa: 'eine Offerte' }
];

// Echte Nachbarn (Audit C §4.2) für den Block «Umzüge in der Nähe»
export const NEARBY = {
  mellingen: ['baden', 'wettingen', 'bremgarten', 'lenzburg'],
  baden: ['wettingen', 'mellingen', 'brugg', 'dietikon'],
  wettingen: ['baden', 'mellingen', 'dietikon'],
  brugg: ['baden', 'aarau', 'lenzburg'],
  lenzburg: ['aarau', 'wohlen', 'mellingen', 'brugg'],
  aarau: ['lenzburg', 'brugg'],
  wohlen: ['bremgarten', 'lenzburg', 'mellingen'],
  bremgarten: ['wohlen', 'mellingen', 'dietikon'],
  dietikon: ['zuerich', 'baden', 'wettingen'],
  zuerich: ['dietikon', 'baden', 'zug'],
  zug: ['zuerich', 'bremgarten']
};

export const byPath = Object.fromEntries(PAGES.map(p => [p.path, p]));
export const fileOf = p => p.file || (p.path ? p.path + '/index.html' : 'index.html');
export const urlOf = p => ORIGIN + '/' + (p.file ? p.path : (p.path ? p.path + '/' : ''));
export const depthOf = p => (p.file ? 0 : (p.path ? p.path.split('/').length : 0));
