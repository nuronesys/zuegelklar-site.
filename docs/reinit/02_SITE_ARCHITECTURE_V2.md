# 02 — Site-Architektur V2

**Stand:** 03.11.2026 · Grundlage: Audit C+D (lokal, nicht im Repo), Audit B, Reality Check.
Status: **Vorschlag**, nicht umgesetzt.

## 1. Entscheid: flache URLs behalten, echte Hubs ergänzen

Die vorgeschlagene Struktur `/leistungen/<service>/` und `/regionen/<ort>/` wurde geprüft und **nicht** übernommen.

| Argument | Gewicht |
|---|---|
| Slugs entsprechen schon der Suchanfrage (`/umzug-baden/` ≈ «Umzug Baden») | hoch |
| GitHub Pages kann keine 301-Weiterleitung. Umzug = 23 Dauer-Stubs mit Meta-Refresh | hoch |
| Kein Build-Schritt, relative Pfade in jeder Datei → 23 Dateien neu verlinken, hohes Fehlerrisiko | hoch |
| Hierarchie entsteht aus Breadcrumbs und internen Links, nicht aus der Pfadtiefe | mittel |
| Später gewählter Generator übernimmt flache URLs 1:1 | mittel |

Das Anliegen des Owners (klare Bereiche Leistungen/Region, Über uns, Offerte) wird durch **neue Hub-Seiten** erfüllt. Die sichtbare Hierarchie lautet trotzdem: *Startseite › Leistungen › Umzugsreinigung*.

Falls der Owner verschachtelte URLs will: **vor** dem Go-live umsetzen (Redirect-Map in Audit C §2.4).

## 2. Ziel-Struktur

```
/                                  Startseite (besitzt «Umzugsfirma Aargau»)
├── leistungen/                    NEU  Hub: alle 12 Leistungen
│   ├── umzug/                     (Pfad bleibt /umzug/)  → Titel neu «Privatumzug im Aargau …»
│   ├── umzugsreinigung/           tiefste Seite zur Abnahmegarantie
│   ├── raeumung-entsorgung/
│   ├── montage/
│   ├── international/             Label überall «Umzug ins Ausland»
│   ├── kleinumzug/ · seniorenumzug/ · klaviertransport/
│   └── grossauftraege/            Unter-Hub
│       └── villen-anwesen/ · museum-kunst/ · firmenumzug/
├── einsatzgebiet/                 NEU  Hub: Orte nach Region + Tabelle «Halteverbot & Sperrgut nach Gemeinde»
│   └── umzug-<ort>/  (11 heute; Pfade bleiben flach)
├── ratgeber/  + 6 Artikel
├── offerte/                       NEU  Formularseite (Vorauswahl ?leistung=&ort=, canonical /offerte/)
├── ueber-uns/                     NEU  Entity-Seite mit verifiziertem Faktenblock
├── kontakt/                       NEU (P2) NAP-Seite
├── 404.html                       NEU
├── agb.html · datenschutz.html · impressum.html   (bleiben .html)
└── [nicht jetzt] faq/ · referenzen/ · Service×Ort-Seiten · llms.txt
```

In Klammern: Die Pfade auf der Festplatte bleiben flach (`/umzugsreinigung/`); nur Breadcrumb und Navigation ordnen sie unter «Leistungen».

**Abgelehnt / verschoben**

| Seite | Entscheid | Grund |
|---|---|---|
| `/faq/` | Reject | 114 seitenspezifische, einzigartige FAQs — ein Hub würde duplizieren. FAQ-Rich-Results gibt es seit 2023 nur für Behörden/Gesundheit. |
| `/referenzen/` | erst ab ≥ 3 echten, freigegebenen Aufträgen | Keine Fälle vorhanden, nichts erfinden. |
| `/regionen/` statt `/einsatzgebiet/` | Reject | «Einsatzgebiet» ist schon Begriff der Site und ehrlich («keine Filialen»). |
| Rechtsseiten als Ordner | Reject | Keine Landingpages; 33 Footer + AGB-Querverweise. |

## 3. Navigation

- **Header (identisch auf allen Seiten, auch Startseite):** Logo · Umzug · Reinigung · Räumung · Grossaufträge · Leistungen · Einsatzgebiet · Ratgeber · **[Offerte anfragen]**. Startseite verwendet Seiten-URLs statt Anker (heute nur Anker).
- **Footer (eine Variante):** Leistungen (alle 12) · Einsatzgebiet (alle Orte + Hub) · Ratgeber (Hub + Umzugskosten, Wohnungsabgabe, Halteverbot) · Unternehmen (Über uns, Kontakt, Offerte) · Rechtliches. Heute fehlen im Startseiten-Footer alle Ortsseiten und `/kleinumzug/`.
- Ein Label pro Ziel (z. B. nur «Umzug ins Ausland», nicht zusätzlich «Umzug in Europa»).

## 4. Breadcrumbs

Heute: «Leistungen» und «Einsatzgebiet» sind unverlinkter Text; JSON-LD weicht auf 30 Seiten vom sichtbaren Pfad ab; Ratgeber-Artikel ohne Ebene «Ratgeber».

| Seitentyp | Pfad (sichtbar = JSON-LD) |
|---|---|
| Leistung | Startseite › Leistungen › X |
| Grossauftrag | Startseite › Leistungen › Grossaufträge › X |
| Ort | Startseite › Einsatzgebiet › Umzug X |
| Ratgeber | Startseite › Ratgeber › X |

Alle Zwischenebenen verlinkt. Ratgeber-Ebene kann sofort ergänzt werden (keine neue Seite nötig).

## 5. Interne Verlinkung

1. **Hub → Spoke:** `/leistungen/` verlinkt alle 12 Leistungen; `/einsatzgebiet/` alle Orte, gruppiert (Baden/Reusstal · Brugg/Aarau/Lenzburg · Freiamt · Limmattal/Zürich · Zentralschweiz).
2. **Ort ↔ Ort:** Block «Umzüge in der Nähe», 2–4 echte Nachbarn (Tabelle Audit C §4.2). Heute: Zug 0, Mellingen/Brugg/Lenzburg/Aarau/Zürich je 1.
3. **Ort → Leistung:** jede Ortsseite → 3 Kernleistungen + 1 passende Spezialleistung + Ratgeber Halteverbot.
4. **Leistung → Ort:** jede Leistungsseite → Einsatzgebiet-Hub + 3–5 Ortsseiten.
5. **Ratgeber → Geld-Seite:** ≥ 2 Kontextlinks + CTA `/offerte/`; Geld-Seite → 1–2 passende Artikel.
6. **Anker:** beschreibend («Mehr zur Umzugsreinigung»), nicht «Mehr erfahren» (13×, auch WCAG 2.4.4). Exakter Match max. 1× pro Ziel und Seite.
7. **CTA-Ziel:** heute 179 Links auf `/#offerte` ohne Kontext → künftig `/offerte/?leistung=<slug>&ort=<slug>`. `/#offerte` bleibt funktionsfähig.
8. Schwach verlinkt heute: `/seniorenumzug/`, `/klaviertransport/`, Brugg, Dietikon, Zug (je 1 Kontextlink).

## 6. Kannibalisierung (zu beheben)

| Konflikt | Lösung |
|---|---|
| `/` vs `/umzug/` auf «Umzugsfirma Aargau» | Startseite besitzt den Begriff; `/umzug/` → «Privatumzug im Aargau – Umzug & Zügeln mit Montage \| ZÜGELKLAR» |
| Startseite `#garantie` ≈ so ausführlich wie `/umzugsreinigung/` | `/umzugsreinigung/` wird die tiefste Seite; Startseite fasst zusammen und verlinkt |
| Abnahmegarantie in 3 Formulierungen | Eine wörtliche Definition (40–60 Wörter) aus AGB Teil B, überall gleich |
| `/grossauftraege/` vs `/firmenumzug/` | Hub verwendet «Firmenumzug» nicht in Title/H1 |

## 7. Suchintention

Vollständige Intent-Map mit 28 Clustern: Audit C (lokal, nicht im Repo) §3. Kern:

| Cluster | Ziel-URL | Primäre Anfrage | CTA |
|---|---|---|---|
| Marke/Region | `/` | Umzugsfirma Aargau | Offerte / WhatsApp |
| Privatumzug | `/umzug/` | Privatumzug Aargau, zügeln Aargau | Offerte (Privatumzug) |
| Ort ×11 | `/umzug-<ort>/` | Umzug Baden, Zügelfirma Baden | Offerte (Ort) + Telefon |
| Endreinigung | `/umzugsreinigung/` | Umzugsreinigung mit Abnahmegarantie | Offerte (Reinigung) |
| Räumung | `/raeumung-entsorgung/` | Wohnungsräumung Aargau, **Entrümpelung** | Offerte (Räumung) |
| Firmen | `/firmenumzug/` | Firmenumzug Aargau, Büroumzug | Erstgespräch |
| Senioren | `/seniorenumzug/` | Seniorenumzug, Umzug ins Altersheim | Anruf |
| Kosten | `/ratgeber/umzugskosten/` | Was kostet ein Umzug | Offerte |
| Offerte | `/offerte/` | Umzug Offerte, Umzugsofferte | Formular |

Fehlendes Schweizer Vokabular: «Zügelfirma» und «Entrümpelung» kommen **0×** vor, «Endreinigung» selten → natürlich in Titel/Intros ergänzen (P2). Suchvolumen sind Schätzungen; nach Launch mit GSC prüfen.

## 8. Ratgeber-Backlog (nach Geschäftswert)

1. Abnahmegarantie: was sie abdeckt – und was nicht → `/umzugsreinigung/`
2. Umzugsofferte vergleichen: Festpreis oder Stundenansatz → `/offerte/`
3. Wohnungsräumung und Entrümpelung im Aargau → `/raeumung-entsorgung/`
4. Umzug ins Alters- oder Pflegeheim: Checkliste für Angehörige → `/seniorenumzug/`
5. Möbellift oder Treppenhaus? (ohne eigenen Lift zu behaupten) → `/umzug/`
6. Halteverbot im Aargau: Gemeinden im Vergleich (= Tabelle im Einsatzgebiet-Hub) → Ortsseiten
7. Ummelden: Gemeinde, eUmzugCH, Post, Serafe → `/umzug/`

Weitere 7 Ideen: Audit C §5. Alle ohne Preise, mit amtlichen Quellen und «Stand».
