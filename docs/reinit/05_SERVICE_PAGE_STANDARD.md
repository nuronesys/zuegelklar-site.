# 05 — Standard für Leistungsseiten

**Stand:** 03.11.2026 · Grundlage: Struktur der 12 Leistungsseiten (je ~800 Wörter), Audits C und E.

Eine Leistungsseite beantwortet die Kauffragen. Sie beschreibt Umfang, Grenzen, Ablauf und den Weg zur Offerte — konkret, ohne Superlative. **Keine fremden Texte, keine Wettbewerberpreise, keine eigenen Preise vor der Pricing-Phase.**

## 1. Pflicht-Blöcke

| # | Block | Inhalt | Heute |
|---|---|---|---|
| 1 | H1 + Antwort-Absatz | 40–60 Wörter: was, für wen, wo, wie zur Offerte. Nennt Leistung, Region und ZÜGELKLAR (zitierfähig, s. 06) | vorhanden, teils Füllwörter |
| 2 | Was enthalten ist | Liste der Leistungen im Standardumfang | ✓ |
| 3 | Was nicht enthalten ist | ehrliche Ausschlüsse (z. B. Küchen, Elektro-/Gas-/Wasseranschlüsse bei Montage) | ✓ bei Reinigung, Montage; fehlt bei Umzug, International |
| 4 | Was den Preis bestimmt | 4–5 Treiber (Zimmer, Stockwerk/Lift, Trageweg, Distanz, Zusatzleistungen) + «Festpreis oder Stundenpreis, schriftlich vor Ihrer Zusage» + Link `/ratgeber/umzugskosten/`. **Keine Zahlen.** | teilweise (`/umzug/`) |
| 5 | Ablauf | nummerierte Schritte (V11-Layout): Anfrage → Besichtigung/Fotos → schriftliche Offerte → Ausführung → Abgabe | ✓ |
| 6 | Das brauchen wir für die Offerte | kurze Liste, identisch mit der WhatsApp-Vorbefüllung | fehlt |
| 7 | Kombination | Verweis auf passende Leistungen (Umzug + Reinigung + Räumung) | ✓ |
| 8 | Einsatzgebiet | Link Hub + 3–5 Ortsseiten | 1 zufälliger Ortslink |
| 9 | FAQ | 3–6 echte Kauffragen; sichtbar = Schema | ✓ |
| 10 | Ratgeber | 1–2 passende Artikel | teilweise |
| 11 | CTA | «Offerte anfragen» → `/offerte/?leistung=<slug>`; seitenspezifische WhatsApp-Vorbefüllung | generisch «Anfrage stellen» |
| 12 | Technik/Schema | Breadcrumb Startseite › Leistungen › X; `Service` mit `provider` → `#organization`, `areaServed` Aargau; FAQPage | Service fehlt |

## 2. Beispiel Umzugsreinigung (Pflichtinhalt)

| Thema | Quelle / Regel |
|---|---|
| Was gereinigt wird | Umfang aus der Offerte (Räume, Küche, Bad, Fenster, Storen, Einbauschränke …) |
| Was nicht enthalten ist | bestehende Liste «Was die Abnahmegarantie nicht umfasst» beibehalten |
| Preislogik | Pauschale nach Objekt und Aufwand; Treiber: Zimmerzahl, Fenster/Storen, Zustand, Zusatzflächen. Keine Zahl. |
| Abnahmegarantie | **eine** wörtliche Definition (40–60 Wörter) aus AGB Teil B, identisch auf Startseite, FAQ und Ratgeber |
| Nachbesserung | kostenlos bei berechtigten Beanstandungen der Verwaltung, im vereinbarten Umfang. **Keine Frist nennen**, bis ein internes SLA feststeht (03_CLAIMS_AUDIT) |
| Abgabe | Abgabe innert 3 Arbeitstagen nach Reinigung (AGB B7) |
| Kombination | Umzug und Reinigung beim selben Team: ein Termin, eine Ansprechperson |
| Grenze | «Eine Garantie, dass die Verwaltung die Wohnung abnimmt, kann niemand geben.» (ehrlich, beibehalten) |

`/umzugsreinigung/` wird die **tiefste** Seite zur Abnahmegarantie. Die Startseite (`#garantie`) fasst nur zusammen und verlinkt (behebt Kannibalisierung).

## 3. Leistungsspezifische Regeln

| Seite | Regel |
|---|---|
| `/umzug/` | Title neu «Privatumzug im Aargau …» (Startseite besitzt «Umzugsfirma Aargau»). Ausschlüsse ergänzen. «Zügeln» natürlich einbauen. |
| `/raeumung-entsorgung/` | «Entrümpelung» und «Wohnungsräumung» ergänzen. Keine Recycling-Quoten. «fachgerecht» statt «nachhaltig». |
| `/montage/` | Ausschlüsse Küche/Elektro/Gas/Wasser beibehalten. |
| `/international/` | Label einheitlich «Umzug ins Ausland». Zoll nur als «besprechen wir vor der Offerte», nicht als Zollservice. |
| `/klaviertransport/` | Nur behaupten, was in Eigenleistung möglich ist; sonst «Fachpartner nach Absprache». |
| Grossaufträge (Villen, Museum/Kunst, Firmen) | CTA «Erstgespräch vereinbaren», B2B-Formularvariante (Organisation, Objektart, Zeitrahmen, Rückruf). Keine Klimafahrzeuge, Kunstversicherung, Zertifikate, Referenzen behaupten. Slogan nicht im Fliesstext/H2. |
| `/seniorenumzug/` | Telefon als Haupt-CTA. Ruhiger Ton. |

## 4. Textregeln (stop-slop)

- Konkret statt Füllwort: «Vor dem Umzugstag klären wir Zugänge, Stockwerke, Lift und Tragewege» statt «Damit der Tag ruhig verläuft».
- Keine Formeln: «X statt Y», «nicht X, sondern Y», «Je …, desto …» (heute 8× auf 6 Seiten), «Daraus entsteht ein …».
- Keine Absolutversprechen («jederzeit», «zu jedem Zeitpunkt», «keine Überraschungen»).
- Sie-Form, «ss», Halbgeviertstrich mit Leerzeichen « – ».
- Vollständige Funde mit Umformulierungen: Audit E (lokal, nicht im Repo) §6.2.
