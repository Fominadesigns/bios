/* BIOS — сітка робіт, дві мови, лайтбокс. Без бібліотек. */
(function () {
  'use strict';

  var LANGS = ['uk', 'en'];
  var lang = 'uk';
  try {
    var saved = localStorage.getItem('bios-lang');
    if (LANGS.indexOf(saved) > -1) lang = saved;
  } catch (e) { /* приватний режим — просто лишаємо українську */ }

  /* ── тексти ─────────────────────────────────── */
  function applyTexts() {
    var dict = window.T[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n')];
      if (v != null) el.innerHTML = v;
    });

    if (dict.title) document.title = dict.title;

    var btn = document.getElementById('lang');
    btn.innerHTML = lang === 'uk'
      ? '<b>UA</b><span>/</span>EN'
      : 'UA<span>/</span><b>EN</b>';

    buildMarquee(dict.marquee);
    labelWorks();
  }

  /* ── біжучий рядок ──────────────────────────── */
  function buildMarquee(words) {
    var row = document.getElementById('marquee');
    if (!row) return;
    // подвоюємо список — щоб стрічка йшла безшовно
    row.innerHTML = words.concat(words).concat(words).concat(words)
      .map(function (w) { return '<span>' + w + '</span>'; }).join('');
  }

  /* ── сітка робіт ────────────────────────────── */
  var grid = document.getElementById('grid');

  function buildWorks() {
    grid.innerHTML = window.WORKS.map(function (w, i) {
      var cls = 'work' + (w.size ? ' work--' + w.size : '');
      return '<button type="button" class="' + cls + '" data-i="' + i + '">' +
        '<img src="images/works/' + w.f + '" alt="" loading="lazy">' +
        '<span class="work__meta"><b></b><i></i></span>' +
        '</button>';
    }).join('');
    labelWorks();
    reveal();
  }

  // підпис і теґ роботи потрібною мовою
  function title(w) { return w[lang] || w.uk; }
  function tag(w) { return (lang === 'en' && w.tagEn) ? w.tagEn : w.tag; }

  function labelWorks() {
    grid.querySelectorAll('.work').forEach(function (el) {
      var w = window.WORKS[+el.dataset.i];
      el.querySelector('.work__meta b').textContent = title(w);
      el.querySelector('.work__meta i').textContent = tag(w);
      el.querySelector('img').alt = title(w);
      el.setAttribute('aria-label', title(w));
    });
  }

  /* ── поява при прокрутці ────────────────────── */
  function reveal() {
    var items = grid.querySelectorAll('.work');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 60 + 'ms';
      io.observe(el);
    });
  }

  /* ── лайтбокс ───────────────────────────────── */
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var cur = 0;
  var lastFocus = null;

  function show(i) {
    cur = (i + window.WORKS.length) % window.WORKS.length;
    var w = window.WORKS[cur];
    lbImg.src = 'images/works/' + w.f;
    lbImg.alt = title(w);
    lbCap.textContent = '[ ' + title(w) + ' · ' + tag(w) + ' ]';
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('lbClose').focus();
  }

  function close() {
    lb.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  grid.addEventListener('click', function (e) {
    var el = e.target.closest('.work');
    if (el) open(+el.dataset.i);
  });

  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function () { show(cur - 1); });
  document.getElementById('lbNext').addEventListener('click', function () { show(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });

  /* ── бургер-меню (вузькі екрани) ────────────── */
  var nav = document.querySelector('.nav');
  var burger = document.getElementById('burger');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', function () {
    setMenu(!nav.classList.contains('open'));
  });

  // клік по пункту — меню закривається й сторінка їде до секції
  document.getElementById('menu').addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) setMenu(false);
  });

  /* ── перемикач мови ─────────────────────────── */
  document.getElementById('lang').addEventListener('click', function () {
    lang = lang === 'uk' ? 'en' : 'uk';
    try { localStorage.setItem('bios-lang', lang); } catch (e) { /* нічого страшного */ }
    applyTexts();
  });

  buildWorks();
  applyTexts();
})();
