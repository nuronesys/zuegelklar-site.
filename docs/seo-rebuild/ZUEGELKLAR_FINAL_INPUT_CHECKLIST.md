# ZUEGELKLAR — FINAL INPUT CHECKLIST

**Erstellt:** 24.09.2026 · **Aktualisiert:** 25.09.2026 (Runden 1–4 abgeschlossen **und umgesetzt**) · **Build:** `V10.0-2026-09-25`
**Quellen:** `index.html`, `impressum.html`, `datenschutz.html`, `agb.html`, `assets/`, `robots.txt`, `sitemap.xml`, `CNAME`, `LAUNCH-CHECKLIST.md`
**Methode:** reine Extraktion aus den Dateien. HTML-Kommentare werden getrennt ausgewiesen. **Kein Wert wurde erfunden.**

Status-Werte: `CONFIRMED` · `PRESENT_BUT_NEEDS_CONFIRMATION` · `MISSING` · `CONFLICT` · `NOT_YET_APPLICABLE`

---

## DECISION LOG — Runde 1 (24.09.2026, vom Owner bestätigt)

| # | Punkt | Entscheid |
|---|---|---|
| 1 | Telefon | `079 933 31 11` · E.164 `+41799333111` · `href="tel:+41799333111"` — **bestätigt** |
| 2 | Handelsregister | noch **in Gründung**, kein Eintrag |
| 3 | Zielfirma | `Zügelklar Umzug GmbH` — **erst nach dem Eintrag** veröffentlichen |
| 4 | Rechtsform im Impressum | **Weg A**: keine Rechtsform nennen. „Einzelunternehmen“ wird **vollständig gestrichen** |
| 5 | UID / CHE | existiert nicht — **keine Nummer veröffentlichen** |
| 6 | MWST | nicht entschieden — **keine Nummer veröffentlichen** |
| 7 | Vertretungsberechtigte Person | **kein Name, keine Funktion** bis zur Bestätigung der Registrierungsdaten |
| 8 | Logo mit „GmbH“ | bleibt vorläufig — **P1, legal review required before public indexing**. Ausdrücklich keine rechtliche Freigabe |

**Freigegebener Wortlaut für `impressum.html` §3** (noch nicht eingebaut):

> Die Gesellschaft befindet sich in Gründung. Die definitive Firmenbezeichnung, Rechtsform
> und Handelsregisterangaben werden nach erfolgtem Eintrag ergänzt.

**Korrektur zu einer früheren Aussage:** Weg A beseitigt den Widerspruch **im Text**, nicht
auf der Seite als Ganzes. Solange das Logo „GmbH“ trägt und keine Gesellschaft eingetragen
ist, bleibt ein Widerspruch bestehen. Er ist als P1 erfasst und vor dem Entfernen von
`noindex` zu klären.


---

## DECISION LOG — Runde 2 (24.09.2026, vom Owner bestätigt)

| # | Punkt | Entscheid |
|---|---|---|
| 9 | Öffnungszeiten | `Montag–Freitag: 08:00–18:00 Uhr`. Samstag ist **keine** offizielle Öffnungszeit und kommt **nicht** ins LocalBusiness-Schema |
| 10 | Reaktionszeit | **Weg B** — auf Werktage begrenzt. Kein absolutes 24-h-Versprechen inkl. Wochenende und Feiertagen |
| 11 | Team-Claim | **Weg B** — absolutes Negativ gestrichen. Kein Claim, der zusätzliche Hilfe im Bedarfsfall ausschliesst |
| 12 | Offerte | Das Wort „kostenlos" wird **vorerst nicht** als Claim geführt. Stattdessen „unverbindlich" |
| 13 | Ein-/Auspacken | Gehört zum Leistungsumfang, aber als **Zusatzleistung** — nicht als automatisch enthalten darstellen |
| 14 | Preise | **Keine `ab CHF`-Angaben.** Nur Preisbasis-Wording. Eigene Pricing-Phase folgt |

### Freigegebener Wortlaut Runde 2 (noch nicht eingebaut)

| Stelle | Neuer Wortlaut |
|---|---|
| Öffnungszeiten | **Montag–Freitag 08:00–18:00 Uhr** · Samstag **nicht** als Öffnungszeit | **Owner-Entscheid 24.09.2026** | CONFIRMED | Einbauen + ins Schema (nur Mo–Fr) |
| Samstag (optional, später im FAQ) | `Anfragen können auch am Samstag eingehen und werden je nach Dringlichkeit zurückgerufen.` |
| Reaktionszeit, kurz | `Antwort innert 24 Stunden an Werktagen` |
| Reaktionszeit, im Fliesstext | `Wir melden uns an Werktagen innerhalb von 24 Stunden – in der Regel deutlich schneller.` |
| Team | `Ein eingespieltes Team` — bei Bedarf `Ein eingespieltes Team mit klarer Einsatzleitung` |
| Offerte, Kicker | `Offerte anfragen` |
| Offerte, CTA | `Unverbindliche Offerte anfragen` |
| Ein-/Auspacken | `Ein- und Auspackservice auf Wunsch` bzw. `Auf Wunsch übernehmen wir auch das fachgerechte Ein- und Auspacken.` |
| Preiszeile 1 — Privatumzug | `Festpreis oder Stundenpreis` |
| Preiszeile 2 — Umzugsreinigung | `Pauschale nach Objekt und Aufwand` |
| Preiszeile 3 — Räumung | `Nach Aufwand` |
| Preiszeile 4 — Montage | `Individuell nach Leistungsumfang` |

### Regel zur Preisgestaltung — verbindlich

**Wettbewerber-Benchmarks dürfen unter keinen Umständen auf die Website übernommen oder als
Grundlage für ZÜGELKLAR-Preise verwendet werden.** Die Preise werden in einer eigenen Phase
aus den tatsächlichen Kosten abgeleitet: Stundenansatz Mitarbeitende, Fahrzeugansatz,
Anfahrt, Mindestdauer, Reinigung pro Objekt und Zimmer, Entsorgung, Montage, Packservice,
Zuschläge.

> **Erledigt am 25.09.2026:** Die Benchmark-Zahlen wurden aus `02_DATA_REQUIRED.md` und
> `05_PRELAUNCH_BLOCKERS.md` entfernt. Künftige Benchmarks gehören in eine separate
> Research-Datei und fliessen nicht in die Preisbildung ein.

---

## DECISION LOG — Runde 3 (25.09.2026, vom Owner bestätigt)

| # | Punkt | Entscheid |
|---|---|---|
| 0 | Wettbewerber-Preise | Aus `02_DATA_REQUIRED.md` und `05_PRELAUNCH_BLOCKERS.md` **entfernt** (erledigt). Benchmarks kommen künftig ausschliesslich in eine separate Research-Datei und **nie** in die Preisbildung |
| 15 | CRM | **Zielsystem: Packmer CRM.** Hosting und Produktions-Endpoint **NOT YET CONFIRMED**. Formular wird an **keinen** Endpoint gehängt — nur Contract und Payload vorbereiten |
| 16 | info@zuegelklar.ch | bleibt **PRESENT_BUT_NEEDS_CONFIRMATION** und **P0**. Nicht als bestätigt werten, nur weil die Adresse auf der Seite steht |
| 17 | Haftpflichtversicherung | **NOT YET CONFIRMED.** Kein Versicherer, keine Deckungssumme, keine Versicherungs-Claims veröffentlichen |
| 18 | Profile | **Google Business Profile → TO CREATE / VERIFY.** Instagram und Facebook optional, nicht launchrelevant. **Kein `sameAs` im Schema**, solange keine echten Profile existieren |
| 19 | Foto-Upload | max. 10 Dateien · max. 8 MB je Datei · max. 40 MB gesamt · JPEG, PNG, WebP · HEIC/HEIF **nur wenn das Backend es tatsächlich unterstützt** |
| 20 | Echte Fotos | **Minimum vor dem Entfernen von `noindex`:** echtes Teamfoto + echtes Fahrzeugfoto. Foto des Inhabers nur, wenn der Owner öffentlich auftreten will. Übrige Symbolbilder schrittweise danach |

### Verbindliche Regeln aus Runde 3

**CRM.** In `datenschutz.html` §5 darf **kein** Anbieter und **kein** Hostingstandort genannt
werden, solange beides unbestätigt ist. Die Formulierung bleibt allgemein: Anfragen werden in
einem CRM-System zur Bearbeitung von Anfragen, Offerten und Aufträgen verarbeitet. Kein
erfundener Subprozessor, kein erfundener Standort.

**Formular.** Kein Platzhalter-Endpoint, keine Attrappe. Es wird ausschliesslich der
Payload-Contract aus `04_FORM_INTEGRATION_SPEC.md` vorbereitet.

**Versicherung.** Diese Formulierungen sind bis zur vorliegenden Police untersagt:
`versichert bis CHF …` · `vollumfänglich versichert` · `Transportversicherung inklusive`.

**Upload.** Client-seitige Limits allein genügen nicht. Dieselben Grenzen müssen später
server-seitig durchgesetzt werden. HEIC/HEIF wird **nicht** akzeptiert, nur weil `<input>` es
entgegennimmt — erst wenn das Backend die Umwandlung beherrscht.

---

## DECISION LOG — Runde 4 (25.09.2026, vom Owner bestätigt)

**Leitentscheid:** Alle noch offenen operativen und rechtlichen Daten werden **auf die
Launch-Phase in rund zwei Wochen verschoben**. Sie dürfen die technische Fertigstellung der
Website **nicht** blockieren. Die Website wird jetzt vollständig `technisch fertig` und
`launch-ready` gemacht, bleibt aber **nicht indexiert**.

| # | Punkt | Entscheid |
|---|---|---|
| 21 | `info@zuegelklar.ch` | **NOT YET CONFIRMED.** Aktivierung vor dem Launch erwartet und technisch einfach. **Kein Entwicklungs-Blocker** — nur Launch-Blocker |
| 22 | Echte Fotos | **verschoben.** Die bestehenden Symbolbilder bleiben vorläufig und bleiben als „Symbolbild" gekennzeichnet |
| 23 | Name / Foto des Inhabers | **verschoben.** „Der Gründer" bleibt namenlos |
| 24 | Rechtsprüfung Impressum / Datenschutz / AGB | **verschoben auf die Zeit unmittelbar vor dem Launch** |
| 25 | Google Business Profile | **verschoben auf die Zeit unmittelbar vor dem Launch** |
| 26 | Handelsregister / UID / MWST | **verschoben**, abhängig vom Fortschritt der Gründung |
| 27 | Indexierung | `noindex,nofollow` und `Disallow: /` **bleiben bestehen** bis zum ausdrücklichen Launch-Befehl |

### Verbindliche Regeln aus Runde 4

**Indexierung.** Diese zwei Schalter dürfen **nicht** angefasst werden, in keinem Commit
dieser Phase:

- `<meta name="robots" content="noindex,nofollow" />` auf allen vier Seiten
- `Disallow: /` in `robots.txt`

Erst ein ausdrücklicher Launch-Befehl des Owners hebt sie auf. `npm run check:launch` ist
dafür der Schalterprüfer, **nicht** `check:site`.

**Unbestätigte Rechtsdaten.** Verschieben heisst nicht veröffentlichen. Alle Verbote aus
Runde 1–3 gelten unverändert weiter: kein Firmenname, keine Rechtsform, keine UID, keine
MWST-Nummer, kein Name der vertretungsberechtigten Person, kein Versicherer, keine
Deckungssumme, kein CRM-Anbieter, kein `sameAs`.

**Phasentrennung.** Ab hier gilt die Trennung zwischen **Fertigstellung** und **Launch**:
Die Website darf vollständig fertig sein, ohne dass ein einziges unbestätigtes Datum
veröffentlicht wird. Was ohne Owner-Daten nicht gebaut werden kann, wird als
`IMPLEMENT BEFORE LAUNCH` geführt und nicht improvisiert.

**Phase.** COLLECT & CONSOLIDATE ist hiermit **abgeschlossen**. Nächste Phase:
**FINAL IMPLEMENTATION PREPARATION** — siehe `07_FINAL_IMPLEMENTATION_PLAN.md`.

---

## UMSETZUNGSSTAND — 25.09.2026

Die Entscheidungen der Runden 1–4 sind auf dem Branch `seo-rebuild-v1` umgesetzt
(`IMPLEMENT NOW`, N-1 bis N-13). Details in `08_F2_CHANGELOG.md`.

| Entscheid | Umgesetzt? |
|---|---|
| 1 Telefon | **ja** — 13 Stellen, 7 `tel:`-Links |
| 4 Impressum Weg A | **ja** — „Einzelunternehmen" 0 Treffer im Projekt |
| 5/6/7 UID, MWST, vertretungsberechtigte Person | **ja** — nichts veröffentlicht |
| 9 Öffnungszeiten | **ja** — Mo–Fr 08:00–18:00, kein Samstag |
| 10 Reaktionszeit | **ja** — 4 Stellen inkl. JSON-LD |
| 11 Team-Claim | **ja** — 2 Stellen |
| 12 Offerte-Wording | **ja** — Kicker + Submit-Button |
| 13 Ein-/Auspackservice | **ja** — als Zusatzleistung |
| 14 Keine Preisangaben | **ja** — `ab CHF` 0 Treffer |
| 15 CRM / kein Endpoint | **ja** — Payload-Contract vorbereitet, nichts angebunden |
| 17 Versicherung | **ja** — keine Aussage, verbotene Zeichenketten 0 Treffer |
| 18 Kein `sameAs` | **ja** — 0 Treffer |
| 19 Upload-Limits | **ja** — client-seitig, im Browser getestet. Server-seitig offen (L-6) |
| 27 Indexierung blockiert | **ja** — `noindex` 4/4, `Disallow: /` steht |
| 3, 8, 16, 20, 21–26 | **bewusst offen** — Launch-Phase, siehe `07_FINAL_IMPLEMENTATION_PLAN.md` Teil 4 |

**Guard nach der Umsetzung:** `npm run check:site` → **0 Blocker, 0 Warnungen.**

---

## A. Identität & Rechtsform

| Field | Current value | Source/file | Status | Action needed |
|---|---|---|---|---|
| displayName | `ZÜGELKLAR` | überall (Logo, Title, OG, Footer, AGB, Impressum) | CONFIRMED | — |
| legalName (Zielname) | `Zügelklar Umzug GmbH` | **Owner-Bestätigung 24.09.2026** | PRESENT_BUT_NEEDS_CONFIRMATION | Erst nach HR-Eintrag veröffentlichen — heute **nicht** auf der Seite nennen |
| legalForm | **entfällt bis zum HR-Eintrag** — Ziel ist GmbH, **nie** „Einzelunternehmen“ | **Owner-Entscheid 24.09.2026 (Weg A)** | CONFIRMED | Zeile aus `impressum.html` §1 entfernen |
| „GmbH“ im Logo | `ZÜGELKLAR Umzug GmbH` (Bildschrift) | `assets/logo.webp`, `assets/logo-white.png` | **CONFLICT — bleibt offen** | **P1 — legal review required before public indexing.** Vom Owner bewusst vorläufig belassen; ausdrücklich **keine** rechtliche Freigabe |
| Gründungsstatus | **in Gründung** | **Owner-Bestätigung 24.09.2026** | CONFIRMED | — |
| Handelsregister | **noch nicht eingetragen** — Verfahren läuft beim Treuhänder | **Owner-Bestätigung 24.09.2026** | CONFIRMED (Status) / MISSING (Daten) | HR-Amt + Eintragsdatum nach Abschluss nachtragen |
| UID / CHE | **existiert noch nicht** | **Owner-Bestätigung 24.09.2026** | MISSING | **Keine Nummer veröffentlichen.** Nach HR-Eintrag nachtragen |
| MWST-Status | **nicht entschieden** | **Owner-Bestätigung 24.09.2026** | MISSING | **Keine Nummer veröffentlichen.** Treuhänder entscheidet |
| Inhaber / vertretungsberechtigte Person | **bewusst nicht veröffentlicht**, bis die Registrierungsdaten bestätigt sind | **Owner-Entscheid 24.09.2026** | CONFIRMED (Entscheid) | Kein Name, keine Funktion auf der Seite |
| Gründer-Bezeichnung auf der Website | `Der Gründer` (namenlos) | `index.html`, Abschnitt „Über uns" | PRESENT_BUT_NEEDS_CONFIRMATION | Echten Namen einsetzen? |

---

## B. Adresse & Kontakt

| Field | Current value | Source/file | Status | Action needed |
|---|---|---|---|---|
| street | `Obere Bahnhofstrasse 24` | Footer · Impressum §1 · Datenschutz §1 · AGB A1 + B1 | CONFIRMED | — |
| postalCode | `5507` | dito | CONFIRMED | — |
| city | `Mellingen` | dito + Einsatzgebiet-Chip „Mellingen · Basis" | CONFIRMED | — |
| canton | `Aargau` | Title, Hero-Eyebrow, Einsatzgebiet | CONFIRMED | — |
| country | `Schweiz` | Impressum §1, Datenschutz §1, AGB A1 | CONFIRMED | — |
| email | `info@zuegelklar.ch` | 4× index · 2× impressum · 2× datenschutz · 2 `mailto:` | **PRESENT_BUT_NEEDS_CONFIRMATION** | **P0** — Mailbox existiert / empfängt / wird abgerufen? |
| **phoneDisplay** | **`079 933 31 11`** | **Owner-Bestätigung 24.09.2026** | **CONFIRMED** | 13 Platzhalter ersetzen |
| **phoneE164** | **`+41799333111`** | Owner-Bestätigung 24.09.2026 | **CONFIRMED** | `href="tel:+41799333111"` (6×) + Schema `telephone` |
| website | `https://zuegelklar.ch/` | canonical, OG, CNAME, Impressum §1 | CONFIRMED | — |
| Öffnungszeiten | *nirgends genannt* | — | MISSING | Für Schema, GBP und Besucher |
| Social-Profile | **keine** | keine externen Links ausser `schema.org` | NOT_YET_APPLICABLE | **Google Business Profile: TO CREATE / VERIFY.** Kein `sameAs` ohne echte Profile |

### Telefon-Fundstellen im Detail

| Datei | Anzahl | Art |
|---|---|---|
| `index.html` | 11 sichtbar | Topbar · Hero-Button · Mobile-Drawer · Offerte-Abschnitt · Footer · Mobile-Aktionsleiste — davon **6× als `href="tel:[TELEFON]"`** |
| `impressum.html` | 1 | §2 Kontakt |
| `datenschutz.html` | 1 | §1 Verantwortliche Stelle |
| `agb.html` | 0 | — |

### E-Mail-Fundstellen

| Datei | Anzahl | Art |
|---|---|---|
| `index.html` | 4 | Topbar (`mailto:`) · Footer (`mailto:`) · 2× Text |
| `impressum.html` | 2 | §2 (`mailto:`) · §7-Verweis |
| `datenschutz.html` | 2 | §1 (`mailto:`) |
| `agb.html` | 0 | verweist auf die Datenschutzerklärung |

---

## C. Leistungen, Einsatzgebiet, Preise

| Field | Current value | Source/file | Status | Action needed |
|---|---|---|---|---|
| Services (Karten) | Privatumzug · Umzugsreinigung *(Tag: Mit Abnahmegarantie)* · Räumung & Entsorgung · Demontage & Montage | `index.html` Leistungen | CONFIRMED | — |
| Weitere genannte Leistungen | Ein-/Auspacken als **Zusatzleistung** · Internationale Umzüge · Besichtigung | **Owner-Entscheid 24.09.2026** | CONFIRMED | Wortlaut: `Ein- und Auspackservice auf Wunsch` |
| Nicht angeboten | Firmenumzug, Lagerung, Möbellift | kommen nirgends vor | CONFIRMED | — |
| Einsatzgebiet | Mellingen (Basis) · Baden · Aarau · Brugg · Zürich · Winterthur · Zug · Luzern · „Übrige Schweiz auf Anfrage" · „Europa auf Anfrage" | `index.html` Einsatzgebiet | CONFIRMED | — |
| Filial-Disclaimer | „Wir unterhalten keine Filialen an diesen Orten — es sind Einsatzgebiete…" | dito | CONFIRMED | beibehalten |
| Preiszeilen (Wording) | **neu:** `Festpreis oder Stundenpreis` · `Pauschale nach Objekt und Aufwand` · `Nach Aufwand` · `Individuell nach Leistungsumfang` | **Owner-Entscheid 24.09.2026** | CONFIRMED | 2 von 4 Zeilen anpassen |
| **Preiswerte** | **bewusst keine** `ab CHF`-Angaben | **Owner-Entscheid 24.09.2026** | NOT_YET_APPLICABLE | Eigene Pricing-Phase. **Keine Benchmarks übernehmen** |
| Preis-Claim | „kostenlos" **nicht** als Claim. Kicker → `Offerte anfragen`, CTA → `Unverbindliche Offerte anfragen` | **Owner-Entscheid 24.09.2026** | CONFIRMED | Conflict C-2 gelöst; später verschärfbar |

---

## D. Claims

| Field | Current value | Source/file | Status | Action needed |
|---|---|---|---|---|
| Erfahrung | `10+ Jahre Branchenerfahrung` | Hero-Proof-Karte · Trust-Strip · Über uns | PRESENT_BUT_NEEDS_CONFIRMATION | Belegbar? Immer auf Personen beziehen |
| Fahrzeuge | `2 · Eigene Umzugsfahrzeuge` / `Zwei Fahrzeuge — Eigener Fuhrpark, eigenes Packmaterial` | Trust-Strip · Über uns | PRESENT_BUT_NEEDS_CONFIRMATION | Fotos als Beleg |
| Team | `Eigenes Team` | Proof-Karte · Trust-Strip · Über uns · Garantie-Band | PRESENT_BUT_NEEDS_CONFIRMATION | — |
| **Aushilfen** | absolutes Negativ **gestrichen** → `Ein eingespieltes Team` | **Owner-Entscheid 24.09.2026 (Weg B)** | CONFIRMED | 2 Stellen anpassen: Proof-Karte · Über uns |
| **Reaktionszeit** | → `Antwort innert 24 Stunden an Werktagen` | **Owner-Entscheid 24.09.2026 (Weg B)** | CONFIRMED | 3 Stellen anpassen: Hero · Offerte · FAQ |
| Ansprechpartner | `1 · Fester Ansprechpartner` | Trust-Strip · Über uns · Europa | CONFIRMED | — |
| Reichweite | `CH · Schweizweit im Einsatz` | Trust-Strip · Title · Topbar · FAQ | PRESENT_BUT_NEEDS_CONFIRMATION | durch Filial-Disclaimer entschärft |
| Europa | `Europa auf Anfrage` | Topbar · Europa-Abschnitt · FAQ | CONFIRMED | — |
| Unverbindlichkeit | `Die Anfrage ist unverbindlich` | Offerte-Abschnitt | CONFIRMED | deckt sich mit AGB A2 |
| Entsorgung | `fachgerechte Entsorgung` (keine Öko-Claims) | Leistungskarte · FAQ | CONFIRMED | so belassen |
| Positionierung | `Kein Startup. Nur eine neue Firma.` | Über uns | CONFIRMED | ehrlich formuliert |
| **Versicherung** | **keine Angabe** — bewusst | **Owner-Entscheid 25.09.2026** | NOT_YET_APPLICABLE | Keine Versicherungs-Claims bis zur Police |

---

## E. Abnahmegarantie — Wortlaut

| Ort | Wortlaut | Status |
|---|---|---|
| Leistungskarte | „Endreinigung inklusive kostenloser Nachbesserung bei berechtigten Beanstandungen — im vereinbarten Leistungsumfang." | CONFIRMED |
| Dunkles Band, H2 | „Die Wohnungsabgabe ist der Moment, der zählt." | CONFIRMED |
| Dunkles Band, Lead | „Bei gebuchter Umzugsreinigung bessern wir berechtigte Beanstandungen der Verwaltung kostenlos nach — im vereinbarten Leistungsumfang. **Sie zahlen keine zweite Reinigung.**" | PRESENT_BUT_NEEDS_CONFIRMATION |
| Punkte 01–04 | Kostenlose Nachreinigung · Klar definierter Umfang · Abgabe innert 3 Arbeitstagen · Reinigung und Umzug kombiniert | CONFIRMED |
| FAQ | nennt zusätzlich die Ausschlüsse | CONFIRMED |
| AGB B7 / B8 | vollständige Definition + Ausschlussliste | CONFIRMED |

**Konsistenz:** geprüft über alle 6 Fundstellen — **kein Widerspruch**. Nirgends „garantiert akzeptiert", „Geld zurück" oder eine Abnahmezusage der Verwaltung.
**Offen:** keine Frist für die Nachbesserung selbst (AGB B9: nur „angemessene Gelegenheit").

---

## F. Rechtsseiten & Verlinkung

| Field | Current value | Source/file | Status | Action needed |
|---|---|---|---|---|
| Impressum | `impressum.html` — 7 Abschnitte | lokal vorhanden, **nicht auf `main`** | PRESENT_BUT_NEEDS_CONFIRMATION | Rechtsprüfung + Firmendaten |
| Datenschutzerklärung | `datenschutz.html` — 16 Abschnitte | dito | PRESENT_BUT_NEEDS_CONFIRMATION | Rechtsprüfung + CRM |
| AGB | `agb.html` — Teil A (19 §§) + Teil B (16 §§) | dito | PRESENT_BUT_NEEDS_CONFIRMATION | Rechtsprüfung |
| Footer-Links | `agb.html` · `datenschutz.html` · `impressum.html` | `index.html` Footer | CONFIRMED | — |
| Consent-Link | `datenschutz.html` | Formular-Checkbox | CONFIRMED | — |
| Verbleibende `href="#"` | **0** | — | CONFIRMED | — |
| Kontaktangaben im Impressum | E-Mail ✓ · Adresse ✓ · Telefon `[TELEFON]` | `impressum.html` §1+§2 | MISSING (Telefon) | — |

---

## G. Datenschutz — genannte Empfänger & Prozessoren

| Field | Current value | Source/file | Status | Action needed |
|---|---|---|---|---|
| Hosting | `GitHub Pages (GitHub, Inc., USA)` | §7 | CONFIRMED | — |
| Domain & E-Mail | `Hostpoint AG (Rapperswil-Jona, Schweiz)` | §7 | CONFIRMED | — |
| Schriftarten | `Google Fonts (Google Ireland Limited)` — IP-Übermittlung genannt | §7 | CONFIRMED | Self-Hosting würde das streichen |
| **CRM-Anbieter** | Zielsystem **Packmer CRM** · Hosting/Endpoint **NOT YET CONFIRMED** | **Owner-Entscheid 25.09.2026** | PRESENT_BUT_NEEDS_CONFIRMATION | In §5 **keinen** Anbieter/Standort nennen, bis bestätigt |
| Empfängerkategorien | Hosting/IT/E-Mail/CRM · Treuhand & Buchhaltung · Versicherungen & Berater · Behörden · Unterauftragnehmer | §10 | CONFIRMED | — |
| Auslandtransfer | USA (GitHub, Google) + EWR genannt | §11 | CONFIRMED | nach CRM-Entscheid prüfen |
| Cookies | „setzt derzeit **keine** Analyse- oder Marketing-Cookies ein" | §8 | CONFIRMED | stimmt mit dem Code überein |
| Analytics / Ads | „Derzeit sind **keine** Analyse- oder Werbedienste aktiv" | §9 | CONFIRMED | dito |
| Aufbewahrung | 10 Jahre für Geschäftsbücher | §12 | CONFIRMED | — |

---

## H. Formular

| Field | Current value | Source/file | Status | Action needed |
|---|---|---|---|---|
| Felder (11) | Leistung *(select, 5)* · Von · Nach · Wunschtermin · Zimmer *(select, 4)* · Name · Telefon · E-Mail · Fotos *(file, multiple)* · Nachricht · Consent *(checkbox)* | `index.html` `#offerForm` | CONFIRMED | — |
| `name`-Attribute | **0 von 11** | dito | MISSING | technisch, kein Owner-Entscheid |
| `required` | **0 von 11** | `<form novalidate>` | MISSING | dito |
| Consent verpflichtend | nein | dito | MISSING | dito |
| Endpoint / `action` | **keiner** — bewusst kein Platzhalter-Endpoint | **Owner-Entscheid 25.09.2026** | NOT_YET_APPLICABLE | Nur Payload-Contract vorbereiten |
| Spam-Schutz | keiner | dito | MISSING | technisch |
| Erfolgs-/Fehlerzustand | keiner — nur Hinweistext „Vorschau" | dito | MISSING | technisch |
| Upload-Limits | **10 Dateien · 8 MB je Datei · 40 MB gesamt · JPEG/PNG/WebP** (HEIC nur bei Backend-Support) | **Owner-Entscheid 25.09.2026** | CONFIRMED | Client **und** Server durchsetzen |
| UTM-Erfassung | keine | dito | MISSING | technisch |
| Labels | 11 von 11 korrekt verknüpft | dito | CONFIRMED | — |

---

## I. SEO / Schema / Metadaten

| Field | Current value | Source/file | Status | Action needed |
|---|---|---|---|---|
| Title | `Umzugsfirma Aargau & schweizweit \| ZÜGELKLAR` (48 Z.) | `index.html` | CONFIRMED | — |
| Meta Description | „Privatumzug, Umzugsreinigung mit Abnahmegarantie, Räumung & Entsorgung – schweizweit…" (163 Z.) | dito | CONFIRMED | — |
| Canonical | `https://zuegelklar.ch/` (+ je Rechtsseite) | alle 4 Seiten | CONFIRMED | — |
| `og:title` / `og:description` / `og:image` / `og:url` / `og:site_name` / `og:locale` | gesetzt, `og:locale = de_CH` | `index.html` | CONFIRMED | — |
| `twitter:card` | `summary_large_image` | dito | CONFIRMED | — |
| Aktives Schema | **FAQPage** (5 Fragen) | dito | CONFIRMED | — |
| **LocalBusiness / MovingCompany** | **auskommentiert** — Felder vorbereitet: `name`, `legalName`, `url`, `logo`, `image`, `telephone`, `email`, `address` (street/postalCode/locality/region/country), `areaServed`, `openingHoursSpecification` (dayOfWeek/opens/closes), `priceRange`, `knowsLanguage` | `index.html`, Dateiende | **NOT_YET_APPLICABLE** | Braucht legalName, Telefon, Öffnungszeiten, priceRange |
| robots-Meta | `noindex,nofollow` auf allen 4 Seiten | alle | CONFIRMED (gewollt) | Go-live-Schalter |
| `robots.txt` | `Disallow: /` + Sitemap-Zeile | `robots.txt` | CONFIRMED (gewollt) | dito |
| `sitemap.xml` | 1 URL, gültiges XML | `sitemap.xml` | CONFIRMED | Rechtsseiten ergänzen beim Launch |
| CNAME | `zuegelklar.ch` | `CNAME` | CONFIRMED | — |
| Domain-Altlasten | keine (`github.io`, `www.`, `http://` nicht im Markup) | — | CONFIRMED | — |

---

## J. Footer-Firmendaten (`index.html`)

| Feld | Wert | Status |
|---|---|---|
| Beschreibung | „Umzug, Reinigung, Räumung & Entsorgung. Schweizweit unterwegs, Europa auf Anfrage." | CONFIRMED |
| Spalte Leistungen | Privatumzug · Umzugsreinigung · Räumung & Entsorgung · Umzug in Europa | CONFIRMED |
| Spalte Unternehmen | Über uns · Einsatzgebiet · Besichtigung · Ablauf · Häufige Fragen · Offerte anfragen | CONFIRMED |
| Spalte Kontakt | `[TELEFON]` · `info@zuegelklar.ch` · Obere Bahnhofstrasse 24, 5507 Mellingen | MISSING (Telefon) |
| Copyright | `© 2026 ZÜGELKLAR` — **ohne Rechtsform** | CONFIRMED |
| Rechtslinks | AGB · Datenschutz · Impressum | CONFIRMED |

---

## K. Google Business Profile — später benötigt

| Field | Verfügbar? | Status |
|---|---|---|
| Geschäftsname | ZÜGELKLAR | CONFIRMED |
| Kategorie | nicht festgelegt (Vorschlag: „Umzugsunternehmen") | MISSING |
| Adresse | Obere Bahnhofstrasse 24, 5507 Mellingen | CONFIRMED |
| Profiltyp (Ladenlokal / Servicegebiet / hybrid) | nicht entschieden | — | MISSING | Bei der GBP-Erstellung festlegen |
| Telefon | 079 933 31 11 | CONFIRMED |
| Website | https://zuegelklar.ch/ | CONFIRMED |
| Öffnungszeiten | Mo–Fr 08:00–18:00 | CONFIRMED |
| Servicegebiete | 8 Orte + „übrige Schweiz" | CONFIRMED |
| Leistungen | 4 Hauptleistungen | CONFIRMED |
| Beschreibung | ableitbar aus der Meta Description | PRESENT_BUT_NEEDS_CONFIRMATION |
| Logo / Cover / echte Fotos | nur Symbolbilder vorhanden | MISSING |
| Bewertungsprozess | nicht vorhanden | MISSING |

---

## L. Platzhalter & provisorische Werte — vollständige Liste

### Sichtbar für Besucher

| Wert | Anzahl | Dateien |
|---|---|---|
| `[TELEFON]` | 13 | `index.html` (11) · `impressum.html` (1) · `datenschutz.html` (1) |

### Nur in HTML-Kommentaren (nicht sichtbar)

| Wert | Datei |
|---|---|
| `[[FOTO-01]]`, `[[FOTO-02]]`, `[NAME DES INHABERS]`, `ab CHF ___`, `[TELEFON]` | `index.html`, Platzhalter-Legende am Dateiende |
| `[LEGALER FIRMENNAME…]`, `[TELEFON IM FORMAT +41…]`, `[STRASSE NR]`, `[PLZ]`, `[ORT]`, `[KANTON]`, `[07:00]`, `[18:00]`, `[CHF]` | `index.html`, auskommentiertes LocalBusiness-Schema |

### In F1 bereits entfernt

`ab CHF ___` (4×) · `CHE-xxx.xxx.xxx` · `[Firma gemäss Handelsregister]` · `[Name und Funktion gemäss Handelsregister]` · `[STANDORT]` (3×) · `[E-MAIL]` (7×) · `[ADRESSE]` (3×) · `[[FOTO-01]]` / `[[FOTO-02]]`-Boxen

### Provisorische Inhalte

| Element | Status |
|---|---|
| 6 Symbolbilder mit Personen (sichtbar als „Symbolbild" markiert) | provisorisch — P1 |
| „Der Gründer" statt Name | provisorisch |
| Formular-Hinweis „Vorschau — das Formular wird vor dem definitiven Livegang aktiviert." | provisorisch |
| `assets/packing.webp`, `assets/handover.webp`, `assets/favicon-16.png` ungenutzt (163 KB) | Entscheid offen |

---

# DECISIONS REQUIRED FROM OWNER

### Runde 1 — erledigt am 24.09.2026

~~1. Geschäftstelefonnummer~~ → `079 933 31 11` / `+41799333111`
~~2. Rechtlicher Firmenname~~ → Ziel `Zügelklar Umzug GmbH`, erst nach HR-Eintrag
~~3. Handelsregister eingetragen?~~ → nein, in Gründung
~~4. Einzelunternehmen oder GmbH?~~ → Weg A: keine Rechtsform nennen
~~5. UID~~ → existiert nicht
~~6. MWST~~ → nicht entschieden
~~7. Vertretungsberechtigte Person~~ → nicht veröffentlichen
~~8. Name des Gründers auf der Startseite~~ → bleibt „Der Gründer“

### Runde 4 — erledigt am 25.09.2026

~~1. Ist `info@zuegelklar.ch` eingerichtet und wird es abgerufen?~~ → `NOT YET CONFIRMED`, Aktivierung vor dem Launch erwartet. Kein Entwicklungs-Blocker
~~2. Wann entstehen echte Team- und Fahrzeugfotos?~~ → verschoben, Symbolbilder bleiben vorläufig
~~3. Soll der Inhaber persönlich auftreten?~~ → verschoben
~~4. Wer organisiert die Schweizer Rechtsprüfung?~~ → verschoben auf unmittelbar vor dem Launch
~~5. Wer legt das Google Business Profile an?~~ → verschoben auf unmittelbar vor dem Launch
~~6. Termin beim Treuhänder?~~ → verschoben, abhängig vom Gründungsfortschritt

### Keine offenen Entscheidungsfragen mehr

Alle Entscheidungen der Runden 1–4 sind gefällt. Die verbleibenden Punkte sind **keine
Fragen an den Owner**, sondern **terminierte Aufgaben vor dem Launch**. Sie sind in
`07_FINAL_IMPLEMENTATION_PLAN.md` unter `IMPLEMENT BEFORE LAUNCH` geführt.

---

# CONFLICTS TO RESOLVE

**C-1 — Rechtsform**
`assets/logo.webp` und `assets/logo-white.png` zeigen „ZÜGELKLAR **Umzug GmbH**"
`impressum.html` §1 sagt „**Einzelunternehmen in Gründung**"
→ **TEILWEISE GELÖST (24.09.2026).** Der Text wird bereinigt: „Einzelunternehmen“ entfällt,
§3 erhält den freigegebenen Wortlaut. **Der Widerspruch bleibt aber bestehen**, solange das
Logo „GmbH“ trägt und keine Gesellschaft eingetragen ist. Erfasst als **P1 — legal review
required before public indexing**.

**C-2 — Kostenlose Offerte**
`index.html`, Offerte-Abschnitt, Kicker: „**Kostenlose Offerte**"
dieselbe Seite, alle Buttons: „**Offerte anfragen**" / „Anfrage senden"
→ **GELÖST (24.09.2026).** „kostenlos“ wird nicht als Claim geführt. Kicker → `Offerte anfragen`, CTA → `Unverbindliche Offerte anfragen`. Später verschärfbar.

**C-3 — Telefon als Kanal**
Die Seite hat 6 Anruf-Flächen (Topbar, Hero, Drawer, Offerte, Footer, Mobile-Leiste)
Es existiert keine Nummer
→ **CONFLICT** zwischen Gestaltung und Datenlage. Entweder Nummer liefern oder die Anruf-Flächen vorübergehend entfernen — Letzteres wäre ein Eingriff in die Gestaltung und wurde bewusst nicht vorgenommen.

**C-4 — Formular vs. Consent**
`datenschutz.html` §5 beschreibt die Übergabe der Anfragen an ein CRM
Das Formular sendet nichts und nennt kein CRM
→ **CONFLICT** zwischen Erklärung und tatsächlicher Verarbeitung. Löst sich, sobald das CRM benannt und angebunden ist.

**C-5 — „Über uns" ohne Person**
Der Abschnitt heisst „Kein Startup. Nur eine neue Firma." und lebt von persönlicher Glaubwürdigkeit
Er nennt keinen Namen und zeigt ein Symbolbild
→ **kein technischer Konflikt, aber eine inhaltliche Schwäche.** Entscheid 8 und 20.

---

# READY TO USE NOW

Belegt in den Dateien, kein weiterer Entscheid nötig:

| Bereich | Wert |
|---|---|
| Marke | ZÜGELKLAR |
| Adresse | Obere Bahnhofstrasse 24, 5507 Mellingen, Kanton Aargau, Schweiz |
| E-Mail | info@zuegelklar.ch (2 funktionierende `mailto:`-Links) |
| Domain | zuegelklar.ch — DNS aktiv, HTTPS aktiv, `CNAME` im Repo |
| Leistungen | Privatumzug · Umzugsreinigung mit Abnahmegarantie · Räumung & Entsorgung · Demontage & Montage |
| Einsatzgebiet | 8 Orte + „übrige Schweiz auf Anfrage" + „Europa auf Anfrage", mit Filial-Disclaimer |
| SEO-Kopf | Title 48 Z. · Description 163 Z. · Canonical · Open Graph · Twitter Card |
| FAQPage-Schema | aktiv, 5 Fragen |
| Rechtsseiten | Impressum · Datenschutz · AGB (Teil A + B) — verfasst und verlinkt |
| Legal-Links | 0 tote Links |
| Bilder | 1'220 KB gesamt, alle mit `alt`, 7 von 10 `lazy`, Hero responsive |
| Formularlabels | 11 von 11 korrekt |
| Barrierefreiheit | `aria-expanded`, `aria-controls`, `role="dialog"`, Escape, sichtbarer Fokus |
| Guard | `npm run check:site` läuft und meldet korrekt |
| Abnahmegarantie | über 6 Fundstellen konsistent, deckungsgleich mit AGB B7/B8 |

---

# BLOCKS FINAL PUBLIC LAUNCH — nur P0

> **Runde 4:** Diese Liste blockiert **den Launch**, nicht die Fertigstellung. Die Website
> wird jetzt technisch fertiggestellt; jeder Punkt unten wird in der Launch-Phase aufgelöst.
> Solange auch nur einer offen ist, bleiben `noindex,nofollow` und `Disallow: /` bestehen.

| # | Blocker | Auflösbar durch |
|---|---|---|
| ~~P0-1~~ | ~~Telefonnummer fehlt~~ — **gelöst 24.09.2026**, Wert bestätigt. Einbau steht aus (13 Stellen) | erledigt |
| **P0-2** | **Formular sendet nicht** — keine `name`-Attribute, kein `required`, kein Endpoint, kein Spam-Schutz, keine Rückmeldung. Jede Anfrage geht verloren | Entscheid 15, danach Umsetzung |
| **P0-3** | Handelsregister, UID, MWST, vertretungsberechtigte Person | **entschärft 24.09.2026:** bewusst nicht veröffentlichen, Formulierung freigegeben. Bleibt P0, bis der freigegebene Text eingebaut ist |
| **P0-4** | **Rechtsseiten nicht anwaltlich geprüft** — Kündigungsstaffeln, Haftung, Frachtrecht, Abnahmegarantie erzeugen bindende Verpflichtungen | Schweizer Fachperson |
| **P0-5** | **LocalBusiness-Schema inaktiv** — ohne legalName, Telefon, Öffnungszeiten und priceRange nicht aktivierbar | Entscheide 1, 2, 9, 10 |
| ~~P0-6~~ → **P1** | Logo trägt „GmbH“ ohne Eintrag | **herabgestuft 24.09.2026** auf *legal review required before public indexing* |
| **P0-7** | **CRM in der Datenschutzerklärung nicht benannt** | Entscheid 15 |

---

**Hinweis:** In diesem Schritt wurden **keine** Website-Dateien verändert, kein Commit und kein Push ausgeführt. Das Repository steht unverändert auf `main` = `d22463c`, die F0/F1-Arbeit liegt uncommitted im lokalen Working Tree.
