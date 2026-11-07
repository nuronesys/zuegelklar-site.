# Redesign V15: Kino-Startseite, Schnellanfrage in 3 Schritten, Angebote, Umzugsplaner

Neue Startseite als Vorschau unter `/v15-preview/`. Die bestehende Startseite und alle anderen Seiten bleiben unverändert.

## Was drin ist
- **Kino-Startseite (V15):** Vollbild-Hero, Eintritt durch die Schrift «UMZUGSTAG», Scrollytelling «Ein Umzugstag» (6 Szenen mit Uhrzeit), Firmen-Sektion, horizontale Leistungskarten, Reise-Leiste als Kapitel-Navigation. GSAP + Lenis lokal in `assets/vendor/`, Fallback bei `prefers-reduced-motion`.
- **Bilder:** 14 dokumentarische Symbolbilder in `assets/v15/` (WebP), alle mit «Symbolbild»-Hinweis.
- **Schnellanfrage** (`assets/quick.js`, `assets/quick.css`): öffnet sich bei jedem Offerte-Button. Leistung wählen → Name + Telefon → senden; danach optional Adressen und Datum. Versand über Web3Forms, sobald `data-key` gesetzt ist; bis dahin WhatsApp mit vorbereitetem Text.
- **Angebote (vom Inhaber bestätigt):** Besichtigung gratis, Kartons gratis bei gebuchtem Umzug, Festpreis ohne Überraschungen, Abnahmegarantie. Sichtbar im Hero, in der Sektion «Vier Zusagen», in einem einmaligen Hinweis nach 3 Sekunden und in der FAQ.
- **Umzugsplaner:** Richtwert für Volumen, Team und Dauer, persönlicher Countdown mit Zeitplan bis zur Anmeldung in der neuen Gemeinde, Versand per WhatsApp, Übergabe an die Schnellanfrage.
- **SEO:** Title, Description, Canonical, Open Graph, JSON-LD (MovingCompany, FAQPage), 10 FAQ, 1 H1, Alt-Texte. Indexierung bleibt aus (`noindex`).

## Offen vor dem Livegang
- [ ] Web3Forms-Schlüssel eintragen (`data-key` am Skript `quick.js`)
- [ ] Datenschutzerklärung um Web3Forms ergänzen
- [ ] Echte Fotos (Team, Fahrzeug, vorher/nachher) statt Symbolbilder
- [ ] Richtwerte im Planer vom Inhaber prüfen lassen
- [ ] FAQ «Kartons» auch auf den bestehenden Seiten anpassen (jetzt nur in V15)
- [ ] V15 auf alle Seiten übertragen; Mobile-Performance messen
- [ ] GitHub Pages: «Enforce HTTPS» aktivieren

## Test
- Durchgeklickt bei 375 px und am Desktop: kein horizontales Scrollen, Schnellanfrage und Planer funktionieren, Daten werden korrekt übergeben.
- Scroll-Animationen nur im echten Browser prüfbar; im Vorschau-Panel laufen sie nicht.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
