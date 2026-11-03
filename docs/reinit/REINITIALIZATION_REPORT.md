# ZUEGELKLAR REINITIALIZATION REPORT

**Stand:** 03.11.2026 · Basis: `origin/main` @ `947a296` · Arbeitskopie: Worktree `zuegelklar-site`, lokaler Branch `reinit-docs` (nicht gepusht).
**Status: Bericht abgeschlossen. Keine Produktionsdatei geändert. Nichts gepusht, nichts gemergt, Indexierung bleibt aus. Wartet auf Freigabe.**

---

## 1. Aktuelle Realität

- **Source of Truth:** `github.com/nuronesys/zuegelklar-site` (privat), `main` @ `947a296` (PR #6 Design V11, 03.11.2026). Live auf `zuegelklar.ch` via GitHub Pages; live = `main` (MD5-geprüft).
- **34 Seiten**, alle in der Sitemap, alle `noindex,nofollow`, `robots.txt` `Disallow: /` → **0 indexierbar** (gewollt).
- **Neueste Arbeit nicht gemergt:** `origin/content-v12` (32 Commits, Logo ohne «GmbH», Sprachhinweis DE/AR, kleine Textänderungen auf allen Seiten).
- **Veraltet:** lokaler Klon  (134 Commits hinter `main`); Projektordner `zuegelklar_v8` (V8-Einseiter, Duplikat der Übergabe vom 18.09.); V11-Patch/ZIP (bereits gemergt); Handover `00_START_HERE.txt` nennt noch V8 als aktuell.
- **Technisch sauber** (Script-geprüft): Canonicals selbstreferenzierend, Sitemap = Dateien, keine kaputten Links, keine doppelten Titles/H1/Descriptions, JSON-LD gültig, Fonts lokal, keine Drittanbieter-Requests, alle Bilder mit Massen.
- **Funktion:** Formular baut WhatsApp-/Mail-Nachricht, kein Server, kein CRM, kein Analytics. Leads tragen keine Herkunft.
- Details: `00_REALITY_CHECK.md`.

## 2. Genutzte Skills

`site-architecture`, `programmatic-seo`, `ai-seo`, `analytics`, `marketing-psychology`, `marketing-council` (1 Runde), `ab-testing`, `stop-slop`, `image` (Bildstrategie, Anhang A), `file-organizer` (Cleanup). Zuordnung und Output: `01_SKILL_AGENT_MATRIX.md`.

## 3. Eingesetzte Agents

Fünf `general-purpose`-Agents parallel, alle read-only (8 Rollen zusammengelegt, weil sie dieselben Dateien lesen):

| Agent | Rolle | Kernergebnis |
|---|---|---|
| A+F | Technical SEO, Performance, A11y, Architekturentscheid | Basis sauber; HTTPS nicht erzwungen; 30 % des HTML ist duplizierter Rahmen → kleiner Node-Generator |
| B | Local SEO, Ortsseiten-Qualität | Keine Doorway-Seiten (max. 10 % Überlappung); 8 Lokalfakten geprüft, alle korrekt; strukturelle Lücken |
| C+D | Architektur, Suchintention, AI-SEO | Flache URLs behalten + Hubs; Kannibalisierung «Umzugsfirma Aargau»; llms.txt ablehnen |
| E+H | UX/CRO, Psychologie, Council, stop-slop | Formular verliert Desktop-Leads still; 24-h-Widerspruch; Startseite 30/50 |
| G | Analytics, Formular/CRM, Datenschutz | Packmer-Formulierung P0; keine anonyme Intake in den ZÜGELKLAR-CRM-Mandanten; Plausible + GSC |

Der Haupt-Agent hat Reality Check, Datei-Inventar und den Abgleich gemacht.

**Aufgelöste Widersprüche zwischen den Audits:**

| Thema | Audits | Entscheid |
|---|---|---|
| Team-/Fahrzeug-Claims | E: «unbelegt, P0» | Firmen-Master (Owner, 05.09.) bestätigt 2 Fahrzeuge, Personal, Material → **P1**: mit Foto belegen, Absolutformulierungen entschärfen |
| Antwortfrist 24 h | E: P0 · G: «bestätigt» | Owner bestätigte am 24.09., F3 entfernte sie am 31.10. auf der Startseite, V11 setzte sie auf 29 Seiten wieder → **P0 Owner-Entscheid** |
| Formular-Endpoint | E: «nicht über Packmer» · G: eigener Intake im ZÜGELKLAR-CRM-Mandanten | Beides vereinbar: Packmer-**Software** als CRM des eigenen Mandanten ist zulässig, der Packmer-**Marktplatz** nie. Bedingung: Integrationsvertrag + Guard (07 §5) |
| Räumung Baden | B: Wave 1 · C: Service×Ort ablehnen | **Wave 2**, sobald GSC Impressionen zeigt |
| Generator-Output | A: in Repo-Root, Pages unverändert | Wegen K-3 (Docs öffentlich) besser **Deploy via GitHub Actions nur des Build-Ordners** |
| Frühere «Astro»-Planung (07_FINAL_PLAN P-2) | A, C | durch Entscheid §13 ersetzt |

## 4. Bewusst nicht genutzte Skills

`signup` (Offertformular ≠ Signup) · `theme-factory`, `brand-guidelines`, `design`, `design-system`, `brand`, `ui-styling` (Marke ist gesperrt, kein Tailwind/React) · `web-artifacts-builder` (nicht für die Produktions-Site) · Picsart-Video/Persona/Audio, cinematic-video (Echtheitsregel) · `bahnhoefli-*`, `galaxy-*` (andere Firmen) · Office-/Doc-Skills (Docs leben im Repo) · `social`, `emails`, `video`, `marketing-ideas` → nur als Backlog (§11, 08 §6). Vollständig: `01` §B–F.

## 5. Kritische Probleme

**P0 — vor jeder Indexierung**

| # | Problem | Beleg | Verantwortlich |
|---|---|---|---|
| K-1 | Datenschutz §5 nennt Packmer «CRM … der Plattform Packmer» **und** «Vermittlungsplattform» → Leser schliesst: Website-Anfragen gehen auf einen Marktplatz. Verstösst gegen die eigene Runde-3-Regel. | `datenschutz.html` §5; Commit `ca317a2` | Owner + Fachperson |
| K-2 | Kein technischer Schutz, dass Website-Leads nicht in den Packmer-Marktplatz laufen: der Marktplatz hat einen öffentlichen Eingang, der ZÜGELKLAR-Bereich keinen anonymen; zuegelklar.ch ist im CRM dem Marktplatz-Weg zugeordnet | Audit G (lokal) | Owner / CRM |
| K-3 | **Interne Dokumente öffentlich abrufbar**: `zuegelklar.ch/docs/seo-rebuild/*.md`, `/LAUNCH-CHECKLIST.md`, `/package.json`, `/scripts/…` → HTTP 200 (Claims-Audit, fehlende Firmendaten, Entscheide) | `curl` 03.11. | Entwicklung |
| K-4 | Logo «Umzug GmbH» live ohne HR-Eintrag; Lösung liegt in `content-v12` | Screenshot, `b945076` | Owner |
| K-5 | Antwortfrist widersprüchlich (29 Seiten «innert 24 h an Werktagen», Startseite ohne Frist) | Audit E | Owner |
| K-6 | Formular verliert Anfragen still: Desktop ohne WhatsApp Web / ohne Mailprogramm → kein Fehler, kein Lead | `index.html` Formular-JS | Entwicklung |
| K-7 | HTTPS nicht erzwungen: `http://zuegelklar.ch/` liefert 200 | `curl` | Owner (GitHub-Einstellung «Enforce HTTPS») |
| K-8 | Rechtsform/UID/MWST offen, Rechtsseiten nicht geprüft, Versicherung nicht bestätigt, Postfach/Telefon vom Owner zu bestätigen | `10_PRELAUNCH_GATE.md` A/B | Owner, Treuhand, Fachperson |

**P1 — zum Launch** (Auswahl): kein `404.html`; Unterseiten ohne mobiles Menü; Kontrast WhatsApp-Button 3.09:1 und Muted-Text 4.12:1; mobiles Hero-Bild 900×1599 (LCP); Breadcrumbs zeigen auf nicht existierende Hubs; 179 CTAs ohne Kontext auf `/#offerte`; 185 WhatsApp-Links ohne Vortext; Kannibalisierung «Umzugsfirma Aargau»; 5 Ortsseiten ohne Einsatzgebiet-Satz; Zug-Satz zum Ausländeranteil; Slogan in H2/Leads; Tippfehler-Domains zeigen Parkseite; `robots.txt`/LAUNCH-CHECKLIST behaupten, `noindex` stehe nur in `index.html`.

## 6. Vorgeschlagene Architektur

**Flache URLs behalten, keine Migration, keine Weiterleitungen.** Neue Hubs: `/leistungen/`, `/einsatzgebiet/`, `/offerte/`, `/ueber-uns/`, `404.html`; später `/kontakt/`. Nicht jetzt: `/faq/`, `/referenzen/` (erst ab 3 echten Fällen), Service×Ort-Matrix, `llms.txt`. Rechtsseiten bleiben `.html`.
Eine Navigation, ein Footer auf allen Seiten; Breadcrumb sichtbar = JSON-LD. Begründung, Baum, Verlinkungsregeln: `02_SITE_ARCHITECTURE_V2.md`.

## 7. SEO-Chancen

| Chance | Ziel | Hebel |
|---|---|---|
| «Umzugsfirma Aargau» | `/` | Kannibalisierung mit `/umzug/` auflösen |
| «Umzugsreinigung mit Abnahmegarantie» | `/umzugsreinigung/` | tiefste Seite + eine Definition; einziges echtes Unterscheidungsmerkmal |
| Schweizer Vokabular | Titel/Intros | «Zügelfirma», «zügeln», «Entrümpelung», «Endreinigung» heute 0× bzw. selten |
| Lokale Halteverbot-/Sperrgut-Daten | `/einsatzgebiet/` | Vergleichstabelle nach Gemeinde = einzigartige, verlinkbare Information |
| Nahbereich Mellingen | Regionalseiten | Rohrdorferberg/Reusstal, Spreitenbach, Siggenthal |
| Ratgeber mit Kaufnähe | Ratgeber | Abnahmegarantie erklärt; Umzugsofferte vergleichen; Räumung/Entrümpelung |
| Offerte als eigene URL | `/offerte/` | «Umzug Offerte»; messbare Conversion-URL |

Intent-Map mit 28 Clustern: `02` §7 und Audit C §3. Suchvolumen sind Schätzungen → nach Launch mit GSC prüfen.

## 8. Local-SEO-Plan

1. Die 11 Ortsseiten auf den Standard `03` bringen (Einsatzgebiet-Satz, Nachbarorte-Block, Leistungsmodul, `Service`-Schema, eigener Lead, Quellen ohne Wikipedia).
2. `/einsatzgebiet/` als Hub mit verifizierter Vergleichstabelle.
3. **Google Business Profile:** Service-Area-Profil exakt «ZÜGELKLAR», Adresse verborgen (ausser es ist ein besetzter Standort mit Öffnungszeiten), Hauptkategorie Umzugsunternehmen + 2–3 zutreffende Nebenkategorien, ≤ 20 Gebiete, Leistungen 1:1 wie Website, keine Preise, **nur echte Fotos**, ein Profil, nicht mit Packmer verknüpft. Voraussetzung: funktionierendes `info@`.
4. NAP überall identisch (heute konsistent; nur `agb.html` ohne E-Mail im Footer). Einträge auf local.ch, search.ch.
5. Bewertungen nach jedem echten Auftrag, ohne Anreize.

## 9. Programmatic-SEO-Schutz

Wave 1 ≈ **42–45 URLs**, Wave 2 **50–70** (nach ≥ 8 Wochen GSC-Daten, GBP, ersten echten Bewertungen/Fotos), langfristig **80–120** über Ratgeber und Fälle. **Ortsseiten hart begrenzt auf ~25**, max. 3 neue pro Monat. Automatisches Quality Gate (Duplikate, Ähnlichkeit, Pflicht-Blöcke, Links, Canonical, Schema-Verbote, Claim-Denylist, «Symbolbild»): `04_PROGRAMMATIC_SEO_GUARDRAILS.md`.

## 10. AI-SEO-Empfehlungen

Ein `MovingCompany`-Knoten mit `@id`, `alternateName`, `email`; `Service`- und `Article`-Knoten mit Verweis darauf; kein `legalName`/Rating/`sameAs`, bis echt. Ein verifizierter Faktenblock auf `/ueber-uns/`. Eine wörtliche Abnahmegarantie-Definition. 40–60-Wort-Antwortabsätze. `llms.txt` abgelehnt. `robots.txt` beim Launch: Suchbots erlauben; Trainings-Crawler = Owner-Entscheid. Grösster Hebel liegt ausserhalb der Site (HR, GBP, Bewertungen, Verzeichnisse, echte Fotos). → `06_AI_SEARCH_VISIBILITY.md`.

## 11. Conversion-Empfehlungen

P0: Formular-Zwischenschritt mit «Text kopieren» (K-6), Logo (K-4), Antwortfrist (K-5), Datenschutz (K-1).
P1: ein CTA-Wort «Offerte anfragen», Hero mit 2 Buttons, geräteabhängige CTA-Hierarchie, vorausgefüllte WhatsApp-Texte, Kurzformular mit aufklappbaren Details, B2B-Variante «Erstgespräch vereinbaren», Slogan nur im Footer, «Was den Preis bestimmt» ohne Zahlen, Kontext-CTA Halteverbot auf Ortsseiten, Gründer mit Name/Foto.
Reject: Bewertungs-Widgets, Zähler, Countdown, Preisrechner mit Schätzpreisen, Exit-Popup, Chatbot.
A/B-Tests frühestens nach 6–12 Monaten (≈ 5 000–14 000 Sessions pro Variante). → `08_CONVERSION_REVIEW.md`.

## 12. Analytics-Plan

**Plausible Cloud (EU, cookielos, kein Banner) + Google Search Console (jetzt einrichten) + CRM als Wahrheit für Leads/Umsatz.** GA4/GTM erst mit Google Ads. Events `offer_form_start/submit/error`, `whatsapp_click`, `phone_click`, `email_click`, `cta_click` mit `data-loc`. Attribution in `sessionStorage` (first/last touch), sofort nutzbar als Fusszeile «Ref · Seite · Herkunft» im WhatsApp-/Mail-Text. Payload mit `brand=zuegelklar`, `channel=website`, `distribution=none` serverseitig gesetzt. Auswertung auf Seitenebene GSC ↔ Plausible ↔ CRM. → `07_TRACKING_PLAN.md`.

## 13. Technischer Architekturentscheid

| Kriterium | Statisch von Hand (heute) | **Kleiner Node-Generator** | Astro |
|---|---|---|---|
| SEO-Output | gleich | gleich (byte-vergleichbar) | gleich, Risiko durch Defaults |
| Wiederverwendung | keine (30 % dupliziert, 3 abweichende Varianten, Telefonnummer 489×) | Partials + JSON-Daten | sehr stark |
| Wartbarkeit bei 100 Seiten | Fehlerquelle (Logo-Änderung = 34 Dateien) | 1 Änderung | gut, braucht Framework-Wissen |
| Build-Komplexität | 0 | ~200–300 Zeilen Node, ohne Abhängigkeiten | npm-Baum, Major-Upgrades |
| Deploy-Risiko | keins | gering | mittel |
| Performance | gut | gleich + `srcset` | sehr gut |

**Empfehlung: kleiner Node-Generator** (`src/` Templates + `data/*.json` → statisches HTML). Erster Schritt **reproduziert die heutigen 34 Seiten ohne inhaltliche Abweichung**; URLs ändern sich nie. Deploy: GitHub Actions veröffentlicht **nur den Build-Ordner** — damit sind `docs/`, `scripts/` und Checklisten nicht mehr öffentlich (löst K-3). Ein Schalter `indexable` steuert `robots` auf allen Seiten und `robots.txt`. Astro erst neu prüfen, wenn echte mehrsprachige Seiten, ein CMS oder Interaktivität nötig werden.

## 14. Cleanup-Vorschlag

Löschkandidaten im Repo: `assets/og-image.jpg` (KI-Bild mit «Umzug GmbH»/Renault-Logo, ungenutzt), `assets/favicon-16.png`; gemergte Branches `design-v11`, `f3-phase1-2`, `seo-rebuild-v1-clean`. Lokal archivieren: V8-Duplikat, V11-Patch/ZIP, alter Handover-Websiteteil. Fehlt im Repo: `tools/subpage_design.py`, `tools/og.py` (OG-Bilder nicht reproduzierbar), V11-Changelog. **Nichts gelöscht.** → `09_REPO_CLEANUP_PROPOSAL.md`.

## 15. Umsetzungsphasen

| Phase | Inhalt | Art | Abhängig von |
|---|---|---|---|
| **0 — Owner-Entscheide** | `content-v12` mergen/verwerfen · Antwortfrist · Logo/Rechtsform · Packmer-Wortlaut · «Enforce HTTPS» aktivieren · `info@`/Telefon testen · GSC-Property (DNS) · Freigabe Docs-Auslagerung · Freigabe Cleanup | Entscheid | — |
| **A — Hygiene** | lokalen Klon aktualisieren; Docs aus der Veröffentlichung nehmen (vorläufig: `docs/`, Checklisten in privates Repo/Branch, bis B steht); ungenutzte Assets entfernen; gemergte Branches löschen; Docs-Drift korrigieren | klein | 0 |
| **B — Generator** | Node-Generator, Daten aus heutigen Seiten extrahiert, **Null-Diff-Commit**, Actions-Deploy nur Build-Ordner, Quality Gate im Check-Script | mittel | A |
| **C — P0-Fixes** | Formular-Zwischenschritt + Kopieren + neuer Tab; Datenschutz §5 (nach Freigabe); Antwortfrist; HTTPS/Domains | klein | 0, B |
| **D — Struktur** | eine Nav/Footer, mobiles Menü, Breadcrumbs, `/leistungen/`, `/einsatzgebiet/`, `/offerte/`, `/ueber-uns/`, `404.html`, Schema `@id`/Service/Article, Kontraste, Hero-Bild | mittel | B |
| **E — Inhalte** | Ortsseiten auf Standard 03, Leistungsseiten auf Standard 05, stop-slop-Umformulierungen, Slogan, CTA-Wörter, Kannibalisierung | mittel | D, Owner-Lektorat |
| **F — Messung** | Attribution-Fusszeile, vorausgefüllte WhatsApp-Texte, `?leistung=`-Vorauswahl, Plausible + Datenschutz §8/§9 | klein | C, Owner-Entscheid Plausible |
| **G — Wave 1** | 2–3 Regionalseiten, 1–2 Ratgeber | mittel | E, Quality Gate |
| **H — Launch-Gate** | `10_PRELAUNCH_GATE.md` komplett grün → Go-live-PR | Gate | alle P0 |
| **I — Wave 2** | nach ≥ 8 Wochen GSC: weitere Orte, erste Service×Ort-Seite, CRM-Intake (API), `/kontakt/`, `/referenzen/` | später | Daten |

## 16. Dateien, die sich ändern würden

| Phase | Dateien |
|---|---|
| A | `assets/og-image.jpg`, `assets/favicon-16.png` (löschen) · `docs/**`, `LAUNCH-CHECKLIST.md` (verschieben) · `robots.txt` (Kommentar korrigieren) · `docs/seo-rebuild/05_PRELAUNCH_BLOCKERS.md`, `09_F3_CHANGELOG.md` (Verweis/«dünn» schliessen) |
| B | **neu:** `src/layouts/*`, `src/partials/*` (topbar, header, drawer, footer, mbar, aside, ctabox), `src/pages/**`, `data/site.json`, `data/pages/*.json`, `data/images.json`, `build.mjs`, `.github/workflows/pages.yml` · **geändert:** `package.json`, `scripts/prelaunch-check.mjs` · alle 34 HTML werden Build-Ausgabe (Inhalt unverändert im Null-Diff-Schritt) |
| C | `index.html` (Formular-JS/-Markup) bzw. dessen Template · `datenschutz.html` §5 · `assets/site.css` (Zwischenschritt) · 29 Seiten `.sp-facts` (Antwortfrist, über Partial) |
| D | Partials header/footer/drawer/breadcrumb · `assets/site.css` (Kontrast, Menü) · `assets/hero-mobile.webp` · **neu:** `leistungen/index.html`, `einsatzgebiet/index.html`, `offerte/index.html`, `ueber-uns/index.html`, `404.html` · `sitemap.xml` · JSON-LD aller Seiten |
| E | `umzug-*/index.html` (11), 12 Leistungs-/Grossauftragsseiten, `index.html`, 2 Ratgeber (Slogan), Seitendaten |
| F | **neu:** `assets/site.js` · alle Seiten (Script-Tag, `data-loc`, `data-service`, `data-city`, WhatsApp-`?text=`) · `datenschutz.html` §8/§9 |
| G | **neu:** 2–3 `umzug-<region>/index.html`, 1–2 `ratgeber/<slug>/index.html`, OG-Bilder |
| H | `robots.txt`, robots-Flag in `data/site.json`, `sitemap.xml` |
| Nicht im Repo | GitHub-Pages-Einstellung (HTTPS), DNS Hostpoint (Domains, GSC), CRM (Eingang, Schutz, Felder), GBP |

## 17. Risiken

| Risiko | Wahrscheinlichkeit | Gegenmassnahme |
|---|---|---|
| `content-v12` und neue Arbeit kollidieren in jeder Datei | hoch, wenn nicht zuerst entschieden | Phase 0 vor allem anderen |
| Generator verändert unbemerkt SEO-Ausgabe | mittel | Null-Diff-Commit, normalisierter Diff, Check-Script im CI |
| Umstellung auf Actions-Deploy lässt die Site kurz ausfallen | gering | Workflow erst auf Test-Branch, dann Pages-Quelle umstellen; altes Root-Deploy bleibt bis zum Erfolg |
| Interne Docs bleiben öffentlich | heute gegeben | Phase A sofort |
| Website-Leads landen im Marktplatz | mittel, sobald ein Endpoint gebaut wird | Integrationsvertrag, serverseitiges `distribution=none`, Test |
| Zu frühe Indexierung mit offenen Rechtspunkten | gering bei Gate-Disziplin | `10_PRELAUNCH_GATE.md`, `check:launch` |
| Ortsseiten veralten (Gebühren, Fristen) | hoch über Zeit | `reviewBy` je Seite, Gate warnt ab 270 Tagen |
| Zu viele Seiten zu schnell | mittel | Obergrenze 25 Ortsseiten, 3 pro Monat |
| KI-Bilder untergraben Vertrauen | mittel | personenlose Motive, echte Fotos priorisieren |
| Lokaler Klon veraltet → Arbeit auf altem Stand | gegeben | `git pull` in Phase A |

## 18. Rollback-Plan

- **Diese Reinit:** nur neue Dateien in `docs/reinit/` im lokalen Branch `reinit-docs`, nicht committet, nicht gepusht. Rückgängig: Ordner löschen bzw. `git worktree remove` + `git branch -D reinit-docs` im Klon. `main`, lokaler Klon und live bleiben unberührt.
- **Jede Umsetzungsphase:** eigener Branch + PR, ein Thema pro PR. Rückgängig per `git revert` des Merge-Commits; GitHub Pages ist nach ~10 Minuten zurück.
- **Generator (B):** Null-Diff-Commit ist der Ankerpunkt. Bis zum Wechsel der Pages-Quelle läuft die alte Root-Auslieferung weiter; Rückfall = Pages-Quelle zurück auf «Branch main / root».
- **Go-live (H):** separater PR nur mit Indexierungsschalter. Revert stellt `noindex` + `Disallow: /` wieder her; bei Bedarf GSC-Entfernungstool.
- **Datenschutz/Recht:** jede Änderung mit neuem «Stand»-Datum; alte Fassung bleibt in der Git-Historie.

---

## Anhang A — Bildstrategie (Skill `image`)

- **Rangfolge:** echtes Foto > personenloses Umgebungs-/Materialbild > KI-Bild mit Personen (immer «Symbolbild» sichtbar + im Alt-Text).
- **Nie** generierte Mitarbeitende, Fahrzeuge mit Beschriftung, Kundenaufträge oder Orte als Beleg darstellen. Für das Google-Profil ausschliesslich echte Fotos.
- **Ortsseiten:** Ort dominiert (70–85 % Umgebung: Altstadt, Strassenzug, typische Bebauung), 15–30 % Umzugsbezug (Kartons, Wagen ohne Marke). Kein ZÜGELKLAR-Branding im Bild, keine Werbe-Ästhetik. Heute teilen sich 11 Ortsseiten 4 Bilder — echte lokale Fotos sind ein Wave-2-Unterschied.
- **Leistungsseiten:** bis echte Fotos vorliegen personenlose Motive (leere Wohnung, Material, Werkzeug); keine Personen-Symbolbilder neben «eigenes Team».
- **Fallbeispiele:** nur echte Fotos mit Einwilligung, ohne Adresse/Gesichter Dritter.
- **Namen:** `<ort>-<motiv>.webp` bzw. `<leistung>-<motiv>.webp`, z. B. `baden-umzug.webp`, `mellingen-altstadt.webp`, `brugg-umzug.webp`, `umzugsreinigung-kueche.webp`. Kleinbuchstaben, ASCII (ue/oe/ae), Bindestriche.
- **Technik:** WebP, Hero 1600×1000 (16:10) + `srcset` 800/1200/1600, mobiler Hero als 16:10-Ausschnitt ~40 KB (heute 900×1599, 114 KB), Inhaltsbilder 1200×800, `width`/`height` immer, `loading="lazy"` ausser LCP, `fetchpriority="high"` für LCP.
- **Alt-Text:** beschreibt das Bild («Symbolbild: Umzugskartons vor einem Mehrfamilienhaus in Baden»), kein Keyword-Stapeln.
- **Daten:** `data/images.json` mit Pfad, Alt, `symbolbild: true/false`, Quelle (eigenes Foto / KI / Lizenz) → Quality Gate prüft das Label.

---

**Nächster Schritt:** Owner-Entscheide aus Phase 0. Erst danach Umsetzung, Phase für Phase mit eigener Freigabe.
