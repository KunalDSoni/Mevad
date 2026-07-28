/* ==========================================================================
   MEWAD: PREFERENCES: THEME + LANGUAGE

   Loaded before every other script. Owns two pieces of state:

     theme  'dark' (default) | 'light'   -> <html data-theme>
     lang   'en'   (default) | 'hi'      -> <html lang>

   Both persist in localStorage.

   Translation works on two levels, because the site has two kinds of text:

     1. DATA strings (property names, FAQ, structures) come from
        data/projects.js. `MEWAD_HI.data` mirrors that shape and is deep-merged
        over it, so renderers just ask for `MewadPrefs.data()` and get the right
        language. Numbers are never touched - they live only in projects.js.

     2. PAGE COPY is authored directly in the HTML. `MEWAD_HI.ui` maps the
        normalised English source text to Hindi, so no markup had to be
        annotated with keys. English is the fallback: a missing entry simply
        stays English rather than rendering a raw key.
   ========================================================================== */

(function () {
  'use strict';

  var STORE_THEME = 'mewad-theme';
  var STORE_LANG  = 'mewad-lang';

  var theme = 'dark';
  var lang  = 'en';

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* --- Deep merge -------------------------------------------------------- */

  function merge(base, over) {
    if (over === undefined || over === null) return base;
    if (Array.isArray(base)) {
      if (!Array.isArray(over)) return base;
      return base.map(function (item, i) { return merge(item, over[i]); });
    }
    if (base && typeof base === 'object') {
      if (typeof over !== 'object') return base;
      var out = {};
      Object.keys(base).forEach(function (k) { out[k] = merge(base[k], over[k]); });
      return out;
    }
    return over !== undefined ? over : base;
  }

  var merged = null;

  function data() {
    if (lang === 'en' || !window.MEWAD_HI || !window.MEWAD_HI.data) return window.MEWAD;
    if (!merged) merged = merge(window.MEWAD, window.MEWAD_HI.data);
    return merged;
  }

  /* --- Page-copy translation --------------------------------------------- */

  var SEL = 'h1,h2,h3,h4,h5,p,li,dt,dd,button,a,option,th,td,summary,' +
            '.label,.figure__title,.figure__sub,.chip,.stat__label,.stat__note,' +
            '.result__name,.tl-item__where,.bar-row__name,span,text';

  var originals = [];   /* static English source, captured once at boot */

  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }

  function isSvg(el) { return el.namespaceURI === 'http://www.w3.org/2000/svg'; }

  /* snapshot() stamps data-i18n-idx onto nested elements, which would otherwise
     appear inside a parent's innerHTML and stop it matching its dictionary key
     (this silently left the arrow buttons untranslated). Strip it for lookups. */
  var IDX_ATTR = /\s*data-i18n-idx="\d+"/g;

  function read(el)  { return isSvg(el) ? el.textContent : el.innerHTML.replace(IDX_ATTR, ''); }
  function write(el, v) { if (isSvg(el)) el.textContent = v; else el.innerHTML = v; }

  /* Capture English source for the static page copy exactly once. Anything
     inside a render mount is regenerated from data and must not be captured. */
  function snapshot() {
    var els = document.querySelectorAll(SEL);
    Array.prototype.forEach.call(els, function (el) {
      if (el.closest('[data-render],[data-calculator],[data-chart]')) return;
      if (el.hasAttribute('data-i18n-idx')) return;
      el.setAttribute('data-i18n-idx', originals.length);
      originals.push(read(el));
    });
  }

  function restoreStatic() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-idx]'), function (el) {
      var i = +el.getAttribute('data-i18n-idx');
      if (originals[i] !== undefined) write(el, originals[i]);
    });
  }

  /**
   * Replace English page copy with Hindi inside `root`.
   * Outermost match wins: a <p> containing <strong> is swapped whole, and its
   * descendants are skipped, so inline markup is never double-processed.
   */
  function translate(root) {
    if (lang !== 'hi' || !window.MEWAD_HI || !window.MEWAD_HI.ui) return;
    var dict = window.MEWAD_HI.ui;
    var done = [];

    var els = (root || document).querySelectorAll(SEL);
    Array.prototype.forEach.call(els, function (el) {
      for (var i = 0; i < done.length; i++) {
        if (done[i].contains(el)) return;
      }
      /* Try the markup-preserving key first (a <p> holding <strong>), then
         fall back to plain text for the many elements with no inline markup. */
      var hit = dict[norm(read(el))];
      if (hit !== undefined) {
        write(el, hit);
        done.push(el);
        return;
      }
      if (!isSvg(el)) {
        var textHit = dict[norm(el.textContent)];
        if (textHit !== undefined && el.children.length === 0) {
          el.textContent = textHit;
          done.push(el);
        }
      }
    });
  }

  /* --- Applying state ---------------------------------------------------- */

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.querySelector('.themetog');
    if (btn) {
      btn.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  function applyLang() {
    document.documentElement.setAttribute('lang', lang);
    Array.prototype.forEach.call(document.querySelectorAll('.langtog button'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
  }

  function setTheme(next) {
    theme = next === 'light' ? 'light' : 'dark';
    store(STORE_THEME, theme);
    applyTheme();
  }

  function setLang(next) {
    var want = next === 'hi' ? 'hi' : 'en';
    if (want === lang) return;
    lang = want;
    merged = null;
    store(STORE_LANG, lang);
    applyLang();

    /* Data-driven regions are rebuilt from the merged dataset; static page
       copy is restored to English first so Hindi is never applied twice. */
    restoreStatic();
    if (window.MewadRender) window.MewadRender.all();
    translate(document);

    document.dispatchEvent(new CustomEvent('mewad:langchange', { detail: { lang: lang } }));
  }

  /* --- Nav controls ------------------------------------------------------
     Injected rather than hand-authored into four HTML files, so the markup
     can never drift between pages. */

  function mountControls() {
    var nav = document.querySelector('.nav__inner');
    if (!nav || nav.querySelector('.navctl')) return;

    var box = document.createElement('div');
    box.className = 'navctl';
    box.innerHTML =
      '<div class="langtog" role="group" aria-label="Language">' +
        '<button type="button" data-lang="en" aria-pressed="true">EN</button>' +
        '<button type="button" data-lang="hi" aria-pressed="false" lang="hi">हि</button>' +
      '</div>' +
      '<button type="button" class="themetog" aria-label="Switch to light theme">' +
        '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true">' +
          '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" stroke-linejoin="round"/>' +
        '</svg>' +
        '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true">' +
          '<circle cx="12" cy="12" r="4"/>' +
          '<path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" stroke-linecap="round"/>' +
        '</svg>' +
      '</button>';

    var toggle = nav.querySelector('.nav__toggle');
    nav.insertBefore(box, toggle || null);

    box.addEventListener('click', function (ev) {
      var l = ev.target.closest('button[data-lang]');
      if (l) { setLang(l.getAttribute('data-lang')); return; }
      if (ev.target.closest('.themetog')) setTheme(theme === 'dark' ? 'light' : 'dark');
    });
  }

  /* --- Boot -------------------------------------------------------------- */

  /* Read stored prefs immediately so the correct theme paints on first frame
     rather than flashing dark before switching. */
  var savedTheme = load(STORE_THEME);
  if (savedTheme === 'light' || savedTheme === 'dark') theme = savedTheme;
  var savedLang = load(STORE_LANG);
  if (savedLang === 'hi' || savedLang === 'en') lang = savedLang;
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('lang', lang);

  function boot() {
    mountControls();
    applyTheme();
    applyLang();
    snapshot();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.MewadPrefs = {
    data: data,
    translate: translate,
    lang: function () { return lang; },
    theme: function () { return theme; },
    setLang: setLang,
    setTheme: setTheme,
    snapshot: snapshot
  };
})();
