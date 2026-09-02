/* BIOS — сітка робіт, дві мови, лайтбокс, плаваюча навігація. Без бібліотек. */
(function () {
  'use strict';

  var LANGS = ['uk', 'en'];
  var lang = 'uk';
  try {
    var saved = localStorage.getItem('bios-lang');
    if (LANGS.indexOf(saved) > -1) lang = saved;
  } catch (e) { /* приватний режим — просто лишаємо українську */ }

  var grid = document.getElementById('grid');
  var floatbar = document.getElementById('floatbar');
  var burger = document.getElementById('burger');

  /* ── тексти ─────────────────────────────────── */
  function applyTexts() {
    var dict = window.T[lang];
    document.documentElement.lang = lang;
    if (dict.title) document.title = dict.title;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n')];
      if (v != null) el.innerHTML = v;
    });

    document.getElementById('lang').innerHTML = lang === 'uk'
      ? '<b>UA</b><span>/</span>EN'
      : 'UA<span>/</span><b>EN</b>';

    labelWorks();
  }

  /* ── роботи ─────────────────────────────────── */
  function title(w) { return w[lang] || w.uk; }
  function tag(w) { return (lang === 'en' && w.tagEn) ? w.tagEn : w.tag; }

  function buildWorks() {
    grid.innerHTML = window.WORKS.map(function (w, i) {
      return '<button type="button" class="work' + (w.size ? ' work--' + w.size : '') + '" data-i="' + i + '">' +
        '<span class="work__frame"><img src="images/works/' + w.f + '" alt="" loading="lazy"></span>' +
        '<b></b><i></i>' +
        '</button>';
    }).join('');
    labelWorks();
    reveal();
  }

  function labelWorks() {
    grid.querySelectorAll('.work').forEach(function (el) {
      var w = window.WORKS[+el.dataset.i];
      el.querySelector('b').textContent = title(w);
      el.querySelector('i').textContent = tag(w);
      el.querySelector('img').alt = title(w);
    });
  }

  /* ── поява при прокрутці ────────────────────── */
  function reveal() {
    var items = grid.querySelectorAll('.work');
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 70 + 'ms';
    });
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
    items.forEach(function (el) { io.observe(el); });
  }

  // якщо сторінку перегорнули стрибком (клік по пункту меню),
  // спостерігач може не спрацювати — показуємо все, що вже вище низу екрана
  function revealPassed() {
    grid.querySelectorAll('.work:not(.in)').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
    });
  }

  /* ── плаваюча навігація: з'їжджає після першого екрана ── */
  var hero = document.getElementById('top');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var past = window.scrollY > hero.offsetHeight - 80;
      floatbar.classList.toggle('show', past);
      revealPassed();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── бургер (вузькі екрани) ─────────────────── */
  function setMenu(open) {
    floatbar.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', function () {
    setMenu(!floatbar.classList.contains('open'));
  });

  document.getElementById('menu').addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

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
    lbCap.textContent = title(w) + ' · ' + tag(w);
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
    if (e.key === 'Escape') {
      if (!lb.hidden) close();
      else if (floatbar.classList.contains('open')) setMenu(false);
      return;
    }
    if (lb.hidden) return;
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
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
