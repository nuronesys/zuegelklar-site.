// Baut v14-preview/index.html aus template.html + bestehenden Inhalten (Formular, FAQ, Schema).
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url)), ROOT = join(HERE, '..');
const SCR = process.argv[2]; // Ordner mit v14_D_*.svg
const rd = p => readFileSync(p, 'utf8');
const WA = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>';

// Icon-Sprite: nur <symbol>-Elemente, ohne Vorschau und Style (Farben via CSS .i/.a)
const icons = rd(join(SCR, 'v14_D_icons.svg'));
const symbols = [...icons.matchAll(/<symbol[\s\S]*?<\/symbol>/g)].map(m => m[0]).join('\n');
const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><style>.i{fill:none;stroke:#1E1E24;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}.a{fill:none;stroke:#0057B8;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}</style>\n${symbols}\n</defs></svg>`;

// Karte: Inhalt ohne <style>, Flüsse zeichnen beim Eintritt, Orte poppen ein
let map = rd(join(SCR, 'v14_D_area_map.svg'))
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<style>[\s\S]*?<\/style>/, '')
  .replace(/<svg[^>]*>/, '<svg viewBox="0 0 420 380" focusable="false">');
let ri = 0;
map = map.replace(/<path class="m-river"/g, () => `<path class="m-river draw" pathLength="1" style="--i:${ri++}"`);
let di = 0;
map = map.replace(/<circle class="m-dot"/g, () => `<circle class="m-dot pop" style="--i:${di++}"`);
map = map.replace('<text class="m-t" x="14" y="372" style="font-size:10.5px;fill:#5B6470">', '<text class="m-note" x="14" y="372">');

// Formular-Partial mit Pfaden für Tiefe 1 + «Ankommen»-Grafik
let form = rd(join(ROOT, '_partials', 'offerform.html')).replaceAll('{{WA}}', WA).replaceAll('{{R}}', '../').replaceAll('{{OFFER}}', '#offerte');
form = form.replace('<b class="f-done-t">', '<svg class="f-done-art" viewBox="0 0 72 56" aria-hidden="true"><path pathLength="1" d="M6 34L36 6l30 28"/><path class="ck" pathLength="1" d="M24 40l9 9 17-19"/></svg>\n  <b class="f-done-t">');

// FAQ + Schema unverändert aus der heutigen Startseite
const home = rd(join(ROOT, 'index.html'));
const faq = (home.match(/<div class="faq">[\s\S]*?\n\s*<\/div>\n/) || [''])[0];
const ld = [...home.matchAll(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g)].map(m => m[0]).join('\n');

let out = rd(join(HERE, 'template.html'))
  .replace('{{SPRITE}}', sprite).replace('{{MAP}}', map).replace('{{OFFERFORM}}', form).replace('{{FAQ}}', faq)
  .replaceAll('{{WA}}', WA)
  .replace('</body>', ld + '\n</body>');
writeFileSync(join(HERE, 'index.html'), out);
console.log('ok', out.length, 'Bytes · FAQ', (faq.match(/<details/g) || []).length, '· Symbole', (symbols.match(/<symbol/g) || []).length);
