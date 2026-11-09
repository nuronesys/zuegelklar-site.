/* ZÜGELKLAR Schnellanfrage
 * Von jeder Seite in 3 Schritten: «Offerte» tippen → Leistung wählen → Name + Telefon senden.
 * Danach optional: Adressen und Datum ergänzen.
 * Versand: Web3Forms an info@zuegelklar.ch, sobald data-key am <script> gesetzt ist.
 * Ohne Schlüssel (oder bei Fehler): WhatsApp mit vorbereitetem Text.
 * Auslöser: a.pill mit href «#offerte», Links auf «/offerte/», [data-quick] (Wert = Leistung vorwählen),
 * form.quick (Von/Nach werden übernommen). Ohne JavaScript führen alle Links weiter zur Offertseite.
 */
(function () {
  var S = document.currentScript;
  // Web3Forms-Schlüssel: EINMAL hier eintragen, gilt für alle Seiten
  var WEB3FORMS_KEY = '458f1598-d171-4c3f-b181-8a4fa5601893';
  var KEY = (S && S.getAttribute('data-key')) || WEB3FORMS_KEY;
  // Leistung aus ?leistung=… oder <body data-service> → Kachel in der Schnellanfrage
  var SLUG = {
    privatumzug: 'Umzug', umzugsreinigung: 'Reinigung', umzug_reinigung: 'Umzug + Reinigung', raeumung_entsorgung: 'Räumung',
    firmenumzug: 'Firmenumzug', montage: 'Demontage & Montage', international: 'Umzug ins Ausland', seniorenumzug: 'Seniorenumzug',
    kleinumzug: 'Kleinumzug', klaviertransport: 'Klaviertransport', villa_anwesen: 'Villa / Anwesen', museum_kunst: 'Museum / Kunst'
  };
  function slugService(href) {
    var m = /[?&]leistung=([a-z_]+)/.exec(href || '');
    var s = m ? m[1] : (document.body && document.body.getAttribute('data-service')) || '';
    return SLUG[s] || '';
  }
  var WA = '41799333111', TEL = '079 933 31 11', MAIL = 'info@zuegelklar.ch';
  var BASE = (S && S.getAttribute('data-base')) || '/';
  var SERVICES = [
    ['Umzug', 'Privat, Wohnung oder Haus'],
    ['Reinigung', 'Endreinigung mit Abnahmegarantie'],
    ['Umzug + Reinigung', 'Alles aus einer Hand'],
    ['Räumung', 'Entsorgung, Keller, Estrich'],
    ['Firmenumzug', 'Büro, Praxis, Laden'],
    ['Etwas anderes', 'Klavier, Kunst, Ausland …']
  ];
  var state = { service: '', name: '', tel: '', von: '', nach: '', ref: '', zimmer: '', datum: '', info: '' };
  var lastFocus = null;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function track(name, data) {
    try { if (window.gtag) window.gtag('event', name, data || {}); } catch (e) {}
    try { if (window.plausible) window.plausible(name, { props: data || {} }); } catch (e) {}
  }
  function ref() { var d = new Date(); return 'ZK-' + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase(); }

  var root = document.createElement('div');
  root.className = 'zq';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-labelledby', 'zq-h1');
  root.setAttribute('data-lenis-prevent', '');
  root.innerHTML =
    '<div class="zq-bg" data-close></div>' +
    '<div class="zq-box">' +
      '<div class="zq-top"><div class="zq-steps" aria-hidden="true"><i></i><i></i><i></i></div><button class="zq-x" type="button" data-close aria-label="Schliessen">×</button></div>' +

      '<section class="zq-step" data-step="1">' +
        '<h2 id="zq-h1">Was dürfen wir für Sie tun?</h2><p class="zq-sub">Ein Tipp genügt. Besichtigung gratis, Offerte unverbindlich.</p>' +
        '<div class="zq-tiles">' + SERVICES.map(function (s) { return '<button type="button" data-s="' + esc(s[0]) + '">' + esc(s[0]) + '<small>' + esc(s[1]) + '</small></button>'; }).join('') + '</div>' +
        '<div class="zq-alt"><span>Lieber direkt?</span><a href="tel:+' + WA + '">' + TEL + '</a><a href="https://wa.me/' + WA + '" rel="noopener" target="_blank">WhatsApp</a></div>' +
      '</section>' +

      '<section class="zq-step" data-step="2" hidden>' +
        '<h2>Wie erreichen wir Sie?</h2><p class="zq-sub">Wir melden uns persönlich, meist innert 1 Stunde, und vereinbaren Ihre Gratis-Besichtigung – vor Ort oder per Video.</p>' +
        '<p class="zq-chosen"><span data-chosen></span> · <button type="button" data-back>ändern</button></p>' +
        '<form class="zq-f" data-form="contact" novalidate>' +
          '<label>Name<input name="name" autocomplete="name" required /></label>' +
          '<label>Telefon<input name="tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="079 123 45 67" required /></label>' +
          '<label class="zq-hp" aria-hidden="true">Bitte leer lassen<input name="botcheck" tabindex="-1" autocomplete="off" /></label>' +
          '<p class="zq-err" role="alert" hidden></p>' +
          '<button class="zq-go" type="submit">Anfrage senden</button>' +
          '<p class="zq-note">Mit dem Senden erhalten wir Ihre Angaben, um Sie wegen Ihrer Anfrage zu kontaktieren. <a href="' + BASE + 'datenschutz.html" target="_blank" rel="noopener">Datenschutz</a></p>' +
        '</form>' +
      '</section>' +

      '<section class="zq-step" data-step="3" hidden>' +
        '<div class="zq-ok"><span class="zq-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>' +
        '<h2 data-ok-h>Danke! Ihre Anfrage ist bei uns.</h2><p class="zq-sub" data-ok-p>Wir melden uns in der Regel innert 1 Stunde, am Samstag und Sonntag innert 2 Stunden.</p><span class="zq-ref" data-ref></span></div>' +
        '<form class="zq-f" data-form="more" novalidate style="margin-top:20px">' +
          '<p class="zq-sub" style="margin:0"><b>Optional:</b> Mit diesen Angaben wird die Offerte schneller.</p>' +
          '<div class="row"><label>Von (PLZ / Ort)<input name="von" autocomplete="off" /></label><label>Nach (PLZ / Ort)<input name="nach" autocomplete="off" /></label></div>' +
          '<div class="row"><label>Wunschtermin<input name="datum" type="date" /></label><label>Zimmer<input name="zimmer" inputmode="decimal" placeholder="z. B. 3.5" /></label></div>' +
          '<label>Notiz<textarea name="notiz" placeholder="Lift, Stockwerk, besondere Gegenstände …"></textarea></label>' +
          '<button class="zq-go zq-ghost" type="submit">Angaben ergänzen</button>' +
        '</form>' +
        '<div class="zq-alt"><span>Fotos sagen mehr:</span><a href="https://wa.me/' + WA + '" rel="noopener" target="_blank" data-wa>Fotos per WhatsApp senden</a></div>' +
      '</section>' +
    '</div>';

  function $(s) { return root.querySelector(s); }
  function show(n) {
    root.querySelectorAll('.zq-step').forEach(function (s) { s.hidden = s.getAttribute('data-step') !== String(n); });
    root.querySelectorAll('.zq-steps i').forEach(function (d, i) { d.classList.toggle('on', i < n); });
    var f = n === 1 ? $('.zq-tiles button') : n === 2 ? $('[name=name]') : $('[data-ok-h]');
    if (f) { if (n === 3) f.setAttribute('tabindex', '-1'); setTimeout(function () { f.focus({ preventScroll: true }); }, 60); }
  }
  function open(opts) {
    opts = opts || {};
    lastFocus = document.activeElement;
    if (opts.von) state.von = opts.von;
    if (opts.nach) state.nach = opts.nach;
    if (opts.zimmer) state.zimmer = opts.zimmer;
    if (opts.datum) state.datum = opts.datum;
    if (opts.info) state.info = opts.info;
    if (state.ref && !$('[data-step="3"]').hidden) { /* schon gesendet: Danke-Schritt bleibt */ }
    else if (opts.service) { pick(opts.service, true); }
    else show(1);
    root.classList.add('open');
    document.documentElement.classList.add('zq-lock');
    if (window.zkLenis) window.zkLenis.stop();
    track('quick_open', { service: opts.service || '' });
  }
  function close() {
    root.classList.remove('open');
    document.documentElement.classList.remove('zq-lock');
    if (window.zkLenis) window.zkLenis.start();
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function pick(s, silent) {
    state.service = s;
    root.querySelectorAll('.zq-tiles button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-s') === s ? 'true' : 'false'); });
    $('[data-chosen]').textContent = s;
    show(2);
    if (!silent) track('quick_service', { service: s });
  }

  function lines(extra) {
    return [
      'Anfrage über zuegelklar.ch (' + state.ref + ')',
      'Leistung: ' + state.service,
      'Name: ' + state.name,
      'Telefon: ' + state.tel
    ].concat(state.zimmer ? ['Zimmer: ' + state.zimmer] : [])
     .concat(state.datum ? ['Wunschtermin: ' + state.datum.split('-').reverse().join('.')] : [])
     .concat(state.info ? ['Planer: ' + state.info] : [])
     .concat(extra || []).concat(state.von ? ['Von: ' + state.von] : []).concat(state.nach ? ['Nach: ' + state.nach] : [])
     .concat(['Seite: ' + location.pathname]).join('\n');
  }
  function waLink(text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); }
  function post(subject, text, fields) {
    if (!KEY) return Promise.reject(new Error('kein Schlüssel'));
    var body = { access_key: KEY, subject: subject, from_name: 'zuegelklar.ch', Nachricht: text };
    Object.keys(fields).forEach(function (k) { body[k] = fields[k]; });
    return fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j.success) throw new Error(j.message || 'Fehler'); return j; });
  }
  function viaWhatsApp(text) {
    var url = waLink(text), w = null;
    try { w = window.open(url, '_blank', 'noopener'); } catch (e) {}
    $('[data-ok-h]').textContent = 'Fast fertig: noch in WhatsApp senden.';
    $('[data-ok-p]').innerHTML = 'Ihre Nachricht ist vorbereitet. Tippen Sie in WhatsApp auf <b>Senden</b>. ' +
      '<a href="' + url + '" target="_blank" rel="noopener" style="color:#0057B8;font-weight:600">WhatsApp öffnen</a> · oder rufen Sie an: <a href="tel:+' + WA + '" style="color:#0057B8;font-weight:600">' + TEL + '</a>';
    return w;
  }

  $('[data-form="contact"]').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, err = f.querySelector('.zq-err'), n = f.name.value.trim(), t = f.tel.value.trim();
    if (f.botcheck.value) return;
    var badN = n.length < 2, badT = (t.match(/\d/g) || []).length < 9;
    f.name.setAttribute('aria-invalid', badN); f.tel.setAttribute('aria-invalid', badT);
    if (badN || badT) {
      err.textContent = badN && badT ? 'Bitte Name und Telefonnummer angeben.' : badN ? 'Bitte Ihren Namen angeben.' : 'Bitte eine gültige Telefonnummer angeben.';
      err.hidden = false; (badN ? f.name : f.tel).focus(); return;
    }
    err.hidden = true;
    state.name = n; state.tel = t; state.ref = ref();
    $('[data-ref]').textContent = 'Referenz ' + state.ref;
    $('[data-wa]').href = waLink('Fotos zu Anfrage ' + state.ref + ' (' + state.service + ')');
    if (state.von) root.querySelector('[name=von]').value = state.von;
    if (state.nach) root.querySelector('[name=nach]').value = state.nach;
    if (state.zimmer) root.querySelector('[name=zimmer]').value = state.zimmer;
    if (state.datum) root.querySelector('[name=datum]').value = state.datum;
    var btn = f.querySelector('.zq-go'); btn.disabled = true; btn.textContent = 'Wird gesendet …';
    var text = lines();
    post('Rückruf ' + state.ref + ': ' + state.service + ' · ' + state.name, text, { Leistung: state.service, Name: state.name, Telefon: state.tel, Von: state.von, Nach: state.nach, Zimmer: state.zimmer, Wunschtermin: state.datum, Planer: state.info, Seite: location.pathname, Referenz: state.ref })
      .then(function () { track('quick_submit', { method: 'web3forms', service: state.service }); show(3); })
      .catch(function () { viaWhatsApp(text); track('quick_submit', { method: 'whatsapp', service: state.service }); show(3); })
      .then(function () { btn.disabled = false; btn.textContent = 'Anfrage senden'; });
  });

  $('[data-form="more"]').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, d = f.datum.value;
    if (d) { var p = d.split('-'); d = p[2] + '.' + p[1] + '.' + p[0]; }
    state.von = f.von.value.trim(); state.nach = f.nach.value.trim();
    state.zimmer = ''; state.datum = ''; // stehen ab hier in «extra»
    var extra = [d ? 'Wunschtermin: ' + d : '', f.zimmer.value.trim() ? 'Zimmer: ' + f.zimmer.value.trim() : '', f.notiz.value.trim() ? 'Notiz: ' + f.notiz.value.trim() : ''].filter(Boolean);
    if (!state.von && !state.nach && !extra.length) { close(); return; }
    var btn = f.querySelector('.zq-go'); btn.disabled = true; btn.textContent = 'Wird gesendet …';
    var text = 'Ergänzung zu ' + lines(extra);
    post('Ergänzung ' + state.ref + ' · ' + state.name, text, { Referenz: state.ref, Von: state.von, Nach: state.nach, Wunschtermin: d, Zimmer: f.zimmer.value.trim(), Notiz: f.notiz.value.trim() })
      .then(function () { btn.textContent = 'Ergänzt ✓'; track('quick_details', {}); setTimeout(close, 900); })
      .catch(function () { btn.disabled = false; btn.textContent = 'Angaben ergänzen'; viaWhatsApp(text); });
  });

  root.addEventListener('click', function (e) {
    var t = e.target.closest('[data-s],[data-close],[data-back]');
    if (!t) return;
    if (t.hasAttribute('data-close')) close();
    else if (t.hasAttribute('data-back')) show(1);
    else pick(t.getAttribute('data-s'));
  });
  root.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var f = [].filter.call(root.querySelectorAll('button,input,textarea,a[href]'), function (x) { return x.offsetParent !== null && !x.closest('.zq-hp'); });
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  // Auslöser auf der ganzen Seite (Capture, damit Anker-Scrollen nicht greift)
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var a = e.target.closest('[data-quick], a.pill[href$="#offerte"], a[href*="/offerte/"]');
    if (!a || root.contains(a)) return;
    e.preventDefault(); e.stopPropagation();
    open({ service: a.getAttribute('data-quick') || slugService(a.getAttribute('href')) });
  }, true);
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f.matches || !f.matches('form.quick')) return;
    e.preventDefault(); e.stopPropagation();
    open({ von: (f.von && f.von.value.trim()) || '', nach: (f.nach && f.nach.value.trim()) || '' });
  }, true);

  document.body.appendChild(root);
  window.zkQuick = { open: open, close: close };
})();
