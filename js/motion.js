/* ==========================================================================
   MEWAD: MOTION LAYER
   Staggering, entrance choreography and library-backed effects layered on
   top of the existing CSS-only .reveal/.is-in system. Every effect here
   must degrade to the instant end-state under prefers-reduced-motion,
   since Motion/GSAP do not honour that media query on their own.
   ========================================================================== */

(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* Applies the same fade+translateY the CSS .reveal/.is-in pair already
     uses (css/main.css:1472-1481), but staggers each item's transition-delay
     by `opts.delayStep` ms - generalizing the pattern already used one-off
     for .chain-diagram__step (js/main.js:226). Items must already carry the
     .reveal class in markup; this only adds the stagger delay and lets the
     existing IntersectionObserver-driven reveal() in js/main.js do the
     actual is-in toggling. */
  function staggerReveal(items, opts) {
    opts = opts || {};
    var step = opts.delayStep || 80;
    if (!items || !items.length) return;

    items.forEach(function (el, i) {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
      if (!prefersReducedMotion()) {
        el.style.transitionDelay = (i * step) + 'ms';
      }
    });
  }

  window.MewadMotion = {
    prefersReducedMotion: prefersReducedMotion,
    staggerReveal: staggerReveal
  };
})();
