# ZÜGELKLAR — FINAL IMPLEMENTATION PLAN

**Erstellt:** 25.09.2026 · **Phase:** FINAL IMPLEMENTATION PREPARATION
**Grundlage:** Entscheidungsrunden 1–4, abgeschlossen am 25.09.2026
**Ziel-Branch:** `seo-rebuild-v1` · **Status:** *vorbereitet, nicht ausgeführt*

> **Dieser Bericht führt nichts aus.** Keine Datei wurde verändert, kein Commit, kein Push.
> Die Umsetzung beginnt erst auf ausdrücklichen Befehl des Owners.

---

## 0. Leitprinzip aus Runde 4

Die **Fertigstellung** der Website und ihr **Launch** sind ab hier zwei getrennte Dinge.

| | Fertigstellung — jetzt | Launch — in ca. 2 Wochen |
|---|---|---|
| Ziel | technisch vollständig, fehlerfrei, guard-grün | öffentlich auffindbar |
| Datenlage | nur bestätigte Daten | alle Daten bestätigt |
| `noindex,nofollow` | **bleibt** | wird entfernt |
| `robots.txt Disallow: /` | **bleibt** | wird entfernt |
| Rechtsprüfung | ausstehend | abgeschlossen |

Nichts Unbestätigtes wird veröffentlicht, nur weil ein Termin näher rückt.

---

# TEIL 1 — FINAL DECISION LOG (Runden 1–4)

27 Entscheidungen, alle vom Owner bestätigt. Diese Liste ist ab jetzt die einzige
massgebliche Quelle für Inhalte und Wortlaut.

## 1.1 Identität und Recht

| # | Runde | Entscheid |
|---|---|---|
| 2 | 1 | Handelsregister: **in Gründung**, kein Eintrag |
| 3 | 1 | Zielfirma `Zügelklar Umzug GmbH` — **erst nach dem Eintrag** veröffentlichen |
| 4 | 1 | **Weg A**: im Impressum **keine** Rechtsform nennen. „Einzelunternehmen" wird vollständig gestrichen |
| 5 | 1 | UID / CHE existiert nicht — **keine Nummer veröffentlichen** |
| 6 | 1 | MWST nicht entschieden — **keine Nummer veröffentlichen** |
| 7 | 1 | Vertretungsberechtigte Person: **kein Name, keine Funktion** |
| 8 | 1 | Logo mit „GmbH" bleibt vorläufig — **P1, legal review required before public indexing**. Ausdrücklich **keine** rechtliche Freigabe |
| 23 | 4 | Name / Foto des Inhabers: **verschoben**. „Der Gründer" bleibt namenlos |
| 24 | 4 | Rechtsprüfung Impressum / Datenschutz / AGB: **verschoben auf unmittelbar vor den Launch** |
| 26 | 4 | Handelsregister / UID / MWST: **verschoben**, abhängig vom Gründungsfortschritt |

## 1.2 Kontakt

| # | Runde | Entscheid |
|---|---|---|
| 1 | 1 | Telefon `079 933 31 11` · E.164 `+41799333111` · `href="tel:+41799333111"` — **bestätigt** |
| 9 | 2 | Öffnungszeiten **Montag–Freitag 08:00–18:00**. Samstag ist **keine** Öffnungszeit und kommt **nicht** ins Schema |
| 16 | 3 | `info@zuegelklar.ch` bleibt `PRESENT_BUT_NEEDS_CONFIRMATION` |
| 21 | 4 | `info@zuegelklar.ch` → **NOT YET CONFIRMED**, Aktivierung vor dem Launch erwartet. **Kein Entwicklungs-Blocker** |

## 1.3 Inhalt und Claims

| # | Runde | Entscheid |
|---|---|---|
| 10 | 2 | Reaktionszeit **Weg B** — auf Werktage begrenzt. Kein absolutes 24-h-Versprechen |
| 11 | 2 | Team-Claim **Weg B** — absolutes Negativ gestrichen |
| 12 | 2 | „kostenlos" **nicht** als Offerten-Claim. Stattdessen „unverbindlich" |
| 13 | 2 | Ein-/Auspacken ist **Zusatzleistung**, nicht automatisch enthalten |
| 17 | 3 | Haftpflichtversicherung **NOT YET CONFIRMED** — kein Versicherer, keine Deckungssumme, keine Versicherungs-Claims |
| 22 | 4 | Echte Fotos **verschoben**. Symbolbilder bleiben, bleiben als „Symbolbild" gekennzeichnet |

## 1.4 Preise

| # | Runde | Entscheid |
|---|---|---|
| 14 | 2 | **Keine `ab CHF`-Angaben.** Nur Preisbasis-Wording. Eigene Pricing-Phase folgt |
| 0 | 3 | Wettbewerber-Preise aus `02` und `05` **entfernt** (erledigt). Benchmarks gehören in eine separate Research-Datei und **nie** in die Preisbildung |

## 1.5 Formular, CRM, Daten

| # | Runde | Entscheid |
|---|---|---|
| 15 | 3 | Zielsystem **Packmer CRM**. Hosting und Endpoint **NOT YET CONFIRMED**. **Kein** Endpoint anhängen — nur Payload-Contract vorbereiten |
| 19 | 3 | Foto-Upload: max. **10 Dateien** · max. **8 MB** je Datei · max. **40 MB** gesamt · **JPEG, PNG, WebP**. HEIC/HEIF **nur** bei tatsächlichem Backend-Support |
| 20 | 3 | Minimum echter Fotos vor dem Entfernen von `noindex`: Teamfoto + Fahrzeugfoto — durch Entscheid 22 in die Launch-Phase verschoben |

## 1.6 Sichtbarkeit

| # | Runde | Entscheid |
|---|---|---|
| 18 | 3 | Google Business Profile **TO CREATE / VERIFY**. Instagram und Facebook optional. **Kein `sameAs`**, solange keine echten Profile existieren |
| 25 | 4 | Google Business Profile **verschoben auf unmittelbar vor den Launch** |
| 27 | 4 | `noindex,nofollow` und `Disallow: /` **bleiben**, bis der Owner den Launch ausdrücklich befiehlt |

## 1.7 Dauerhafte Verbote

Diese Regeln gelten für jeden weiteren Commit, ohne Ablaufdatum:

- Keine erfundene UID, MWST-Nummer oder Handelsregister-Nummer
- Kein Firmenname und keine Rechtsform vor dem Eintrag
- Kein Name und keine Funktion der vertretungsberechtigten Person
- Kein Versicherer und keine Deckungssumme. Verbotene Zeichenketten:
  `versichert bis CHF …` · `vollumfänglich versichert` · `Transportversicherung inklusive`
- Kein CRM-Anbieter und kein Hostingstandort in `datenschutz.html`, solange unbestätigt
- Kein Platzhalter-Endpoint und keine Formular-Attrappe
- Kein `sameAs` ohne echte Profile
- Keine Wettbewerber-Preise, weder auf der Seite noch als Preisgrundlage
- Keine Löschung oder Ersetzung bestehender Rechtsseiten
- Kein Eingriff in Design, SEO-Architektur, City Pages, Astro oder Form-Backend in dieser Phase

---

# TEIL 2 — AUSGANGSLAGE

## 2.1 Repository

| | |
|---|---|
| Branch | `main` = `fcb25b2` |
| F0/F1-Arbeit | **uncommitted** im Working Tree |
| Geändert | `index.html` + 13 optimierte Bilder, `v9.html` gelöscht |
| Neu, untracked | `agb.html`, `datenschutz.html`, `impressum.html`, `assets/legal.css`, `package.json`, `scripts/`, `docs/` |

## 2.2 Guard-Stand heute

`npm run check:site` → **19 Blocker, 4 Warnungen**

| Art | Anzahl | Ursache |
|---|---|---|
| `placeholder:telefon` | 13 | `[TELEFON]` sichtbar |
| `dead-link` | 6 | `href="tel:[TELEFON]"` |
| Warnungen | 4 | Platzhalter in HTML-Kommentaren |

**Alle 19 Blocker verschwinden mit einer einzigen Massnahme: dem Einbau der Telefonnummer.**
Die Warnungen verschwinden mit der Bereinigung der Kommentar-Legende.

---

# TEIL 3 — IMPLEMENT NOW

Alles hier ist entschieden, belegt und ohne weitere Owner-Daten baubar.
**Ein** Commit auf `seo-rebuild-v1`, kein Push, kein Merge.

## N-1 · Telefonnummer einbauen — löst 19 Guard-Blocker

| Datei | Stellen | Ersetzung |
|---|---|---|
| `index.html` | 11 live | Text → `079 933 31 11` · `href="tel:[TELEFON]"` → `href="tel:+41799333111"` (6×) |
| `impressum.html` | 1 (§2, Zeile 53) | `<span class="todo">[TELEFON]</span>` → `<a href="tel:+41799333111">079 933 31 11</a>` |
| `datenschutz.html` | 1 (§1, Zeile 71) | dito |

Fundstellen in `index.html`: Zeile 271 (Topbar), 308 (Hero-Button), 324 (Drawer),
625 (Offerte), 729 (Footer), 744 (Mobile-Aktionsleiste).

## N-2 · Impressum auf Weg A umstellen

**§1 — Zeile 45 vollständig entfernen:**

```html
<dt>Rechtsform</dt><dd>Einzelunternehmen in Gründung<br /><span class="small-note">…</span></dd>
```

Das Wort „Einzelunternehmen" darf danach nirgends mehr im Projekt vorkommen.

**§3 — freigegebener Wortlaut aus Runde 1 einsetzen:**

> Die Gesellschaft befindet sich in Gründung. Die definitive Firmenbezeichnung, Rechtsform
> und Handelsregisterangaben werden nach erfolgtem Eintrag ergänzt.

## N-3 · Reaktionszeit auf Weg B — 4 Stellen

| Zeile | Heute | Neu |
|---|---|---|
| 328 | `Antwort innert 24 Stunden` | `Antwort innert 24 Stunden an Werktagen` |
| 618 | `Antwort innert 24 Stunden` / `An Werktagen meist deutlich schneller.` | `Antwort innert 24 Stunden an Werktagen` / `In der Regel deutlich schneller.` |
| 692 | `Wir melden uns innert 24 Stunden, an Werktagen in der Regel deutlich schneller.` | `Wir melden uns an Werktagen innerhalb von 24 Stunden – in der Regel deutlich schneller.` |
| 782 | dieselbe Aussage im **FAQPage-Schema** | identisch nachziehen |

Zeile 782 ist der wichtige Punkt: Schema und sichtbarer Text müssen **wortgleich** bleiben,
sonst entsteht ein strukturierter Widerspruch gegenüber Google.

## N-4 · Team-Claim auf Weg B — 2 Stellen

| Zeile | Heute | Neu |
|---|---|---|
| 344 | `Team, keine Aushilfen` | `Ein eingespieltes Team` |
| 574 | `Dieselben Leute, keine wechselnden Aushilfen.` | `Dieselben Leute mit klarer Einsatzleitung.` |

## N-5 · Offerte-Wording

| Zeile | Heute | Neu |
|---|---|---|
| 612 | Kicker `Kostenlose Offerte` | `Offerte anfragen` |
| 661 | Submit-Button `Anfrage senden` | `Unverbindliche Offerte anfragen` |

Die übrigen sechs `Offerte anfragen`-Buttons bleiben unverändert — sie sind kurz und
korrekt. „kostenlos" bleibt nur dort stehen, wo es sich auf die **Nachbesserung** der
Abnahmegarantie bezieht (Zeilen 386, 419, 680, 779) — das ist eine andere Aussage und in den
AGB B7/B8 gedeckt.

## N-6 · Preiszeilen 2 und 4

| Zeile | Heute | Neu |
|---|---|---|
| 387 | `Pauschal pro Objekt` | `Pauschale nach Objekt und Aufwand` |
| 405 | `Pro Stunde` | `Individuell nach Leistungsumfang` |

Zeilen 377 (`Festpreis oder Stundenpreis`) und 396 (`Nach Aufwand`) entsprechen bereits dem
Entscheid und bleiben.

## N-7 · Ein-/Auspackservice als Zusatzleistung

Kommt heute **nirgends** auf der Seite vor, ist aber Teil des Leistungsumfangs
(Entscheid 13). Einbau in der Leistungskarte „Privatumzug":

> Auf Wunsch übernehmen wir auch das fachgerechte Ein- und Auspacken.

Formuliert als Zusatz, nicht als eingeschlossene Leistung.

## N-8 · Öffnungszeiten sichtbar machen

`Montag–Freitag 08:00–18:00 Uhr` in der Footer-Kontaktspalte und im Offerte-Abschnitt.
Samstag wird **nicht** genannt. Der optionale FAQ-Satz aus Runde 2 („Anfragen können auch am
Samstag eingehen …") wird **nicht** eingebaut — er ist nicht nötig und schafft eine
Erwartung, die niemand zugesichert hat.

## N-9 · Datenschutz §5 — Platzhalter entfernen

`[CRM-Anbieter und Hostingstandort vor Launch konkret benennen]` wird durch die in Runde 3
freigegebene allgemeine Formulierung ersetzt: Anfragen werden in einem CRM-System zur
Bearbeitung von Anfragen, Offerten und Aufträgen verarbeitet. **Kein Anbietername, kein
Hostingstandort.**

## N-10 · Formular — Vorbereitung ohne Endpoint

**Wird gebaut:**

- `name`-Attribute für alle 11 Felder, benannt nach dem Contract in `04_FORM_INTEGRATION_SPEC.md`
- `required` auf Name, Telefon, E-Mail, Leistung und der Consent-Checkbox
- `accept="image/jpeg,image/png,image/webp"` statt `image/*`
- Client-seitige Upload-Prüfung: 10 Dateien · 8 MB je Datei · 40 MB gesamt, mit sichtbarer Fehlermeldung
- Hinweistext mit den Grenzen unter dem Upload-Feld

**Wird nicht gebaut:** `action`, `method`, Spam-Schutz, Erfolgs-/Fehlerzustand, UTM-Erfassung.
Der Hinweis „Vorschau — das Formular wird vor dem definitiven Livegang aktiviert." **bleibt
stehen**, solange nichts gesendet wird.

## N-11 · Kommentar-Legende bereinigen

Die 4 Guard-Warnungen stammen aus der Platzhalter-Legende am Dateiende von `index.html`.
Erledigte Einträge (`[TELEFON]`, `ab CHF ___`) werden gestrichen, offene
(`[NAME DES INHABERS]`, `[[FOTO-01]]`, `[[FOTO-02]]`) bleiben als Arbeitsnotiz erhalten.
Das auskommentierte LocalBusiness-Schema bleibt unangetastet.

## N-12 · Verifikation vor dem Commit

1. `npm run check:site` → **0 Blocker** erwartet
2. Playwright-Durchlauf: Desktop 1440 px + Mobile 390 px, Screenshots, kein horizontaler Überlauf
3. Volltextsuche im ganzen Projekt auf: `Einzelunternehmen`, `[TELEFON]`, `ab CHF`, `CHE-`,
   `versichert bis`, `vollumfänglich versichert`, `Transportversicherung inklusive`,
   `sameAs` → alle müssen **0 Treffer** liefern
4. Prüfen, dass `noindex,nofollow` auf allen 4 Seiten und `Disallow: /` **unverändert** sind
5. FAQ-Schema gegen den sichtbaren FAQ-Text abgleichen — Wort für Wort

## N-13 · Commit

Branch `seo-rebuild-v1` von `main` abzweigen, **ein** Commit mit allen F1- und
Runde-1–4-Änderungen. **Kein Push. Kein Merge nach `main`.**

---

# TEIL 4 — IMPLEMENT BEFORE LAUNCH

Jeder Punkt braucht Daten, eine Entscheidung oder eine externe Handlung, die heute nicht
vorliegt. Die Reihenfolge ist die empfohlene Abarbeitung.

| # | Aufgabe | Braucht | Blocker-Grad |
|---|---|---|---|
| L-1 | `info@zuegelklar.ch` aktivieren, Testmail von extern, Abruf einrichten | Hostpoint-Konto | **P0** |
| L-2 | Rechtsprüfung Impressum · Datenschutz · AGB durch Schweizer Fachperson | Anwalt / Treuhänder | **P0** |
| L-3 | Handelsregister-Eintrag → Firmenname, Rechtsform, UID, MWST, vertretungsberechtigte Person ins Impressum | HR-Eintrag | **P0** |
| L-4 | Logo-Konflikt „GmbH" auflösen: entweder Eintrag liegt vor, oder Logo wird angepasst | L-3 oder Design | **P1 → P0 vor Indexierung** |
| L-5 | CRM-Endpoint bestätigen, Formular anbinden, Spam-Schutz, Erfolgs-/Fehlerzustand | Packmer-CRM-Daten | **P0** |
| L-6 | Upload-Limits **server-seitig** durchsetzen; HEIC nur bei bestätigtem Backend-Support | L-5 | **P0** |
| L-7 | `datenschutz.html` §5 + §11: CRM-Anbieter und Hostingstandort konkret benennen | L-5 | **P0** |
| L-8 | Echtes Teamfoto + echtes Fahrzeugfoto, Symbolbild-Kennzeichnung entsprechend entfernen | Fototermin | **P0** |
| L-9 | Pricing-Phase: Preise aus eigenen Kosten ableiten. **Keine Benchmarks** | Kostenrechnung | P1 |
| L-10 | `priceRange` für das Schema festlegen — oder das Feld bewusst weglassen | L-9 | P1 |
| L-11 | LocalBusiness/MovingCompany-Schema aktivieren (braucht `legalName`, Telefon, Öffnungszeiten, ggf. `priceRange`) | L-3, L-10 | **P0** |
| L-12 | Google Business Profile anlegen, Postkarten-Verifizierung, Kategorie und Profiltyp festlegen | Adresse erreichbar | P1 |
| L-13 | Haftpflichtversicherung: Police prüfen. Nur bei vorliegender Police eine Aussage aufnehmen | Versicherer | P1 |
| L-14 | `sitemap.xml` um die drei Rechtsseiten ergänzen | — | P2 |
| L-15 | **Launch-Schalter**: `noindex,nofollow` auf 4 Seiten entfernen, `Disallow: /` entfernen | **L-1 bis L-8 und L-11 erledigt** | — |
| L-16 | `npm run check:launch` → muss grün sein, bevor L-15 als abgeschlossen gilt | L-15 | — |

**Reihenfolge-Regel:** L-15 ist der **letzte** Schritt. Er wird nie vorgezogen, auch nicht
„nur zum Testen". Sobald `noindex` fällt, sind unbestätigte Rechtsdaten öffentlich.

---

# TEIL 5 — POST-LAUNCH

Sinnvoll, aber ausdrücklich **nach** dem Launch. Nichts davon wird in dieser Phase begonnen.

| # | Aufgabe | Anmerkung |
|---|---|---|
| P-1 | City Pages (Baden, Aarau, Brugg, Zürich …) | **F2** — bewusst nicht begonnen |
| P-2 | Migration nach Astro | **F2** — bewusst nicht begonnen |
| P-3 | Google Search Console einrichten, Sitemap einreichen, Indexierung beobachten | direkt nach L-15 |
| P-4 | Bewertungsprozess für Google aufbauen | braucht erste Aufträge |
| P-5 | Instagram / Facebook anlegen, danach `sameAs` ins Schema | nur mit echten Profilen |
| P-6 | Übrige Symbolbilder schrittweise durch eigene Fotos ersetzen | laufend |
| P-7 | Name und Foto des Inhabers, falls er öffentlich auftreten will | Entscheid 23 |
| P-8 | Google Fonts selbst hosten — streicht einen Auslandtransfer aus der Datenschutzerklärung | Datenschutz-Verbesserung |
| P-9 | Analytics-Entscheid (heute korrekt: keine Cookies, keine Analyse) | erst mit Cookie-Konzept |
| P-10 | Ungenutzte Assets `packing.webp`, `handover.webp`, `favicon-16.png` (163 KB) endgültig entscheiden | dokumentiert, nicht gelöscht |
| P-11 | Frist für die Nachbesserung der Abnahmegarantie in den AGB konkretisieren (B9 nennt nur „angemessene Gelegenheit") | mit L-2 besprechen |

---

# TEIL 6 — WAS IN DIESER PHASE NICHT ANGEFASST WIRD

| Gegenstand | Grund |
|---|---|
| `noindex,nofollow` (4 Seiten) | Entscheid 27 |
| `robots.txt Disallow: /` | Entscheid 27 |
| Design, Layout, Farben, Typografie | Owner-Anweisung |
| SEO-Architektur, URL-Struktur | Owner-Anweisung |
| City Pages | F2 |
| Astro | F2 |
| Form-Backend / Endpoint | Entscheid 15 |
| Bestehende Rechtsseiten löschen oder ersetzen | Owner-Anweisung |
| Merge nach `main` | Owner-Anweisung |
| Push zum Remote | Owner-Anweisung |

---

# ZUSAMMENFASSUNG

| Kategorie | Punkte | Zeitpunkt |
|---|---|---|
| **IMPLEMENT NOW** | 13 (N-1 … N-13) | auf Befehl, ein Commit auf `seo-rebuild-v1` |
| **IMPLEMENT BEFORE LAUNCH** | 16 (L-1 … L-16) | Launch-Phase, ca. 2 Wochen |
| **POST-LAUNCH** | 11 (P-1 … P-11) | nach der Indexierung |

Nach `IMPLEMENT NOW` ist die Website **technisch fertig und launch-ready**: `check:site`
grün, kein sichtbarer Platzhalter, kein unbestätigtes Rechtsdatum, jeder Claim gedeckt —
und weiterhin nicht indexiert.

**Nächster Schritt: Warten auf den Ausführungsbefehl des Owners.**
