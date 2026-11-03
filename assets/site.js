/* ZÜGELKLAR — gemeinsames Script aller Seiten.
   - Menü (Drawer)
   - Herkunft der Anfrage (nur sessionStorage, keine Personendaten, nichts an Dritte)
   - vorausgefüllte WhatsApp-Texte je Seite
   - Offertformular: Vorauswahl, Prüfung, «Fast fertig»-Schritt mit Kopieren
   - Events für Plausible (nur aktiv, wenn Plausible eingebunden ist) */
(function () {
  'use strict';
  var WA_NUMBER = '41799333111';
  var MAIL = 'info@zuegelklar.ch';
  var body = document.body;
  var page = body.dataset || {};

  /* ---------- Menü ---------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var close = document.getElementById('drawerClose');
  if (burger && drawer) {
    var toggle = function (open) {
      drawer.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      body.style.overflow = open ? 'hidden' : '';
      if (open && close) close.focus();
    };
    burger.addEventListener('click', function (e) { e.preventDefault(); toggle(true); });
    if (close) close.addEventListener('click', function () { toggle(false); });
    drawer.addEventListener('click', function (e) { if (e.target === drawer) toggle(false); });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggle(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
  }

  /* ---------- Speicher (sicher, falls gesperrt) ---------- */
  var store = (function () {
    try { var s = window.sessionStorage; s.setItem('_zk', '1'); s.removeItem('_zk'); return s; }
    catch (e) { return { getItem: function () { return null; }, setItem: function () {} }; }
  })();
  function read(k) { try { return JSON.parse(store.getItem(k)); } catch (e) { return null; } }
  function write(k, v) { try { store.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- Herkunft ---------- */
  var q = new URLSearchParams(location.search);
  var utm = {};
  ['source', 'medium', 'campaign', 'term', 'content'].forEach(function (k) {
    var v = q.get('utm_' + k); utm[k] = v ? v.toLowerCase().slice(0, 100) : null;
  });
  var refHost = '';
  try { refHost = document.referrer ? new URL(document.referrer).host : ''; } catch (e) {}
  if (refHost === location.host) refHost = '';

  function channelOf(h, u) {
    if (u.medium === 'cpc' || u.medium === 'ppc') return 'paid_search';
    if (u.medium === 'email' || u.medium === 'newsletter') return 'email';
    if (u.source) return u.medium || 'campaign';
    if (/(^|\.)(google|bing|duckduckgo|ecosia|yahoo|startpage|search\.ch)\./.test(h) || /^(www\.)?search\.ch$/.test(h)) return 'organic_search';
    if (/chatgpt\.com|openai\.com|perplexity\.ai|gemini\.google|copilot\.microsoft|claude\.ai/.test(h)) return 'ai_assistant';
    if (/facebook|instagram|linkedin|tiktok|(^|\.)t\.co$|youtube|whatsapp/.test(h)) return 'social';
    return h ? 'referral' : 'direct';
  }
  var touch = {
    landingPage: location.pathname, referrerHost: refHost || null,
    channel: channelOf(refHost, utm), utm: utm, seenAt: new Date().toISOString()
  };
  var attr = read('zk_attr') || {};
  if (!attr.first) attr.first = touch;
  if (!attr.last || utm.source || (refHost && touch.channel !== 'direct')) attr.last = touch;
  write('zk_attr', attr);

  function ref() {
    var r = store.getItem('zk_ref');
    if (!r) {
      var a = '23456789ABCDEFGHJKMNPQRSTVWXYZ', s = '';
      for (var i = 0; i < 6; i++) s += a.charAt(Math.floor(Math.random() * a.length));
      r = 'ZK-' + s; try { store.setItem('zk_ref', r); } catch (e) {}
    }
    return r;
  }
  var LABEL = {
    organic_search: 'Suchmaschine', paid_search: 'Anzeige', ai_assistant: 'KI-Assistent',
    social: 'Social Media', referral: 'Link', email: 'E-Mail/Newsletter', direct: 'Direkt'
  };
  function originLine() {
    var f = attr.first || touch;
    var how = LABEL[f.channel] || f.channel;
    if (f.channel === 'organic_search' && /google/.test(f.referrerHost || '')) how = 'Google-Suche';
    if (f.channel === 'referral' && f.referrerHost) how = 'Link von ' + f.referrerHost;
    if (f.utm && f.utm.campaign) how += ' (' + f.utm.campaign + ')';
    return 'Ref: ' + ref() + ' · Seite: ' + f.landingPage + ' · Herkunft: ' + how;
  }
  window.zkAttribution = function () {
    return { first: attr.first, last: attr.last, conversionPage: location.pathname,
      pageService: page.service || null, pageCity: page.city || null, ref: ref() };
  };

  /* ---------- Events (Plausible optional) ---------- */
  function track(name, props, cb) {
    var done = false, fin = function () { if (!done) { done = true; if (cb) cb(); } };
    var p = Object.assign({ page_type: page.type || '', service: page.service || '', city: page.city || '' }, props || {});
    if (typeof window.plausible === 'function') { try { window.plausible(name, { props: p, callback: fin }); } catch (e) {} }
    setTimeout(fin, 300);
  }
  window.zkTrack = track;

  /* ---------- WhatsApp-Links mit Seitenkontext ---------- */
  var waTopic = page.wa || '';
  function waText() {
    var t = 'Grüezi, ich interessiere mich für ' + (waTopic || 'eine Offerte') + '.';
    return t + '\n\n' + originLine();
  }
  document.querySelectorAll('a[href^="https://wa.me/' + WA_NUMBER + '"]').forEach(function (a) {
    if (a.closest('#offerForm') || a.id === 'f-reopen') return;
    if (a.getAttribute('href').indexOf('text=') > -1) return;
    a.setAttribute('href', 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(waText()));
  });

  /* ---------- Klick-Events ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('a[href]') : null;
    if (!el || el.closest('#offerForm')) return;
    var h = el.getAttribute('href') || '', loc = el.getAttribute('data-loc') || 'inline_body';
    if (h.indexOf('https://wa.me/') === 0) track('whatsapp_click', { location: loc });
    else if (h.indexOf('tel:') === 0) track('phone_click', { location: loc });
    else if (h.indexOf('mailto:') === 0) track('email_click', { location: loc });
    else if (/offerte\/|#offerte/.test(h)) track('cta_click', { location: loc, target: 'offer_form' });
  });

  /* ---------- Offertformular ---------- */
  var form = document.getElementById('offerForm');
  if (!form) return;
  var err = document.getElementById('f-error');
  var doneBox = document.getElementById('f-done');
  var sel = document.getElementById('f-leistung');
  var channel = 'wa', started = false;

  // Vorauswahl aus ?leistung=… oder aus der Seite
  var want = (q.get('leistung') || '').toLowerCase();
  if (want && sel) {
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].getAttribute('data-slug') === want) { sel.selectedIndex = i; break; }
    }
  }
  form.addEventListener('input', function () {
    if (!started) { started = true; track('offer_form_start', { prefill_service: !!want }); }
  }, true);
  form.querySelectorAll('button[type=submit]').forEach(function (b) {
    b.addEventListener('click', function () { channel = b.getAttribute('data-channel'); });
  });
  function el(id) { return document.getElementById(id); }
  function val(id) { var x = el(id); return (x && x.value || '').trim(); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var need = [['f-leistung', 'Leistung'], ['f-name', 'Name'], ['f-tel', 'Telefon']];
    var missing = [], first = null;
    need.forEach(function (n) {
      var x = el(n[0]), bad = !val(n[0]);
      x.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) { missing.push(n[1]); first = first || x; }
    });
    var c = el('f-consent');
    c.setAttribute('aria-invalid', c.checked ? 'false' : 'true');
    if (!c.checked) { missing.push('Einverständnis Datenschutz'); first = first || c; }
    if (missing.length) {
      err.textContent = 'Bitte ergänzen: ' + missing.join(', ') + '.';
      err.style.display = 'block';
      if (first) first.focus();
      track('offer_form_error', { missing: missing.join(',') });
      return;
    }
    err.style.display = 'none';
    var d = val('f-datum');
    if (d) { var p = d.split('-'); d = p[2] + '.' + p[1] + '.' + p[0]; }
    var lines = [
      'Offertanfrage über zuegelklar.ch',
      'Leistung: ' + val('f-leistung'),
      val('f-von') ? 'Von: ' + val('f-von') : '',
      val('f-nach') ? 'Nach: ' + val('f-nach') : '',
      d ? 'Wunschtermin: ' + d : '',
      val('f-zimmer') ? 'Zimmer: ' + val('f-zimmer') : '',
      val('f-stock') ? 'Stockwerk/Lift: ' + val('f-stock') : '',
      'Name: ' + val('f-name'),
      'Telefon: ' + val('f-tel'),
      val('f-mail') ? 'E-Mail: ' + val('f-mail') : '',
      val('f-msg') ? 'Beschreibung: ' + val('f-msg') : '',
      '—',
      originLine()
    ].filter(Boolean).join('\n');

    var opt = sel.options[sel.selectedIndex];
    var slug = opt ? opt.getAttribute('data-slug') : '';
    var waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines);
    var mailUrl = 'mailto:' + MAIL + '?subject=' + encodeURIComponent('Offertanfrage ' + ref() + ': ' + val('f-leistung')) + '&body=' + encodeURIComponent(lines);

    // «Fast fertig»-Schritt zeigen, damit nichts still verloren geht
    el('f-text').value = lines;
    el('f-reopen').setAttribute('href', waUrl);
    el('f-done-msg').innerHTML = channel === 'mail'
      ? 'Ihre Anfrage ist vorbereitet. Senden Sie die E-Mail in Ihrem E-Mail-Programm ab.'
      : 'Ihre Anfrage ist vorbereitet. Tippen Sie in WhatsApp auf <b>Senden</b>.';
    form.hidden = true; doneBox.hidden = false; doneBox.focus();

    track('offer_form_submit', { method: channel === 'mail' ? 'email' : 'whatsapp', service: slug || '', ref: ref() }, function () {
      if (channel === 'mail') { window.location.href = mailUrl; }
      else {
        var w = window.open(waUrl, '_blank', 'noopener');
        if (!w) window.location.href = waUrl;
      }
    });
  });

  el('f-copy').addEventListener('click', function () {
    var t = el('f-text'), b = this;
    var ok = function () { b.textContent = 'Kopiert'; setTimeout(function () { b.textContent = 'Text kopieren'; }, 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t.value).then(ok, function () { t.select(); document.execCommand('copy'); ok(); });
    } else { t.select(); document.execCommand('copy'); ok(); }
  });
  el('f-back').addEventListener('click', function () { doneBox.hidden = true; form.hidden = false; sel.focus(); });
})();
