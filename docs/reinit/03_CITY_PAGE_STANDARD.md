# 03 — Standard für Ortsseiten

**Stand:** 03.11.2026 · Grundlage: Audit B (lokal, nicht im Repo) und Audit C.

## 1. Befund heute (11 Ortsseiten, verifiziert per Script)

- **Keine Doorway-Seiten.** 743–961 Wörter Haupttext pro Seite, 76–91 % davon auf keiner anderen Ortsseite. Höchste Überschneidung: Dietikon–Zug 10.3 % (Jaccard, 5-Wort-Shingles, Ortsname ersetzt). Kein Paar über 40 %.
- Titles, Descriptions, H1 und alle FAQ einzigartig. 5–10 amtliche Quellen pro Seite mit «Stand».
- 8 lokale Fakten gegen die Quellen geprüft (Baden, Wettingen, Zürich ×2, Zug, Mellingen ×2, eUmzug): **alle stimmen**. Wettingen nennt «10 Arbeitstage», die Tarif-PDF «eine Woche» — die Seite nutzt die strengere Frist.
- Brugg und Aarau sind nicht mehr «dünn» (je ~950 Wörter, 10 bzw. 8 Quellen). Vermerk in `docs/seo-rebuild/09_F3_CHANGELOG.md:56` ist überholt.

**Lücken (P1):**
1. Wettingen, Brugg, Lenzburg, Aarau, Bremgarten sagen im Text nicht ausdrücklich, dass der Ort von Mellingen aus bedient wird und keine Filiale ist.
2. Wenig Ort-zu-Ort-Links: Zug 0; Mellingen, Brugg, Lenzburg, Aarau, Zürich je 1.
3. Breadcrumb nennt «Einsatzgebiet», die Seite existiert nicht; JSON-LD hat nur 2 Ebenen.
4. Schema nur BreadcrumbList + FAQPage; kein `Service`/`areaServed` mit Bezug auf die Firma.
5. Zweiter Lead-Satz ist Vorlagentext auf Baden, Bremgarten, Dietikon (ähnlich Wohlen, Zug) — im wichtigsten Textblock.
6. Zug: unbelegter Satz zum Ausländeranteil — ohne Bezug zum Umzug, kann als Herkunfts-Targeting gelesen werden → **entfernen**.
7. Wikipedia als Quelle (Wohlen, Bremgarten, Dietikon, Zug) → durch Gemeinde/BFS ersetzen.

## 2. Pflicht-Blöcke jeder Ortsseite

| # | Block | Anforderung | Gate |
|---|---|---|---|
| 1 | H1 | einzigartig, enthält Ort, nicht nur «sorgfältig geplant» | BLOCK |
| 2 | Intro (`p.lead`) | beginnt mit dem lokalen Hauptthema (Altstadt-Zufahrt, Hanglage, Seetal …), **kein** Satz identisch mit anderer Ortsseite | BLOCK |
| 3 | Einsatzgebiet-Satz | z. B. «ZÜGELKLAR hat keinen Standort in Brugg; wir fahren für jeden Auftrag von Mellingen aus.» (Wortlaut variieren). Ausnahme: Mellingen | BLOCK |
| 4 | Lokaler Kontext | Wohnformen, Quartiere, typische Umzüge (z. B. Studierende Brugg/Windisch) | BLOCK |
| 5 | Zufahrt / Halteverbot / Parkierung | Amt, Frist, Gebühr, Link — oder ehrlich «veröffentlicht keine Regelung» | BLOCK |
| 6 | Gebäude / Wohnsituation | Treppenhaus, Lift, Altbau, Hanglage | WARN |
| 7 | Nachbarorte | echte Nachbarn namentlich (ohne eigene Seite) | WARN |
| 8 | Lokale Abläufe | Anmeldung (eUmzugCH, Frist), Sperrgut, Werkhof/Ökihof | WARN |
| 9 | Leistungsmodul | kompakt verlinkt: Umzug · Umzugsreinigung · Räumung · Montage + 1 passende Spezialleistung | BLOCK |
| 10 | Besichtigung | vor Ort, per Video oder Fotos per WhatsApp | WARN |
| 11 | Lokale FAQ | ≥ 3, davon ≥ 2 mit Ortsbezug; sichtbar = Schema | BLOCK |
| 12 | «Umzüge in der Nähe» | 2–4 Links zu Nachbar-Ortsseiten (Tabelle `02` §5) | BLOCK |
| 13 | Ratgeber-Link | mind. Halteverbot | WARN |
| 14 | CTA | `/offerte/?leistung=privatumzug&ort=<slug>` + Kontext-CTA «Halteverbot in {Ort} mit organisieren lassen» | BLOCK |
| 15 | Quellen + «Stand» | ≥ 3 amtliche Quellen (Wikipedia zählt nicht), Datum ≤ 270 Tage | BLOCK |
| 16 | Breadcrumb | Startseite › Einsatzgebiet › Umzug {Ort}, sichtbar = JSON-LD, Zwischenebenen verlinkt | BLOCK |
| 17 | Technik | canonical selbstreferenzierend absolut, Title 35–60, Description 110–160, OG-Bild, robots gemäss Launch-Flag | BLOCK |
| 18 | Schema | `BreadcrumbList`, `FAQPage`, `Service` mit `provider: {"@id":"https://zuegelklar.ch/#organization"}` und `areaServed: City`. **Verboten:** `LocalBusiness`, `MovingCompany`, fremde `PostalAddress`, `AggregateRating`, `Review` | BLOCK |
| 19 | Bild | Ort dominiert (70–85 % Umgebung); KI-Bild mit «Symbolbild» im Label und Alt-Text | BLOCK bei fehlendem Label |

## 3. Verboten

Erfundene Filialen, Büros, lokale Adressen, Aufträge, Bewertungen, Zahlen, Zertifikate. Seiten, die sich nur im Ortsnamen unterscheiden. Ortsseiten ohne verifizierten lokalen Datensatz.

## 4. Neue Ortsseite — Freigabeprozess (manuell)

1. Verifizierter lokaler Datensatz (≥ 3 amtliche Quellen: Halteverbot, Anmeldung, Entsorgung).
2. Owner-Freigabe; idealerweise echter Auftrag oder dokumentierte Anfrage aus dem Ort.
3. Quality Gate (`04`) grün.
4. ≥ 2 eingehende Links von bestehenden Ortsseiten + Hub.
5. Max. **3 neue Ortsseiten pro Monat**, harte Obergrenze **ca. 25 Ortsseiten**.

## 5. Wartung

Viele Fakten sind zeitgebunden (z. B. Zürich Festtage-Frist 17.12.2026, läuft Januar 2027 ab; «Entsorgungskalender 2026» Baden). Jede Seite bekommt ein `reviewBy`-Datum in den Seitendaten; das Gate warnt ab 270 Tagen, blockiert ab 400. Vor Launch zusätzlich prüfen: Gebühren Wohlen, Bremgarten, Brugg, Lenzburg, Aarau, Dietikon, Zug (Audit B §3, Liste «nicht verifiziert»).
