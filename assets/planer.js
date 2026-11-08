// ZÜGELKLAR – Umzugsplaner mit Richtpreis (Ratgeber Umzugskosten). Preise vom Inhaber freigegeben.
(function () {
  var form = document.getElementById('planForm'); if (!form) return;
  var zim = document.getElementById('pZim'), lift = document.getElementById('pLift'), date = document.getElementById('pDate');
  var $ = function (id) { return document.getElementById(id); };
  var DAY = 864e5;
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  var today = new Date(); today.setHours(0, 0, 0, 0);
  date.min = iso(today); date.value = iso(new Date(+today + 60 * DAY));
  // Schritte relativ zum Umzugstag (Tage). zk = machen wir
  var STEPS = [
    [-90, 'Mietvertrag kündigen', 'Kündigungsfrist meist 3 Monate – siehe Mietvertrag.'],
    [-60, 'Besichtigung & verbindliche Offerte', 'Vor Ort oder per Video. Danach steht der Preis schriftlich fest.', 1],
    [-30, 'Ausmisten', 'Was nicht mitkommt, räumen und entsorgen wir.', 1],
    [-21, 'Halteverbot / Parkplatz', 'Bei der Gemeinde beantragen – oder durch uns organisieren lassen.', 1],
    [-14, 'Adresse ändern', 'Nachsendeauftrag bei der Post, Versicherungen, Bank, Arbeitgeber.'],
    [-7, 'Packen', 'Umzugskartons sind im Auftrag inbegriffen.', 1],
    [-1, 'Letzte Vorbereitung', 'Kühlschrank abtauen, Wichtiges und Dokumente separat.'],
    [0, 'Umzugstag', 'Tragen, fahren, montieren.', 1],
    [2, 'Endreinigung & Abgabe', 'Mit Abnahmegarantie – Abgabe innert 3 Arbeitstagen.', 1],
    [14, 'Anmeldung neue Gemeinde', 'In der Regel innert 14 Tagen nach dem Zuzug.']
  ];
  var fmt = function (d) { return d.toLocaleDateString('de-CH', { weekday: 'short', day: 'numeric', month: 'short' }); };
  var num = function (x) { return String(x).replace('.0', ''); };
  // Richtpreise inkl. MWST, vom Inhaber freigegeben (Nov. 2026). Index: 1, 2, 3, 4, 5 Zimmer (x.5 zählt zur Zahl davor)
  var MOVE = [[700, 950], [950, 1350], [1350, 1950], [1900, 2700], [2700, 3600]];
  var CLEAN = [[450, 600], [600, 800], [750, 1000], [900, 1250], [1100, 1500]];
  var chf = function (x) { return String(Math.round(x / 50) * 50).replace(/\B(?=(\d{3})+$)/g, '’'); };
  function tween(el, to) {
    if (el.textContent === to) return;
    el.textContent = to;
    if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.fromTo(el, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .45, ease: 'power3.out' });
  }
  function calc() {
    var z = +zim.value, fl = +(form.querySelector('[name=pFl]:checked') || { value: 2 }).value;
    $('pZimOut').textContent = num(z) + (z === 1 ? ' Zimmer' : ' Zimmer');
    var vol = Math.round(z * 10 + 5);
    var team = z <= 2 ? 2 : z <= 4.5 ? 3 : 4;
    var hrs = vol / (team * 2) * (lift.checked ? 1 : 1 + .07 * fl) + 1;
    var lo = Math.max(3, Math.round(hrs * .85 * 2) / 2), hi = Math.round(hrs * 1.15 * 2) / 2;
    tween($('kVol'), String(vol));
    tween($('kTeam'), String(team));
    if (hi > 12) { tween($('kTime'), '1–2'); $('kTimeU').textContent = 'Tage'; }
    else { tween($('kTime'), num(lo) + '–' + num(hi)); $('kTimeU').textContent = 'Stunden'; }

    var d = date.value ? new Date(date.value + 'T00:00') : new Date(+today + 60 * DAY);
    // Preis: Wohnungsgrösse, ohne Lift etwas mehr Aufwand, Wochenend-Zuschlag, optional Reinigung
    var i = Math.min(4, Math.floor(z) - 1), big = z >= 6, clean = $('pClean').checked;
    var wd = d.getDay(), we = wd === 6 ? 1.2 : wd === 0 ? 1.5 : 1;
    var stairs = lift.checked ? 1 : 1 + .03 * Math.max(0, fl - 1);
    var mLo = MOVE[i][0] * we, mHi = MOVE[i][1] * stairs * we;
    var cLo = CLEAN[i][0], cHi = CLEAN[i][1];
    var lines = [['Umzug' + (we > 1 ? (wd === 6 ? ' (Samstag +20 %)' : ' (Sonntag +50 %)') : ''), big ? 'ab CHF 3’500' : 'CHF ' + chf(mLo) + '–' + chf(mHi)]];
    if (clean) lines.push(['Reinigung mit Abnahmegarantie', big ? 'ab CHF 1’400' : 'CHF ' + chf(cLo) + '–' + chf(cHi)]);
    lines.push(['Besichtigung & Kartons', 'inbegriffen']);
    var total = big ? 'ab CHF ' + chf(3500 * we + (clean ? 1400 : 0)) : 'CHF ' + chf(mLo + (clean ? cLo : 0)) + '–' + chf(mHi + (clean ? cHi : 0));
    tween($('kPrice'), total);
    $('kLines').innerHTML = lines.map(function (l) { return '<li><span>' + l[0] + '</span><span>' + l[1] + '</span></li>'; }).join('');
    form.dataset.price = total; form.dataset.clean = clean ? 'ja' : 'nein';
    var days = Math.round((d - today) / DAY);
    tween($('cDays'), String(Math.max(0, days)));
    $('cLabel').textContent = days <= 0 ? 'Heute ist Umzugstag' : days === 1 ? 'Tag bis zum Umzug' : 'Tage bis zum Umzug';
    var nextDone = false, out = [];
    STEPS.forEach(function (s) {
      var at = new Date(+d + s[0] * DAY), cls = [], tag = '';
      if (s[0] === 0) cls.push('day');
      if (s[3]) cls.push('zk');
      if (at < today && s[0] < 0) { cls.push('late'); tag = 'Jetzt'; }
      else if (!nextDone && at >= today) { nextDone = true; cls.push('next'); tag = 'Als Nächstes'; }
      out.push('<li class="' + cls.join(' ') + '"><time datetime="' + iso(at) + '">' + fmt(at) + '</time><div><b>' + s[1] + (tag ? '<span class="tag">' + tag + '</span>' : '') + '</b><p>' + s[2] + '</p></div></li>');
    });
    $('tl').innerHTML = out.join('');
    var txt = 'Mein Umzugsplan (zuegelklar.ch)\nUmzugstag: ' + d.toLocaleDateString('de-CH') + ' · ' + num(z) + ' Zimmer\n\n' +
      STEPS.map(function (s) { return '☐ ' + new Date(+d + s[0] * DAY).toLocaleDateString('de-CH') + ' – ' + s[1]; }).join('\n');
    $('pWa').href = 'https://wa.me/?text=' + encodeURIComponent(txt);
    form.dataset.z = num(z); form.dataset.d = date.value; form.dataset.fl = fl; form.dataset.lift = lift.checked ? 'ja' : 'nein';
  }
  form.addEventListener('input', calc); form.addEventListener('change', calc);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  $('pGo').addEventListener('click', function () {
    if (!window.zkQuick) { location.href = form.dataset.offer || '#offerte'; return; }
    window.zkQuick.open({ service: 'Umzug', zimmer: form.dataset.z, datum: form.dataset.d, info: 'Stockwerk ' + (form.dataset.fl === '0' ? 'EG' : form.dataset.fl) + ', Lift: ' + form.dataset.lift + ', Reinigung: ' + form.dataset.clean + ', Richtpreis: ' + form.dataset.price });
  });
  calc();
})();
