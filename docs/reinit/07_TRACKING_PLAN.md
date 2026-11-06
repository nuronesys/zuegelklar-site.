# 07 — Tracking- & Attributionsplan

**Stand:** 03.11.2026 · Grundlage: Audit G (lokal, nicht im Repo; vollständige Belege, Payload-Schema und JS-Skizze).
Nichts davon ist umgesetzt. Ziel: **organische Suchanfrage → Landingpage → Lead → Offerte → Auftrag → Umsatz**.

## 1. Ist-Zustand (verifiziert)

- **Kein Tracking**: keine Analytics, keine Tags, keine Cookies, kein Banner, keine Drittanbieter-Requests (Fonts lokal). Datenschutz §8/§9 «keine Analyse» ist heute korrekt.
- **Nur `index.html` hat ein Formular** (`#offerForm`, 11 Felder). Es baut eine WhatsApp-Nachricht (`wa.me/41799333111?text=`) oder `mailto:`. Ob der Kunde wirklich sendet, ist unbekannt.
- **Leads tragen keine Herkunft**: Die 33 Unterseiten verlinken `../#offerte` (Leistung geht verloren) und **185 nackte `wa.me`-Links ohne Text**. Ob ein Lead von `/umzug-zug/` oder von Google Ads kommt, ist nicht unterscheidbar.
- `mailto:` ohne Mailprogramm am Desktop → stiller Fehler.

## 2. Empfohlener Stack (eine Empfehlung)

| Baustein | Wahl | Begründung |
|---|---|---|
| Traffic & Events | **Plausible Cloud (EU)** | Cookielos, kein Banner nötig, EU-Hosting, 1 Script, Custom Events/Props. Passt zu GitHub Pages. ca. EUR 9–19/Monat. |
| Organische Suche | **Google Search Console** (Domain-Property via DNS-TXT bei Hostpoint) | Kein Script. **Jetzt einrichten** — Verifizierung funktioniert trotz `noindex`. |
| Leads, Offerten, Umsatz | **CRM = Source of Truth** | Plausible zählt Absichten, ein Lead ist erst ein Lead, wenn er im CRM steht. |
| GA4 + GTM + Consent Mode | **Später**, nur wenn Google Ads startet | Dann gclid-Erfassung + CMP. |
| Meta-Pixel, Clarity/Hotjar, GTM jetzt | **Reject** | Unverhältnismässig, Session-Recording über Formularfelder. |

## 3. Events

Konvention `objekt_aktion`, snake_case, **keine Personendaten in Props**. Gemeinsame Props: `page_type` (`home|service|city|ratgeber|grossauftrag|legal`), `service`, `city`.

| Event | Auslöser | Props | Conversion |
|---|---|---|---|
| `offer_form_start` | erste Eingabe im Formular, 1× pro Seitenaufruf | `entry`, `prefill_service` | Funnel-Schritt |
| `offer_form_error` | Validierung schlägt fehl | `missing` (Feldnamen) | Diagnose |
| `offer_form_submit` | Validierung ok, direkt vor Übergabe | `method` (`whatsapp|email|api`), `service`, `rooms_band`, `has_date`, `has_email`, `ref` | **Primär** |
| `whatsapp_click` | `wa.me`-Link ausserhalb Formular | `location`, `prefilled` | Sekundär |
| `phone_click` | `tel:` | `location` | Sekundär |
| `email_click` | `mailto:` | `location` | Sekundär |
| `cta_click` | interne CTA `a[data-cta]` | `location`, `cta_id`, `target` | nein |
| `scroll_depth`, `faq_open` | optional, nur Ratgeber | — | Experiment |

`location` als feste Liste über `data-loc`: `topbar, header, hero, drawer, sticky_bar, offer_section, inline_body, service_card, city_block, faq, footer`.
Leistungs-Slugs stabil und mit den Leistungsnamen im CRM abgestimmt: `privatumzug, umzugsreinigung, umzug_reinigung, raeumung_entsorgung, montage, international, firmenumzug, villa_anwesen, museum_kunst, seniorenumzug, klaviertransport, kleinumzug`.
Diese Namen ersetzen die Event-Namen der früheren Formular-Spezifikation (Git-Historie).

## 4. Attributions-Layer

**Pflichtfelder jedes künftigen Website-Leads:**
`source/channel`, `landingPage` (first + last), `conversionPage`, `service`, `city`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `referrerHost`, `timestamp` (`firstSeenAt`, `submittedAt`), `ref` (`ZK-XXXXXX`). `gclid` nur mit Google Ads.

- **Phase 1: nur `sessionStorage`** (`zk_attr = {first, last}`), keine Personendaten, Offenlegung in Datenschutz §8. Kein Banner.
- **Phase 2 (optional, nach Rechtsprüfung):** First-Touch 90 Tage in `localStorage` mit Opt-out.
- `channel` abgeleitet: `organic_search`, `paid_search`, `ai_assistant` (chatgpt.com, perplexity.ai …), `social`, `referral`, `email`, `direct`.

**Sofort ohne Backend nutzbar** — Fusszeile in WhatsApp-/Mail-Text:
```
—
Ref: ZK-7F3Q9K · Seite: /umzug-baden/ · Herkunft: Google-Suche
```
Plus: seitenspezifischer Vortext für alle `wa.me`-Links; Unterseiten-CTAs `../?leistung=umzugsreinigung#offerte` mit Vorauswahl im Formular.

Payload-Schema für die spätere CRM-API: Audit G (lokal, nicht im Repo) §4.3 (`brand: "zuegelklar"`, `channel: "website"`, `distribution: "none"` — beide **serverseitig gesetzt**, nie vom Client übernommen).

## 5. Trennung ZÜGELKLAR ↔ Packmer (P0-Entscheid vor jedem Endpoint)

Das CRM kennt zwei getrennte Wege für Anfragen: einen öffentlichen **Marktplatz-Eingang** (mit Verteilung an Partner) und die **Anfragen eines Betriebs** (nur mit Login). Einen anonymen Eingang direkt in den ZÜGELKLAR-Bereich gibt es noch nicht, und die Domain zuegelklar.ch ist im CRM derzeit dem Marktplatz-Weg zugeordnet. Details: Audit G (lokal).

Regeln für den Integrationsvertrag:
1. Die ZÜGELKLAR-Website ruft **nie** einen Marktplatz-Eingang auf.
2. Ein eigener Eingang schreibt direkt in die Anfragen des ZÜGELKLAR-Bereichs, Betrieb serverseitig fest, `source='website'`, `sourceRef='web:<ref>'`, `distribution='none'`.
3. Guard + Test: Inquiries mit eigener Herkunft können nicht in den Marktplatz exportiert werden.
4. Zuordnung von zuegelklar.ch zum Marktplatz-Weg im CRM aufheben oder begründen.
5. Reporting trennt eingekaufte Marktplatz-Leads von eigenen Leads.

CRM-Erweiterung: Herkunft `whatsapp`, `websiteRef`, Landingpage-, Channel-, UTM-Felder, `distribution`, Offertbetrag, Umsatz netto.

## 6. Datenschutz — nötige Anpassungen

| Stelle | Problem | Schwere |
|---|---|---|
| §5 | Nennt Packmer als «CRM … der Plattform Packmer» **und** als «Vermittlungsplattform» → Leser schliesst: Website-Anfragen landen auf einem Marktplatz. Verstösst ausserdem gegen Runde-3-Regel (kein Anbieter vor Bestätigung, `ZUEGELKLAR_FINAL_INPUT_CHECKLIST.md:93-96`, wieder eingeführt in `ca317a2`). | **P0** |
| Kopf-Hinweis «wird vor dem Livegang abgeglichen» | Vorläufiger Hinweis | P0 (beim Gate entfernen) |
| §8/§9 | Bei Plausible + sessionStorage nachführen | P1 (im selben PR) |
| §5 Überschrift «Uploads» | Kein Upload vorhanden | P2 |
| §11 | CRM-Hostingland unbekannt | P1 |
| §12 | Keine konkrete Frist; Vorschlag 12 Monate für Anfragen ohne Auftrag | P1 (Owner) |

Vorschlag Ersatztext §5 (Owner + Fachperson):
> Anfragen, Offerten, Aufträge und die Kundenkommunikation bearbeiten wir in einem CRM-System, das ein IT-Dienstleister in unserem Auftrag betreibt. Anfragen, die Sie direkt über diese Website, per WhatsApp, Telefon oder E-Mail an uns richten, bearbeiten ausschliesslich wir; sie werden nicht an Dritte oder an Vermittlungsplattformen weitergegeben.
>
> Erhalten wir eine Anfrage über eine Vermittlungsplattform, richtet sich die Bearbeitung durch die Plattform nach deren Datenschutzbestimmungen.

Der Satz «nicht an Vermittlungsplattformen weitergegeben» erst veröffentlichen, wenn Regel 1–3 technisch garantiert sind.

## 7. Formular-Endpoint (Reihenfolge)

1. **Launch:** WhatsApp/Mail bleibt + Attributions-Fusszeile + Plausible-Events + Mail-Fallback (Kopieren-Button).
2. **P1/P2:** Dedizierter Intake im ZÜGELKLAR-CRM (Option A) oder Relay (Cloudflare Worker / Hostpoint-PHP). Honeypot, Mindest-Ausfüllzeit, DB-Rate-Limit, Turnstile nur bei Spam, serverseitige Validierung, Idempotenz, Erfolg mit Referenznummer, WhatsApp-Fallback bei Fehler, transaktionale Bestätigungsmail.
3. **Reject:** Fremde Formular-Dienste (Formspree etc.) als Dauerlösung; Platzhalter-Endpoint.

## 8. Auswertung

Seitenebene, monatlich: GSC (Seite × Monat) ↔ Plausible (Einstiegsseiten, Events) ↔ CRM (`landingPageFirst`). Kennzahlen: Leads pro 100 organische Klicks, Offertquote, Abschlussquote, Umsatz pro Landingpage. Abfrage → Lead direkt ist nicht möglich (GSC aggregiert). Pfade gleich normalisieren (lowercase, Slash am Ende, ohne Query). Laufender Monat = «pending».
