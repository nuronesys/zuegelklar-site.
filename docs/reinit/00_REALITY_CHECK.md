# 00 — Reality Check

**Stand:** 03.11.2026 · geprüft gegen GitHub (`git fetch` am 03.11.2026) und die Live-Domain.
Keine alte Übergabe und kein alter Commit-SHA wurde ungeprüft übernommen.

---

## 1. Source of Truth

| Was | Wert | Geprüft |
|---|---|---|
| Repository | `github.com/nuronesys/zuegelklar-site` (Remote-URL endet mit einem Punkt: `zuegelklar-site.`) | `git remote -v` |
| Produktiver Branch | `origin/main` @ **`947a296`** «Merge pull request #6 from nuronesys/design-v11» (03.11.2026) | `git log origin/main` |
| Hosting | GitHub Pages, `CNAME` = `zuegelklar.ch`, `Server: GitHub.com`, `Last-Modified: 03.11.2026 00:59 GMT` | `curl -I https://zuegelklar.ch/` |
| Live = main? | **Ja.** `index.html` live (61 157 Byte) = `origin/main:index.html` = V11-ZIP (gleicher MD5) | md5 |
| Indexierung | `robots.txt`: `Disallow: /` · alle 34 HTML-Dateien `noindex,nofollow` | live + `npm run check:site` |
| Build | keiner. Statisches HTML, `package.json` nur für `scripts/prelaunch-check.mjs` | — |
| Arbeitskopie dieser Analyse | Worktree Worktree, lokaler Branch **`reinit-docs`** = `origin/main`. Nicht gepusht. | `git worktree list` |

**Neueste Arbeit, nicht gemergt:** `origin/content-v12` @ `97af41f` (03.11.2026), **32 Commits vor `main`, 0 dahinter.**
Inhalt: Logo ohne «GmbH» (`logo.svg`, `logo-white.svg`, neue `logo.webp`/`logo-white.png`), Startseite mit Sprachwahl DE/AR, Logo auf Rechtsseiten, kleine Textänderungen auf allen 30 Unterseiten (38 Dateien, +91/−75).
→ Muss vor jeder Umsetzung entschieden werden (mergen / verwerfen). Alle weiteren Arbeiten müssen auf dem Ergebnis aufbauen, sonst entstehen Konflikte in jeder Datei.

## 2. Abweichungen lokal / GitHub / live

| Ort | Stand | Bewertung |
|---|---|---|
| Lokaler Klon (Documents) | `main` @ `fcb25b2` (18.09.2026) — **134 Commits hinter `origin/main`**. Arbeitsbaum sauber, nur ignorierter Ordner `Claude outputs/` (5 V9-Screenshots). | Veraltet. Nicht weiterentwickeln, bevor `git pull` (fast-forward, keine lokalen Änderungen). |
| Projektordner `zuegelklar_v8` | V8-Einseiter (25 866 Byte) vom 05.09.2026. Identisch mit Übergabe-Ordner (18.09.2026) (`diff -r`). | Historisch. Erste Zeile enthält ein escaped Kommentar `&lt;!-- … --&gt;` vor `<!DOCTYPE>` (Quirks-Mode) — irrelevant, weil nicht mehr live. |
| Projektordner `claude-v11-design` | V11-Patch, ZIP, Logo-Entwurf, Vorschauen. Changelog nennt «Basis main = 0616507», «Token ungültig». | **Überholt:** V11 ist inzwischen über PR #6 in `main` (gleicher MD5). Logo-Entwurf ist in `content-v12` eingeflossen (zu prüfen). |
| Handover Übergabe-Ordner | `00_START_HERE.txt` nennt V8 als «aktuell weiterzuentwickeln» und `nuronesys.github.io/zuegelklar-site./` | **Veraltet** in Bezug auf die Website. Firmen-Master (Brand, Legal-Drafts, Businessplan) bleibt Referenz. |
| Remote-Branches | `design-v11` (gemergt), `f3-phase1-2` (gemergt, 38 dahinter), `seo-rebuild-v1-clean` (gemergt, 134 dahinter), `content-v12` (offen) | 3 Branches löschbar nach Owner-OK. |

**Widersprüche zwischen Firmen-Master und Website:**

| Thema | Master (`01_CURRENT_FACTS.md`, 18.09.) | Website (`main`) |
|---|---|---|
| WhatsApp | «No WhatsApp at launch» | WhatsApp ist Hauptweg des Formulars (`wa.me/41799333111`) |
| Packmer | «ordinary partner channel», Identitäten getrennt | Datenschutz §5 nennt Packmer «CRM bzw. Vermittlungsplattform» |
| B2B | «Business / office customers later» | Grossaufträge/Firmenumzug sind Fokus (Owner-Entscheid 31.10.) |
| Rechtsname | «Zügelklar Umzug GmbH» geplant | «Zügelklar Umzug GmbH in Gründung» auf Rechtsseiten; `content-v12` entfernt GmbH aus dem Logo |

Die Website-Entscheide sind jünger. Der Master sollte nachgeführt werden; die Packmer-Formulierung ist inhaltlich zu klären (siehe 07).

## 3. Seiten

| Typ | Anzahl | URLs |
|---|---|---|
| Startseite | 1 | `/` |
| Leistungen | 5 | `/umzug/`, `/umzugsreinigung/`, `/raeumung-entsorgung/`, `/montage/`, `/international/` |
| Spezial-Leistungen | 3 | `/seniorenumzug/`, `/kleinumzug/`, `/klaviertransport/` |
| Grossaufträge | 4 | `/grossauftraege/` (Hub), `/villen-anwesen/`, `/museum-kunst/`, `/firmenumzug/` |
| Ortsseiten | 11 | Mellingen, Baden, Wettingen, Brugg, Lenzburg, Aarau, Wohlen, Bremgarten, Dietikon, Zürich, Zug |
| Ratgeber | 7 | Hub + 6 Artikel |
| Rechtsseiten | 3 | `/agb.html`, `/datenschutz.html`, `/impressum.html` |
| **Total** | **34** | = 34 URLs in `sitemap.xml` |

**Indexierbar heute: 0** (gewollt). Nach Go-live-Schalter: 34.
Fehlende Seitentypen: `/kontakt/`, `/offerte/`, `/ueber-uns/`, `/faq/`, `/referenzen/`, Hubs `/leistungen/` und `/regionen/` (heute Anker auf der Startseite).

## 4. Assets

109 Dateien im Repo. Davon 31 OG-Bilder (`assets/og/`), 12 WebP-Fotos (KI, mit «Symbolbild» gekennzeichnet: 77 Vorkommen), 4 Font-Dateien (self-hosted), 2 CSS.
Ungenutzt (0 Referenzen in HTML/CSS): `assets/og-image.jpg` (149 KB, KI-Bild mit «Umzug GmbH» + Renault-Logo), `assets/favicon-16.png`, `assets/favicon-512.png`. → `09_REPO_CLEANUP_PROPOSAL.md`.

## 5. Zustand Funktionen

| Bereich | Zustand |
|---|---|
| Formular | Baut WhatsApp-Nachricht (Hauptweg) oder `mailto:`. Kein Server, kein CRM, kein Upload. Täuscht keinen Versand vor. |
| CRM | Nicht angebunden. |
| Analytics | Nicht vorhanden (Details: 07). |
| Schema | MovingCompany auf `/` aktiv (ohne legalName/E-Mail), BreadcrumbList + FAQPage auf Unterseiten. |
| Check-Script | `npm run check:site` → 0 Blocker · `npm run check:launch` → 35 Blocker (= noindex/Disallow, erwartet). |
| Search Console / GBP | Nicht eingerichtet (laut Docs offen). |

## 6. Aktuelle Blocker (vor Indexierung)

1. Handelsregistereintrag / Rechtsform / UID / MWST fehlen (Impressum §1–4).
2. Rechtsseiten nicht anwaltlich geprüft (AGB-Verpflichtungen, Abnahmegarantie).
3. Formular ohne End-to-End-Weg ins CRM; Datenschutz §5 muss der Realität entsprechen.
4. Postfach `info@zuegelklar.ch` und WhatsApp/Telefon 079 933 31 11 — Funktion vom Owner zu bestätigen (laut F3 «Phase 0 offen»).
5. Logo-Entscheid «GmbH» (content-v12 offen).
6. Versicherung (Betriebs-/Transporthaftpflicht) nicht bestätigt — keine Aussage auf der Website erlaubt.
7. Packmer-Formulierung im Datenschutz widerspricht der Trennung der Marken.

## 7. Technische Schulden

- Kopf, Navigation, Footer, Mobile-Leiste, Sticky-Karte in **jeder** HTML-Datei von Hand dupliziert; Änderungen laufen über Python-Scripts (`tools/subpage_design.py`, `tools/og.py` — **liegen nicht im Repo**).
- Flache URLs (`/umzug-baden/`) ohne Hubs; Rechtsseiten als `.html`, Rest als Ordner.
- `sitemap.xml` `lastmod` von Hand (alle 31.10.2026).
- Lokaler Klon 134 Commits veraltet; drei gemergte Remote-Branches.
- Generator-Scripts und Quellen der OG-Bilder nicht versioniert → nicht reproduzierbar.
- Details aus den Audits: siehe Bericht `REINITIALIZATION_REPORT.md`.
