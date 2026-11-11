// IndexNow: meldet alle URLs aus sitemap.xml an Bing & Co. (DuckDuckGo, Yahoo, Ecosia, Copilot, Yandex, Seznam, Naver).
// Google nutzt IndexNow nicht – dort reicht die Sitemap in der Search Console.
// Aufruf NACH dem Deploy: node scripts/indexnow.mjs   (läuft nur bei INDEXABLE = true)
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ORIGIN, INDEXABLE, INDEXNOW_KEY } from '../tools/site-data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
if (!INDEXABLE) { console.log('✖ INDEXABLE ist false – die Seite ist gesperrt, es wird nichts gemeldet.'); process.exit(1); }
if (!INDEXNOW_KEY) { console.log('✖ INDEXNOW_KEY fehlt in tools/site-data.mjs.'); process.exit(1); }

const keyUrl = `${ORIGIN}/${INDEXNOW_KEY}.txt`;
const live = await fetch(keyUrl).then(r => r.ok ? r.text() : '').catch(() => '');
if (live.trim() !== INDEXNOW_KEY) { console.log(`✖ Schlüsseldatei ist noch nicht live: ${keyUrl}`); process.exit(1); }

const urlList = [...readFileSync(join(ROOT, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(ORIGIN).host, key: INDEXNOW_KEY, keyLocation: keyUrl, urlList })
});
console.log(res.ok ? `✔ ${urlList.length} URLs gemeldet (HTTP ${res.status}).` : `✖ IndexNow antwortet HTTP ${res.status}: ${await res.text()}`);
process.exit(res.ok ? 0 : 1);
