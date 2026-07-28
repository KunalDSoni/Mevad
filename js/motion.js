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

  /* Hero entrance: staggers [data-hero-stagger] children on page load, once.
     Uses Motion's animate() directly rather than the IntersectionObserver
     .reveal system, since the hero is always in view on load - there is
     nothing to "scroll into". */
  function heroEntrance() {
    var items = $$('[data-hero-stagger]');
    if (!items.length || !window.Motion) return;

    if (prefersReducedMotion()) return;

    items.forEach(function (el, i) {
      window.Motion.animate(
        el,
        { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0)'] },
        { duration: 0.6, delay: i * 0.08, easing: [0.22, 1, 0.36, 1] }
      );
    });
  }

  /* Card-grid stagger: for every .grid that currently carries .reveal on the
     *container* (audit finding #2), move reveal-behaviour onto the direct
     children instead and stagger them, so cards fade in one-by-one rather
     than all at once. Runs once at boot, before js/main.js's reveal()
     IntersectionObserver starts observing - so it must run before that. */
  function gridStagger() {
    var grids = $$('.grid.reveal');
    if (!grids.length) return;

    var allChildren = [];
    grids.forEach(function (grid) {
      grid.classList.remove('reveal');
      var children = Array.prototype.slice.call(grid.children);
      staggerReveal(children, { delayStep: 80 });
      allChildren = allChildren.concat(children);
    });

    if (!('IntersectionObserver' in window)) {
      allChildren.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

    allChildren.forEach(function (el) { io.observe(el); });
  }

  window.MewadMotion = {
    prefersReducedMotion: prefersReducedMotion,
    staggerReveal: staggerReveal,
    heroEntrance: heroEntrance,
    gridStagger: gridStagger
  };

  function boot() {
    gridStagger();
    heroEntrance();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
