# 06 — AI-Search-Sichtbarkeit & Entity-Klarheit

**Stand:** 03.11.2026 · Grundlage: Audit C §6 (Skill `ai-seo`), Audits A und B.

Heute ist die Site für alle Suchsysteme unsichtbar (gewollt). Google AI Overviews/AI Mode nutzen den normalen Index — gute Architektur ist auch AI-SEO. ChatGPT, Perplexity, Copilot belohnen extrahierbare, konsistente Fakten und Bestätigung durch Dritte.
**Keine erfundene Autorität.**

## 1. Entity

| Punkt | Regel |
|---|---|
| Markenname | **ZÜGELKLAR** überall. Schema `alternateName: ["Zügelklar", "Zuegelklar"]`. |
| Rechtsname | sichtbar «Zügelklar Umzug GmbH in Gründung». **Kein `legalName` im Schema** bis HR-Eintrag. |
| Logo | darf kein «GmbH» ohne Eintrag zeigen → `content-v12` entscheiden. |
| Schema-Knoten | ein `MovingCompany` mit `"@id": "https://zuegelklar.ch/#organization"` auf `/` (und `/ueber-uns/`, `/kontakt/`); `email`, `telephone`, Adresse, Öffnungszeiten, `knowsLanguage`. Ein `WebSite`-Knoten mit `publisher` → `@id`. |
| Leistungs-/Ortsseiten | `Service` mit `provider` → `@id`, `areaServed`. Nie `LocalBusiness` auf Ortsseiten. |
| Ratgeber | `Article` mit `dateModified` = sichtbares «Stand», `author`/`publisher` = Organisation. **Keine erfundene Person als Autor.** |
| Erst wenn echt | `aggregateRating`, `review`, `sameAs` (erster Eintrag = verifiziertes GBP), `vatID`, `foundingDate`, `numberOfEmployees`, `hasCredential`, Versicherer |
| `areaServed` | muss der sichtbaren Liste und dem Einsatzgebiet-Hub entsprechen. Luzern/Winterthur: «auf Anfrage» kennzeichnen oder entfernen. |

## 2. Ein Faktenblock (P1, `/ueber-uns/`, Kurzfassung im Footer)

Nur aus bestätigten Fakten:

> **ZÜGELKLAR** ist ein Umzugsunternehmen mit Basis in Mellingen AG (Obere Bahnhofstrasse 24, 5507 Mellingen). Leistungen: Privatumzug, Umzugsreinigung mit Abnahmegarantie, Räumung und Entsorgung, Möbelmontage, Umzüge ins Ausland sowie Grossaufträge (Villen, Kunst, Firmen). Einsatzgebiet: Aargau, Raum Zürich, Zug, übrige Schweiz auf Anfrage; keine Filialen. Kontakt: 079 933 31 11 (auch WhatsApp), info@zuegelklar.ch, Montag–Freitag 08:00–18:00. Rechtsform: Zügelklar Umzug GmbH in Gründung (Stand: <Datum>).

Erfahrung des Gründers («rund zehn Jahre», laut Firmen-Master `01_CURRENT_FACTS.md` vom Owner bestätigt) nur mit Owner-OK zur öffentlichen Nennung und **einmal** formuliert — nicht dreifach wie heute auf der Startseite. Nie Anzahl Umzüge oder Kunden.

## 3. Zitierfähige Antworten

- Jede Geld-Seite beginnt mit einem 40–60-Wort-Absatz, der für sich allein verständlich ist.
- **Eine** wörtliche Definition der Abnahmegarantie (heute 3 Varianten → Paraphrase-Fehler in KI-Antworten).
- FAQ bleiben seitenspezifisch (114 einzigartige). Sichtbar = Schema, Wort für Wort (heute 1 Abweichung: Startseite «Ist eine Besichtigung nötig?»).
- Ratgeber behalten «Stand» und amtliche Quellen — das stärkste legitime Zitier-Signal.
- Die Vergleichstabelle «Halteverbot & Sperrgut nach Gemeinde» im Einsatzgebiet-Hub ist einzigartige, verlinkbare Information.

## 4. `llms.txt`: **Reject für den Launch**

- Keine grosse Suchmaschine dokumentiert die Nutzung für Abruf oder Ranking; Google sagt ausdrücklich, dass keine speziellen KI-Dateien nötig sind.
- 34 Seiten sauberes, serverseitig gerendertes HTML ohne JS-Hürden — es gibt nichts «freizuschalten».
- Zweite Stelle, an der Fakten synchron bleiben müssen, bei offenen Rechtspunkten ein Risiko.
- Höchstens später als Experiment, generiert aus Faktenblock + Sitemap.

**`robots.txt` beim Launch:** `User-agent: *` / `Allow: /`. Such- und Abruf-Bots nicht blockieren (`OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, `ChatGPT-User`). Ob Trainings-Crawler (`GPTBot`, `ClaudeBot`, `Google-Extended`) ausgeschlossen werden: **Owner-Entscheid**.

## 5. Fehlende Belege ausserhalb der Website (grösster Hebel)

| Lücke | Massnahme |
|---|---|
| Handelsregister / UID | Eintragen; danach `legalName`, UID in Impressum + Schema |
| Google Business Profile | Service-Area-Profil «ZÜGELKLAR», Adresse verborgen, Kategorie Umzugsunternehmen, nur echte Fotos, nicht mit Packmer verknüpft (Details Audit B §7); danach `sameAs` |
| Bewertungen | Nach jedem echten Auftrag GBP-Link; keine Anreize, keine Freunde/Familie |
| Verzeichnisse | local.ch, search.ch mit exakt identischem NAP |
| Echte Fotos | Gründer, Fahrzeug, Material, Einsätze — ersetzen schrittweise «Symbolbild» |
| Fallbeispiele | erst ab echten, freigegebenen Aufträgen |

## 6. Monitoring nach Launch

Monatlich je 3–5× pro Engine prüfen und Erwähnungsrate notieren: «Umzugsfirma Mellingen», «Zügelfirma Baden empfehlen», «Umzugsreinigung mit Abnahmegarantie Aargau», «Wer macht Umzug und Reinigung zusammen im Aargau?», «Wohnungsräumung Aargau Firma», «Was kostet ein Umzug im Aargau?», «Halteverbot Umzug Baden beantragen», «Was ist ZÜGELKLAR?». Kanal `ai_assistant` im Tracking (07) misst Besuche aus diesen Quellen.
