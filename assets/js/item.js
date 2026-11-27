(function () {
  var all = window.NK_ITEMS || [], base = window.NK_BASE || '/';
  var id = new URLSearchParams(location.search).get('id');
  var i = all.findIndex(function (x) { return x.id === id; });
  if (i < 0) { document.getElementById('it-missing').hidden = false; return; }
  var it = all[i], $ = function (s) { return document.getElementById(s); };
  var src = base + 'objects/' + it.file, arch = base + 'archive.html';
  document.title = it.title + ' | The Nadkarni Archive';
  $('it-img').src = src; $('it-img').alt = it.kind + (it.pub ? ', ' + it.pub : '') + ': ' + it.title;
  $('it-full').href = src; $('it-full-2').href = src;
  $('it-kind').textContent = it.kind.toUpperCase();
  $('it-kind-link').textContent = it.kind; $('it-kind-link').href = arch + '?kind=' + it.kindSlug;
  $('it-source').textContent = it.pub; $('it-source').hidden = !it.pub;
  $('it-title').textContent = it.title;
  $('it-tr').textContent = it.desc; $('it-tr').hidden = !it.desc;
  var by = [it.creator, it.dateLabel].filter(Boolean);
  $('it-by').textContent = it.creator && it.dateLabel ? it.creator + ' (' + it.dateLabel + ')' : by.join('');
  $('it-by').hidden = !by.length;
  var rows = [['Type', it.kind], ['Publication', it.pub], ['Author', it.creator], ['Date', it.dateLabel], ['Language', it.lang], ['Format', it.format], ['Identifier', it.identifier]];
  rows.forEach(function (r) { if (!r[1]) return; var dt = document.createElement('dt'), dd = document.createElement('dd'); dt.textContent = r[0]; dd.textContent = r[1]; $('it-meta').append(dt, dd); });
  var tags = [[it.kind, 'kind', it.kindSlug], [it.pub, 'pub', it.pubSlug], [it.lang, 'lang', (it.lang || '').toLowerCase()], [it.year, 'year', it.year]];
  tags.forEach(function (t) { if (!t[0]) return; var a = document.createElement('a'); a.className = 'chip chip--dark it__tag'; a.href = arch + '?' + t[1] + '=' + encodeURIComponent(t[2]); var key = { kind: 'kindSlug', pub: 'pubSlug', lang: 'lang', year: 'year' }[t[1]];
    var n = all.filter(function (x) { return String(x[key] || '').toLowerCase() === String(t[1] === 'lang' ? t[0] : t[2]).toLowerCase(); }).length;
    a.textContent = t[0] + ' (' + n + ')'; $('it-tags').append(a); });
  function step(el, j) { var x = all[(j + all.length) % all.length]; el.href = base + 'item.html?id=' + x.id; el.querySelector('.it__step-title').textContent = x.title; }
  step($('it-prev'), i - 1); step($('it-next'), i + 1);
  $('it').hidden = false;
  document.addEventListener('keydown', function (e) {
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowLeft') location.href = $('it-prev').href; else if (e.key === 'ArrowRight') location.href = $('it-next').href;
  });
})();
