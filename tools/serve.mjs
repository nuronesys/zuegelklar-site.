// Lokale Vorschau: node tools/serve.mjs  →  http://localhost:4173
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const PORT = Number(process.env.PORT) || 4173;
createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  let f = join(ROOT, p);
  try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); } catch {}
  try {
    const body = await readFile(f);
    res.writeHead(200, { 'Content-Type': TYPES[extname(f)] || 'application/octet-stream' }); res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] }); res.end(await readFile(join(ROOT, '404.html')).catch(() => 'Not found'));
  }
}).listen(PORT, () => console.log('Vorschau: http://localhost:' + PORT));
