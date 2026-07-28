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
        { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
      );
    });
  }

  /* Card-grid stagger: for every .grid that currently carries .reveal on the
     *container* (audit finding #2), move reveal-behaviour onto the direct
     children instead and stagger them, so cards fade in one-by-one rather
     than all at once. Runs once at boot. Must run after js/main.js's
     renderAll() has populated the page's data-render mount points (e.g. the
     .grid sections on index.html are empty until renderAll() fills them
     from data/projects.js) - otherwise there would be no .grid.reveal
     children here to stagger. This is guaranteed: boot() below only runs on
     DOMContentLoaded, and js/main.js's own DOMContentLoaded-triggered
     renderAll() has already completed by then, since js/main.js's script
     tag and its DOMContentLoaded listener registration both happen before
     js/motion.js's script tag runs. */
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

  /* Cross-fades a text-content swap on an element - used when the
     calculator's result numbers change from a slider drag, so the update
     reads as a transition rather than an instant jump. Falls back to an
     instant swap under reduced motion or if Motion failed to load. */
  function animateValueChange(el, newText) {
    if (!el || el.textContent === newText) return;

    if (!window.Motion || prefersReducedMotion()) {
      el.textContent = newText;
      return;
    }

    window.Motion.animate(el, { opacity: [1, 0] }, { duration: 0.12 }).finished.then(function () {
      el.textContent = newText;
      window.Motion.animate(el, { opacity: [0, 1] }, { duration: 0.18 });
    });
  }

  /* Subtle magnetic pull toward the cursor on primary CTA buttons only
     (.btn--primary) - a small, deliberate flourish on the highest-intent
     click targets, not applied to every button on the site. Disabled
     entirely on touch devices (no meaningful pointermove there) and under
     reduced motion. Note: .btn--primary:hover already sets
     transform: translateY(-1px) via CSS transition (css/main.css:478-482);
     the JS transform set inline via Motion overrides the CSS transform
     while hovering - an accepted, deliberate trade-off, since the CSS lift
     and the JS pull are both small nudges in the same spirit, and both
     still return to the resting state on mouseleave. */
  function magneticButtons() {
    if (prefersReducedMotion() || !window.Motion) return;
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;

    var MAX_PULL = 6;

    $$('.btn--primary').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var relX = (e.clientX - rect.left) / rect.width - 0.5;
        var relY = (e.clientY - rect.top) / rect.height - 0.5;
        window.Motion.animate(btn, {
          transform: 'translate(' + (relX * MAX_PULL * 2) + 'px, ' + (relY * MAX_PULL * 2) + 'px)'
        }, { duration: 0.3, ease: [0.22, 1, 0.36, 1] });
      });

      btn.addEventListener('mouseleave', function () {
        window.Motion.animate(btn, { transform: 'translate(0px, 0px)' }, { duration: 0.4, ease: [0.22, 1, 0.36, 1] });
      });
    });
  }

  /* Exactly one Rough Notation mark on the whole site, per
     docs/ui-roadmap.md's explicit warning against overusing hand-drawn
     annotation on a precise, engineering-drawing brand. Triggers once when
     scrolled into view, using the same IntersectionObserver pattern as
     reveal() in js/main.js. The stroke color is resolved from the current
     theme's --accent-bg custom property at call time (rather than
     hardcoded) since --accent-bg flips between dark and light themes
     (css/main.css) and Rough Notation's SVG stroke can't consume a CSS
     custom property directly. */
  function emphasisMarks() {
    var target = $('#mark-vacation');
    if (!target || !window.RoughNotation || prefersReducedMotion()) return;

    var annotation = null;
    var shown = false;

    function currentStrokeColor() {
      return getComputedStyle(document.documentElement).getPropertyValue('--accent-bg').trim() || '#FDFDF1';
    }

    function createAndShow() {
      annotation = window.RoughNotation.annotate(target, {
        type: 'underline',
        color: currentStrokeColor(),
        strokeWidth: 2,
        padding: 2
      });
      annotation.show();
      shown = true;
    }

    if (!('IntersectionObserver' in window)) {
      createAndShow();
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            createAndShow();
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      io.observe(target);
    }

    /* Rough Notation's SVG stroke is a plain color baked in at annotate()
       time - it can't consume a CSS custom property, so it never updates
       automatically when the theme toggle (js/prefs.js) flips
       <html data-theme>. Watch for that attribute change and, if the mark
       has already been shown, remove and re-create it with the freshly
       read --accent-bg value so the underline stays visible against the
       new theme's background. */
    var themeObserver = new MutationObserver(function () {
      if (!shown || !annotation) return;
      annotation.remove();
      annotation = null;
      shown = false;
      createAndShow();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  /* Draws in any .chart__line path present in the DOM, using the
     stroke-dasharray trick (no chart currently renders one - see
     docs/superpowers/plans/2026-07-29-motion-layer-implementation.md
     Task 10 - this is a no-op today and activates automatically the day a
     line/area chart is added to returns.html). GSAP-owned per
     docs/design-system.md. */
  function chartDrawIn() {
    var paths = $$('.chart__line');
    if (!paths.length || !window.gsap || prefersReducedMotion()) return;

    paths.forEach(function (path) {
      var length = path.getTotalLength();
      window.gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      window.gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: path, start: 'top 80%', once: true }
      });
    });
  }

  window.MewadMotion = {
    prefersReducedMotion: prefersReducedMotion,
    staggerReveal: staggerReveal,
    heroEntrance: heroEntrance,
    gridStagger: gridStagger,
    animateValueChange: animateValueChange,
    magneticButtons: magneticButtons,
    emphasisMarks: emphasisMarks,
    chartDrawIn: chartDrawIn
  };

  function boot() {
    gridStagger();
    heroEntrance();
    magneticButtons();
    emphasisMarks();
    if (window.gsap) chartDrawIn();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
