# ZÜGELKLAR — Launch-Checkliste

**Stand:** 18.09.2026 · Build `V9-2026-09-18`
**Domain:** https://zuegelklar.ch (aktiv, HTTPS) · Weiterleitungs-Domains: `zeugelklar.ch`, `zueglklar.ch`
**Hosting:** GitHub Pages · Repo `nuronesys/zuegelklar-site.` · Branch `main` / root
**Status:** PREVIEW — `noindex,nofollow` in `index.html` **und** `Disallow: /` in `robots.txt`

---

## 1. Erledigt

| Bereich | Was |
|---|---|
| Domain | `zuegelklar.ch` registriert, DNS auf GitHub Pages (4× A, 4× AAAA, www CNAME), `CNAME`-Datei im Repo, HTTPS aktiv |
| E-Mail-DNS | MX, SPF, DKIM, DMARC bei Hostpoint unverändert — Mailversand bleibt intakt |
| Startseite | Neues Design V9 ist jetzt `index.html` (Route-Hero mit Dach-Chevron, dunkles Abnahmegarantie-Band, Ablauf-Route, Über uns, Einsatzgebiet) |
| Mobile | Burger-Navigation, feste Aktionsleiste (Anrufen / Offerte), keine horizontalen Überläufe bei 390 px geprüft |
| Formular | Leistung, Von/Nach, Termin, Zimmer, Kontakt, **Foto-Upload**, **Consent-Checkbox** mit Link zur Datenschutzerklärung |
| SEO-Technik | Title + Description mit „Umzugsfirma Aargau", `canonical`, Open Graph auf die echte Domain, FAQPage-Schema, `robots.txt`, `sitemap.xml`, Favicon-Set |
| Ehrlichkeit | Alle KI-Bilder mit Personen als **Symbolbild** gekennzeichnet; keine erfundenen Bewertungen, Zahlen oder Standorte |

---

## 2. Platzhalter — Suchen & Ersetzen in `index.html`

| Marker | Wo |
|---|---|
| `[[FOTO-01]]` | Über uns — Porträt des Inhabers |
| `[[FOTO-02]]` | Über uns — Teamfoto vor den Fahrzeugen |
| `[NAME DES INHABERS]` | Über uns |
| `[STANDORT]` | Einsatzgebiet (3×) |
| `[TELEFON]` | Topbar, Hero, Menü, Formular, Footer — auch in `href="tel:"` |
| `[E-MAIL]` | Topbar, Footer — auch in `href="mailto:"` |
| `[ADRESSE]` | Footer |
| `ab CHF ___` | 4 Leistungskarten |

---

## 3. Blockiert — wartet auf echte Daten

| Thema | Fehlt |
|---|---|
| Handelsregister | Eintrag, HR-Amt, UID `CHE-…`, vertretungsberechtigte Person |
| Adresse | Strasse, PLZ, Ort |
| Telefon / E-Mail | Geschäftsnummer, Geschäfts-Mailadresse |
| Preise | Einstiegspreise pro Leistung |
| Fotos | Team, Fahrzeuge, Besichtigung, Übergabe |
| Haftpflicht | Versicherer, Deckungssumme |
| CRM | Endpoint, Auth, API-Contract für das Formular |

---

## 4. Go-live-Reihenfolge

1. Firmendaten eintragen (Abschnitt 2)
2. Rechtsseiten `/agb`, `/datenschutz`, `/impressum` erstellen und im Footer verlinken
3. Formular an das CRM anbinden (`source=website`, Spam-Schutz, Fehlerbehandlung)
4. Echte Fotos ersetzen die Symbolbilder
5. LocalBusiness-Schema unten in `index.html` einkommentieren und ausfüllen
6. QA: Mobile, Tastatur, Kontrast, Ladezeit, Formular Ende-zu-Ende
7. **Erst dann:** `noindex,nofollow` aus `index.html` entfernen **und** `Disallow: /` aus `robots.txt` löschen
8. Google Search Console + Google Business Profile einrichten, Sitemap einreichen

---

## 5. Offene Aufgaben ausserhalb des Codes

- **Domain-Weiterleitung** bei Hostpoint: `zeugelklar.ch` und `zueglklar.ch` → 301 auf `zuegelklar.ch`
- **Repo-Name** `zuegelklar-site.` (mit Punkt) — kann jetzt umbenannt werden, die Domain bleibt davon unberührt
- **Bewertungen** ab dem ersten Auftrag systematisch einsammeln (Google-Review-Link nach Abschluss)

---

## 6. Regeln, die bleiben

- Keine Fake-Bewertungen, -Standorte, -Zahlen, -Zertifikate.
- Keine Nachhaltigkeits-Claims ohne Nachweis — nur „fachgerechte Entsorgung".
- „10+ Jahre Branchenerfahrung" = Erfahrung der Personen, nicht Alter der Gesellschaft.
- „GmbH" erst als Rechtsform führen, wenn der Handelsregistereintrag vorliegt.
- Kein Firmenumzug / B2B im Launch-Scope. Kein WhatsApp als Launch-Kanal.
- Packmer und ZÜGELKLAR bleiben getrennt.
