/* BIOS — стопка робіт, сітка, дві мови, лайтбокс, намальовані позначки.
   Без бібліотек. */
(function () {
  'use strict';

  var LANGS = ['uk', 'en'];
  var STACK_COUNT = 8;          // скільки робіт іде «стопкою», решта — сіткою

  var lang = 'uk';
  try {
    var saved = localStorage.getItem('bios-lang');
    if (LANGS.indexOf(saved) > -1) lang = saved;
  } catch (e) { /* приватний режим — просто лишаємо українську */ }

  var stack = document.getElementById('stack');
  var grid = document.getElementById('grid');
  var floatbar = document.getElementById('floatbar');
  var burger = document.getElementById('burger');

  /* ═══ намальовані позначки ═══════════════════════
     Кожна — кілька кривих. Другий штрих трохи зсунутий:
     так виходить відчуття, що маркер пройшов двічі. */
  var MARKS = {
    u: { vb: '0 0 100 12', ratio: false, d: [
      'M2,7.5 C18,3.5 34,10 52,6.8 C70,3.6 86,9 98,5.6',
      'M4.5,10.6 C21,7 38,12 56,9.2 C74,6.6 88,10.6 96.5,8.6'
    ]},
    o: { vb: '0 0 100 60', ratio: false, d: [
      'M77,7 C57,1 29,2 14.5,12 C1,21 3,42 20,50 C40,59 74,58 88,45.5 C99,35.5 95.5,17 79,8.5 C71,4.8 61,3.8 54,5'
    ]},
    s: { vb: '0 0 100 10', ratio: false, d: [
      'M2,6 C24,3 48,8 72,4 C84,2 92,5 98,4'
    ]},
    a: { vb: '0 0 90 40', ratio: true, d: [
      'M4,9 C22,1.5 52,3.5 74,20',
      'M61,10.5 L77,20.5 L58.5,30'
    ]}
  };

  function drawMarks() {
    document.querySelectorAll('[data-mark]').forEach(function (el) {
      var kind = el.getAttribute('data-mark');
      var spec = MARKS[kind];
      if (!spec) return;

      var old = el.querySelector(':scope > .mk');
      if (old) old.remove();

      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'mk mk--' + kind);
      svg.setAttribute('viewBox', spec.vb);
      svg.setAttribute('aria-hidden', 'true');
      if (!spec.ratio) svg.setAttribute('preserveAspectRatio', 'none');

      spec.d.forEach(function (d) {
        var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.setAttribute('d', d);
        svg.appendChild(p);
      });

      el.appendChild(svg);

      // довжина потрібна, щоб лінія «малювалася» від початку до кінця
      svg.querySelectorAll('path').forEach(function (p) {
        p.style.setProperty('--len', Math.ceil(p.getTotalLength()) + 'px');
      });

      watchMark(el);
    });
  }

  var markIO = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('drawn');
          markIO.unobserve(en.target);
        });
      }, { rootMargin: '0px 0px -12% 0px' })
    : null;

  function watchMark(el) {
    if (!markIO) { el.classList.add('drawn'); return; }
    el.classList.remove('drawn');
    markIO.observe(el);
  }

  /* ═══ тексти ═════════════════════════════════════ */
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
    drawMarks();          // після зміни мови позначки треба намалювати заново
  }

  /* ═══ роботи ═════════════════════════════════════ */
  function title(w) { return w[lang] || w.uk; }
  function tag(w) { return (lang === 'en' && w.tagEn) ? w.tagEn : w.tag; }

  function buildWorks() {
    var all = window.WORKS;
    var top = all.slice(0, STACK_COUNT);
    var rest = all.slice(STACK_COUNT);

    stack.innerHTML = top.map(function (w, i) {
      return '<article class="stack__card">' +
        '<button type="button" class="stack__inner" data-i="' + i + '">' +
          '<img src="images/works/' + w.f + '" alt="" ' + (i ? 'loading="lazy"' : '') + '>' +
          '<span class="stack__no">' + pad(i + 1) + ' / ' + pad(top.length) + '</span>' +
          '<span class="stack__meta"><b></b><i></i></span>' +
        '</button>' +
      '</article>';
    }).join('');

    grid.innerHTML = rest.map(function (w, i) {
      return '<button type="button" class="work' + (w.size ? ' work--' + w.size : '') +
        '" data-i="' + (i + STACK_COUNT) + '">' +
        '<span class="work__frame"><img src="images/works/' + w.f + '" alt="" loading="lazy"></span>' +
        '<b></b><i></i>' +
      '</button>';
    }).join('');

    labelWorks();
    reveal();
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function labelWorks() {
    document.querySelectorAll('[data-i]').forEach(function (el) {
      var w = window.WORKS[+el.dataset.i];
      if (!w) return;
      el.querySelector('b').textContent = title(w);
      el.querySelector('i').textContent = tag(w);
      el.querySelector('img').alt = title(w);
      el.setAttribute('aria-label', title(w));
    });
  }

  /* ═══ поява плиток при прокрутці ═════════════════ */
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

  // якщо сторінку перегорнули стрибком, спостерігач може не спрацювати
  function revealPassed() {
    grid.querySelectorAll('.work:not(.in)').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
    });
  }

  /* ═══ наїзд карток одна на одну ══════════════════
     У прилиплої картки offsetTop їде разом із прокруткою,
     тому природну позицію рахуємо самі — картки однакової висоти. */
  var cards = [];

  function moveStack() {
    if (!cards.length) return;
    var top = stack.getBoundingClientRect().top + window.scrollY;
    var H = cards[0].offsetHeight;
    for (var i = 0; i < cards.length - 1; i++) {
      var passed = window.scrollY - (top + i * H);
      var p = Math.min(Math.max(passed / H, 0), 1);
      var inner = cards[i].firstElementChild;
      inner.style.transform = 'scale(' + (1 - 0.085 * p) + ')';
      inner.style.setProperty('--fade', (p * 0.45).toFixed(3));
    }
  }

  /* ═══ плаваюча навігація ═════════════════════════ */
  var hero = document.getElementById('top');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      floatbar.classList.toggle('show', window.scrollY > hero.offsetHeight - 80);
      revealPassed();
      moveStack();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ═══ бургер ═════════════════════════════════════ */
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

  /* ═══ лайтбокс ═══════════════════════════════════ */
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
    lbImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.getElementById('works').addEventListener('click', function (e) {
    var el = e.target.closest('[data-i]');
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

  /* ═══ перемикач мови ═════════════════════════════ */
  document.getElementById('lang').addEventListener('click', function () {
    lang = lang === 'uk' ? 'en' : 'uk';
    try { localStorage.setItem('bios-lang', lang); } catch (e) { /* нічого страшного */ }
    applyTexts();
  });

  buildWorks();
  cards = stack.querySelectorAll('.stack__card');
  applyTexts();
  onScroll();
})();
