# Motion & Interaction Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a tasteful, premium motion/interaction layer (hero stagger, card-grid stagger, calculator value transitions, chart draw-in, card hover lift, one Rough Notation emphasis mark, magnetic CTA buttons) to Mewad's four static pages, per `docs/ui-roadmap.md` backlog items 1–12.

**Architecture:** No bundler exists and none is introduced. Three libraries load via CDN `<script>` tags (Motion as a UMD global, Rough Notation as a UMD global, GSAP + ScrollTrigger as UMD globals on `returns.html` only). All new behavior lives in one new file, `js/motion.js`, loaded after `js/main.js` on every page, following the existing IIFE-per-file convention. It reads DOM structure already rendered by `js/main.js`'s `renderAll()`, so it must run after `DOMContentLoaded`/render, matching how `js/main.js` itself boots.

**Tech Stack:** Vanilla JS (ES5-style IIFE, matching `js/main.js`), Motion (motion.dev UMD build), Rough Notation (UMD build), GSAP + ScrollTrigger (UMD build, `returns.html` only). No new CSS framework. No test runner exists in this repo — verification is manual via `./serve.sh` in a real browser, per task.

## Global Constraints

- No content/copy changes anywhere.
- No color or theme token changes (`css/main.css` `:root` / `:root[data-theme='light']` blocks stay untouched).
- Spacing/type-scale values may only change where explicitly called for below (the `.hero--compact` utility) — no general restyle.
- `pitch-deck/` is out of scope.
- Every JS-driven animation (Motion, GSAP) must check `matchMedia('(prefers-reduced-motion: reduce)')` and skip straight to the end state if true — these libraries do not respect the media query automatically, unlike the site's existing CSS transitions.
- Animate `transform`/`opacity` only for entrance/hover effects (never `width`/`height`/`top`/`left`), except the pre-existing `.bar-row__fill`/`.cap-chart__bar` width transitions, which are intentional and untouched.
- Libraries load `defer`/at end of body, after the render pipeline scripts, never blocking first paint.
- GSAP/ScrollTrigger load only on `returns.html`, not site-wide.
- Follow the existing code style in `js/main.js`: one static IIFE, `'use strict'`, `$`/`$$` query helpers, `$$(...).forEach`.

---

## Task 1: Reduced-motion helper + stagger helper (Phase 1 foundation)

**Files:**
- Create: `js/motion.js`
- Modify: `index.html:415` (add script tag after `js/main.js`)
- Modify: `invest.html:193` (same)
- Modify: `properties.html:154` (same)
- Modify: `returns.html:157` (same)

**Interfaces:**
- Consumes: nothing from other tasks (this is the foundation).
- Produces: `window.MewadMotion = { prefersReducedMotion, staggerReveal }` — later tasks call `window.MewadMotion.prefersReducedMotion()` (returns boolean) and `window.MewadMotion.staggerReveal(items, opts)` (applies staggered `.reveal`/`.is-in` timing to a NodeList/array of elements, `opts.delayStep` in ms, default 80, matching the existing `chain-diagram__step` cadence at `js/main.js:226`).

- [ ] **Step 1: Create `js/motion.js` with the reduced-motion helper and stagger helper**

```javascript
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
```

- [ ] **Step 2: Add the script tag to all four pages, after `js/main.js`**

In `index.html`, replace:
```html
<script src="js/main.js"></script>
</body>
```
with:
```html
<script src="js/main.js"></script>
<script src="js/motion.js"></script>
</body>
```

Apply the identical edit to `invest.html`, `properties.html`, `returns.html` (each has the same `<script src="js/main.js"></script>\n</body>` pattern at the end of the file).

- [ ] **Step 3: Verify**

Run `./serve.sh` and open `http://localhost:8080/index.html` in a browser. Open DevTools console — confirm no errors and that `window.MewadMotion` is defined (type `MewadMotion` in the console, expect the object with both functions). Repeat for the other three pages.

- [ ] **Step 4: Commit**

```bash
git add js/motion.js index.html invest.html properties.html returns.html
git commit -m "feat: add motion.js foundation with reduced-motion and stagger helpers"
```

---

## Task 2: Load Motion library (CDN, deferred)

**Files:**
- Modify: `index.html:16` (add script tag in `<head>`, before `css/main.css` link or right after — see step)
- Modify: `invest.html:13`
- Modify: `properties.html:13`
- Modify: `returns.html:13`

**Interfaces:**
- Consumes: nothing.
- Produces: global `window.Motion` object (`Motion.animate`, `Motion.stagger`, `Motion.inView`) available to `js/motion.js` from Task 3 onward. Loaded with `defer` so it's guaranteed parsed before any `defer`/end-of-body script runs, per HTML spec ordering.

- [ ] **Step 1: Add the Motion CDN script tag to `<head>` on all four pages**

In `index.html`, after the existing stylesheet link:
```html
<link rel="stylesheet" href="css/main.css">
<script src="https://cdn.jsdelivr.net/npm/motion@11/dist/motion.min.js" defer></script>
</head>
```

Apply the identical addition to `invest.html`, `properties.html`, `returns.html` (each has `<link rel="stylesheet" href="css/main.css">\n</head>` at the same spot).

- [ ] **Step 2: Verify**

Run `./serve.sh`, open each page, check DevTools console for the script loading (Network tab, `motion.min.js` returns 200) and confirm `window.Motion` is defined and has an `animate` function (`typeof Motion.animate === 'function'` in console).

- [ ] **Step 3: Commit**

```bash
git add index.html invest.html properties.html returns.html
git commit -m "feat: load Motion library via CDN on all pages"
```

---

## Task 3: Hero entrance stagger (audit finding #1, backlog #3)

**Files:**
- Modify: `js/motion.js` (add `heroEntrance()` function + call it from boot)
- Modify: `index.html:41-62` (add stagger target attributes to the hero, no visual/content change)
- Modify: `invest.html:34-47`, `properties.html:34-47`, `returns.html:34-47` (same)

**Interfaces:**
- Consumes: `Motion.animate` (Task 2), `prefersReducedMotion()` (Task 1).
- Produces: nothing consumed by later tasks directly, but establishes the `data-hero-stagger` attribute convention Task 4 reuses for card grids.

- [ ] **Step 1: Add `data-hero-stagger` markers to each hero's children**

In `index.html`, the hero block currently is:
```html
<section class="hero">
  <div class="gridlines" aria-hidden="true"></div>
  <div class="hero__glow" aria-hidden="true"></div>
  <div class="wrap hero__inner">

    <h1>Hotel Mewad</h1>
    <p class="hero__tagline">India's 1<sup>st</sup> Industrial Hotel</p>

    <p class="hero__lede">
      The flagship property of Mewad
      Business Hotels, building the hospitality infrastructure behind
      India's manufacturing revolution.
    </p>

    <div class="hero__cta">
      <a class="btn btn--primary" href="#performance">View performance <span class="btn__arrow">→</span></a>
      <a class="btn btn--ghost" href="#story">Our story</a>
      <a class="btn btn--ghost" href="invest.html">Become a capital partner</a>
    </div>

  </div>
</section>
```
Add `data-hero-stagger` to `<h1>`, `.hero__tagline`, `.hero__lede`, `.hero__cta`, in that order (no text/attribute-value content changes, just a new attribute on each existing tag):
```html
    <h1 data-hero-stagger>Hotel Mewad</h1>
    <p class="hero__tagline" data-hero-stagger>India's 1<sup>st</sup> Industrial Hotel</p>

    <p class="hero__lede" data-hero-stagger>
      The flagship property of Mewad
      Business Hotels, building the hospitality infrastructure behind
      India's manufacturing revolution.
    </p>

    <div class="hero__cta" data-hero-stagger>
```
For `invest.html`, `properties.html`, `returns.html`, each hero is:
```html
<section class="hero" style="padding-block:clamp(3rem,7vw,5rem) 0">
  <div class="gridlines" aria-hidden="true"></div>
  <div class="wrap hero__inner">
    <span class="label label--accent">...</span>
    <h1 style="...">...</h1>
    <p class="hero__lede">...</p>
  </div>
</section>
```
Add `data-hero-stagger` to the `<span class="label...">`, `<h1>`, and `<p class="hero__lede">` on each of those three pages (three attributes added per page, no other change).

- [ ] **Step 2: Add `heroEntrance()` to `js/motion.js`**

Append inside the existing IIFE in `js/motion.js`, after `staggerReveal`:
```javascript
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
```
Then update the `window.MewadMotion` export at the bottom of `js/motion.js` to include it, and call it on boot:
```javascript
  window.MewadMotion = {
    prefersReducedMotion: prefersReducedMotion,
    staggerReveal: staggerReveal,
    heroEntrance: heroEntrance
  };

  function boot() {
    heroEntrance();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
```

- [ ] **Step 3: Verify**

Run `./serve.sh`. Load each of the four pages with a hard refresh (Cmd/Ctrl+Shift+R) and visually confirm the hero content fades/slides in with a slight stagger instead of appearing instantly. Then enable "Emulate CSS prefers-reduced-motion: reduce" in DevTools Rendering tab, hard-refresh again, and confirm the hero appears instantly with no animation (opacity 1 immediately — since the function returns early, the elements' natural CSS opacity of 1 applies, no flash of invisible content).

- [ ] **Step 4: Commit**

```bash
git add js/motion.js index.html invest.html properties.html returns.html
git commit -m "feat: stagger hero entrance on all four pages"
```

---

## Task 4: Card-grid stagger (audit finding #2, backlog #4)

**Files:**
- Modify: `js/motion.js` (add `gridStagger()` function)
- Modify: `js/main.js:46-65` (small change: `reveal()` must skip elements handled by `gridStagger()`'s own IO-driven reveal, OR simpler — reuse the same `reveal()`/IO system by only adjusting `transition-delay` per child, which is what `staggerReveal` from Task 1 already does)

**Interfaces:**
- Consumes: `staggerReveal` (Task 1), the existing `.reveal`/`.is-in` CSS pair and `reveal()` IntersectionObserver in `js/main.js:46-65` (unchanged).
- Produces: nothing consumed by later tasks.

This task deliberately reuses the *existing* `.reveal`/IntersectionObserver system rather than introducing a second one — `staggerReveal()` (Task 1) only sets `transition-delay` per child; the actual "add `.is-in` when visible" logic stays exactly as-is in `js/main.js`. This keeps one IO instance total, per the performance guide rule against per-element observers.

- [ ] **Step 1: Add `gridStagger()` to `js/motion.js`**

Every card grid marked `reveal` currently reveals as one block because `.reveal` sits on the grid container, not the cards (audit finding #2 — e.g. `index.html:80`, `properties.html:65`, `invest.html:99`). Fix: move the class down to the children and stagger them, instead of leaving it on the container.

Append to `js/motion.js`, after `heroEntrance`:
```javascript
  /* Card-grid stagger: for every .grid that currently carries .reveal on the
     *container* (audit finding #2), move reveal-behaviour onto the direct
     children instead and stagger them, so cards fade in one-by-one rather
     than all at once. Runs once at boot, before js/main.js's reveal()
     IntersectionObserver starts observing - so it must run before that. */
  function gridStagger() {
    var grids = $$('.grid.reveal');
    grids.forEach(function (grid) {
      grid.classList.remove('reveal');
      var children = Array.prototype.slice.call(grid.children);
      staggerReveal(children, { delayStep: 80 });
    });
  }
```
Update the `boot()` function added in Task 3 to call `gridStagger()` **before** `heroEntrance()` is irrelevant to ordering, but it must run before `js/main.js`'s own `reveal()` call. Since `js/motion.js` loads after `js/main.js` as a separate `<script>` tag (not `defer`/`module`), and both are non-module classic scripts executed in document order, `js/main.js`'s `boot()` (which calls `reveal()` at `js/main.js:480`) has **already run** by the time `js/motion.js` executes. This means `gridStagger()` must re-run the reveal wiring for the newly-added `.reveal` children, since `js/main.js`'s `reveal()` already observed the old (now-removed) container elements and won't see the new children.

Revise `gridStagger()` to observe the new children directly using the same IntersectionObserver technique, rather than depending on `js/main.js` reveal() having already run:
```javascript
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
```
This mirrors `reveal()` in `js/main.js:46-65` exactly (same threshold, same rootMargin, same unobserve-once behavior) — intentional, so grid children reveal on the same trigger point as everything else on the page.

Add it to the exports and to `boot()`:
```javascript
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
```

- [ ] **Step 2: Verify**

Run `./serve.sh`, open `index.html`, scroll to the "Who we are" section (`#story`, a `.grid.grid--3.reveal`) — confirm the three story cards fade in one after another rather than simultaneously. Repeat on `properties.html` (`.grid.grid--2` site-selection tests) and `invest.html` (`.grid.grid--3` documents/compliance cards). Confirm no card is ever stuck invisible (check every grid on every page reaches `is-in` after scrolling past it). Then re-check under emulated `prefers-reduced-motion: reduce` — cards should appear immediately with no fade, matching current behavior with `.reveal` at `css/main.css:1479-1481`.

- [ ] **Step 3: Commit**

```bash
git add js/motion.js
git commit -m "feat: stagger card-grid reveal instead of revealing as one block"
```

---

## Task 5: Card hover lift (audit finding #6, backlog #7)

**Files:**
- Modify: `css/main.css:727-732`

**Interfaces:**
- Consumes: nothing (pure CSS).
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Extend `.card` hover to match the existing button hover pattern**

Current:
```css
.card {
  background: var(--ink-1);
  padding: clamp(1.5rem, 3vw, 2.15rem);
  transition: background 0.25s var(--ease);
}
.card:hover { background: var(--ink-2); }
```
Change to (adds `transform`/`box-shadow` to the transition list and hover rule, mirroring `.btn--primary:hover` at `css/main.css:478-482`; no color values change):
```css
.card {
  background: var(--ink-1);
  padding: clamp(1.5rem, 3vw, 2.15rem);
  transition: background 0.25s var(--ease), transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
}
.card:hover {
  background: var(--ink-2);
  transform: translateY(-2px);
  box-shadow: 0 10px 28px -14px var(--shadow);
}

@media (prefers-reduced-motion: reduce) {
  .card:hover { transform: none; }
}
```
The reduced-motion override is needed here specifically because the global reset at `css/main.css:120-127` zeroes *durations*, not the `transform` value itself — without this override, a reduced-motion user would still see the card jump instantly to `translateY(-2px)` on hover, which is exactly the kind of motion the media query exists to suppress.

- [ ] **Step 2: Verify**

Run `./serve.sh`, hover over any `.card` on `index.html`, `invest.html`, `properties.html` — confirm a subtle lift + shadow appears alongside the existing background change. Then toggle emulated `prefers-reduced-motion: reduce` and confirm hovering a card only changes background, no lift.

- [ ] **Step 3: Commit**

```bash
git add css/main.css
git commit -m "feat: add hover lift to cards, matching existing button hover pattern"
```

---

## Task 6: Uniform `.reveal` coverage (audit finding #4, backlog #6)

**Files:**
- Modify: `invest.html:53-67` (add `.reveal` to the `.split` block, currently missing it)
- Modify: `properties.html` and `returns.html` (already close to full coverage per the audit — verify and fill remaining gaps)

**Interfaces:**
- Consumes: existing `.reveal`/`reveal()` system, unchanged.
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Add `.reveal` to the missing `.split` block in `invest.html`**

Current (`invest.html:53`):
```html
    <div class="split mt-3">
```
Change to:
```html
    <div class="split mt-3 reveal">
```

- [ ] **Step 2: Audit remaining gaps on `properties.html` and `returns.html`**

Both files' non-hero sections already carry `.reveal` on `.section-head` and the following content block (confirmed during the audit — `properties.html:57,65`, `returns.html:57,65`). No further changes needed on these two files for this task; this step is a verification pass, not a code change. Grep to confirm before moving on:

```bash
grep -c "reveal" properties.html returns.html
```
Expected: both counts unchanged from before Task 6 (this task's only code change is the one line in `invest.html`).

- [ ] **Step 3: Verify**

Run `./serve.sh`, open `invest.html`, scroll past the "Direct ownership is live today" / "The parent company is the next phase" two-column block — confirm it now fades in like every other section instead of appearing instantly.

- [ ] **Step 4: Commit**

```bash
git add invest.html
git commit -m "fix: add missing scroll-reveal to invest.html split section"
```

---

## Task 7: Calculator result value transitions (audit finding #3, backlog #5)

**Files:**
- Modify: `js/calculator.js:318-338` (the `render()` function's result-card HTML generation)
- Modify: `js/motion.js` (add `animateResultChange()` helper, called by calculator)

**Interfaces:**
- Consumes: `window.Motion` (Task 2), `window.MewadMotion.prefersReducedMotion` (Task 1).
- Produces: `window.MewadMotion.animateValueChange(el, fromText, toText)` — a small helper any future numeric-display update can reuse.

- [ ] **Step 1: Add a value-change animation helper to `js/motion.js`**

Append after `gridStagger`:
```javascript
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
```
Add it to the exports:
```javascript
  window.MewadMotion = {
    prefersReducedMotion: prefersReducedMotion,
    staggerReveal: staggerReveal,
    heroEntrance: heroEntrance,
    gridStagger: gridStagger,
    animateValueChange: animateValueChange
  };
```

- [ ] **Step 2: Use it in `js/calculator.js`'s render function for the IRR figure**

The result cards are fully re-rendered as an HTML string on every input change (`js/calculator.js:318-338`, `ui.results.innerHTML = results.map(...).join('')`). Rebuild that pattern is fine for the structural HTML, but the headline IRR figure benefits from a value-transition instead of a silent innerHTML replace destroying and recreating the element every keystroke. Change the render function to reuse existing `.result__irr` elements when they already exist, updating their text via `animateValueChange` instead of rebuilding them:

Current end of `render()` (`js/calculator.js:318-340`):
```javascript
      ui.results.innerHTML = results.map(function (r) {
        var neg = r.irr !== null && r.irr < 0;
        return '<div class="result' + (r === best && results.length > 1 ? ' is-best' : '') + '">' +
          '<div class="result__name">' + r.structure.name + '</div>' +
          '<div class="result__hero">' +
            '<span class="result__irr' + (neg ? ' result__irr--neg' : '') + '">' +
              (r.irr === null ? '-' : pct(r.irr)) + '</span>' +
            '<span class="result__irrlabel">'+W.irr+'</span>' +
          '</div>' +
          '<dl class="result__rows">' +
            '<div class="result__row"><dt>'+L.ownershipPct+'</dt><dd>' + pct(r.ownershipPct, 2) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.payoutYr+'</dt><dd>' + inrCompact(r.stabilisedAnnual) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.perMonth+'</dt><dd>' + inrCompact(r.stabilisedMonthly) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.yieldOnCost+'</dt><dd>' + pct(r.yieldOnCost) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.firstPayout+'</dt><dd>'+W.year+' ' + r.firstPayoutYear + '</dd></div>' +
            '<div class="result__row"><dt>'+L.income+', ' + state.horizon + ' '+W.yrs+'</dt><dd>' + inrCompact(r.incomeTotal) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.exitValue+'</dt><dd>' + inrCompact(r.exitValue) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.multiple+'</dt><dd>' + r.multiple.toFixed(2) + '×</dd></div>' +
          '</dl>' +
        '</div>';
      }).join('');

      if (window.MewadPrefs) window.MewadPrefs.translate(ui.results);
    }
```
Replace with (rebuilds the full markup as before — the structural `.result` cards still need to reflow when `is-best` or scenario labels change — but afterward, walks the freshly-rendered `.result__irr` elements and re-applies the animation on top of the already-set text, using a data attribute to detect an actual value change across renders):
```javascript
      var prevIrrText = {};
      $$('.result', ui.results).forEach(function (card, i) {
        var irrEl = card.querySelector('.result__irr');
        if (irrEl) prevIrrText[i] = irrEl.textContent;
      });

      ui.results.innerHTML = results.map(function (r) {
        var neg = r.irr !== null && r.irr < 0;
        return '<div class="result' + (r === best && results.length > 1 ? ' is-best' : '') + '">' +
          '<div class="result__name">' + r.structure.name + '</div>' +
          '<div class="result__hero">' +
            '<span class="result__irr' + (neg ? ' result__irr--neg' : '') + '">' +
              (r.irr === null ? '-' : pct(r.irr)) + '</span>' +
            '<span class="result__irrlabel">'+W.irr+'</span>' +
          '</div>' +
          '<dl class="result__rows">' +
            '<div class="result__row"><dt>'+L.ownershipPct+'</dt><dd>' + pct(r.ownershipPct, 2) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.payoutYr+'</dt><dd>' + inrCompact(r.stabilisedAnnual) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.perMonth+'</dt><dd>' + inrCompact(r.stabilisedMonthly) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.yieldOnCost+'</dt><dd>' + pct(r.yieldOnCost) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.firstPayout+'</dt><dd>'+W.year+' ' + r.firstPayoutYear + '</dd></div>' +
            '<div class="result__row"><dt>'+L.income+', ' + state.horizon + ' '+W.yrs+'</dt><dd>' + inrCompact(r.incomeTotal) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.exitValue+'</dt><dd>' + inrCompact(r.exitValue) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.multiple+'</dt><dd>' + r.multiple.toFixed(2) + '×</dd></div>' +
          '</dl>' +
        '</div>';
      }).join('');

      if (window.MewadPrefs) window.MewadPrefs.translate(ui.results);

      if (window.MewadMotion) {
        root.querySelectorAll('.result').forEach(function (card, i) {
          var irrEl = card.querySelector('.result__irr');
          if (!irrEl) return;
          var finalText = irrEl.textContent;
          if (prevIrrText[i] !== undefined && prevIrrText[i] !== finalText) {
            irrEl.textContent = prevIrrText[i];
            window.MewadMotion.animateValueChange(irrEl, finalText);
          }
        });
      }
    }
```
Note: `root` is already in scope inside `init(root)`, which wraps `render()` — confirmed at `js/calculator.js:182,286`. `$$` is already defined at the top of `js/calculator.js`? Check: it is **not** — `js/calculator.js` has no `$$` helper defined (only `js/main.js` does, and it's IIFE-scoped, not global). Use the native `root.querySelectorAll(...).forEach(...)` form shown above instead (already written that way above — `root.querySelectorAll` is used directly, no `$$` dependency introduced).

- [ ] **Step 3: Verify**

Run `./serve.sh`, open `returns.html`, drag the investment amount or occupancy slider — confirm the IRR percentage figures on both result cards briefly fade out and back in with the new value, instead of jumping instantly. Confirm every other field (ownership %, payout, exit value, etc.) still updates instantly as before (only the headline IRR gets the transition, per the task scope). Toggle emulated `prefers-reduced-motion: reduce` and confirm the IRR figure updates instantly with no fade.

- [ ] **Step 4: Commit**

```bash
git add js/motion.js js/calculator.js
git commit -m "feat: animate calculator IRR value transitions on input change"
```

---

## Task 8: Magnetic pull on primary CTA buttons (backlog #9)

**Files:**
- Modify: `js/motion.js` (add `magneticButtons()`)

**Interfaces:**
- Consumes: `window.Motion`, `prefersReducedMotion()`.
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Add `magneticButtons()` to `js/motion.js`**

Append after `animateValueChange`:
```javascript
  /* Subtle magnetic pull toward the cursor on primary CTA buttons only
     (.btn--primary) - a small, deliberate flourish on the highest-intent
     click targets, not applied to every button on the site. Disabled
     entirely on touch devices (no meaningful pointermove there) and under
     reduced motion. */
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
        }, { duration: 0.3, easing: [0.22, 1, 0.36, 1] });
      });

      btn.addEventListener('mouseleave', function () {
        window.Motion.animate(btn, { transform: 'translate(0px, 0px)' }, { duration: 0.4, easing: [0.22, 1, 0.36, 1] });
      });
    });
  }
```
Add to exports and `boot()`:
```javascript
  window.MewadMotion = {
    prefersReducedMotion: prefersReducedMotion,
    staggerReveal: staggerReveal,
    heroEntrance: heroEntrance,
    gridStagger: gridStagger,
    animateValueChange: animateValueChange,
    magneticButtons: magneticButtons
  };

  function boot() {
    gridStagger();
    heroEntrance();
    magneticButtons();
  }
```
Note: `.btn--primary:hover` already sets `transform: translateY(-1px)` via CSS transition (`css/main.css:478-482`). The JS `transform: translate(...)` set inline via Motion will override the CSS transform on hover. This is an accepted, deliberate trade-off — document it in the same comment block: the CSS `translateY(-1px)` lift is subsumed by the JS magnetic pull while hovering, and both still return to the resting state on mouseleave. No visual regression: the lift and the pull are both small vertical/lateral nudges in the same spirit.

- [ ] **Step 2: Verify**

Run `./serve.sh`, hover and move the mouse across any `.btn--primary` (e.g. the hero "View performance" button on `index.html`) — confirm the button subtly shifts toward the cursor and springs back on mouseleave. Confirm it does *not* engage on mobile/touch emulation (DevTools device toolbar) and is inert under emulated `prefers-reduced-motion: reduce`.

- [ ] **Step 3: Commit**

```bash
git add js/motion.js
git commit -m "feat: add magnetic pull to primary CTA buttons"
```

---

## Task 9: Rough Notation — one emphasis mark (backlog #11)

**Files:**
- Modify: `index.html:16` (add Rough Notation CDN script tag to `<head>`, same pattern as Task 2)
- Modify: `index.html:100` (mark the target phrase with a wrapping `<span>`)
- Modify: `js/motion.js` (add `emphasisMarks()`)

**Interfaces:**
- Consumes: global `window.RoughNotation` (`RoughNotation.annotate`).
- Produces: nothing consumed elsewhere.

Scope discipline per `docs/ui-libraries.md` and `docs/animation-catalog.md`: **exactly one** mark, on `index.html` only, per the roadmap's explicit warning against overuse.

- [ ] **Step 1: Load Rough Notation on `index.html` only**

In `index.html`'s `<head>`, after the Motion script tag added in Task 2:
```html
<script src="https://cdn.jsdelivr.net/npm/motion@11/dist/motion.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/rough-notation@0.5.1/lib/rough-notation.iife.js" defer></script>
</head>
```

- [ ] **Step 2: Wrap the target phrase in a span**

The demand section's closing line (`index.html:100`):
```html
<p class="demand-close reveal">Six paying reasons. <span style="color:var(--accent-ink)">Zero of them are on vacation.</span></p>
```
Add an id to the existing `<span>` (no text change, no color change — the inline `color` style stays exactly as-is):
```html
<p class="demand-close reveal">Six paying reasons. <span id="mark-vacation" style="color:var(--accent-ink)">Zero of them are on vacation.</span></p>
```

- [ ] **Step 3: Add `emphasisMarks()` to `js/motion.js`**

Append after `magneticButtons`:
```javascript
  /* Exactly one Rough Notation mark on the whole site, per
     docs/ui-roadmap.md's explicit warning against overusing hand-drawn
     annotation on a precise, engineering-drawing brand. Triggers once when
     scrolled into view, using the same IntersectionObserver pattern as
     reveal() in js/main.js. */
  function emphasisMarks() {
    var target = $('#mark-vacation');
    if (!target || !window.RoughNotation || prefersReducedMotion()) return;

    var annotation = window.RoughNotation.annotate(target, {
      type: 'underline',
      color: '#FDFDF1',
      strokeWidth: 2,
      padding: 2
    });

    if (!('IntersectionObserver' in window)) { annotation.show(); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          annotation.show();
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    io.observe(target);
  }
```
Add to exports and `boot()`:
```javascript
  window.MewadMotion = {
    prefersReducedMotion: prefersReducedMotion,
    staggerReveal: staggerReveal,
    heroEntrance: heroEntrance,
    gridStagger: gridStagger,
    animateValueChange: animateValueChange,
    magneticButtons: magneticButtons,
    emphasisMarks: emphasisMarks
  };

  function boot() {
    gridStagger();
    heroEntrance();
    magneticButtons();
    emphasisMarks();
  }
```
The hardcoded `color: '#FDFDF1'` matches `--accent-bg`'s dark-theme value exactly (`css/main.css:30`) — Rough Notation's SVG stroke can't consume a CSS custom property directly, so this is a deliberate, documented exception to "no hardcoded colors," scoped to this one decorative SVG stroke, not a text/background color.

- [ ] **Step 4: Verify**

Run `./serve.sh`, open `index.html`, scroll to the "Six paying reasons" line at the end of the demand section — confirm a hand-drawn underline animates in under "Zero of them are on vacation." Confirm it does **not** appear under emulated `prefers-reduced-motion: reduce`. Switch to light theme via the theme toggle and confirm the underline color still reads correctly against the cream background (it will render as cream-on-cream in light mode since the stroke color is hardcoded to the dark-theme accent — flag this as a known limitation, see Step 5).

- [ ] **Step 5: Fix the light-theme contrast gap found in Step 4**

Rough Notation's stroke color must be resolved from the *current* theme at call time, not hardcoded, since `--accent-bg` flips between dark and light themes (`css/main.css:30` vs `css/main.css:92`). Update `emphasisMarks()`:
```javascript
  function emphasisMarks() {
    var target = $('#mark-vacation');
    if (!target || !window.RoughNotation || prefersReducedMotion()) return;

    var strokeColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-bg').trim();

    var annotation = window.RoughNotation.annotate(target, {
      type: 'underline',
      color: strokeColor || '#FDFDF1',
      strokeWidth: 2,
      padding: 2
    });
```
Re-run Step 4's verification in both themes to confirm the underline is visible and correctly colored in both.

- [ ] **Step 6: Commit**

```bash
git add index.html js/motion.js
git commit -m "feat: add single Rough Notation emphasis mark on homepage demand section"
```

---

## Task 10: SVG chart draw-in on `returns.html` calculator bars — GSAP for future chart work (backlog #8)

Re-scoped from the original roadmap wording: `returns.html` currently has **no static line/area SVG chart** to animate — its only chart-like elements are the calculator's `.bar-row__fill` and `.cap-chart__bar`, which already animate via CSS `width` transition (`css/main.css:948-954`, `css/main.css:1310-1313`), and those are correctly left alone per the Global Constraints (intentional, proportional-value width animation). There is no dormant SVG line chart in this codebase to wire up. Re-reading `data/projects.js` confirms `returns.html` has no `<svg class="chart">` markup — that pattern exists only in `css/main.css` as a general utility class (`.chart`, `.chart__line`, etc.) not currently instantiated by any renderer in `js/main.js` or `js/calculator.js`.

**Files:**
- Modify: `returns.html:13` (add GSAP CDN scripts, so the tooling is in place and validated even though there's no chart yet to animate)
- Modify: `js/motion.js` (add a guarded `chartDrawIn()` that only runs if such an SVG is ever added — a no-op today, but establishes the pattern per `docs/design-system.md`'s GSAP ownership assignment)

**Interfaces:**
- Consumes: global `window.gsap`, `window.ScrollTrigger`.
- Produces: `window.MewadMotion.chartDrawIn` for any future chart renderer to call.

- [ ] **Step 1: Load GSAP + ScrollTrigger on `returns.html` only**

In `returns.html`'s `<head>`:
```html
<link rel="stylesheet" href="css/main.css">
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" defer></script>
</head>
```

- [ ] **Step 2: Add a guarded `chartDrawIn()` to `js/motion.js`**

Append after `emphasisMarks`:
```javascript
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
```
Add to exports and `boot()`, guarding the whole export/registration on `returns.html` only isn't necessary since the function itself is a no-op elsewhere (no `.chart__line` elements exist on the other three pages), but only *call* it where GSAP is actually loaded:
```javascript
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
```

- [ ] **Step 3: Verify**

Run `./serve.sh`, open `returns.html`, confirm in DevTools Network tab that `gsap.min.js` and `ScrollTrigger.min.js` load with 200 status and `window.gsap`/`window.ScrollTrigger` are defined in console. Confirm no console errors (the function must no-op cleanly with zero `.chart__line` elements present — verify `chartDrawIn()` returns immediately without throwing). Confirm the other three pages do **not** load GSAP (Network tab shows no `gsap` request on `index.html`, `invest.html`, `properties.html`).

- [ ] **Step 4: Commit**

```bash
git add returns.html js/motion.js
git commit -m "feat: load GSAP on returns.html and add guarded chart draw-in, ready for future line charts"
```

---

## Task 11: `.hero--compact` utility class (audit finding #7, backlog #10)

**Files:**
- Modify: `css/main.css` (add new utility class near `.hero` block, after line 502)
- Modify: `invest.html:34`, `properties.html:34`, `returns.html:34` (replace inline `style=` with the class)

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Add the utility class to `css/main.css`**

After the `.hero` rule (`css/main.css:498-502`):
```css
.hero {
  position: relative;
  padding-block: clamp(4rem, 10vw, 8rem) clamp(3rem, 6vw, 5rem);
  overflow: hidden;
}

.hero--compact {
  padding-block: clamp(3rem, 7vw, 5rem) 0;
}
```
The value `clamp(3rem, 7vw, 5rem) 0` is copied verbatim from the three pages' identical inline styles — no visual change, purely moving the same values into a reusable class.

- [ ] **Step 2: Replace the inline style with the class on all three pages**

In `invest.html`, `properties.html`, `returns.html`, each has:
```html
<section class="hero" style="padding-block:clamp(3rem,7vw,5rem) 0">
```
Change to:
```html
<section class="hero hero--compact">
```

- [ ] **Step 3: Verify**

Run `./serve.sh`, open all three pages, visually compare hero spacing against a git stash of the previous version (or simply confirm no layout shift versus the pre-change screenshot taken mentally during Task 3's verification) — spacing must be pixel-identical, since the clamp values are unchanged, just relocated.

```bash
git diff --stat css/main.css invest.html properties.html returns.html
```
Expected: only the four files listed, small diffs.

- [ ] **Step 4: Commit**

```bash
git add css/main.css invest.html properties.html returns.html
git commit -m "refactor: extract repeated hero inline style into .hero--compact utility"
```

---

## Task 12: Consolidate `pulse`/`chip-pulse` keyframes (audit finding #10, backlog #12)

**Files:**
- Modify: `css/main.css:527-538` (`.hero__eyebrow .dot` + `@keyframes pulse`)
- Modify: `css/main.css:759-773` (`.chip--accent` + `@keyframes chip-pulse`)

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Replace both near-duplicate keyframes with one shared keyframe driven by a custom property**

Current, two separate declarations:
```css
.hero__eyebrow .dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent-bg);
  box-shadow: 0 0 0 0 rgba(253, 253, 241, 0.6);
  animation: pulse 2.6s infinite;
}

@keyframes pulse {
  70%  { box-shadow: 0 0 0 9px rgba(253, 253, 241, 0); }
  100% { box-shadow: 0 0 0 0 rgba(253, 253, 241, 0); }
}
```
and:
```css
.chip--accent {
  border-color: var(--accent-line);
  background: var(--accent-wash);
  color: var(--accent);
  animation: chip-pulse 2.6s ease-in-out infinite;
}

@keyframes chip-pulse {
  0%, 100% { box-shadow: 0 0 0 0 var(--accent-wash); }
  50% { box-shadow: 0 0 0 4px var(--accent-wash); }
}
```
Both animate an outward box-shadow ring at the same 2.6s cadence, just with different max-spread and color source. Consolidate into a single `ring-pulse` keyframe using a `--pulse-color` custom property, so the two call sites only differ in the property value they set, not in duplicated `@keyframes` logic:
```css
.hero__eyebrow .dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent-bg);
  --pulse-color: rgba(253, 253, 241, 0.6);
  --pulse-spread: 9px;
  box-shadow: 0 0 0 0 var(--pulse-color);
  animation: ring-pulse 2.6s infinite;
}

@keyframes ring-pulse {
  70%  { box-shadow: 0 0 0 var(--pulse-spread) transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
```
and:
```css
.chip--accent {
  border-color: var(--accent-line);
  background: var(--accent-wash);
  color: var(--accent);
  --pulse-color: var(--accent-wash);
  --pulse-spread: 4px;
  animation: ring-pulse 2.6s ease-in-out infinite;
}
```
This changes the visual behavior of `.chip--accent` subtly: the original `chip-pulse` keyframe pulsed 0%→50%→100% (grow then shrink back within one cycle), while `ring-pulse` (matching the original `pulse`) only grows once per cycle then resets instantly (70%→100%). To avoid that visible behavior change (the constraint is "no color/theme changes," but this is a motion-timing change outside the stated scope), keep `.chip--accent` on its own distinct keyframe rather than forcing both onto the eyebrow dot's asymmetric timing:
```css
.chip--accent {
  border-color: var(--accent-line);
  background: var(--accent-wash);
  color: var(--accent);
  --pulse-color: var(--accent-wash);
  --pulse-spread: 4px;
  animation: ring-pulse-symmetric 2.6s ease-in-out infinite;
}

@keyframes ring-pulse-symmetric {
  0%, 100% { box-shadow: 0 0 0 0 var(--pulse-color); }
  50% { box-shadow: 0 0 0 var(--pulse-spread) var(--pulse-color); }
}
```
Net result: two keyframes remain (their timing curves are genuinely different, not just differently-colored), but both now source their color/spread from custom properties instead of hardcoded values, so a future third pulsing element reuses the property pattern instead of hardcoding a third near-duplicate. This is a smaller consolidation than "one keyframe," but it's the correct one — the audit finding was about the *hardcoded, duplicated color values*, not the differing animation curves, and preserving the exact current visual timing is required by the "no visual changes beyond what's asked" constraint.

Remove the old `@keyframes pulse` and `@keyframes chip-pulse` blocks entirely, replaced by `@keyframes ring-pulse` and `@keyframes ring-pulse-symmetric` above.

The existing reduced-motion override at `css/main.css:771-773`:
```css
@media (prefers-reduced-motion: reduce) {
  .chip--accent { animation: none; }
}
```
stays as-is (selector unchanged, still valid).

- [ ] **Step 2: Verify**

Run `./serve.sh`, open `index.html`, confirm the hero eyebrow dot still pulses exactly as before (cream ring expanding outward once every 2.6s). Confirm any live-status chip (`.chip--accent`, rendered by `propertyCard()` in `js/main.js:262-277` when a property's `status === 'Operational'`) still pulses with its original grow-shrink cadence — check `properties.html`, which renders live property chips. Toggle emulated `prefers-reduced-motion: reduce` and confirm the chip stops animating (dot pulse has no existing reduced-motion override and is unaffected by this task, matching current behavior — not a regression, since it wasn't in scope to add one here).

- [ ] **Step 3: Commit**

```bash
git add css/main.css
git commit -m "refactor: consolidate pulse keyframes to share color/spread via custom properties"
```

---

## Self-Review Notes

- **Spec coverage:** All 12 backlog items from `docs/ui-roadmap.md` (items 1–12) are covered across Tasks 1–12. Item 13 (Lenis) is explicitly deferred per the roadmap and the task instructions — not included.
- **No test framework exists** in this repo (no `package.json`, no test runner) — every task substitutes a manual browser-verification step (via `./serve.sh`) for the automated test-then-implement cycle the writing-plans skill template shows. This is a deliberate, codebase-driven deviation, not an omission.
- **Reduced-motion discipline:** every JS-driven effect (Tasks 3, 4, 7, 8, 9, 10) checks `prefersReducedMotion()` before animating; every new CSS transition (Task 5) gets an explicit reduced-motion override where the base media query alone wouldn't suppress the visual jump.
- **No color/content/theme changes:** verified per-task; the one apparent exception (Task 9's hardcoded stroke color) is caught and fixed within the same task (Step 5) once found during verification.
