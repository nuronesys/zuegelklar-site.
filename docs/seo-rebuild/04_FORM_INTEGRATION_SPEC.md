# 04 — Offertformular: Audit & Integrationsspezifikation

**Stand:** 24.09.2026
**Status:** Vorschau. Das Formular sendet nichts. Es wurde **kein** Backend angebunden.

**Update 25.09.2026 (N-10):** `name`-Attribute, `required` und die client-seitige
Upload-Prüfung sind eingebaut. F-1, F-2, F-3 und F-7 sind damit erledigt.
F-4, F-5, F-6, F-9 bleiben offen und sind unter L-5/L-6 terminiert.

Aktuelles Verhalten: `submit` wird per `event.preventDefault()` abgefangen, der Hinweistext
färbt sich rot. Kein Netzwerk-Request, kein Empfänger.

---

## 1. Audit der bestehenden Felder

| # | Feld | `id` | Typ | `name` | `required` | Label |
|---|---|---|---|---|---|---|
| 1 | Welche Leistung? | `f-leistung` | select (5 Optionen) | **fehlt** | nein | ja |
| 2 | Von (PLZ / Ort) | `f-von` | text | **fehlt** | nein | ja |
| 3 | Nach (PLZ / Ort) | `f-nach` | text | **fehlt** | nein | ja |
| 4 | Wunschtermin | `f-datum` | date | **fehlt** | nein | ja |
| 5 | Zimmer | `f-zimmer` | select (4 Optionen) | **fehlt** | nein | ja |
| 6 | Vorname / Name | `f-name` | text | **fehlt** | nein | ja |
| 7 | Telefon | `f-tel` | tel | **fehlt** | nein | ja |
| 8 | E-Mail | `f-mail` | email | **fehlt** | nein | ja |
| 9 | Fotos (optional) | `f-fotos` | file, `multiple`, `accept="image/*"` | **fehlt** | nein | ja |
| 10 | Kurz beschreiben | `f-msg` | textarea | **fehlt** | nein | ja |
| 11 | Einwilligung | `f-consent` | checkbox | **fehlt** | nein | ja |

### Befunde

| # | Befund | Schwere |
|---|---|---|
| F-1 | **Kein einziges Feld hat ein `name`-Attribut.** Ohne `name` überträgt kein klassischer Form-POST die Werte. | **BLOCKER** |
| F-2 | Das Formular hat `novalidate` und kein Feld ist `required`. Eine leere Anfrage wäre absendbar. | **BLOCKER** |
| F-3 | Die Consent-Checkbox ist nicht `required`. Eine Anfrage ohne Einwilligung darf nicht verarbeitet werden. | **BLOCKER** |
| F-4 | Kein `action`, kein `method`, kein Endpoint. | **BLOCKER** |
| F-5 | Kein Spam-Schutz (kein Honeypot, kein Rate-Limit, kein Captcha). | **BLOCKER** |
| F-6 | Kein Erfolgs- und kein Fehlerzustand. Der Nutzer erfährt nichts über das Ergebnis. | **BLOCKER** |
| F-7 | Datei-Upload ohne Grössen- und Mengenbegrenzung im Markup. | hoch |
| F-8 | Fehlermeldungen sind nicht mit `aria-live` oder `aria-describedby` verknüpft. | mittel |
| F-9 | Keine UTM-Erfassung — Herkunft einer Anfrage ist später nicht rekonstruierbar. | mittel |
| F-10 | `f-datum` ohne `min` — ein Termin in der Vergangenheit ist wählbar. | niedrig |

### Was bereits gut ist

- Jedes Feld hat ein korrekt verknüpftes `<label for>`.
- Sinnvolle Eingabetypen (`tel`, `email`, `date`, `file`) — auf dem Handy erscheint die richtige Tastatur.
- `autocomplete` ist auf Name, Telefon und E-Mail gesetzt.
- Die Consent-Checkbox verlinkt auf die Datenschutzerklärung.
- Der Foto-Upload ist ein echter Wettbewerbsvorteil — er ersetzt in vielen Fällen die Besichtigung.

---

## 2. Vorgeschlagenes Payload-Schema (noch nicht implementiert)

```jsonc
{
  "source": "website",
  "landingPage": "https://zuegelklar.ch/",
  "submittedAt": "2026-09-24T18:30:00+02:00",

  "service": "privatumzug | umzugsreinigung | umzug_und_reinigung | raeumung | international",
  "origin":      { "raw": "5507 Mellingen", "postalCode": "5507", "city": "Mellingen" },
  "destination": { "raw": "8000 Zürich",    "postalCode": "8000", "city": "Zürich" },
  "moveDate": "2026-11-01",
  "moveDateFlexible": false,
  "rooms": "2.5-3.5",

  "customerName": "…",
  "phone": "+41…",
  "email": "…@…",
  "preferredContact": "phone | email",
  "message": "…",

  "files": [
    { "id": "…", "filename": "kueche.jpg", "mimeType": "image/jpeg", "bytes": 1234567 }
  ],

  "consent": { "privacy": true, "timestamp": "2026-09-24T18:30:00+02:00", "policyVersion": "2026-09-24" },
  "marketingConsent": false,

  "utm": { "source": null, "medium": null, "campaign": null, "term": null, "content": null },

  "meta": { "userAgent": "…", "locale": "de-CH", "referrer": "…" }
}
```

**`marketingConsent` ist bewusst getrennt.** Eine Offertanfrage darf keine Werbe-Einwilligung
mitliefern (DSG). Ohne Newsletter braucht es auch kein Double-Opt-in.

---

## 3. Anforderungen an die spätere Anbindung

**Sicherheit.** Kein API-Key im Frontend. Der Aufruf des CRM läuft server-seitig über eine
kleine Funktion (Cloudflare Worker, Netlify/Vercel Function oder ein Endpoint beim CRM).
GitHub Pages ist rein statisch und kann das nicht selbst.

**Validierung.** Doppelt: im Browser (`required`, Muster, Datei-Limits) und server-seitig.
Der Browser-Check ist Komfort, der Server-Check ist die Sicherheit.

**Spam.** Honeypot-Feld + Mindest-Ausfüllzeit + Rate-Limit pro IP. Erst wenn das nicht
reicht, ein Captcha — es kostet Conversions.

**Uploads — Owner-Entscheid 19 (25.09.2026), verbindlich.** Max. **10 Dateien**, je **8 MB**,
insgesamt **40 MB**, nur `image/jpeg`, `image/png`, `image/webp`. **HEIC/HEIF ist nicht
zugelassen**, solange das Backend die Umwandlung nicht nachweislich beherrscht. Prüfung nach
tatsächlichem Dateityp, nicht nach Endung.

Die client-seitige Prüfung ist seit dem 25.09.2026 in `index.html` implementiert (Komfort).
**Sie ersetzt die server-seitige Prüfung nicht** — dieselben Grenzen müssen bei der
Aktivierung des Formulars server-seitig erzwungen werden (L-6).

**Idempotenz.** Client-seitige Request-ID mitsenden, damit ein Doppelklick keine zwei Leads erzeugt.

**Zustände.** Absende-Sperre während des Sendens, klare Erfolgsmeldung mit Referenznummer,
unterscheidbare Fehlermeldungen (Netzwerk / Validierung / Server) — jeweils in einer
`aria-live="polite"`-Region.

**Analytics-Events** (erst nach Consent-Setup): `quote_form_started`, `quote_form_submitted`,
`quote_form_error`, `phone_click`, `email_click`.

---

## 4. Empfohlene Reihenfolge

1. `name`-Attribute ergänzen, `required` setzen, Consent verpflichtend machen
2. Endpoint und Auth mit dem CRM festlegen
3. Server-Funktion bauen (Validierung, Spam, Datei-Handling)
4. Erfolgs-/Fehlerzustände im Frontend
5. Ende-zu-Ende-Test mit einer echten Anfrage
6. **Erst dann** den Hinweis „Vorschau" entfernen

Bis Schritt 6 abgeschlossen ist, bleibt das Formular ein Blocker für die Indexierung: ein
Kontaktformular, das nichts sendet, ist schlechter als keines.
