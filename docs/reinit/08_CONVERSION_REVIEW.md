# 08 — Conversion Review

**Stand:** 03.11.2026 · Grundlage: Audit E+H (lokal, nicht im Repo; Skills marketing-psychology, marketing-council, ab-testing, stop-slop), Live-Ansicht 390 px / 1280 px. Keine Dark Patterns.

Ränge: **P0** vor Indexierung · **P1** zum Launch · **P2** danach · **EXP** nur als Experiment · **REJECT**

## 1. Abgleich mit dem Firmen-Master (Haupt-Agent)

Audit E stufte Team-, Fahrzeug- und Packmaterial-Aussagen als «unbelegt / P0» ein. Laut Übergabe-Ordner hat der Owner am 05.09.2026 bestätigt: zwei Transportfahrzeuge, Packmaterial/Decken/Kartons, Aussendienst-Personal, Werkzeug für De-/Montage, Lager, ca. 10 Jahre Praxis des Gründers.
→ Die Aussagen sind **nicht erfunden**, aber **öffentlich nicht belegt**. Rang daher **P1** (nicht P0): mit echtem Foto belegen oder vorsichtiger formulieren. Absolute Formulierungen («Dieselben Leute», «keine wechselnden Aushilfen») bleiben zu entschärfen.

Antwortfrist: Owner-Entscheid 24.09.2026 «Antwort innert 24 Stunden an Werktagen» (CONFIRMED, Input-Checklist Z. 256). F3 (31.10.) hat sie auf der Startseite «überall entfernt», V11 hat sie auf 29 Unterseiten wieder eingeführt. → **Widerspruch, P0, Owner muss einen Stand wählen.**

## 2. Empfehlungen

| # | Empfehlung | Ort | Rang |
|---|---|---|---|
| C1 | Logo ohne «GmbH» (`content-v12`) entscheiden/mergen | alle Seiten | **P0** |
| C2 | Antwortfrist überall gleich oder überall weg | 29 Seiten `.sp-facts`, Startseite | **P0** (Owner) |
| C3 | Formular: nach Klick In-Page-Schritt «Fast fertig – in WhatsApp auf Senden tippen» + «Text kopieren» + «Stattdessen anrufen»; WhatsApp in neuem Tab. Heute gehen Desktop- und mailto-Anfragen still verloren. | `index.html` Formular-JS | **P0** |
| C4 | Datenschutz §5 Packmer-Formulierung (siehe 07) | `datenschutz.html` | **P0** |
| C5 | Team-/Fahrzeug-Claims mit Foto belegen oder abschwächen; keine Personen-Symbolbilder neben Team-Claims | Startseite Hero/Über uns, `/umzugsreinigung/` Hero | P1 |
| C6 | Ein CTA-Wort: «Offerte anfragen» (Mobile-Leiste: «Offerte»); «Anfrage stellen» ersetzen | 30 Seiten `.ctabox` | P1 |
| C7 | Hero: max. 2 Buttons, Telefon als Textlink; Abnahmegarantie als eigener Bullet | Startseite | P1 |
| C8 | CTA-Hierarchie: Mobile WhatsApp → Anruf → Formular; Desktop Formular → Telefon → WhatsApp | Formular/Hero | P1 |
| C9 | Seitenspezifische WhatsApp-Vorbefüllung (185 nackte Links) + `?leistung=` Vorauswahl | alle Seiten | P1 |
| C10 | Kurzformular (Leistung, Von, Nach, Termin, Name, Telefon, Hinweis) + «Mehr Angaben» aufklappbar | Formular | P1 |
| C11 | Grossaufträge: CTA «Erstgespräch vereinbaren», B2B-Variante (Organisation, Objektart, Zeitrahmen, Rückruf), eigene Sticky-Karte | 4 Seiten | P1 |
| C12 | Slogan «Wir machen Unmögliches möglich.» nur im Footer; raus aus H2 (`museum-kunst`), Leads (`grossauftraege`, `villen-anwesen`, `firmenumzug`) und 2 Ratgebern | 6 Seiten | P1 |
| C13 | «Was den Preis bestimmt» ohne Zahlen + «Festpreis vor Ihrer Zusage» | Leistungsseiten | P1 |
| C14 | Ortsseiten: Kontext-CTA «Halteverbot in {Ort} mit organisieren lassen» | 11 Ortsseiten | P1 |
| C15 | Fehlerzustand mit Feldmarkierung, `aria-invalid`, Fokus | Formular | P1 |
| C16 | Einwilligungstext präzisieren (WhatsApp/Meta erwähnen), AGB nicht als Checkbox — Rechtsprüfung | Formular | P1 |
| C17 | Gründer mit Name und echtem Foto (nach Zustimmung) | `/ueber-uns/` | P1 |
| C18 | «Das brauchen wir für die Offerte»-Liste bei der CTA-Box | Leistungsseiten | P2 |
| C19 | Offerten-Muster (ohne Preise) als Transparenzbeleg | Leistungsseiten | P2 |
| C20 | Museum/Kunst erst aktiv bewerben mit Fachpartner oder erstem Auftrag | Nav/Startseite | P2 (Owner) |
| C21 | Typografie: « – » statt «—» (Startseite 24×, AGB 8×) | Startseite, AGB | P2 |
| X1 | Bewertungs-Widgets, Zähler, «Top-bewertet», Countdown/Knappheit, vorausgewählte Marketing-Einwilligung | — | **REJECT** |
| X2 | Preisrechner mit geschätzten Preisen | — | **REJECT** |
| X3 | Exit-Intent-Popup | — | **REJECT** |
| X4 | Chatbot | — | **REJECT** (WhatsApp deckt den Bedarf) |

## 3. Positionierung (Marketing-Council, eine Runde, beratend)

- **Hauptversprechen:** «Umzug bis Schlüsselübergabe, Reinigung mit Abnahmegarantie, ein Ansprechpartner» — steht schon in der H1. Das ist das einzige prüfbare Unterscheidungsmerkmal.
- **Abgrenzung** (ohne Wettbewerber zu nennen), gebündelt unter dem Hero: (a) Umzug und Reinigung inkl. Garantie in einem Auftrag, (b) schriftlicher Umfang inkl. «Was nicht enthalten ist», (c) Fotos per WhatsApp statt Pflichtbesichtigung bei kleineren Aufträgen, (d) Halteverbot-Gesuch wird organisiert.
- **Slogan:** Uneinigkeit im Rat (Wiedererkennung vs. Vertrauen beim Erstkontakt). Kompromiss: Signatur im Footer, nicht im Fliesstext.
- **Grossaufträge:** im Menü lassen, auf der Startseite **unter** Leistungen und Abnahmegarantie einordnen, ehrlich formuliert («Für grössere Projekte planen wir mit Besichtigung und schriftlichem Ablaufplan»).
- **Tripwire:** Bleiben Markensuchen und Direktanfragen nach Launch aus, liegt das Problem bei der Auffindbarkeit (GBP, Fahrzeug, Präsenz), nicht beim Text.

## 4. Experiment-Backlog (erst bei genug Traffic)

Annahme Basis-Conversion 2–4 %. Bei 3 % und 20 % relativem Uplift braucht ein Test ~14 000 Sessions pro Variante; bei 50 % ~2 500. Realistisch im ersten Jahr: einige hundert bis wenige tausend Sessions/Monat → **klassische A/B-Tests frühestens nach 6–12 Monaten**, nur für grosse Änderungen. Bis dahin: Best Practice ausliefern, Versionen vorher/nachher vergleichen, Herkunft über WhatsApp-Vortext und Attribution (07). Primärmetrik immer *qualifizierte Anfrage*.

| ID | Hypothese | Metrik | Mindestumfang |
|---|---|---|---|
| EXP-1 | «Fotos senden, Offerte erhalten» schlägt «Offerte anfragen» (kleinerer erster Schritt) | Anfragen/Session | ~6 500/Variante bei MDE 30 % |
| EXP-2 | Kurzformular (6 sichtbare Felder) erhöht Absendequote ≥ 25 % ohne Qualitätsverlust | Absendequote der Formular-Sichter | ~1 200–2 000 Sichter/Variante |
| EXP-3 | Telefon als Primär-CTA auf Mobile bringt mehr qualifizierte Kontakte | qualifizierte Kontakte | ~5 000/Variante, Anruf-Tracking nötig |
| EXP-4 | Abnahmegarantie-Block direkt unter dem Hero erhöht Anfragen | Anfragen/Session | wie EXP-1 |
| EXP-5 | Kontext-CTA «Halteverbot mit organisieren» auf Ortsseiten schlägt generische CTA-Box | Anfragen/Ortsseiten-Session (gepoolt) | ~5 000/Variante bei MDE 40 % |

Regeln: eine Variable, Stichprobe vorab festgelegt, kein vorzeitiges Stoppen, min. 2 volle Wochen inkl. Monatsende.

## 5. Textqualität (stop-slop) — Kurzfassung

Gesamturteil gut: konkret, 0× «ß», 0× «professionell/zuverlässig/kompetent», «nicht X, sondern Y» nur 1×.
Score: Startseite **30/50 → überarbeiten**, Grossaufträge **31/50 → überarbeiten**, Orts- und Leistungsseiten **39/50 → ok**.

Wichtigste Funde (alle 40 mit Vorschlag in Audit E §6.2):
- Startseite: «Kein Startup. Nur eine neue Firma.», «Vier Haltepunkte, keine Überraschungen.», «Kurz erklärt. Klar beantwortet.», «Vor dem Umzug schon alles im Griff.», «Sie telefonieren nicht mit vier Firmen» («vier» ohne Grundlage), «10+ Jahre» 3× wiederholt.
- Ortsseiten: Lead-Formel «Von unserer Basis in Mellingen aus plant ZÜGELKLAR Umzüge in, aus und innerhalb von {Ort} …» auf 4–6 Seiten.
- Formeln: «Je …, desto …» 8× auf 6 Seiten; «Daraus entsteht ein …» 5×; «sorgfältig geplant» als Füllwort.
- Rechtsseiten: nur Typografie, keine inhaltlichen Änderungen.

## 6. Distributions-Backlog (später, nicht jetzt)

Voraussetzung: echte Fotos, Kundeneinwilligung, keine erfundenen Fälle.
GBP-Beiträge aus den verifizierten Ortsdaten («Halteverbot in Baden beantragen») · GBP-Fotos (Fahrzeug, Material, Gründer, Vorher/Nachher) · Instagram/Facebook-Karussells aus Ratgebern (Wohnungsabgabe, Checkliste) · Reels (echter Umzugstag im Zeitraffer, Abnahmegarantie in 20 s, «Welche Fotos für die Offerte?») · Fallstudie → Website → GBP → Reel → LinkedIn · E-Mail nur mit Einwilligung (Halteverbotsfrist-Erinnerung, Abgabe-Checkliste, Bewertungslink) · Liegenschaftsverwaltungen Raum Baden/Mellingen mit 1-Seiter zur Abnahmegarantie · WhatsApp-Business-Katalog ohne Preise. Keine Vermischung mit Packmer.
