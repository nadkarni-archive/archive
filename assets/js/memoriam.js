/* In Memoriam: click-to-play YouTube, lazy Instagram/Facebook/LinkedIn embeds, carousel counters. */
(function () {
  document.querySelectorAll('.yt').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + b.dataset.yt + '?autoplay=1&rel=0';
      f.title = b.getAttribute('aria-label').replace('Play video: ', '');
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen = true; f.className = 'yt yt--on';
      b.replaceWith(f);
    });
  });
  document.querySelectorAll('.mm-carousel').forEach(function (c) {
    var r = parseFloat(c.dataset.ratio) || 1.333;
    c.querySelectorAll('img').forEach(function (im) {
      function fit() { if (im.naturalWidth) im.classList.toggle('is-fill', im.naturalWidth / im.naturalHeight >= r - 0.01); }
      if (im.complete) fit(); else im.addEventListener('load', fit);
    });
  });
  var social = document.getElementById('social');
  function loadEmbeds() {
    document.querySelectorAll('iframe[data-src]').forEach(function (f) { f.src = f.dataset.src; f.removeAttribute('data-src'); });
    if (document.querySelector('.instagram-media') && !window.instgrm) {
      var s = document.createElement('script'); s.async = true; s.src = 'https://www.instagram.com/embed.js'; document.body.appendChild(s);
    }
  }
  if (!social) return;
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); loadEmbeds(); } }, { rootMargin: '800px 0px' });
    io.observe(social);
  } else loadEmbeds();
})();
