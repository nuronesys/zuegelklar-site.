# 09 — F3 Changelog (31.10.2026)

Build `V10.1-2026-10-31`. Grundlage: Aktionsplan im Claude-Projekt «zugel klar» (`03-aktionsplan.md`), Phase 1 + 2.
Die Seite bleibt auf `noindex` und `Disallow: /`. Go-live erst nach Phase 4 (Rechtliches nach HR-Eintrag).

## Phase 1 — Reparaturen Startseite

- **Formular funktioniert jetzt ohne Server:** Die Angaben werden als WhatsApp-Nachricht (Hauptweg) oder E-Mail vorbereitet. Gesendet wird erst, wenn die Kundin selbst sendet. Das Formular täuscht keinen Versand vor.
  - Felder: «Bitte wählen» als Leerwert, Montage ergänzt, neues Feld «Stockwerk & Lift», E-Mail optional, Pflichtfelder mit `*` markiert, AGB-Hinweis.
  - Der Datei-Upload entfällt; Fotos werden im WhatsApp-Chat angehängt (der Upload hatte keinen Endpoint).
- **WhatsApp** in Topbar, Hero, Menü, Kontakt, Footer und Mobile-Leiste (`wa.me/41799333111`).
- **Claims:**
  - «10+ Jahre» → «Erfahrung des Gründers»
  - «2 eigene Umzugsfahrzeuge» entfernt bzw. neutral formuliert
  - «ohne versteckte Kosten» entfernt
  - «Antwort innert 24 Stunden» überall entfernt
  - Hero-Alt-Text als Symbolbild gekennzeichnet
- **SEO:**
  - Title «Umzugsfirma Aargau & Zürich: Umzug, Reinigung | ZÜGELKLAR»
  - Meta-Description neu (148 Zeichen)
  - Eyebrow mit Ort
  - H2 der Leistungen keyword-tragend
  - LocalBusiness-Schema (MovingCompany) aktiviert, ohne legalName und E-Mail
- **FAQ** um Halteverbot, Umzugskartons, Montage-Ausschlüsse und Zahlung erweitert; FAQPage-Schema synchron.
- **Barrierefreiheit:** `<main>`, Skip-Link, «Symbolbild» 11 px, Footer-Überschriften h3 statt h4, Silbentrennung «Schlüssel­übergabe», eigene Anker je Leistung.
- **Mobile:** Topbar läuft nicht mehr über (Inline-Style hat `display:none` überschrieben); Hero-Text vor dem Bild.
- **Schriften selbst gehostet** (`assets/fonts/`, SIL OFL). Keine Verbindung mehr zu Google Fonts. Instrument Serif gestrichen.

## Rechtsseiten (Wortlaut, keine neuen Rechtsdaten)

- «Zügelklar Umzug GmbH in Gründung» in Impressum, Datenschutz, AGB A1 und Footer.
- Datenschutz §5 beschreibt das neue Formular, nennt Packmer als CRM bzw. Vermittlungsplattform und hat einen neuen Abschnitt WhatsApp.
- Datenschutz §7: Hinweis auf Google Fonts ersetzt; §11 nennt WhatsApp/Meta.
- AGB A13/B13: Lücke 48 h–3 Tage geschlossen («weniger als 3 Kalendertage»).
- Stand aller Rechtsseiten: 31. Oktober 2026.

## Phase 2 — Neue Seiten

- 5 Leistungsseiten: `/umzug/`, `/umzugsreinigung/`, `/raeumung-entsorgung/`, `/montage/`, `/international/`
- 7 Ortsseiten: `/umzug-mellingen/`, `/umzug-baden/`, `/umzug-wettingen/`, `/umzug-brugg/`, `/umzug-lenzburg/`, `/umzug-aarau/`, `/umzug-zuerich/`
- Jede Seite hat eigenen Text, 3 FAQ, BreadcrumbList- und FAQPage-Schema, Kontakt-CTAs und `noindex` (wie die ganze Site).
- Gemeinsames Stylesheet `assets/site.css`. Die Startseite verlinkt die Seiten aus Leistungskarten, Einsatzgebiet und Footer.
- `sitemap.xml`: 16 URLs.
- `scripts/prelaunch-check.mjs` löst relative Pfade jetzt pro Datei auf (nötig für Unterordner).

## Offen (siehe Aktionsplan)

- Phase 0 (Owner): Postfach info@ anlegen, WhatsApp auf 079 933 31 11 bestätigen, Google Business Profile, Versicherung.
- Phase 3: Preise, Sprachen, echte Fotos, Formular direkt ins Packmer-CRM.
- Phase 4: HR-Daten, Logo ohne «GmbH»-Konflikt, Rechtsprüfung, Go-live-Schalter.

## Nachtrag 31.10.2026 — Lokale Inhalte und Ratgeber

- **Ortsseiten** mit verifizierten Lokalinfos erweitert: Halteverbot/Parkierung, Ummeldung (eUmzugCH, 14 Tage), Sperrgut/Entsorgung. Jede Seite hat eine Quellenliste mit Stand Oktober 2026 und «ohne Gewähr».
  - Gut belegt: Zürich, Lenzburg, Baden, Wettingen.
  - Dünn: Brugg, Aarau (Gemeindeseiten waren für Robots gesperrt) — manuell ergänzen.
- **Ratgeber** neu: `/ratgeber/` (Übersicht) plus `umzugscheckliste`, `wohnungsabgabe`, `halteverbot-umzug`, `umzugskosten` (ohne Preise), mit Quellen (OR, ch.ch, ag.ch, Mieterverband, Post, Serafe).
- Navigation und Footer mit Ratgeber; FAQ der Startseite verlinkt die Ratgeber. Sitemap: 21 URLs.
