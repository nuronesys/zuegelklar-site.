// Teilen-Bilder (og:image, 1200×630) im V15-Stil erzeugen: Foto der Seite, Titel aus der H1, Angebote.
// Aufruf: node tools/og.mjs   (braucht Google Chrome und ffmpeg; Pfade unten bei Bedarf anpassen)
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { execFileSync, execSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const TMP = join(tmpdir(), 'zk-og'); rmSync(TMP, { recursive: true, force: true }); mkdirSync(TMP, { recursive: true });
const url = p => pathToFileURL(join(ROOT, p)).href;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const text = s => s.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

const KICKER = { home: 'Umzugsfirma · Aargau & Raum Zürich', hub: 'Leistungen', service: 'Leistung', b2b: 'Grossaufträge', city: 'Einsatzgebiet', 'ratgeber-hub': 'Ratgeber', ratgeber: 'Ratgeber', offerte: 'Offerte in 3 Klicks', about: 'Über uns' };
const files = execSync('git ls-files "*index.html"', { cwd: ROOT }).toString().trim().split('\n');
const { PAGES } = await import(pathToFileURL(join(ROOT, 'tools/site-data.mjs')).href);
const typeOf = f => (PAGES.find(p => (p.path ? p.path + '/index.html' : 'index.html') === f) || {}).type;

let n = 0;
for (const f of files) {
  const h = readFileSync(join(ROOT, f), 'utf8');
  const og = /og:image" content="https:\/\/zuegelklar\.ch\/(assets\/og\/[a-z0-9-]+)\.jpg"/.exec(h);
  if (!og) continue;
  const type = typeOf(f) || 'service';
  let title = text((/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(h) || [, 'ZÜGELKLAR'])[1]);
  if (type === 'home') title = 'Umzug. Reinigung. Räumung. Fertig.';
  const m = / – |: /.exec(title);
  const [main, rest] = m ? [title.slice(0, m.index), title.slice(m.index + m[0].length)] : [title, ''];
  const img = (/<img src="(?:\.\.\/)*(assets\/(?:v15\/)?[a-z0-9-]+\.webp)"/.exec(h.replace(/<header[\s\S]*?<\/header>/, '')) || [, 'assets/v15/hero.webp'])[1];
  const page = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:B;src:url(${url('assets/fonts/bricolage-grotesque-latin-var.woff2')});font-weight:200 800}
@font-face{font-family:I;src:url(${url('assets/fonts/instrument-sans-latin-600-normal.woff2')});font-weight:600}
@font-face{font-family:I;src:url(${url('assets/fonts/instrument-sans-latin-400-normal.woff2')});font-weight:400}
*{box-sizing:border-box;margin:0}html,body{width:1200px;height:630px;overflow:hidden;background:#0F0F13}
.ph{position:absolute;inset:0 0 0 440px;background:url(${url(img)}) center/cover}
.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0F0F13 0%,rgb(15 15 19/.85) 22%,rgb(15 15 19/.15) 60%,rgb(15 15 19/0))}
.glow{position:absolute;left:-200px;bottom:-260px;width:800px;height:600px;background:radial-gradient(closest-side,rgb(0 87 184/.45),transparent)}
.in{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column;color:#fff;font-family:I,sans-serif}
.logo{width:190px;filter:brightness(0) invert(1)}
.k{margin-top:auto;font:600 19px/1 I;letter-spacing:.16em;text-transform:uppercase;color:#7FB2EE}
h1{margin-top:20px;max-width:${rest ? 760 : 820}px;font:800 ${main.length > 34 ? 58 : 70}px/.98 B;letter-spacing:-.045em;text-wrap:balance}
p{margin-top:16px;max-width:640px;font:400 25px/1.3 I;color:rgb(242 244 247/.78);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
ul{list-style:none;padding:0;margin-top:30px;display:flex;gap:10px}
li{padding:11px 18px;border-radius:999px;font:600 19px/1 I;background:rgb(255 255 255/.1);border:1px solid rgb(255 255 255/.22)}
li:first-child{background:#fff;color:#1E1E24;border-color:#fff}
.sb{position:absolute;right:22px;bottom:20px;padding:6px 10px;border-radius:6px;background:rgb(0 0 0/.55);font:600 13px/1 I;letter-spacing:.12em;text-transform:uppercase;color:rgb(255 255 255/.8)}
</style><div class="ph"></div><div class="glow"></div><div class="in">
<img class="logo" src="${url('assets/logo.svg')}">
<span class="k">${esc(KICKER[type] || 'ZÜGELKLAR')}</span>
<h1>${esc(main)}</h1>${rest ? `<p>${esc(rest)}</p>` : ''}
<span class="sb">Symbolbild</span>
<ul><li>Besichtigung gratis</li><li>Festpreis</li><li>Antwort meist innert 1 Std.</li></ul></div>`;
  const name = og[1].split('/').pop(), html = join(TMP, name + '.html'), png = join(TMP, name + '.png');
  writeFileSync(html, page);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', '--virtual-time-budget=1500', '--screenshot=' + png, pathToFileURL(html).href], { stdio: 'ignore' });
  execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-i', png, '-q:v', '3', join(ROOT, og[1] + '.jpg')]);
  n++; console.log('✔', og[1] + '.jpg', '←', img);
}
console.log(n, 'Teilen-Bilder erzeugt');
