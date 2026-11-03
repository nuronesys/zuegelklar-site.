# 01 — Skill- & Agent-Matrix

**Stand:** 03.11.2026 · Inventar der in dieser Sitzung installierten Skills und Agent-Typen.
Regel: Ein Skill wird nur eingesetzt, wenn er einen konkreten Beitrag liefert. Die bestehende ZÜGELKLAR-Marke hat Vorrang vor jedem Design-/Theme-Skill.

Legende Relevanz: **YES** = in dieser Reinit genutzt · **LATER** = für eine spätere Phase vorgesehen · **NO** = NOT APPLICABLE

## A. Marketing-/SEO-Skills (Anthropic)

| Skill | Relevant? | Phase | Konkrete Verantwortung | Erwarteter Output | Abhängigkeiten |
|---|---|---|---|---|---|
| `site-architecture` | **YES** | 3 | IA, Navigation, Leistungs-/Regionen-Hierarchie, URL-Schema, Breadcrumbs, interne Verlinkung | `02_SITE_ARCHITECTURE_V2.md` | Reality Check, Intent-Map |
| `programmatic-seo` | **YES** | 4–5 | Ortsseiten-System, Service×Ort-Chancen, Templates, Datenfelder, Anti-Doorway-Regeln. **Keine Massengenerierung.** | `03_CITY_PAGE_STANDARD.md`, `04_PROGRAMMATIC_SEO_GUARDRAILS.md` | Ähnlichkeitsanalyse der 11 Ortsseiten |
| `ai-seo` | **YES** | 7 | Entity-Klarheit, zitierfähige Fakten, FAQ-Struktur, Bewertung `llms.txt` | `06_AI_SEARCH_VISIBILITY.md` | Schema-Audit, NAP |
| `analytics` | **YES** | 8 | Messplan, Tool-Empfehlung, Events, UTM-Persistenz, Lead-/CRM-Attribution | `07_TRACKING_PLAN.md` | Formular-Entscheid, CRM, Datenschutz |
| `marketing-psychology` | **YES** | 10 | Vertrauen, Risikoreduktion, Reibung, CTA-Klarheit, Preisangst, Formularpsychologie. Keine Dark Patterns. | Teil von `08_CONVERSION_REVIEW.md` | CRO-Audit |
| `ab-testing` | **YES** | 10 | Experiment-Backlog mit Mindest-Traffic-Logik. Keine Tests vor ausreichendem Traffic. | Backlog in `08_CONVERSION_REVIEW.md` | Analytics live |
| `marketing-council` | **YES** (1×) | 10 | Eine strukturierte Runde zu Positionierung, Vertrauen, Differenzierung, Angebotsklarheit. Beratend. | Abschnitt in `08` | CRO-Audit |
| `stop-slop` | **YES** | 9 | Alle öffentlichen deutschen Texte auf KI-Floskeln, Wiederholungen, Superlative prüfen | Funde-Tabelle in `08` / Report | Textextraktion aller Seiten |
| `image` | **YES** | 11 | Bildstrategie Orts-/Leistungsseiten, Namenskonvention, Formate, Alt-Texte, «Symbolbild»-Regel | Abschnitt Bilder im Report | Brand-Regeln |
| `file-organizer` | **YES** | 13 | Bestandsaufnahme Assets, Docs, alte Entwürfe, Duplikate. **Kein automatisches Löschen.** | `09_REPO_CLEANUP_PROPOSAL.md` | Reality Check |
| `social` | **LATER** | nach Launch | Wiederverwendung fertiger Seiten/Fallbeispiele für GBP, Instagram, Facebook | Distributions-Backlog (Report §15) | echte Fotos, Fallbeispiele |
| `emails` | **LATER** | nach CRM | Bestätigungs- und Nachfass-Mails nach Offertanfrage | — | CRM-Anbindung |
| `video` | **LATER** | nach Launch | Reels aus echten Einsätzen | — | echtes Bildmaterial |
| `marketing-ideas` | **LATER** | nach Wave 1 | Akquise-Ideen (Verwaltungen, Hauswarte, Seniorenresidenzen). Ändert nicht die Architektur. | Backlog | Search-Console-Daten |
| `signup` | **NO** | — | Das Angebot ist ein Lead-/Offertformular, kein Konto- oder Signup-Flow. **NOT APPLICABLE.** | — | — |
| `programmatic-seo` für 300–1000 Seiten | **NO** | — | Ausdrücklich ausgeschlossen. | — | — |
| `image` (KI-Generierung) | **LATER** | 11 | Nur Orts-/Umgebungsbilder; Personen nur mit «Symbolbild». Echte Fotos haben Vorrang. | Bildliste | Owner-Freigabe |

## B. Design-/Build-Skills

| Skill | Relevant? | Begründung |
|---|---|---|
| `ui-ux-pro-max` | **LATER** | Nur für gezielte Komponenten (Formular, Sticky-Karte), innerhalb des bestehenden Designs. |
| `ui-styling` (shadcn/Tailwind) | **NO** | Statische Site ohne React/Tailwind. Würde Stack und Marke ändern. NOT APPLICABLE. |
| `design`, `design-system`, `brand`, `banner-design` | **NO** (jetzt) | Marke ist seit 05.09.2026 freigegeben und gesperrt. `banner-design` ggf. LATER für GBP-Titelbild. |
| `theme-factory`, `brand-guidelines` (Anthropic-Marke) | **NO** | Würden fremde Marke/Themes einführen. NOT APPLICABLE. |
| `web-artifacts-builder`, `artifact-*` | **NO** | Für claude.ai-Artefakte, nicht für die Produktions-Website. |
| `react-best-practices` | **NO** | Kein React. Relevant nur, falls Astro mit React-Inseln gewählt würde (wird nicht empfohlen). |
| `canvas-design`, `algorithmic-art`, `slack-gif-creator` | **NO** | Kein Projektbezug. |
| `dataviz` | **NO** | Keine Diagramme auf der Website geplant. |

## C. Medien-Skills (Picsart gen-ai, cinematic-video)

| Skill | Relevant? | Begründung |
|---|---|---|
| `gen-ai-images`, `gen-ai-batch`, `gen-ai-workflows` | **LATER** | Höchstens für Orts-Umgebungsbilder (Altstadt, Strassenzug) — aber echte Fotos sind glaubwürdiger. Keine generierten Mitarbeitenden/Fahrzeuge als Beleg. |
| `gen-ai-video`, `gen-ai-audio`, `gen-ai-persona-creation`, cinematic-video | **NO** | Persona/Influencer widerspricht der Echtheitsregel. NOT APPLICABLE. |
| `install-gen-ai-cli-and-mcp`, `gen-ai-use` | **NO** | Nur nötig, wenn Bildgenerierung freigegeben wird. |
| `video-downloader` | **NO** | Kein Projektbezug. |

## D. Dokument-/Office-Skills

| Skill | Relevant? | Begründung |
|---|---|---|
| `docs`, `doc-coauthoring` | **NO** | Projektdocs leben versioniert im Repo (`docs/`). |
| `docx`, `pdf`, `pptx`, `xlsx` | **LATER** | Nur falls Rechtsseiten als Word für den Anwalt exportiert werden sollen. |
| `google-workspace`, `internal-comms` | **NO** | Kein Bedarf. |

## E. Fremdprojekt-Skills

| Skill | Relevant? | Begründung |
|---|---|---|
| `bahnhoefli-*`, `galaxy-*` | **NO** | Andere Unternehmen. NOT APPLICABLE. |

## F. Werkzeug-Skills

| Skill | Relevant? | Begründung |
|---|---|---|
| `code-review`, `simplify`, `security-review` | **LATER** | Bei der Umsetzung (Generator, Formular-JS) vor jedem PR. |
| `run` | **LATER** | Visuelle Prüfung der Seiten bei Umsetzung. |
| `consolidate-memory`, `find-skills`, `skill-creator`, `mcp-builder`, `loop`, `schedule`, `explain-usage`, `learn`, `setup-claude`, `import-memory`, `morning`, `update-config`, `keybindings-help`, `fewer-permission-prompts`, `init`, `claude-api`, `workflow-authoring`, `plugin-authoring` | **NO** | Sitzungs-/Werkzeugverwaltung ohne Website-Bezug. |
| `anthropic-skills:artifact-emulator` | **NO** | Nur Cloud-Sitzungen. |

## G. Agents

| Agent-Typ | Eingesetzt | Rolle in dieser Reinit |
|---|---|---|
| `general-purpose` | **YES** (5 parallel) | **A+F** Technical SEO + Performance/A11y + Architekturentscheid · **B** Local SEO + Ortsseiten-Qualität · **C+D** Site-Architektur + Search-Intent + AI-SEO · **E+H** UX/CRO + Psychologie + Council + stop-slop · **G** Analytics + Formular/CRM + Datenschutz-Konsistenz |
| Haupt-Agent | **YES** | Reality Check, Skill-Matrix, Datei-Inventar, Abgleich der Widersprüche, Synthese |
| `Explore` | NO | Repo ist klein (109 Dateien); direkte Analyse effizienter. |
| `Plan` | NO | Planung erfolgt in der Synthese durch den Haupt-Agent. |
| `claude-code-guide`, `statusline-setup`, `claude` | NO | Kein Projektbezug. |

Rollen wurden zusammengelegt (8 → 5), weil sie dieselben Dateien lesen und sonst doppelte Arbeit entsteht. Jeder Agent arbeitet **read-only** und liefert einen Bericht; nur der Haupt-Agent schreibt in `docs/reinit/`.
