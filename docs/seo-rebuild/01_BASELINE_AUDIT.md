# 01 — Baseline Audit

**Erstellt:** 24.09.2026
**Baseline-Commit:** `d22463c2f7f4745e6eca47e1b4f5a470047a7735` (main, "Echte Kontaktdaten")
**Arbeitsbranch:** `seo-rebuild-v1`
**Build vor F1:** `V9.4-2026-09-24` · **nach F1:** `V9.5-2026-09-24`

> Die ursprüngliche F0/F1-Vorgabe ging von `deb2fc6` / V9.1 aus. Dieser Stand war beim Start
> bereits drei Commits alt. Alle Zahlen hier beziehen sich auf den tatsächlichen Working Tree.

---

## 1. Drei Zustände zum Zeitpunkt des Audits

| Zustand | Inhalt |
|---|---|
| **GitHub `origin/main`** | `d22463c` · V9.3 · **ohne** Rechtsseiten · Footer-Links noch `href="#"` |
| **Lokaler Working Tree** | V9.4 · Rechtsseiten vorhanden, untracked · `index.html` modifiziert |
| **Publiziert (zuegelklar.ch)** | entspricht `origin/main` = V9.3 |

Die Rechtsseiten waren zum Audit-Zeitpunkt weder committet noch publiziert.

**Verifikation der Live-Seite:** automatisiertes Abrufen scheitert an der eigenen
`robots.txt` (`Disallow: /`). Die Aussage stützt sich darauf, dass GitHub Pages
ausschliesslich `origin/main` ausliefert.

---

## 2. Inventar

```
30 Dateien · 1'313 KB · 0 inhaltliche Duplikate
```

| Typ | Anzahl |
|---|---|
| HTML | 4 (`index`, `impressum`, `datenschutz`, `agb`) |
| CSS | 1 (`assets/legal.css`; Startseite hat inline CSS) |
| JS | 0 externe Dateien (1.1 KB inline) |
| Bilder | 18 (12 webp, 5 png, 1 jpg) + `favicon.ico` |
| Konfiguration | `robots.txt`, `sitemap.xml`, `CNAME`, `.nojekyll`, `.gitignore` |
| Doku | `LAUNCH-CHECKLIST.md` |

**Grösste Dateien**

| Datei | Grösse |
|---|---|
| `assets/og-image.jpg` | 146 KB |
| `assets/hero-desktop.webp` | 122 KB |
| `assets/hero-mobile.webp` | 114 KB |
| `assets/team.webp` | 93 KB |
| `assets/clearing.webp` | 91 KB |

---

## 3. Ungenutzte Assets — **nicht gelöscht**

| Datei | Grösse | Bewertung |
|---|---|---|
| `assets/packing.webp` | 83 KB | inhaltlich passend, aktuell nirgends eingebunden |
| `assets/handover.webp` | 80 KB | war in V8 im Schluss-CTA, in V9 entfallen |
| `assets/favicon-16.png` | 0.3 KB | kein `<link>` verweist darauf |
| `assets/favicon-512.png` | 42 KB | Quelle für `apple-touch-icon.png` — **behalten** |

Empfehlung: erst nach Freigabe löschen. Einsparpotenzial ca. 163 KB.

**Duplikate:** keine. **Toter Code:** keiner gefunden.
**Nicht-öffentliche Dateien im Public-Root:** keine (`docs/` und `scripts/` werden von
GitHub Pages ausgeliefert, enthalten aber keine sensiblen Daten).

---

## 4. Platzhalter-Scan (gesamtes Projekt)

### BLOCKER — für Besucher sichtbar

| Datei | Zeilen | Platzhalter |
|---|---|---|
| `index.html` | 271, 308, 324, 625, 729, 744 | `[TELEFON]` — **6×, jeweils zusätzlich als `href="tel:[TELEFON]"`** |
| `impressum.html` | 53 | `[TELEFON]` |
| `datenschutz.html` | 71 | `[TELEFON]` |

### Behoben in F1

| War | Jetzt |
|---|---|
| `ab CHF ___` (4×, `index.html`) | entfernt, Preiszeile behält „Festpreis oder Stundenpreis" usw. |
| `CHE-xxx.xxx.xxx` (`impressum.html`) | durch Prosa ersetzt: Gründungsstatus statt Platzhalter |
| `[Firma gemäss Handelsregister]` | → „Einzelunternehmen in Gründung" |
| `[Name und Funktion gemäss Handelsregister]` | → Prosa, kein Platzhalter mehr |

### WARNING — nur in HTML-Kommentaren

`index.html` enthält am Dateiende einen Kommentarblock mit der Platzhalter-Legende
(`[[FOTO-01]]`, `[NAME DES INHABERS]`, `ab CHF ___`, `[TELEFON]`) sowie das auskommentierte
LocalBusiness-Schema. Nicht sichtbar, vor dem Go-live aufräumen.

### SAFE — reine Dokumentation

`LAUNCH-CHECKLIST.md` (9 Treffer). Kein Produktionsartefakt.

---

## 5. Links

| Kategorie | Anzahl |
|---|---|
| gültige lokale Links | 26 |
| gültige Anker (`#offerte` …) | 50 |
| extern (`schema.org`) | 1 |
| `mailto:` / `tel:` gültig | 4 |
| **Platzhalter (`tel:[TELEFON]`)** | **6** |
| **kaputt** | **0** |

Alle früheren `href="#"` (AGB, Datenschutz, Impressum, Consent-Link) zeigen jetzt auf
existierende Dateien.

---

## 6. Externe Abhängigkeiten

| Host | Zweck | Notwendig? | Bewertung |
|---|---|---|---|
| `fonts.googleapis.com` | Stylesheet für Bricolage Grotesque, Instrument Sans/Serif | ja, solange nicht self-hosted | **render-blocking**; überträgt die IP-Adresse des Besuchers an Google |
| `fonts.gstatic.com` | die Fontdateien selbst | s. o. | gleiche Datenschutzfrage |
| `schema.org` | `@context` im JSON-LD | ja | wird nicht abgerufen, reiner Bezeichner |

**Empfehlung (nicht umgesetzt, P1):** Fonts self-hosten (WOFF2 unter `assets/fonts/`).
Vorteile: keine Drittübermittlung, ein Request weniger in der kritischen Kette, kürzere
Datenschutzerklärung. Aufwand ca. 1 Stunde, Lizenzen (OFL) erlauben es.

---

## 7. Performance-Baseline

| Metrik | Wert |
|---|---|
| `index.html` | 46.1 KB |
| davon inline CSS | 14.1 KB |
| davon inline JS | 1.1 KB |
| Assets gesamt | 1'220 KB (19 Dateien) |
| LCP-Bild Desktop | 122 KB |
| LCP-Bild Mobile | 114 KB |
| `<img>` gesamt | 10, davon 7 `loading="lazy"` |
| `rel="preload"` | 2 (beide mit `media`, passend zum `<picture>`) |
| render-blocking | 1 (Google-Fonts-Stylesheet) |

**Tatsächlich geladene Bilder** (Messung im Browser, nach dem F1-Fix):

| Viewport | Hero | Bilder gesamt |
|---|---|---|
| 1440 px | `hero-desktop.webp` | 7 |
| 390 px | `hero-mobile.webp` | 5 |

**Vor dem Fix** wurde auf beiden Viewports `hero-desktop.webp` geladen — Mobilgeräte zogen
122 KB statt 114 KB und ein Bild im falschen Seitenverhältnis.

> **Lighthouse:** in dieser Umgebung nicht zuverlässig messbar (kein stabiler lokaler Server,
> keine Netzwerk-Drosselung). Es werden **keine** Scores geschätzt. Vor dem Go-live auf der
> echten Domain messen — sobald `robots.txt` das zulässt.

---

## 8. Accessibility

| Prüfung | Ergebnis |
|---|---|
| `<img>` ohne `alt` | 0 |
| Formularfelder ohne Label | 0 |
| `<button>` ohne `type` | 0 (in F1 ergänzt) |
| `aria-expanded` am Burger | vorhanden |
| `aria-controls` am Burger | **in F1 ergänzt** |
| Drawer als `role="dialog"` + `aria-modal` | **in F1 ergänzt** |
| Escape schliesst Drawer | ja (bestehend) |
| sichtbarer Fokus-Ring | **in F1 ergänzt** (`:focus-visible`) |
| Überschriftenstruktur | 1× H1, 9× H2 — korrekt |
| Landmarks | `header`, `nav`, `section`, `footer` |

**Offen (P1):** kein `<main>`-Landmark. Screenreader-Nutzende können den Hauptinhalt nicht
direkt anspringen. Bewusst nicht umgesetzt — verändert die DOM-Struktur und war nicht Teil
des freigegebenen F1-Umfangs.

**Nicht geprüft:** Farbkontraste wurden nicht automatisiert gemessen. Auffällig ist der
graue Text `--muted: #6C7885` auf Weiss (ca. 4.8:1 — für Fliesstext ausreichend, für Text
unter 18 px grenzwertig). Vor dem Go-live nachmessen.

---

## 9. Canonical & Domain

| Seite | Canonical | Status |
|---|---|---|
| `index.html` | `https://zuegelklar.ch/` | korrekt |
| `impressum.html` | `https://zuegelklar.ch/impressum.html` | korrekt |
| `datenschutz.html` | `https://zuegelklar.ch/datenschutz.html` | korrekt |
| `agb.html` | `https://zuegelklar.ch/agb.html` | korrekt |

Keine Altlasten zu `nuronesys.github.io`, `http://` oder `www.` im Markup gefunden
(die frühere Open-Graph-URL wurde bereits auf die echte Domain umgestellt).

Weiterleitungen für `zeugelklar.ch` und `zueglklar.ch` gehören zu DNS/Hosting, **nicht**
ins Repository. Aktuell nicht eingerichtet — siehe `05_PRELAUNCH_BLOCKERS.md`.

---

## 10. Indexierung — unverändert

| Datei | Wert |
|---|---|
| `index.html` | `noindex,nofollow` |
| `impressum.html` | `noindex,nofollow` |
| `datenschutz.html` | `noindex,nofollow` |
| `agb.html` | `noindex,nofollow` |
| `robots.txt` | `Disallow: /` |

`sitemap.xml`: gültiges XML, korrekter Namespace, 1 URL (`https://zuegelklar.ch/`).
`lastmod` ist von Hand gepflegt — Automatisierung später.

**Für den Go-live zu ändern (F16, NICHT jetzt):**

1. `robots.txt` — Zeile `Disallow: /` löschen
2. in allen vier HTML-Dateien `<meta name="robots" content="noindex,nofollow" />` entfernen
3. `sitemap.xml` um die Rechtsseiten ergänzen

---

## 11. Sicherheit / Privatsphäre auf GitHub Pages

| Massnahme | Auf GitHub Pages möglich? |
|---|---|
| HTTPS erzwingen | ja, aktiv |
| Security-Header (CSP, HSTS, X-Frame-Options) | **nein** — statisches Hosting ohne Header-Kontrolle |
| CSP via `<meta http-equiv>` | teilweise; `frame-ancestors` und HSTS wirken so nicht |
| `referrer` steuern | ja, via `<meta name="referrer">` — derzeit nicht gesetzt (P2) |
| Drittanfragen minimieren | ja, durch Self-Hosting der Fonts (P1) |

**Inline-Scripts:** genau einer, 1.1 KB, ohne externe Aufrufe — nur Drawer-Steuerung und das
Unterdrücken des Formular-Absendens. **Datei-Upload:** nur UI, kein Empfänger, kein Versand.
