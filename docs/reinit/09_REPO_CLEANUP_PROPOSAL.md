# 09 — Repo- & Datei-Cleanup (Vorschlag)

**Stand:** 03.11.2026 · Methode: Referenzzählung jedes Assets in allen `*.html`/`*.css` (Dateiname-Suche), `diff -r`/MD5 für Duplikate.
**Es wurde nichts gelöscht oder verschoben.** Jede Zeile braucht ein OK des Owners.

Kategorien: **KEEP** · **MOVE** · **ARCHIVE** · **DELETE CANDIDATE** · **DUPLICATE** · **UNKNOWN**

## 1. Im Repository (`nuronesys/zuegelklar-site`, `main`)

| Datei / Ordner | Grösse | Referenzen | Kategorie | Begründung / Vorschlag |
|---|---|---|---|---|
| `assets/og-image.jpg` | 149 KB | 0 | **DELETE CANDIDATE** | KI-Bild mit «Umzug GmbH» und Renault-Logo auf dem Wagen. Seit V11 ungenutzt. Risiko, dass es irgendwo wieder eingebunden wird. |
| `assets/favicon-16.png` | 6 KB | 0 | **DELETE CANDIDATE** | Nicht eingebunden (`favicon.ico` + 32 px decken es ab). |
| `assets/favicon-512.png` | 42 KB | 0 | **KEEP** oder **MOVE** | Ungenutzt, aber sinnvoll für ein künftiges `site.webmanifest` / GBP-Logo. Alternativ nach `brand/`. |
| `assets/logo.webp`, `assets/logo-white.png` | 9 / 23 KB | 34 / 31 | **KEEP** (bis Logo-Entscheid) | Tragen «GmbH». `content-v12` ersetzt sie. |
| `assets/packing.webp`, `assets/handover.webp` | 85 / 82 KB | 5 / 4 | **KEEP** | Früher als ungenutzt gemeldet (05_PRELAUNCH P2-8) — inzwischen auf Unterseiten verwendet. P2-8 ist überholt. |
| `assets/og/*.jpg` (31) | ~1.7 MB | je 1 | **KEEP** | Verwenden Logo-Entwurf ohne GmbH. Bei Logo-Änderung neu erzeugen — Generator fehlt im Repo (siehe 3). |
| `assets/fonts/*` | 129 KB | ✓ | **KEEP** | Self-hosted, SIL OFL. |
| `docs/seo-rebuild/01–09`, `ZUEGELKLAR_FINAL_INPUT_CHECKLIST.md` | — | — | **KEEP** | Entscheidungsgeschichte. `05_PRELAUNCH_BLOCKERS.md` ist teilweise überholt (Telefon, Fonts, `<main>` erledigt) → durch `docs/reinit/10_PRELAUNCH_GATE.md` ablösen und dort verlinken. |
| `LAUNCH-CHECKLIST.md` | — | — | **KEEP**, später **MOVE** nach `docs/` | §6 «Kein B2B» ist durch Owner-Entscheid 31.10. aufgehoben → Hinweis ergänzen. |
| `.nojekyll`, `CNAME`, `favicon.ico`, `robots.txt`, `sitemap.xml` | — | — | **KEEP** | Hosting-relevant. |
| `scripts/prelaunch-check.mjs` | — | — | **KEEP** | Wird zum Quality-Gate erweitert (04). |

## 2. Remote-Branches

| Branch | Status | Kategorie |
|---|---|---|
| `content-v12` | 32 Commits vor `main`, offen | **UNKNOWN** — Owner-Entscheid nötig (mergen / verwerfen) |
| `design-v11` | in `main` gemergt (PR #6) | **DELETE CANDIDATE** |
| `f3-phase1-2` | in `main` gemergt (PR #2–#5), 38 dahinter | **DELETE CANDIDATE** |
| `seo-rebuild-v1-clean` | in `main` gemergt (PR #1), 134 dahinter | **DELETE CANDIDATE** |

## 3. Fehlt im Repo (sollte hinein)

| Was | Wo heute | Vorschlag |
|---|---|---|
| `tools/subpage_design.py`, `tools/og.py` | Nur in früherer Claude-Sitzung erwähnt, nirgends lokal gefunden | **UNKNOWN** — suchen; falls verloren, beim Generator (Phase B) neu schreiben. Ohne sie sind OG-Bilder und Layout nicht reproduzierbar. |
| Logo-Quelldateien (SVG) | `claude-v11-design/zuegelklar-logo-entwurf.zip`, `content-v12` | Mit Logo-Entscheid ins Repo unter `assets/` bzw. `brand/`. |

## 4. Ausserhalb des Repos (lokaler Rechner)

| Pfad | Kategorie | Begründung |
|---|---|---|
| lokaler Klon | **KEEP** (aktualisieren) | Lokaler Klon, 134 Commits veraltet, sauber. `git pull` (fast-forward). Ignorierter Ordner `Claude outputs/` (5 V9-Screenshots) → **ARCHIVE**. Hat jetzt den Worktree `reinit-docs` angehängt. |
| Projektordner `zuegelklar_v8` | **DUPLICATE** | Byte-identisch mit Handover `02_CURRENT_WEBSITE_V8\zuegelklar_v8`. Historischer V8-Einseiter. → **ARCHIVE** (eine Kopie genügt). |
| Projektordner `claude-v11-design\zuegelklar-site-v11-aenderungen.zip`, `zuegelklar-v11.patch` | **DUPLICATE** | Inhalt ist via PR #6 in `main` (MD5 `index.html` identisch). → **ARCHIVE** oder **DELETE CANDIDATE**. |
| `…\claude-v11-design\zuegelklar-logo-entwurf.zip` | **KEEP** bis Logo-Entscheid | Einzige Quelle der SVG-Entwürfe ausserhalb von `content-v12`. |
| `…\claude-v11-design\*.png`, `10_V11_DESIGN_CHANGELOG.md` | **ARCHIVE** | Changelog-Inhalt nach `docs/seo-rebuild/10_V11_CHANGELOG.md` übernehmen (fehlt im Repo). |
| Übergabe-Ordner (18.09.2026) (22 MB) | **KEEP** (Firmen-Master), Website-Teil **ARCHIVE** | `00_START_HERE.txt` verweist noch auf V8 als aktuell → mit Hinweis auf `main` aktualisieren. Firmen-Master (Brand, Legal-Drafts, Businessplan) bleibt Referenz. Handover liegt auf dem Desktop → besser in einen gesicherten Projektordner **MOVE**. |
| `…HANDOVER\01_COMPANY_MASTER\08_WEBSITE\V6_CURRENT` | **ARCHIVE** | Ältere Website-Version. |
| `03_LATEST_CRM_BRANDING\ZUEGELKLAR_umzug_gmbh_logo_variant.png` | **UNKNOWN** | GmbH-Variante; nach Logo-Entscheid ggf. ARCHIVE. |

## 5. Vorgeschlagene Reihenfolge (nach OK)

1. `content-v12` entscheiden.
2. Lokalen Klon `git pull`.
3. `og-image.jpg`, `favicon-16.png` entfernen (1 Commit, leicht rückgängig).
4. Gemergte Remote-Branches löschen.
5. V11-Changelog ins Repo übernehmen; `05_PRELAUNCH_BLOCKERS.md` auf `10_PRELAUNCH_GATE.md` verweisen.
6. Lokale Duplikate archivieren (z. B. einen Archivordner).
