# 02 — Erforderliche Firmendaten

**Stand:** 24.09.2026

Status je Feld:

- **CONFIRMED** — vom Projektinhaber bestätigt und bereits im Code verwendet
- **UNCONFIRMED** — Wert existiert, ist aber nicht verifiziert
- **MISSING** — kein Wert vorhanden

Es wurde **kein** Wert erfunden. Das gesamte Repository wurde nach einer echten
Telefonnummer durchsucht (`tel:`, `+41`, `079`, `076`, `078`) — es existiert keine.

---

| Feld | Wert | Status | Verwendet in |
|---|---|---|---|
| `legalName` | — | **MISSING** | Impressum §1, LocalBusiness-Schema |
| `displayName` | ZÜGELKLAR | CONFIRMED | überall |
| `legalForm` | Einzelunternehmen in Gründung | UNCONFIRMED | Impressum §1 |
| `street` | Obere Bahnhofstrasse 24 | CONFIRMED | Footer, Impressum, Datenschutz |
| `postalCode` | 5507 | CONFIRMED | dito |
| `city` | Mellingen | CONFIRMED | dito, Einsatzgebiet |
| `canton` | Aargau | CONFIRMED | Title, Hero, Einsatzgebiet |
| `phoneDisplay` | — | **MISSING** | 6× `index.html`, Impressum, Datenschutz |
| `phoneE164` | — | **MISSING** | `href="tel:"`, LocalBusiness-Schema |
| `email` | info@zuegelklar.ch | CONFIRMED | 7 Stellen + 2 `mailto:` |
| `uid` | — | **MISSING** | Impressum §3 |
| `vatNumber` | — | **MISSING** | Impressum §3 |
| `commercialRegister` | — | **MISSING** | Impressum §3 |
| `authorizedPerson` | — | **MISSING** | Impressum §4 |
| `openingHours` | — | **MISSING** | LocalBusiness-Schema |
| `liabilityInsurer` | — | **MISSING** | noch nirgends — bewusst keine Deckungszahl auf der Seite |
| `priceFrom.privatumzug` | — | **MISSING** | Leistungskarte 1 |
| `priceFrom.reinigung` | — | **MISSING** | Leistungskarte 2 |
| `priceFrom.raeumung` | — | **MISSING** | Leistungskarte 3 |
| `priceFrom.montage` | — | **MISSING** | Leistungskarte 4 |

---

## Hinweise

**Telefonnummer.** Im Verlauf wurde `+41 79 123 45 67` genannt. Das ist exakt das
Beispielformat, das zuvor als Vorlage gezeigt wurde, und trägt eine offensichtliche
Zählfolge. Es wurde **nicht** übernommen. Ohne Nummer bleiben sechs Anruf-Flächen auf der
Startseite funktionslos.

**Rechtsform.** Das Logo trägt „Umzug GmbH". Solange kein Handelsregistereintrag vorliegt,
darf „GmbH" nicht als Rechtsform geführt werden. Das Impressum nennt daher „Einzelunternehmen
in Gründung". Die Logo-Grafik wurde nicht verändert — das ist vor dem Go-live zu klären.

**Öffnungszeiten.** Für das LocalBusiness-Schema und das Vertrauen der Besucher relevant.
Konkurrenten in der Region nennen sie durchgehend.

**Preise.** Die vier leeren `ab CHF ___` wurden entfernt. Sobald Preise feststehen, werden sie
strukturiert wieder eingesetzt. Die Preise werden in einer eigenen Pricing-Phase aus den tatsächlichen Kosten von
ZÜGELKLAR abgeleitet. **Wettbewerber-Benchmarks werden dafür nicht verwendet.**
