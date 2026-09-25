# 05 — Pre-Launch Blockers

**Stand:** 25.09.2026 · Build `V10.0-2026-09-25` · nach Umsetzung von N-1 bis N-13
Maschinell geprüft mit `npm run check:site` → **0 Blocker, 0 Warnungen**.

> Die Liste unten ist die **Launch**-Liste. Sie blockiert nicht mehr die Fertigstellung.
> Die Nummerierung L-x entspricht `07_FINAL_IMPLEMENTATION_PLAN.md`, Teil 4.

---

## P0 — muss vor der Indexierung erledigt sein

| # | Blocker | Wo | Verantwortlich |
|---|---|---|---|
| ~~P0-1~~ | **ERLEDIGT 25.09.2026.** ~~Telefonnummer fehlt.~~ 6 sichtbare `[TELEFON]` auf der Startseite, je als `href="tel:[TELEFON]"` — alle Anruf-Flächen sind funktionslos. Dazu Impressum §2 und Datenschutz §1. | `index.html` 271/308/324/625/729/744 · `impressum.html` 53 · `datenschutz.html` 71 | Projektinhaber |
| **P0-2** (L-5) | **Teilweise erledigt 25.09.2026.** `name`-Attribute, `required` und client-seitige Upload-Prüfung sind eingebaut. **Offen bleiben:** Endpoint, Spam-Schutz, Erfolgs-/Fehlerzustand, server-seitige Durchsetzung der Upload-Grenzen (L-6). Das Formular sendet weiterhin bewusst nichts und täuscht keinen Erfolg vor. | `index.html`, Offerte-Abschnitt | Entwicklung nach CRM-Entscheid |
| **P0-3** (L-3) | **Entschärft 25.09.2026.** Weg A ist umgesetzt: keine Rechtsform, keine erfundenen Nummern, freigegebener Gründungs-Wortlaut in §3. Bleibt P0, bis der Handelsregistereintrag vorliegt und die echten Daten ergänzt sind. | `impressum.html` §1, §3, §4 | Treuhänder |
| **P0-4** | **Rechtsseiten nicht anwaltlich geprüft.** Kündigungsstaffeln, Haftung, Frachtrecht, Abnahmegarantie erzeugen echte Verpflichtungen. | `agb.html`, `datenschutz.html`, `impressum.html` | Schweizer Fachperson |
| **P0-5** (L-11) | **LocalBusiness-Schema weiterhin inaktiv.** Telefon, Adresse und Öffnungszeiten (Mo–Fr 08:00–18:00) sind am 25.09.2026 im auskommentierten Block eingetragen. Es fehlen `legalName` (L-3) und `priceRange` (L-9/L-10, darf auch entfallen). | `index.html` Dateiende | nach P0-1 und P0-3 |
| **P0-6** → **P1** (L-4) | **Herabgestuft (Owner-Entscheid 8).** Der Schriftzug trägt „Umzug GmbH", der Impressum-Text nennt keine Rechtsform mehr. Der Widerspruch besteht weiter, solange keine Gesellschaft eingetragen ist. **Legal review required before public indexing.** | `assets/logo.webp`, `assets/logo-white.png` | Entscheid Projektinhaber |
| **P0-7** (L-7) | **Entschärft 25.09.2026.** §5 sagt jetzt zutreffend, dass das Formular inaktiv ist und nichts übermittelt, und nennt bewusst keinen Anbieter und keinen Hostingstandort. Bleibt P0, bis das CRM benannt und angebunden ist. | `datenschutz.html` §5 | nach CRM-Entscheid |

---

## P1 — dringend empfohlen vor dem Launch

| # | Punkt | Begründung |
|---|---|---|
| **P1-1** (L-8) | **Echte Fotos** von Team und Fahrzeugen — am 25.09.2026 bewusst auf die Launch-Phase verschoben (Entscheid 22) | Jedes Personenbild trägt sichtbar „Symbolbild". Der Besucher liest das. Für ein Gewerbe, das auf Vertrauen beruht, ist das der grösste einzelne Hebel — zwei Stunden Aufwand. |
| **P1-2** (L-9) | **Preise** in den vier Leistungskarten | Die leeren `ab CHF ___` sind entfernt, die Karten funktionieren ohne. Preise folgen in einer eigenen Pricing-Phase auf Basis der eigenen Kosten — **keine Wettbewerber-Benchmarks**. |
| **P1-3** | **Fonts self-hosten** | Entfernt die Übermittlung der Besucher-IP an Google, spart einen render-blocking Request und verkürzt die Datenschutzerklärung. |
| **P1-4** | **`<main>`-Landmark** ergänzen | Screenreader-Nutzende können den Hauptinhalt nicht direkt anspringen. Bewusst nicht in F1 umgesetzt (DOM-Änderung ausserhalb des Umfangs). |
| **P1-5** | **Farbkontraste messen** | `--muted: #6C7885` auf Weiss liegt bei ca. 4.8:1 — für kleinen Text grenzwertig. |
| **P1-6** | **Claim-Entscheide** (siehe `03_CLAIMS_AUDIT.md`) | Vor allem „keine wechselnden Aushilfen" und „Antwort innert 24 Stunden" — absolute Zusagen ohne Absicherung. |
| **P1-7** | **Domain-Weiterleitungen** einrichten | `zeugelklar.ch` und `zueglklar.ch` zeigen nirgendwohin. 301 auf `zuegelklar.ch` bei Hostpoint. Gehört zu DNS, nicht ins Repo. |
| **P1-8** | **Öffnungszeiten** festlegen | Für Schema und Besucher; Mitbewerber nennen sie durchgehend. |

---

## P2 — nach dem Launch

| # | Punkt |
|---|---|
| P2-1 | Eigene Seiten je Leistung (`/umzug`, `/umzugsreinigung`, `/raeumung-entsorgung`, `/montage`, `/international`) — heute konkurriert eine einzige URL um acht Suchbegriffe |
| P2-2 | Regionenseiten, beginnend mit Mellingen und dem Aargau |
| P2-3 | Ratgeberseite „Was kostet ein Umzug in der Schweiz?" — hohes Suchvolumen, Kaufabsicht |
| P2-4 | Google Business Profile |
| P2-5 | Bewertungen ab dem ersten Auftrag systematisch einsammeln |
| P2-6 | `lastmod` in der Sitemap automatisieren |
| P2-7 | `<meta name="referrer">` setzen |
| P2-8 | Ungenutzte Assets entfernen (`packing.webp`, `handover.webp`, `favicon-16.png` — ca. 163 KB) |

---

## Go-live-Schalter — **nicht** Teil von F0/F1

Wenn alle P0 erledigt sind, in dieser Reihenfolge:

1. `robots.txt` — Zeile `Disallow: /` löschen
2. `<meta name="robots" content="noindex,nofollow" />` aus allen vier HTML-Dateien entfernen
3. `sitemap.xml` um `/impressum.html`, `/datenschutz.html`, `/agb.html` ergänzen
4. `npm run check:launch` — prüft zusätzlich, dass kein `noindex` und kein `Disallow: /` mehr da ist
5. Google Search Console einrichten, Sitemap einreichen
6. Lighthouse auf der Live-Domain messen (in der Entwicklungsumgebung nicht verlässlich möglich)
