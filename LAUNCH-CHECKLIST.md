# ZÜGELKLAR — Launch-Checkliste

**Baseline:** V8 · Build `V8-PREVIEW-2026-09-05`
**Status:** Preview (`noindex,nofollow` — bleibt bis zum Go-live gesetzt)
**Repo:** `nuronesys/zuegelklar-site.` · Branch `main` · GitHub Pages `main / root`

---

## 1. Erledigt (06.09.2026)

| # | Änderung | Datei |
|---|---|---|
| 1 | Escapten HTML-Kommentar entfernt (wurde als sichtbarer Text gerendert) | `index.html` |
| 2 | Datei formatiert (war 2 Zeilen minifiziert → 1524 Zeilen, editierbar) | `index.html` |
| 3 | Build-Meta korrigiert: `V7-LIVE` → `V8-PREVIEW-2026-09-05` | `index.html` |
| 4 | Favicon-Set aus der Dachmarke des Logos erzeugt (kein Redesign) | `favicon.ico`, `assets/favicon-*.png`, `assets/apple-touch-icon.png` |
| 5 | Open Graph / Twitter Card + `theme-color` ergänzt | `index.html`, `assets/og-image.jpg` |
| 6 | CTA-Wording entschärft: „Kostenlose Offerte“ → „Offerte anfragen“ (Gratis-Offerte ist nicht final entschieden) | `index.html` |
| 7 | „Mit Fokus auf Zürich“ → „mit Schwerpunkt in der Deutschschweiz“ (kein Sitz-Claim für Zürich) | `index.html` |
| 8 | KI-Bilder mit Personen als **Symbolbild** gekennzeichnet + ehrliche `alt`-Texte (Team, Beratung, Übergabe) | `index.html` |

Nicht angefasst: Layout, Farben, Struktur, Bilder, `noindex`.

---

## 2. Blockiert — wartet auf echte Daten

| Thema | Fehlt | Wirkung auf die Website |
|---|---|---|
| Handelsregister-Eintrag | Firma, HR-Amt, Eintragsdatum | „GmbH“ darf erst danach als Rechtsform stehen |
| Adresse | Strasse, Nr., PLZ, Ort | `[ADRESSE]` in Footer + Impressum |
| Telefon | Geschäftsnummer | `[TELEFON]` in Topbar + Footer |
| E-Mail | Geschäftsadresse | `[E-MAIL]` in Topbar + Footer |
| UID / MWST | `CHE-xxx.xxx.xxx` | Impressum, spätere Rechnungen |
| Vertretungsberechtigte Person | Name + Funktion laut HR | Impressum |
| Domain `zuegelklar.ch` | Registrierung nicht bestätigt | Canonical, OG-URLs, `CNAME`, E-Mail |
| CRM-Endpoint | API-Contract, Auth | Offerte-Formular ist aktuell ohne Funktion |
| Haftpflicht | Versicherer, Summe | Keine Deckungszahl auf die Website |

**Empfehlung:** sobald die Firmendaten vorliegen, an **einer** Stelle pflegen und von dort in Footer / Impressum / Schema / Formular ziehen — nicht an fünf Stellen im HTML.

---

## 3. Offene Entscheide (kein Datenproblem — Entscheid nötig)

- **Rechtsseiten publizieren?** AGB / Datenschutz / Impressum liegen als *Entwurf V1* vor. Footer-Links zeigen aktuell auf `#`. Optionen: (a) als klar markierte Entwürfe veröffentlichen, (b) erst nach Rechtsprüfung publizieren.
- **„GmbH“ im Logo und Footer** — steht bereits auf dem Logo (`Umzug GmbH`), Firma aber noch nicht eingetragen. Vor Public Launch angleichen.
- **„Einpacken komplett“** — V8 verspricht Full-Packing-Service. Als Launch-Leistung bestätigen oder Text auf Schutz-/Verpackungsmaterial reduzieren.
- **Formular-UX** — finales Data Model ist definiert (20+ Felder). Empfehlung: 4-stufiger Flow statt einer langen Liste.
- **Repo-Name** — `zuegelklar-site.` mit Punkt am Ende. Vor der Domain-Anbindung auf `zuegelklar-site` umbenennen.

---

## 4. Go-live-Gates (in dieser Reihenfolge)

1. Handelsregister-Eintrag liegt vor → Firmendaten eintragen
2. Domain registriert + DNS auf GitHub Pages → `CNAME` + `.nojekyll` ergänzen
3. Kontaktdaten live (Telefon + E-Mail funktionieren)
4. Rechtsseiten publiziert und verlinkt
5. Offerte-Formular sendet echt (CRM, `source=website`, Consent-Checkbox, Spam-Schutz, Fehlerbehandlung)
6. Echte Team-/Fahrzeugfotos ersetzen die Symbolbilder
7. QA: Mobile, Tastatur, Kontrast, Ladezeit, Formular-Ende-zu-Ende
8. **Erst dann:** `noindex,nofollow` entfernen · `canonical` · `robots.txt` · `sitemap.xml` · `LocalBusiness`-Schema · Search Console · Google Business Profile

---

## 5. Regeln, die bestehen bleiben

- Keine Fake-Reviews, Fake-Standorte, Fake-Zahlen, Fake-Zertifikate.
- Keine Nachhaltigkeits-/Recycling-Claims ohne Nachweis — nur „fachgerechte Entsorgung“.
- „10+ Jahre Branchenerfahrung“ = Erfahrung der Personen, nicht Alter der Gesellschaft.
- Kein Firmenumzug / B2B im Launch-Scope.
- Kein WhatsApp als Launch-Kanal.
- Packmer und ZÜGELKLAR bleiben getrennt — die Website zeigt keine Verbindung.
- Deutsch only im ersten Launch.

---

## 6. Platzhalter in `v9.html` (Entwurf der neuen Startseite)

Alles hier ist bewusst offen gelassen und im Code markiert — Suchen &amp; Ersetzen genügt.

| Marker | Wo | Was einsetzen |
|---|---|---|
| `[[FOTO-01]]` | Über uns | Porträt des Inhabers (vor dem Fahrzeug oder im Büro) |
| `[[FOTO-02]]` | Über uns | Teamfoto vor den Fahrzeugen — ersetzt später die Symbolbilder |
| `[NAME DES INHABERS]` | Über uns | Vor- und Nachname |
| `[STANDORT]` | Einsatzgebiet (3×) | Ort der Basis, z. B. „Mellingen" |
| `[TELEFON]` | Topbar, Hero, Formular, Footer, Menü | Geschäftsnummer (auch in `href="tel:"`) |
| `[E-MAIL]` | Topbar, Footer | Geschäfts-E-Mail (auch in `href="mailto:"`) |
| `[ADRESSE]` | Footer | Vollständige Postadresse |
| `ab CHF ___` | 4 Leistungskarten | Einstiegspreise — oder die Preiszeile entfernen |

Neu in `v9.html` gegenüber `index.html`: Mobile-Navigation, feste Aktionsleiste auf dem Handy,
klickbare Telefon-/E-Mail-Links, dunkles Abnahmegarantie-Band, Routen-Ablauf, Abschnitt „Über uns",
Abschnitt „Einsatzgebiet", Foto-Upload im Formular, Consent-Checkbox, FAQ-Akkordeon mit FAQPage-Schema.
