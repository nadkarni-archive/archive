/* Nadkarni Archive motion: scroll reveals, line-by-line text, header swap. Vanilla JS, no libraries. */
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('js-motion')) return;
  window.__motionReady = true;

  /* split text into words, then group words into lines and stagger the lines */
  function split(el) {
    if (el.dataset.splitDone) return;
    var text = el.textContent.trim().replace(/\s+/g, ' ');
    el.textContent = '';
    text.split(' ').forEach(function (w, i) {
      if (i) el.appendChild(document.createTextNode(' '));
      var s = document.createElement('span'); s.className = 'm-w'; s.textContent = w; el.appendChild(s);
    });
    el.dataset.splitDone = '1';
    lineDelays(el);
  }
  function lineDelays(el) {
    var base = parseInt(el.dataset.delay || '0', 10), top = null, line = -1;
    el.querySelectorAll('.m-w').forEach(function (w) {
      var t = w.offsetTop; if (t !== top) { top = t; line++; }
      w.style.setProperty('--m-delay', (base + line * 90) + 'ms');
    });
  }
  var splits = document.querySelectorAll('[data-split]');
  splits.forEach(split);

  /* stagger groups: children of [data-stagger] get increasing delays */
  document.querySelectorAll('[data-stagger]').forEach(function (g) {
    var step = parseInt(g.dataset.stagger, 10) || 80;
    g.querySelectorAll(':scope > [data-appear]').forEach(function (c, i) { c.style.setProperty('--m-delay', Math.min(i * step, 480) + 'ms'); });
  });

  var targets = document.querySelectorAll('[data-appear], [data-split]');
  if (!('IntersectionObserver' in window)) { targets.forEach(function (t) { t.classList.add('is-in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  targets.forEach(function (t) {
    if (t.dataset.split === 'load') { requestAnimationFrame(function () { t.classList.add('is-in'); }); return; }
    io.observe(t);
  });

  /* re-measure line delays before reveal if the layout width changes */
  var lastW = window.innerWidth;
  window.addEventListener('resize', function () {
    if (window.innerWidth === lastW) return; lastW = window.innerWidth;
    splits.forEach(function (el) { if (!el.classList.contains('is-in')) lineDelays(el); });
  });

  /* header: copied Framer variant swap (slides out, changes style, slides back) */
  var h = document.getElementById('site-header');
  if (h && h.classList.contains('sh--overlay')) {
    var scrolled = h.classList.contains('is-scrolled'), busy = false;
    window.addEventListener('scroll', function () {
      var want = window.scrollY > window.innerHeight * 0.55;
      if (want === scrolled || busy || h.classList.contains('is-open')) return;
      busy = true; h.classList.add('is-swapping');
      setTimeout(function () {
        scrolled = want; h.classList.toggle('is-scrolled', want); h.classList.remove('is-swapping');
        setTimeout(function () { busy = false; if ((window.scrollY > window.innerHeight * 0.55) !== scrolled) window.dispatchEvent(new Event('scroll')); }, 300);
      }, 280);
    }, { passive: true });
  }
})();
