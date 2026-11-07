/* ZÜGELKLAR V14 · Motion & Navigation (klein, ohne Bibliothek)
   - Reveals (.rv) und Linien (.draw-host) einmalig beim Eintritt
   - Header-Zustand, mbar ausblenden am Formular/Footer
   - Leistungen-Panel (Desktop), Menü als <dialog> (Mobil)
   - Formular-Fortschritt, Quickstart ?von= ?nach= */
(function () {
  'use strict';
  var d = document, html = d.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Reveals + Linien */
  var targets = d.querySelectorAll('.rv, .draw-host, .proto, .steps, .hero');
  if (!('IntersectionObserver' in window) || reduce) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* Header-Zustand per Sentinel (keine Höhenänderung) */
  var hdr = d.querySelector('.hdr');
  var sentinel = d.getElementById('top-sentinel');
  if (hdr && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { hdr.classList.toggle('is-scrolled', !e[0].isIntersecting); }).observe(sentinel);
  }

  /* mbar ausblenden, solange Formular oder Footer sichtbar */
  var mbar = d.querySelector('.mbar');
  var hideFor = d.querySelectorAll('#offerte, .ftr');
  if (mbar && hideFor.length && 'IntersectionObserver' in window) {
    var visible = new Set();
    var mo = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target); });
      mbar.classList.toggle('is-hidden', visible.size > 0);
    }, { threshold: 0.15 });
    hideFor.forEach(function (el) { mo.observe(el); });
  }

  /* Leistungen-Panel */
  var pBtn = d.getElementById('svcBtn'), panel = d.getElementById('svcPanel');
  if (pBtn && panel) {
    var setP = function (open) { panel.hidden = !open; pBtn.setAttribute('aria-expanded', String(open)); };
    pBtn.addEventListener('click', function () { setP(panel.hidden); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { setP(false); pBtn.focus(); } });
    d.addEventListener('click', function (e) { if (!panel.hidden && !e.target.closest('.has-panel')) setP(false); });
  }

  /* Menü (dialog) – ohne JS bleibt der Button-Link auf /leistungen/ */
  var mBtn = d.getElementById('menuBtn'), menu = d.getElementById('menu');
  if (mBtn && menu && typeof menu.showModal === 'function') {
    mBtn.addEventListener('click', function (e) { e.preventDefault(); menu.showModal(); mBtn.setAttribute('aria-expanded', 'true'); });
    menu.addEventListener('close', function () { mBtn.setAttribute('aria-expanded', 'false'); mBtn.focus(); });
    menu.querySelector('.menu-close').addEventListener('click', function () { menu.close(); });
    menu.addEventListener('click', function (e) { if (e.target === menu) menu.close(); if (e.target.closest('a')) menu.close(); });
  }

  /* Quickstart: ?von= ?nach= ins Formular */
  var q = new URLSearchParams(location.search);
  [['von', 'f-von'], ['nach', 'f-nach']].forEach(function (p) {
    var v = q.get(p[0]), el = d.getElementById(p[1]);
    if (v && el && !el.value) el.value = v.slice(0, 80);
  });

  /* Formular-Fortschritt: Pflichtfelder + Zusatzangaben */
  var form = d.getElementById('offerForm'), bar = d.querySelector('.fprog i');
  if (form && bar) {
    var ids = ['f-leistung', 'f-von', 'f-nach', 'f-datum', 'f-name', 'f-tel', 'f-consent'];
    var upd = function () {
      var n = 0;
      ids.forEach(function (id) { var el = d.getElementById(id); if (el && (el.type === 'checkbox' ? el.checked : el.value.trim())) n++; });
      bar.style.setProperty('--p', (n / ids.length).toFixed(2));
    };
    form.addEventListener('input', upd); form.addEventListener('change', upd); upd();
  }
})();
