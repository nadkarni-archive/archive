/* Keeps every carousel's dots and "n / total" counter in step with the current slide,
   however it moved (arrows, dots, swipe, keyboard). Bootstrap only does this for
   .carousel-indicators, and the site's dots use their own styling. */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.carousel').forEach(function (c) {
    var dots = c.querySelectorAll('.gal__dots [data-bs-slide-to]');
    var count = c.querySelector('.gal__count span');
    function show(i) {
      dots.forEach(function (d, k) {
        var on = k === i; d.classList.toggle('active', on);
        if (on) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
      if (count) count.textContent = i + 1;
    }
    c.addEventListener('slide.bs.carousel', function (e) { show(e.to); });
  });
});
