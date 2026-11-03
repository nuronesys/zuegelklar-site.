# 10 — Pre-Launch Gate

**Stand:** 03.11.2026 · löst `docs/seo-rebuild/05_PRELAUNCH_BLOCKERS.md` als massgebliche Liste ab.

`noindex,nofollow` auf allen Seiten und `Disallow: /` in `robots.txt` bleiben, **bis jede Zeile mit Status P0 auf ✅ steht**. Kein Teil-Go-live einzelner Seiten.

Status: ✅ erledigt & belegt · ⏳ offen · ❓ vom Owner zu bestätigen

## A. Firma & Recht

| # | Bedingung | Nachweis | Verantw. | Status |
|---|---|---|---|---|
| A1 | Rechtsform geklärt: HR-Eintrag liegt vor **oder** Owner entscheidet bewusst für Einzelunternehmen/«in Gründung»-Wortlaut | HR-Auszug (zefix.ch) | Owner / Treuhand | ⏳ |
| A2 | UID / MWST-Status korrekt im Impressum (oder bewusst «nicht MWST-pflichtig» bzw. weggelassen) — **nichts erfunden** | UID-Register | Treuhand | ⏳ |
| A3 | Logo stimmt mit Rechtsform überein (kein «GmbH» ohne Eintrag) — Entscheid `content-v12` | gemergter Stand | Owner | ⏳ |
| A4 | AGB, Datenschutz, Impressum von Schweizer Fachperson geprüft (Abnahmegarantie, Haftung, Annullation) | Schriftliche Rückmeldung | Fachperson | ⏳ |
| A5 | Datenschutz beschreibt die Realität: Formularweg, WhatsApp/Meta, Hosting (GitHub Pages, USA), Analytics, CRM — **ohne** Packmer als «Vermittlungsplattform» für Website-Leads | Abgleich mit `07_TRACKING_PLAN.md` | Entwicklung + Fachperson | ⏳ |
| A6 | Versicherung: entweder Police vorhanden **und** Aussage geprüft, oder keinerlei Versicherungsaussage auf der Website | Police | Owner | ⏳ |

## B. Kontakt & Lead-Weg

| # | Bedingung | Nachweis | Status |
|---|---|---|---|
| B1 | `info@zuegelklar.ch` empfängt und sendet (Test von externer Adresse, Antwort zurück) | Testmail | ❓ |
| B2 | 079 933 31 11 erreichbar per Anruf **und** WhatsApp Business; Abwesenheitsnachricht ausserhalb Mo–Fr 08–18 | Testanruf, Test-Chat | ❓ |
| B3 | Formular End-to-End: Absenden → Lead im CRM (Marke ZÜGELKLAR, `distribution=none`) → Bestätigung an Kunde → Benachrichtigung an Owner | 3 Testleads (Desktop ohne WhatsApp, iOS, Android) | ⏳ |
| B4 | Spam-Schutz aktiv (Honeypot + Rate-Limit oder Turnstile), Fehler- und Erfolgszustand sichtbar | Test | ⏳ |
| B5 | Attributionsfelder (`landingPage`, `service`, `city`, `utm_*`, `timestamp`) kommen im CRM an | Testlead mit `?utm_source=test` | ⏳ |
| B6 | Website-Leads werden nicht in die Packmer-Marktplatz-Verteilung geroutet | CRM-Datensatz | ⏳ |

## C. Inhalt & Claims

| # | Bedingung | Prüfung | Status |
|---|---|---|---|
| C1 | Keine Platzhalter (`[TELEFON]`, `___`, `TODO`, `lorem`, `XXX`) | `npm run check:site` | ✅ (03.11.) |
| C2 | Keine unbelegten Claims: Erfahrung «seit über zehn Jahren» belegt oder auf «langjährige Erfahrung des Gründers» geändert; «eigenes Team», «fester Ansprechpartner» zutreffend | Claims-Liste 03 + Report | ⏳ |
| C3 | Keine erfundenen Bewertungen, Fallbeispiele, Zahlen, Zertifikate, Partner, Preise | Review | ⏳ |
| C4 | Alle KI-Personenbilder sichtbar mit «Symbolbild» gekennzeichnet (auch in Alt-Text) | Script | ✅ (77 Vorkommen; im Gate automatisieren) |
| C5 | Ortsseiten bestehen das Quality Gate aus `04_PROGRAMMATIC_SEO_GUARDRAILS.md`; Seiten, die durchfallen, bleiben `noindex` oder werden zusammengelegt | `npm run check:quality` | ✅ (03.11.) |
| C6 | Texte durch stop-slop-Durchgang und Owner-Lektorat | Report | ⏳ |

## D. Technik & SEO

| # | Bedingung | Prüfung | Status |
|---|---|---|---|
| D1 | Keine kaputten internen Links / Bilder | Link-Check im Script | ✅ (03.11., `check:site`) |
| D2 | `sitemap.xml` = genau die indexierbaren URLs, korrekte `lastmod` | `tools/build.mjs` | ✅ (erzeugt) |
| D3 | Canonical je Seite selbstreferenzierend, absolut, `https://zuegelklar.ch/...` | Script | ✅ |
| D4 | LocalBusiness/MovingCompany-Schema enthält **nur** bestätigte Daten (kein legalName vor HR, kein `aggregateRating`, kein `priceRange` ohne Preise) | Schema-Validator + Script | ⏳ |
| D5 | Mobile QA 390 px / 768 px / 1280 px auf allen Seitentypen, kein horizontales Scrollen, Formular bedienbar | Playwright/Handtest | ✅ teilweise (V11, 31 Seiten) |
| D6 | Lighthouse auf Live-Domain: LCP < 2.5 s (mobil), CLS < 0.1, A11y ≥ 95 | Messung | ⏳ |
| D7 | Domain-Weiterleitungen `zeugelklar.ch`, `zueglklar.ch`, `www.` → `https://zuegelklar.ch` | `curl -I` | ⏳ |
| D8 | Analytics misst Events und Conversions korrekt; Consent/Datenschutz passend | Debug-Ansicht + Testlead | ⏳ |
| D9 | Google Search Console verifiziert (DNS), bereit für Sitemap | GSC | ⏳ |
| D10 | Google Business Profile angelegt und verifiziert (NAP identisch zur Website) | GBP | ⏳ (empfohlen, kein harter Blocker) |

## Go-live-Ablauf (erst wenn A–D grün)

1. Branch `go-live` · `Disallow: /` entfernen · `noindex` aus allen Seiten entfernen, die C5 bestehen.
2. `npm run check:launch` → 0 Blocker.
3. PR, Review, Merge. Live prüfen (`curl`, Rich-Results-Test).
4. Sitemap in GSC einreichen, wichtigste 10 URLs zur Indexierung anfragen.
5. Nach 14 und 28 Tagen: Indexierungsbericht und Abfragen prüfen → Entscheid Wave 2.

**Rollback:** PR revertieren → `noindex` + `Disallow: /` sind innerhalb von ~10 Minuten (GitHub-Pages-Cache) wieder aktiv; bei Bedarf GSC-Entfernungstool.
