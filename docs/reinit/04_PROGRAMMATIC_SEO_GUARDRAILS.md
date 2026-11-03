# 04 — Programmatic-SEO-Leitplanken & Quality Gate

**Stand:** 03.11.2026 · Grundlage: Audit B §6/§8, Audit C §3.

## 1. Grundsatz

Programmatisch heisst hier: **einheitliche Vorlage + geprüfte Daten + automatische Prüfung** — nicht Masse.
Google-Richtlinien zu *Doorway Pages* und *Scaled Content Abuse* (März 2024) zielen genau auf «Umzug {Gemeinde}»-Serien. Eine schwache Serie kann die Bewertung der ganzen Domain drücken. ZÜGELKLAR hat heute keine Bewertungen, Fälle, HR-Eintrag oder echte Fotos → wenig Vertrauenspuffer.

Zusätzlich: Jede Ortsseite enthält 10+ zeitgebundene Fakten. 100 Ortsseiten = über 1000 Fakten jährlich zu prüfen. Das ist für einen Kleinbetrieb nicht tragbar.

Map-Pack-Rankings hängen an der Nähe zum verifizierten Google-Profil (Mellingen). Ortsseiten über ~15–20 km konkurrieren nur organisch.

## 2. Rollout

| Welle | URLs total | Inhalt | Bedingung |
|---|---|---|---|
| **Heute** | 34 | 1 Start, 12 Leistungen, 11 Orte, 7 Ratgeber, 3 Recht | — |
| **Wave 1** (Launch) | **≈ 42–45** | + `/leistungen/`, `/einsatzgebiet/` (mit Vergleichstabelle Halteverbot & Sperrgut), `/offerte/`, `/ueber-uns/`, `404.html`; + 2–3 regionale Seiten mit verifizierten Daten: **Rohrdorferberg/Reusstal** (Niederrohrdorf, Oberrohrdorf, Remetschwil, Bellikon, Stetten, Fislisbach), **Spreitenbach** (mit Killwangen, Neuenhof), **Siggenthal** (Nussbaumen, Untersiggenthal, Ennetbaden); + 1–2 Ratgeber (Abnahmegarantie; Umzugsofferte vergleichen) | Bestehende 11 Ortsseiten zuerst auf Standard `03` bringen |
| **Wave 2** | **50–70** | + 6–10 Orte/Regionen (Mutschellen, Würenlos, Dottikon/Othmarsingen/Mägenwil, Muri AG, Suhr/Buchs, Seon/Seetal; Schlieren/Urdorf; Zofingen/Rheinfelden nur bei echten Anfragen) · max. 4–6 Service×Ort-Seiten, zuerst **Räumung & Entsorgung Baden** (Entsorgungsregeln echt lokal) · `/kontakt/` · 4–6 Ratgeber · `/referenzen/` ab 3 echten Fällen | ≥ 8 Wochen Search-Console-Daten, GBP verifiziert, erste echte Bewertungen und Fotos |
| **Langfristig** | **80–120** | Wachstum über Ratgeber, echte Fallbeispiele und wenige belegte Service×Ort-Seiten | Ortsseiten hart begrenzt auf ~25 |

**Abgelehnt:** eine Seite pro Gemeinde in den Bezirken Baden/Bremgarten/Lenzburg (~70); Matrix «Leistung × jeder Ort» (11 × 8 = 88 Beinahe-Duplikate); Seiten für Luzern, Winterthur, Basel, Bern, nur weil sie im Schema stehen; separate GBP pro Ort; 300–1000 Seiten.

**Abgleich der Audits:** Audit B wollte «Räumung Baden» schon in Wave 1, Audit C lehnt Service×Ort vorerst ab. **Entscheid:** Wave 2, sobald GSC Impressionen für die Kombination zeigt.

## 3. Quality Gate (automatisch)

Umsetzung als `npm run check:quality` in `scripts/prelaunch-check.mjs` (bzw. im Generator). Gilt für alle `/umzug-*/` und künftige `/{leistung}-{ort}/`.

```yaml
identity:
  title_unique_sitewide: BLOCK
  h1_unique_sitewide: BLOCK
  meta_description_unique_sitewide: BLOCK
  title_length: [35, 60]            # WARN ausserhalb
  description_length: [110, 160]    # WARN ausserhalb
  title_and_h1_contain_city: BLOCK
  exactly_one_h1: BLOCK
duplication:   # Haupttext ohne Header/Footer/Aside/Quellen, Ortsnamen normalisiert
  jaccard_5shingle_vs_any_location_page: { warn: 0.20, block: 0.35 }
  containment_vs_any_location_page:      { warn: 0.30, block: 0.45 }
  identical_sentence_share:              { warn: 0.25, block: 0.40 }
  lead_paragraph_shared_sentence: WARN   # BLOCK, wenn ganzer Lead identisch
  allowlist: [Quellenhinweis «Ohne Gewähr …», Abnahmegarantie-Definition, CTA-Box]
substance:
  main_words_min: 600                   # BLOCK < 450
  unique_local_words_min: 350           # heute Minimum 583
  local_entities_min: 4                 # Ämter, Strassen, Orte, Werkhof …
  official_sources_min: 3               # BLOCK < 2, Wikipedia zählt nicht
  stand_date_age_days: { warn: 270, block: 400 }
required_blocks: siehe 03 §2 (BLOCK-Zeilen)
internal_links:
  to_other_location_pages_min: 2        # BLOCK bei 0
  to_service_pages_min: 2
  to_hub_min: 1
  inbound_from_location_pages_min: 2
  all_internal_links_resolve: BLOCK
technical:
  canonical_self_absolute_https_trailing_slash: BLOCK
  in_sitemap: BLOCK
  robots_meta_equals_launch_flag: BLOCK
  breadcrumb_visible_equals_schema: BLOCK
  schema_allowed: [BreadcrumbList, FAQPage, Service, WebPage]
  schema_forbidden: [LocalBusiness, MovingCompany, AggregateRating, Review, fremde PostalAddress]
  faq_schema_equals_visible_text: BLOCK
nap:
  phone: [+41799333111, "079 933 31 11"]
  address: "Obere Bahnhofstrasse 24, 5507 Mellingen"
  name: [ZÜGELKLAR, "Zügelklar Umzug GmbH in Gründung"]
claims_denylist:   # sichtbarer Text, BLOCK ausser mit Beleg in data/claims.json
  - /(Filiale|Niederlassung|Standort) in (?!Mellingen)/   # ohne Verneinung
  - /\b(versichert|zertifiziert|Nr\. ?1|Testsieger|seit 19\d\d)\b/
  - /\b\d+\s*(zufriedene )?Kunden\b/
  - /ab CHF ?\d+/                                          # eigene Preise nur nach Pricing-Phase
  - /Bewertungen?|Sterne/                                  # ausser echtes GBP-Widget
symbolbild:
  ai_images_listed_in_data/images.json_require_label: BLOCK
```

## 4. Manuelle Freigabe

Kein Gate ersetzt den Owner: neue Ortsseite nur mit verifiziertem Datensatz, Owner-OK und Nachweis von Nachfrage (Anfrage, Auftrag oder GSC-Impressionen). Max. 3 neue Ortsseiten pro Monat.

## 5. Bei Rot

Seite bleibt `noindex` und aus der Sitemap, bis sie besteht — oder wird in den Hub/eine Regionalseite zusammengelegt.
