# Performance Guide

Mewad has no bundler and no build step — every script is a `<script>` tag
loaded directly by the browser on every page load. That makes script weight
and load order matter more here than on a typical bundled SaaS app, where
tree-shaking and code-splitting hide the cost.

## Current baseline

`index.html` currently loads, in order: `data/projects.js`, `data/lang-hi.js`,
`js/prefs.js`, `js/calculator.js`, `js/main.js` — all same-origin, all
render-blocking at the bottom of `<body>` (after content), plus two Google
Fonts preconnects and one stylesheet request. No animation library is
currently loaded. `css/main.css` is ~1500 lines / one file, no critical-CSS
split.

## Budget for adding the motion layer

| Library | Added weight (min+gzip) | Load strategy |
|---|---|---|
| Motion | ~5–20KB | `<script type="module">`, deferred, only on pages using it (all 4) |
| Rough Notation | ~7KB | Same as Motion, only on pages with an emphasis mark |
| GSAP + ScrollTrigger | ~42KB | Only on `returns.html` (chart draw-in) — do not load site-wide |
| Lenis (if/when adopted) | ~5KB | Deferred, opt-in after other four are validated |

Total worst case (all four on one page): ~75KB min+gzip, added to a site
that currently ships zero animation-library JS. For a marketing/investment
site this is a reasonable ceiling — stay under it. If GSAP is needed on more
than one page, that's a signal to re-evaluate whether Motion could cover the
same need instead of loading GSAP everywhere.

## Rules

1. **Load only what a given page uses.** `returns.html` gets GSAP;
   `index.html`/`invest.html`/`properties.html` don't need it unless a chart
   draw-in effect is added there too.
2. **Defer, never block.** All new library `<script>` tags get `defer` or
   `type="module"` (which defers by default) so they never delay First
   Contentful Paint. They should load after the existing render pipeline
   scripts, since motion only applies to already-rendered DOM.
3. **Animate `transform` and `opacity` only.** Every effect in
   `animation-catalog.md` is expressible via GPU-accelerated properties.
   Never animate `width`/`height`/`top`/`left` for entrance/hover effects —
   the codebase already follows this correctly for `.reveal`
   (`translateY`+`opacity`) and buttons (`translateY`); new work must match.
   Exception already in the codebase: `.bar-row__fill` and
   `.cap-chart__bar` animate `width` deliberately, since they're literally
   representing a proportional value, not a decorative move — acceptable,
   don't "fix" this.
4. **Gate every JS-driven animation behind `prefers-reduced-motion`.**
   CSS animations already get this for free via the global reset
   (`css/main.css:120-127`). GSAP and Motion do **not** auto-respect it —
   any new GSAP timeline or Motion `animate()` call must check
   `matchMedia('(prefers-reduced-motion: reduce)')` and skip straight to the
   end state if true. This is the single most important rule to enforce in
   code review for this work, since it's the one thing that silently breaks
   without a runtime error.
5. **One IntersectionObserver per concern, not per element.** The existing
   `reveal()` pattern already does this correctly (one IO instance, many
   observed elements). Any new scroll-triggered behavior (staggered card
   grids, chart draw-in) should extend this IO or add one new IO instance —
   never instantiate `new IntersectionObserver` per element.
6. **Unobserve after firing.** Every existing IO-based animation
   (`reveal()`, `counters()`) calls `io.unobserve(e.target)` once triggered,
   since none of these effects need to replay. New effects should keep this
   discipline — a chart draw-in shouldn't re-fire every time it scrolls back
   into view.
7. **No layout thrash from Lenis, if/when adopted.** Smooth-scroll libraries
   can conflict with `position: sticky` (`.nav`) and `position: fixed`
   (`.progress-bar`). If Lenis is adopted, verify both still work correctly
   under it before shipping, and provide a documented way to disable Lenis
   entirely under `prefers-reduced-motion` (not just slow it down).
8. **Images/fonts are unaffected by this work.** No new images are being
   added as part of this pass, so image lazy-loading is out of scope here —
   revisit if `proof-grid` placeholders (`css/main.css:1338-1345`) are ever
   replaced with real photos.

## Accessibility checklist (applies to every new effect)

- [ ] Respects `prefers-reduced-motion` (see rule 4)
- [ ] Doesn't move focus or trap keyboard navigation
- [ ] Doesn't rely on hover alone for content that's otherwise inaccessible
      via keyboard (magnetic buttons, tilt effects must degrade gracefully
      on touch/keyboard)
- [ ] Decorative motion (`.gridlines`, background glows) stays
      `aria-hidden="true"`, matching existing convention
- [ ] Rough Notation marks don't alter the underlying text content or
      reading order — annotation only
