# 11 — Umsetzungsprotokoll

**Stand:** 03.11.2026 · Branch `reinit-docs` (lokal, nicht gepusht) · Owner-Auftrag: «Das Richtige und Passendste für SEO und Einfachheit umsetzen.»

## Entscheide, die der Haupt-Agent im Auftrag des Owners getroffen hat

| Thema | Entscheid | Grund |
|---|---|---|
| `content-v12` | gemergt | Logo ohne «GmbH», kein Konflikt |
| Antwortfrist 24 h | überall entfernt | Letzter Stand F3 (31.10.); kein Versprechen, das bricht. Quality Gate blockiert sie |
| Datenschutz §5 | neutraler Text ohne Packmer-Namen; Satz «nicht an Vermittlungsplattformen» bewusst **nicht** veröffentlicht | erst wenn technisch garantiert (07) |
| Architektur | flache URLs + Hubs; kein Astro, kein Generator mit Build-Ausgabe | HTML bleibt Quelle; `tools/build.mjs` synchronisiert nur Bausteine |
| Docs-Veröffentlichung | `_config.yml` mit `exclude` statt `.nojekyll` | ohne Änderung der GitHub-Einstellungen |
| «Umzug GmbH» in KI-Bildern | Schriftzug auf Fahrzeugen/Kleidung in 5 Bildern entfernt (ffmpeg `delogo`); Originale lokal gesichert | Widerspruch zu «in Gründung» |
| Ungenutzte Dateien | `og-image.jpg`, `favicon-16.png` gelöscht | Cleanup-Vorschlag 09 |

## Umgesetzt

- **Bausteine** (`_partials/`, `tools/build.mjs`, `tools/site-data.mjs`): Topbar, Header + Mobilmenü (vorher nur Startseite), Footer (eine Variante), Mobile-Leiste, Sidebar (Standard / Grossaufträge), Offertformular. Breadcrumbs verlinkt = JSON-LD, Service-Schema, MovingCompany `@id`/`email`/`alternateName`, FAQPage-Schema **aus dem sichtbaren FAQ erzeugt**, Sitemap mit `lastmod` aus Git, robots.txt + robots-Meta über **einen** Schalter `INDEXABLE`.
- **Neue Seiten:** `/leistungen/`, `/einsatzgebiet/` (Übersicht Halteverbot nach Gemeinde, nur verifizierte Angaben), `/offerte/` (Vorauswahl `?leistung=`), `/ueber-uns/` (Faktenblock, Symbolbild-Hinweis), `404.html`.
- **Formular:** Kurzform + «Mehr Angaben», Feldmarkierung mit Fokus, «Fast fertig»-Schritt mit Text kopieren / WhatsApp erneut öffnen / anrufen, WhatsApp in neuem Tab, Einwilligung präzisiert (WhatsApp/Meta), AGB nicht mehr in der Checkbox.
- **Herkunft** (`assets/site.js`): sessionStorage first/last touch, Referenz `ZK-XXXXXX`, Fusszeile «Ref · Seite · Herkunft» in WhatsApp/E-Mail, seitenspezifischer WhatsApp-Vortext auf allen Links, Events für Plausible (wirken erst, wenn Plausible eingebunden wird). Datenschutz §8 beschreibt das.
- **Texte:** Startseite (Claims, Slogan nur Footer, stop-slop), 11 Ortsseiten (Einsatzgebiet-Satz, eigene Leads, generische Halteverbot-Abschnitte zusammengeführt, lokale FAQ, Zug-Satz entfernt, Wikipedia reduziert, «Umzüge in der Nähe»), 12 Leistungsseiten (Was den Preis bestimmt, Das brauchen wir, Abnahmegarantie-Definition, `/umzug/`-Title gegen Kannibalisierung), Ratgeber (Slogan raus, sprechende Links).
- **Technik:** Startseite nutzt `site.css` (−15 KB Inline-CSS), Kontrast WCAG AA, mobiles Hero 800×500 (44 KB statt 900×1599), Header-Button einzeilig.
- **Prüfung:** `npm run check:site` = `prelaunch-check` + **neues** `scripts/quality-gate.mjs` (Eindeutigkeit, Ortsseiten-Gate, Claim-Denylist, Symbolbild, FAQ-Schema, Bausteine synchron). Stand: beide **BESTANDEN**, 0 Blocker, 0 Warnungen.

## Arbeitsweise ab jetzt

1. Inhalt direkt im HTML der Seite bearbeiten (ausserhalb der `<!-- zk:… -->`-Marker).
2. Gemeinsames (Menü, Footer, Formular, Kontakt) nur in `_partials/` ändern.
3. Neue Seite: in `tools/site-data.mjs` eintragen, HTML mit leeren Markern anlegen (Vorlage: `leistungen/index.html`).
4. `npm run build` → `npm run check:site` → commit.
5. Vorschau: `npm run serve` → http://localhost:4173

## Offen (nur Owner / extern)

GitHub «Enforce HTTPS» aktivieren · Tippfehler-Domains 301 bei Hostpoint · Search Console (DNS-TXT) · Google Business Profile · `info@` und 079 933 31 11 testen · HR-Eintrag/UID/MWST · Versicherung · Rechtsprüfung AGB/Datenschutz/Impressum · Integrationsvertrag Packmer (07 §5) · Plausible-Konto (dann Script-Tag + Datenschutz §9) · echte Fotos · nach Deploy prüfen, dass `https://zuegelklar.ch/docs/…` 404 liefert.
