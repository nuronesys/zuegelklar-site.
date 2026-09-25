# 06 — F1 Changelog

**Branch:** `seo-rebuild-v1`
**Ausgangspunkt:** `d22463c` (main) + lokaler Working Tree mit den Rechtsseiten
**Build:** `V9.4-2026-09-24` → `V9.5-2026-09-24`

---

## Geänderte Dateien

### `index.html`

| # | Änderung | Grund |
|---|---|---|
| 1 | **Hero als `<picture>`** — `<source media="(max-width: 650px)" srcset="assets/hero-mobile.webp">` vor dem `<img>` mit `hero-desktop.webp` | Vorher luden Mobilgeräte das Desktop-Bild. Die beiden `preload`-Tags mit `media` verwiesen auf Dateien, die das Markup gar nicht anforderte. **Messung nachher:** 1440 px → `hero-desktop.webp`, 390 px → `hero-mobile.webp`. |
| 2 | **4× `ab CHF ___` entfernt** — die Preiszeile behält „Festpreis oder Stundenpreis", „Pauschal pro Objekt", „Nach Aufwand", „Pro Stunde" | Leere Preisplatzhalter auf einer öffentlichen Seite. Layout der Karten unverändert. |
| 3 | `aria-controls="drawer"` und `type="button"` am Burger | Der Button steuerte ein Element, ohne es auszuweisen. |
| 4 | Drawer erhält `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation"` | Modales Menü war für Screenreader nicht als solches erkennbar. |
| 5 | `type="button"` am Schliessen-Button | Ohne `type` ist ein Button in einem Formular implizit `submit`. |
| 6 | `:focus-visible { outline: 3px solid var(--blue) }` | Es gab keinen sichtbaren Fokus — Tastaturbedienung war praktisch blind. |
| 7 | Build-Meta `V9.4` → `V9.5` | Nachvollziehbarkeit. |

### `impressum.html`

| # | Änderung | Grund |
|---|---|---|
| 8 | §3 Handelsregister/UID/MWST: die drei Platzhalterzeilen (`CHE-xxx.xxx.xxx` u. a.) durch einen Satz zum Gründungsstatus ersetzt | Sichtbarer Platzhalter in einem Rechtsdokument. **Keine Ersatznummer erfunden.** |
| 9 | §1 „Firma": `[Firma gemäss Handelsregister]` → Zeile „Rechtsform: Einzelunternehmen in Gründung" mit Hinweis | dito |
| 10 | §4: `[Name und Funktion gemäss Handelsregister]` → Prosa mit Verweis auf die Kontaktadresse | dito |

### `assets/legal.css`

| # | Änderung |
|---|---|
| 11 | Klasse `.small-note` für den erläuternden Zusatz unter der Rechtsform |

---

## Neue Dateien

| Datei | Zweck |
|---|---|
| `scripts/prelaunch-check.mjs` | Production Guard — bricht mit Exit-Code 1 ab, wenn Platzhalter, tote Links, fehlende Assets, doppelte IDs, `alt`-Fehler oder SEO-Kopfprobleme gefunden werden. `--launch` prüft zusätzlich, dass `noindex` und `Disallow: /` entfernt wurden. |
| `package.json` | `npm run check:site` und `npm run check:launch`. Kein Framework, keine Abhängigkeiten, kein Build. |
| `docs/seo-rebuild/01_BASELINE_AUDIT.md` | Inventar, Platzhalter, Links, Performance, A11y, externe Dienste, Canonical, Sicherheit |
| `docs/seo-rebuild/02_DATA_REQUIRED.md` | Firmendaten mit CONFIRMED / UNCONFIRMED / MISSING |
| `docs/seo-rebuild/03_CLAIMS_AUDIT.md` | 15 Aussagen mit Risiko und Empfehlung + Konsistenzprüfung der Abnahmegarantie |
| `docs/seo-rebuild/04_FORM_INTEGRATION_SPEC.md` | Formular-Audit (10 Befunde) und Payload-Entwurf |
| `docs/seo-rebuild/05_PRELAUNCH_BLOCKERS.md` | P0 / P1 / P2 |
| `docs/seo-rebuild/06_F1_CHANGELOG.md` | dieses Dokument |

**Aus dem lokalen Working Tree in den Branch übernommen** (waren untracked, nicht auf `main`):
`impressum.html`, `datenschutz.html`, `agb.html`, `assets/legal.css` sowie die Footer- und
Consent-Verlinkung in `index.html`.

---

## Bewusst **nicht** geändert

| Punkt | Grund |
|---|---|
| `noindex,nofollow` in allen vier Seiten | ausserhalb des Umfangs; Go-live-Schalter |
| `robots.txt` mit `Disallow: /` | dito |
| Gestaltung, Hero-Aufbau, Reihenfolge der Abschnitte, Farben, Typografie | ausdrücklich ausgeschlossen |
| Bildkompression | Assets wurden zuvor bereits um 51 % reduziert; keine weitere Qualitätsminderung ohne Anlass |
| Ungenutzte Assets (`packing.webp`, `handover.webp`, `favicon-16.png`) | dokumentiert, nicht gelöscht — Entscheid offen |
| `[TELEFON]` an 8 Stellen | **keine Nummer erfunden.** Das Repository enthält keine bestätigte Nummer. Bleibt P0-1. |
| `<main>`-Landmark | DOM-Änderung ausserhalb des freigegebenen Umfangs — P1-4 |
| Formular-Anbindung | ausdrücklich ausgeschlossen — spezifiziert in Dokument 04 |
| Neue SEO-Inhalte, Stadt- oder Leistungsseiten | ausserhalb des Umfangs |
| Framework-Migration | ausserhalb des Umfangs |

---

## Guard-Ergebnis nach F1

```
npm run check:site   →   Exit 1
```

Das ist **das gewünschte Verhalten**: der einzige verbleibende Blocker ist die fehlende
Telefonnummer. Der Guard wird grün, sobald sie eingesetzt ist.

Geprüft wurde auch, dass der Guard **keine** Fehlalarme erzeugt:

| Fall | Verhalten |
|---|---|
| `href="#offerte"` und 49 weitere echte Anker | akzeptiert, Zielprüfung gegen die IDs der Datei |
| `href="#"` | Blocker |
| Farbwerte in CSS (`#0057B8`) | ignoriert |
| SVG-Pfade | ignoriert |
| Platzhalter in `LAUNCH-CHECKLIST.md` und `docs/` | ignoriert (nicht Teil des Builds) |
| Platzhalter in HTML-Kommentaren | Warnung statt Blocker |
