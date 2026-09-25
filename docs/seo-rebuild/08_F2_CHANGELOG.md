# 08 — Changelog: FINAL IMPLEMENTATION (N-1 … N-13)

**Datum:** 25.09.2026 · **Branch:** `seo-rebuild-v1` · **Build:** `V9.5-2026-09-24` → `V10.0-2026-09-25`
**Grundlage:** `07_FINAL_IMPLEMENTATION_PLAN.md`, Teil 3 — ausgeführt auf Owner-Befehl
**Nicht enthalten:** F2 (City Pages, Astro), Indexierung, Form-Backend

> Dieser Durchgang setzt ausschliesslich Entscheidungen aus den Runden 1–4 um.
> Es wurde kein Wert erfunden und keine unbestätigte Rechtsangabe veröffentlicht.

---

## N-1 · Telefonnummer eingebaut

| Datei | Stellen | Ergebnis |
|---|---|---|
| `index.html` | 11 | 7 × `href="tel:+41799333111"`, Anzeigetext `079 933 31 11` |
| `impressum.html` | 1 | §2: `<span class="todo">` ersetzt durch klickbaren Link |
| `datenschutz.html` | 1 | §1: dito |

Damit sind **19 Guard-Blocker** auf einen Schlag erledigt (13 × `placeholder:telefon`,
6 × `dead-link`). Kein leerer `href="tel:"` mehr im Dokument.

## N-2 · Impressum auf Weg A

- §1: Zeile `Rechtsform — Einzelunternehmen in Gründung` **entfernt**, ersetzt durch
  `Status — In Gründung` mit dem Hinweis, dass Firmenbezeichnung und Rechtsform mit dem
  Handelsregistereintrag folgen.
- §3: freigegebener Wortlaut aus Runde 1 eingesetzt, gefolgt von der bestehenden Aussage zu
  UID und MWST.
- „Einzelunternehmen" kommt im gesamten Projekt **0 ×** vor.
- Keine Rechtsform, keine UID, keine MWST-Nummer, kein Name einer vertretungsberechtigten
  Person.
- `Stand:` auf 25.09.2026 gesetzt.

## N-3 · Reaktionszeit vereinheitlicht — 4 Stellen

| Ort | Neu |
|---|---|
| Hero-Notiz | `Antwort innert 24 Stunden an Werktagen` |
| Offerte-Check | `Antwort innert 24 Stunden an Werktagen` / `In der Regel deutlich schneller.` |
| FAQ, sichtbar | `Wir melden uns an Werktagen innerhalb von 24 Stunden – in der Regel deutlich schneller. …` |
| FAQPage-JSON-LD | **wortgleich** mit dem sichtbaren FAQ-Text |

Maschinell geprüft: alle 5 FAQ-Einträge stimmen mit dem sichtbaren Text überein
(3 identisch, 2 als zulässige Kürzung).

## N-4 · Team-Claim auf Weg B — 2 Stellen

| Ort | Alt | Neu |
|---|---|---|
| Hero-Proof-Karte | `Team, keine Aushilfen` | `Team, eingespielt` |
| Über uns | `Eigenes Team` / `Dieselben Leute, keine wechselnden Aushilfen.` | `Ein eingespieltes Team` / `Dieselben Leute, mit klarer Einsatzleitung.` |

Das absolute Negativ ist damit aus dem Projekt verschwunden (`keine Aushilfen`: 0 Treffer).

## N-5 · Offerte-Wording

| Ort | Alt | Neu |
|---|---|---|
| Kicker | `Kostenlose Offerte` | `Offerte anfragen` |
| Submit-Button | `Anfrage senden` | `Unverbindliche Offerte anfragen` |

Die übrigen sechs `Offerte anfragen`-Buttons bleiben unverändert.
`kostenlos` bleibt ausschliesslich dort stehen, wo es sich auf die **Nachbesserung** der
Abnahmegarantie bezieht (4 Stellen, gedeckt durch AGB B7/B8).

## N-6 · Preiszeilen

| Alt | Neu |
|---|---|
| `Pauschal pro Objekt` | `Pauschale nach Objekt und Aufwand` |
| `Pro Stunde` | `Individuell nach Leistungsumfang` |

Keine Beträge, keine `ab CHF`-Angaben, keine Wettbewerber-Zahlen.

## N-7 · Ein-/Auspackservice als Zusatzleistung

In der Leistungskarte „Privatumzug" ergänzt:
`Ein- und Auspackservice auf Wunsch.` — als Zusatz formuliert, nicht als enthaltene Leistung.

## N-8 · Öffnungszeiten sichtbar

`Montag–Freitag 08:00–18:00 Uhr` an zwei Stellen: Footer-Kontaktspalte und
Offerte-Abschnitt unter der Telefonnummer. **Samstag wird nirgends als Öffnungszeit
genannt** und steht auch nicht im vorbereiteten Schema.

## N-9 · Datenschutz §5

Der Platzhalter `[CRM-Anbieter und Hostingstandort vor Launch konkret benennen]` ist entfernt.
Der Abschnitt sagt jetzt zutreffend:

1. Das Formular ist **zurzeit nicht aktiv** und übermittelt keine Daten.
2. Anfragen erreichen ZÜGELKLAR derzeit per E-Mail oder Telefon.
3. Ein CRM wird erst mit der Aktivierung eingesetzt; Anbieter und Hostingstandort werden
   **vorher** an dieser Stelle benannt.

Kein Anbietername, kein Hostingstandort, keine Behauptung einer fertigen Integration.
Damit ist auch Konflikt **C-4** (Erklärung vs. tatsächliche Verarbeitung) aufgelöst.
`Stand:` auf 25.09.2026 gesetzt.

## N-10 · Formular vorbereitet — ohne Endpoint

**Eingebaut:**

| Feld | `name` | `required` |
|---|---|---|
| Leistung | `service` (mit Enum-Werten) | ja |
| Von / Nach | `origin` / `destination` | nein |
| Wunschtermin | `moveDate` | nein |
| Zimmer | `rooms` (mit Werten) | nein |
| Name | `customerName` | ja |
| Telefon | `phone` | ja |
| E-Mail | `email` | ja |
| Fotos | `files` | nein |
| Nachricht | `message` | nein |
| Einwilligung | `consentPrivacy` | **ja** |

- `novalidate` entfernt, damit die Browser-Validierung greift.
- `accept="image/jpeg,image/png,image/webp"` statt `image/*`. **HEIC/HEIF ist nicht
  zugelassen** — es gibt kein Backend, das die Umwandlung beherrscht.
- Client-seitige Upload-Prüfung: **10 Dateien · 8 MB je Datei · 40 MB gesamt**, mit
  Fehlermeldung in einer `role="alert" aria-live="polite"`-Region und `aria-describedby`
  am Feld. Bei Verstoss wird die Auswahl verworfen.
- Der Hinweistext nennt jetzt Telefon und E-Mail als tatsächlich funktionierende Wege.

**Bewusst nicht eingebaut:** `action`, `method`, Endpoint, Spam-Schutz, Erfolgszustand,
UTM-Erfassung. Es wird nichts gesendet und **kein Erfolg vorgetäuscht**.

**Im Code vermerkt:** die Client-Prüfung ist Komfort, keine Sicherheit. Dieselben Grenzen
müssen bei der Aktivierung server-seitig erzwungen werden (L-6).

## N-11 · Kommentare bereinigt

- Die veraltete Platzhalter-Legende am Dateiende ist durch eine aktuelle ersetzt: erledigte
  Punkte sind als erledigt markiert, offene tragen ihre L-Nummer aus dem
  Implementation Plan.
- Im auskommentierten LocalBusiness-Schema sind die **bestätigten** Werte eingetragen:
  `telephone`, `streetAddress`, `postalCode`, `addressLocality`, `addressRegion`,
  `opens`/`closes`. Offen markiert bleiben `legalName` (L-3) und `priceRange` (L-9/L-10).
  **Der Block bleibt auskommentiert.**
- Die Hinweise „kein Samstag im Schema" und „keine Profil-Verweise ohne echte Profile"
  stehen jetzt direkt am Schema.

## N-12 · Dokumentation aktualisiert

| Datei | Änderung |
|---|---|
| `04_FORM_INTEGRATION_SPEC.md` | Upload-Grenzen auf den Owner-Entscheid korrigiert (8 MB statt 10 MB, 40 MB gesamt, kein HEIC). F-1/F-2/F-3/F-7 als erledigt vermerkt |
| `05_PRELAUNCH_BLOCKERS.md` | P0-1 erledigt, P0-2/3/5/7 entschärft mit L-Nummern, P0-6 formal auf P1 |
| `ZUEGELKLAR_FINAL_INPUT_CHECKLIST.md` | Umsetzungsstand je Entscheid nachgeführt |
| `08_F2_CHANGELOG.md` | dieses Dokument |

## N-13 · Version

`<meta name="zk-build">` von `V9.5-2026-09-24` auf `V10.0-2026-09-25`.
`Stand:` in `impressum.html` und `datenschutz.html` auf 25.09.2026.
`agb.html` wurde **nicht** verändert und behält korrekt den Stand 24.09.2026.

---

## Prüfergebnis

```
npm run check:site   →   ✔ BESTANDEN — 0 Blocker, 0 Warnungen
```

| Prüfung | Ergebnis |
|---|---|
| Verbotene Zeichenketten (14 Muster) | alle **0 Treffer** |
| Tote Links / ungültige Anker (4 Dateien) | **0** |
| Doppelte IDs | **0** (27 / 0 / 16 / 2 IDs) |
| Fehlende lokale Dateien | **0** |
| Bilder: `alt`, `width`, `height` | vollständig, 11 / 11 |
| `loading="lazy"` + `fetchpriority="high"` | kein Konflikt |
| FAQ sichtbar vs. JSON-LD | konsistent, 5 / 5 |
| Hero Desktop 1440 px | `hero-desktop.webp` |
| Hero Mobile 390 px | `hero-mobile.webp` |
| Horizontaler Überlauf | keiner, beide Breiten |
| Genau ein `<h1>` | ja, beide Breiten |
| Telefon-Links im Browser | 7 / 7 `tel:+41799333111` |
| Rechtsseiten-Links | 4 / 4 erreichbar |
| `noindex,nofollow` | **4 / 4 Seiten unverändert** |
| `robots.txt Disallow: /` | **unverändert** |

### Upload-Prüfung, im Browser getestet

| Fall | Ergebnis |
|---|---|
| 2 gültige JPEG | angenommen |
| 11 Dateien | abgelehnt: „Maximal 10 Dateien" |
| 1 Datei mit 9 MB | abgelehnt: „Maximal 8 MB je Datei" |
| PDF statt Bild | abgelehnt: „Erlaubt sind JPEG, PNG und WebP" |
| 6 × 7 MB = 42 MB | abgelehnt: „Maximal 40 MB gesamt" |
| Absenden mit gültigen Daten | **kein Request**, URL unverändert, keine Erfolgsmeldung |

---

## Nicht angefasst

| Gegenstand | Nachweis |
|---|---|
| `noindex,nofollow` | 4 / 4 Seiten unverändert |
| `robots.txt` | unverändert, `Disallow: /` steht |
| `sitemap.xml` | unverändert, 1 URL |
| City Pages | keine angelegt |
| Astro | keine Migration |
| Form-Backend | kein Endpoint, kein Request |
| Design, Layout, Farben, Typografie | unverändert |
| `agb.html` | unverändert |
| Bestehende Rechtsseiten | keine gelöscht, keine ersetzt |
| `main` | kein Merge, kein Push |
