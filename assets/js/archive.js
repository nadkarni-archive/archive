/* Archive page: live search, combinable filter chips, sort, and thumbnail/list views.
   Without JS every item is still listed; this only filters and reorders them. */
(function () {
  var grid = document.getElementById('ar-grid'); if (!grid) return;
  var items = Array.prototype.slice.call(grid.children);
  var q = document.getElementById('ar-q'), countEl = document.getElementById('ar-count');
  var results = document.getElementById('ar-results'), empty = document.getElementById('ar-empty');
  var clearBtn = document.getElementById('ar-clear');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.fchip'));
  var sortBtns = Array.prototype.slice.call(document.querySelectorAll('[data-sort]'));
  var viewBtns = Array.prototype.slice.call(document.querySelectorAll('[data-view]'));
  var state = { q: '', f: { tag: [], kind: [], pub: [], lang: [], year: [] }, sort: 'collection', view: 'grid' };

  function readURL() {
    var p = new URLSearchParams(location.search);
    state.q = p.get('q') || '';
    Object.keys(state.f).forEach(function (k) { state.f[k] = (p.get(k) || '').split(',').filter(Boolean); });
    state.sort = p.get('sort') || 'collection';
    var v = p.get('view'); if (!v) { try { v = localStorage.getItem('nk-archive-view'); } catch (e) {} }
    state.view = v === 'list' ? 'list' : 'grid';
  }
  function writeURL() {
    var p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    Object.keys(state.f).forEach(function (k) { if (state.f[k].length) p.set(k, state.f[k].join(',')); });
    if (state.sort !== 'collection') p.set('sort', state.sort);
    if (state.view !== 'grid') p.set('view', state.view);
    var s = p.toString(); history.replaceState(null, '', location.pathname + (s ? '?' + s : ''));
  }
  function apply() {
    var words = state.q.toLowerCase().split(/\s+/).filter(Boolean), shown = 0;
    items.forEach(function (li) {
      var ok = words.every(function (w) { return li.dataset.text.indexOf(w) > -1; });
      Object.keys(state.f).forEach(function (k) { if (ok && state.f[k].length && state.f[k].indexOf(li.dataset[k]) === -1) ok = false; });
      li.hidden = !ok; if (ok) { shown++; li.classList.add('is-in'); }
    });
    countEl.textContent = shown;
    /* counts on chips: items matching search and every other facet, with this value */
    chips.forEach(function (c) {
      var n = 0, fk = c.dataset.f;
      items.forEach(function (li) {
        if (li.dataset[fk] !== c.dataset.v) return;
        if (!words.every(function (w) { return li.dataset.text.indexOf(w) > -1; })) return;
        for (var k in state.f) { if (k !== fk && state.f[k].length && state.f[k].indexOf(li.dataset[k]) === -1) return; }
        n++;
      });
      c.querySelector('.fchip__n').textContent = '(' + n + ')';
      c.classList.toggle('is-empty', n === 0 && c.getAttribute('aria-pressed') !== 'true');
    });
    empty.hidden = shown !== 0;
    var any = state.q || Object.keys(state.f).some(function (k) { return state.f[k].length; });
    clearBtn.hidden = !any;
    chips.forEach(function (c) { c.setAttribute('aria-pressed', state.f[c.dataset.f].indexOf(c.dataset.v) > -1 ? 'true' : 'false'); });
    var sorted = items.slice();
    if (state.sort !== 'collection') sorted.sort(function (a, b) {
      var da = a.dataset.date, db = b.dataset.date; if (!da && !db) return a.dataset.i - b.dataset.i; if (!da) return 1; if (!db) return -1;
      return state.sort === 'new' ? (da < db ? 1 : da > db ? -1 : 0) : (da > db ? 1 : da < db ? -1 : 0);
    });
    else sorted.sort(function (a, b) { return a.dataset.i - b.dataset.i; });
    sorted.forEach(function (li) { grid.appendChild(li); });
    sortBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.sort === state.sort ? 'true' : 'false'); });
    viewBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.view === state.view ? 'true' : 'false'); });
    results.classList.toggle('ar-results--grid', state.view === 'grid');
    results.classList.toggle('ar-results--list', state.view === 'list');
    writeURL();
  }
  readURL(); q.value = state.q;
  var t; q.addEventListener('input', function () { clearTimeout(t); t = setTimeout(function () { state.q = q.value.trim(); apply(); }, 120); });
  chips.forEach(function (c) { c.addEventListener('click', function () {
    var arr = state.f[c.dataset.f], i = arr.indexOf(c.dataset.v); if (i > -1) arr.splice(i, 1); else arr.push(c.dataset.v); apply(); }); });
  sortBtns.forEach(function (b) { b.addEventListener('click', function () { state.sort = b.dataset.sort; apply(); }); });
  viewBtns.forEach(function (b) { b.addEventListener('click', function () {
    state.view = b.dataset.view; try { localStorage.setItem('nk-archive-view', state.view); } catch (e) {} apply(); }); });
  function clearAll() { state.q = ''; q.value = ''; Object.keys(state.f).forEach(function (k) { state.f[k] = []; }); apply(); q.focus(); }
  clearBtn.addEventListener('click', clearAll);
  document.getElementById('ar-empty-clear').addEventListener('click', clearAll);
  apply();
})();
