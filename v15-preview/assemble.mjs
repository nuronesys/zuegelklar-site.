// Baut v15-preview/index.html aus template.html:
// {{WA}} WhatsApp-Icon, {{LONGTEXT}} ausführlicher Text, {{FAQ}} + JSON-LD aus der heutigen Startseite
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const WA = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>';
const long = readFileSync(join(HERE, '..', 'v14-preview', 'longtext.html'), 'utf8');
const home = readFileSync(join(HERE, '..', 'index.html'), 'utf8');
const faq = (home.match(/<div class="faq">[\s\S]*?\n\s*<\/div>\n/) || [''])[0];
const ld = [...home.matchAll(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g)].map(m => m[0]).join('\n');
const out = readFileSync(join(HERE, 'template.html'), 'utf8')
  .replaceAll('{{WA}}', WA)
  .replace('{{LONGTEXT}}', long)
  .replace('{{FAQ}}', faq)
  .replace('</body>', ld + '\n</body>')
  // V15: Kartons sind bei gebuchtem Umzug gratis (Owner-Entscheid), in FAQ und JSON-LD
  .replaceAll('Ja. Umzugskartons und Schutzmaterial können Sie bei uns mieten. Menge und Lieferung werden in der Offerte festgehalten.',
    'Ja. Bei jedem gebuchten Umzug erhalten Sie Umzugskartons gratis. Menge und Lieferung werden in der Offerte festgehalten.');
writeFileSync(join(HERE, 'index.html'), out);
console.log('ok', out.length, 'Bytes · FAQ', (faq.match(/<details/g) || []).length, '· JSON-LD', (ld.match(/ld\+json/g) || []).length);
