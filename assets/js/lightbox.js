/* Photo overlay for the Gallery page, matching the original sudhakarnadkarni.org overlay:
   full-screen black, image contained with 4px corners, round prev/next and close buttons.
   Esc closes, arrow keys move, click outside the photo closes, swipe on touch screens. */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (!links.length) return;
  var groups = {};
  links.forEach(function (a) { (groups[a.dataset.lightbox] = groups[a.dataset.lightbox] || []).push(a); });
  var box = document.createElement('div');
  box.className = 'lb'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'Photo viewer'); box.hidden = true;
  box.innerHTML = '<figure class="lb__fig"><img class="lb__img" alt=""><figcaption class="lb__cap"><span class="lb__count"></span><a class="lb__arch" href="#">View in archive</a></figcaption></figure>' +
    '<button type="button" class="lb__btn lb__close" aria-label="Close"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3 3 13" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg></button>' +
    '<button type="button" class="lb__btn lb__nav lb__prev" aria-label="Previous photo">‹</button>' +
    '<button type="button" class="lb__btn lb__nav lb__next" aria-label="Next photo">›</button>';
  document.body.appendChild(box);
  var img = box.querySelector('.lb__img'), count = box.querySelector('.lb__count'), arch = box.querySelector('.lb__arch');
  var list = [], i = 0, opener = null;
  function show(k) {
    i = (k + list.length) % list.length; var a = list[i], t = a.querySelector('img');
    img.classList.remove('is-in'); img.src = a.dataset.full || t.currentSrc || t.src; img.alt = t.alt || '';
    count.textContent = (i + 1) + ' / ' + list.length; arch.href = a.getAttribute('href');
    requestAnimationFrame(function () { img.classList.add('is-in'); });
  }
  function open(a) {
    list = groups[a.dataset.lightbox]; opener = a; show(list.indexOf(a));
    box.hidden = false; document.documentElement.classList.add('lb-open');
    requestAnimationFrame(function () { box.classList.add('is-open'); });
    box.querySelector('.lb__close').focus();
  }
  function close() {
    box.classList.remove('is-open'); document.documentElement.classList.remove('lb-open');
    setTimeout(function () { box.hidden = true; img.src = ''; }, 250);
    if (opener) opener.focus();
  }
  links.forEach(function (a) { a.addEventListener('click', function (e) { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); open(a); }); });
  box.querySelector('.lb__close').addEventListener('click', close);
  box.querySelector('.lb__prev').addEventListener('click', function () { show(i - 1); });
  box.querySelector('.lb__next').addEventListener('click', function () { show(i + 1); });
  box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('lb__fig')) close(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(i - 1); else if (e.key === 'ArrowRight') show(i + 1);
    else if (e.key === 'Tab') { var f = box.querySelectorAll('button, a'), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
  });
  var x0 = null;
  box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1)); x0 = null; });
})();
