(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('gs');

  /* Eintritt: Bild-in-Schrift zoomt durch */
  gsap.timeline({ scrollTrigger: { trigger: '.zoom', start: 'top top', end: '+=140%', scrub: true, pin: true } })
    .to('.zoom-hint', { opacity: 0, y: -20, duration: .2 }, 0)
    .to('.zoom-word', { scale: 22, ease: 'power2.in', duration: 1 }, 0)
    .to('.zoom', { backgroundColor: 'rgba(15,15,19,0)', duration: .3 }, .7);

  /* Ein Umzugstag: Szenen + Uhr */
  var times = ['07:30', '09:00', '11:30', '13:00', '15:30', '17:30'];
  var scenes = gsap.utils.toArray('.scene'), beats = gsap.utils.toArray('.beat'), dots = gsap.utils.toArray('.day-dots i');
  var clock = document.getElementById('clock');
  var tl = gsap.timeline({ scrollTrigger: { trigger: '.day-stage', start: 'top top', end: '+=' + (scenes.length * 90) + '%', scrub: .5, pin: true,
    onUpdate: function (s) {
      var i = Math.min(scenes.length - 1, Math.floor(s.progress * scenes.length * .999 + .15));
      clock.textContent = times[i]; dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
    } } });
  dots[0].classList.add('on');
  scenes.forEach(function (sc, i) {
    if (i === 0) { tl.fromTo(sc.querySelector('img'), { scale: 1.15 }, { scale: 1, duration: 1, ease: 'none' }, 0); return; }
    var at = i;
    tl.to(beats[i - 1], { autoAlpha: 0, y: -60, duration: .3, ease: 'power2.in' }, at - .35)
      .to(sc, { clipPath: 'inset(0% 0 0 0)', duration: .6, ease: 'power3.inOut' }, at - .3)
      .fromTo(sc.querySelector('img'), { scale: 1.3 }, { scale: 1, duration: 1.2, ease: 'none' }, at - .3)
      .fromTo(beats[i], { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: .35, ease: 'power3.out' }, at);
  });
  tl.to({}, { duration: .4 });

  /* Unternehmen: Karten neigen sich zur Maus */
  if (matchMedia('(pointer:fine)').matches) document.querySelectorAll('.biz-card').forEach(function (c) {
    c.addEventListener('mousemove', function (e) { var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      gsap.to(c, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 900, duration: .4 }); });
    c.addEventListener('mouseleave', function () { gsap.to(c, { rotateX: 0, rotateY: 0, duration: .6, ease: 'power3.out' }); });
  });
  gsap.from('.biz-card', { y: 90, opacity: 0, stagger: .12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.biz-grid', start: 'top 85%' } });

  /* Schrift baut sich Buchstabe für Buchstabe auf */
  var chars = '01ZÜGELKLAR/—·';
  document.querySelectorAll('.scramble').forEach(function (el) {
    var html = el.innerHTML, done = false;
    ScrollTrigger.create({ trigger: el, start: 'top 80%', onEnter: function () {
      if (done) return; done = true;
      var nodes = []; (function walk(n) { n.childNodes.forEach(function (c) { if (c.nodeType === 3) nodes.push(c); else walk(c); }); })(el);
      var orig = nodes.map(function (n) { return n.textContent; }), t = 0;
      var id = setInterval(function () {
        t += 1;
        nodes.forEach(function (n, k) { var s = orig[k]; n.textContent = s.split('').map(function (ch, i) { return ch === ' ' || i < t ? ch : chars[Math.floor(Math.random() * chars.length)]; }).join(''); });
        if (t > Math.max.apply(null, orig.map(function (s) { return s.length; }))) { clearInterval(id); el.innerHTML = html; }
      }, 28);
    } });
  });

  /* Reise-Leiste: Wagen fährt zur neuen Adresse */
  var trip = document.getElementById('trip'), label = document.getElementById('tripLabel');
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: function (s) {
    trip.style.setProperty('--p', s.progress.toFixed(4));
    var done = s.progress > .985;
    trip.classList.toggle('done', done);
    label.textContent = done ? 'Angekommen' : (s.progress < .02 ? 'Alte Adresse' : 'Unterwegs');
    trip.classList.toggle('hide', s.progress < .03);
  } });

  /* Finale: Angekommen */
  gsap.from('.final .arrive', { yPercent: 100, opacity: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.final', start: 'top 60%' } });

  /* Cursor */
  var cur = document.querySelector('.cur');
  if (cur && matchMedia('(pointer:fine)').matches) {
    var qx = gsap.quickTo(cur, 'x', { duration: .25, ease: 'power3' }), qy = gsap.quickTo(cur, 'y', { duration: .25, ease: 'power3' });
    addEventListener('mousemove', function (e) { qx(e.clientX); qy(e.clientY); });
    document.querySelectorAll('a,button,input').forEach(function (a) {
      a.addEventListener('mouseenter', function () { cur.classList.add('big'); });
      a.addEventListener('mouseleave', function () { cur.classList.remove('big'); });
    });
  }
  ScrollTrigger.sort(); ScrollTrigger.refresh();
})();
