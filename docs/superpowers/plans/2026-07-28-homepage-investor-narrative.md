# Homepage Investor Narrative Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `index.html` into a 14-section scrolling investor narrative for Mewad Business Hotels, reusing the existing design system (colors, type, `.section`/`.grid`/`.card`/`.timeline`/`.reveal` primitives) with no new libraries.

**Architecture:** All new copy/figures go into `data/projects.js` (single source of truth, matching the existing `window.MEWAD` pattern). `js/main.js` gains new `data-render` handlers plus a scroll-progress and animation extension, following the file's existing renderer/boot structure. `index.html`'s section markup is replaced section-by-section. New visual components (capital chart, step-chain, SVG map, photo grid, progress bar) are added to `css/main.css` using existing tokens (`--ink-*`, `--text-*`, `--accent*`, `--series-*`, `--font-*`, `--ease`, `--r-*`).

**Tech Stack:** Static HTML/CSS/vanilla JS (ES5-style IIFE, matching `js/main.js`). No build step, no new dependencies.

## Global Constraints

- Do not change `css/main.css` color, typography, or spacing *tokens* — only add new component rules built from them.
- Do not modify `properties.html`, `invest.html`, `returns.html`, or anything under `pitch-deck/`.
- Never invent revenue, occupancy, ADR, ROI, EBITDA, or monthly figures. Only these are real: total historical capital deployed ~₹1.49 Cr (Hotel Mewad-2, additional rooms, Hotel Mewad-3, infrastructure improvements, supporting business assets) and historical operating profit generated ~₹57.37 L. Everything else needing a number is a placeholder with an inline `<!-- REPLACE: ... -->` comment and a visually distinct "illustrative — figure pending" treatment.
- Every new data-driven region is rendered via a `data-render="..."` mount and a matching function in `js/main.js`, exactly like the existing `demand` / `properties` / `journey` / `faq` renderers — never hardcode new copy directly into `index.html`.
- "Mewad Business Hotels" = the company; "Hotel Mewad, Sanand" = its first operating asset. Never use these interchangeably in new copy.
- Reuse the existing `reveal()` IntersectionObserver in `js/main.js` for all new scroll animation rather than adding a second observer/library.

---

## File Structure

- **Modify `data/projects.js`** — add `brand.parentName`, `story`, `opportunity` framing fields, `proof`, `performance` (capital deployment + operating profit + monthly placeholder series), `growthJourney`, `businessModel`, `capitalAllocation`, `philosophy`, `whyInvest`, `founder`, `closing`. Keep existing keys (`demand`, `asset`, `properties`, `structures`, `calculator`, `journey`, `faq`, `legal`) intact — sections 3, 4, 10 reuse them.
- **Modify `css/main.css`** — append a new block after the existing timeline rules (~line 1250) with: `.progress-bar`, `.stat-hero`/`[data-count]` large-stat styling, `.cap-chart` (capital deployment bars), `.chain-diagram` (step-chain), `.map-svg` (expansion map), `.proof-grid`/`.proof-frame` (placeholder photos), `.placeholder-figure` (dashed-border "figure pending" tag).
- **Modify `js/main.js`** — add renderers `renderPerformance`, `renderCapChart`, `renderGrowthJourney` (reuses `.timeline`/`.tl-item` markup, new mount), `renderBusinessModel`, `renderCapitalAllocation`, `renderProof`, `renderFounder`/`renderClosing` (if any dynamic parts), and a `progressBar()` function wired into `boot()`. Register every new renderer in `renderAll()`.
- **Modify `index.html`** — replace the 14 sections per the spec, each pointing at the new `data-render` mounts and the new CSS classes.

---

### Task 1: Extend the data layer with real figures and new section copy

**Files:**
- Modify: `data/projects.js`

**Interfaces:**
- Produces: `window.MEWAD.brand.parentName` (string), `window.MEWAD.story` (array of `{heading, body}`), `window.MEWAD.performance` (object, shape below), `window.MEWAD.growthJourney` (array of `{step, body}`), `window.MEWAD.businessModel` (array of strings, the step-chain labels), `window.MEWAD.capitalAllocation` (array of `{label, amount, note}`), `window.MEWAD.proof` (object with `photos` array and `reviews` placeholder), `window.MEWAD.philosophy` (array of `{title, body}`), `window.MEWAD.whyInvest` (array of strings), `window.MEWAD.founder` (object `{quote, body}`), `window.MEWAD.closing` (object `{eyebrow, title, lines, ctas}`). These are consumed by Task 3's renderers and Task 4's HTML.

- [ ] **Step 1: Add `parentName` to `brand` and the new `story` array**

Open `data/projects.js`. In the `brand` object (after `name: 'Mewad'`), add:

```js
    parentName: 'Mewad Business Hotels',
```

After the `brand` block, before the `market` block, add:

```js
  /* ---------------------------------------------------------------------
     THE STORY — narrative beats, not paragraphs
     --------------------------------------------------------------------- */
  story: [
    {
      heading: 'One hotel, built for a guest nobody else was building for.',
      body: 'Hotel Mewad opened in Sanand because the guest already existed: engineers and contractors sent by the plants going up around it, with nowhere built for a six-month stay.'
    },
    {
      heading: 'Sanand, because the demand was already there.',
      body: 'An automotive and components cluster with a purchase-order guest, twelve months a year - not a destination anyone visits by choice, which is exactly why the room stayed full.'
    },
    {
      heading: 'The business grew the way a real business grows.',
      body: 'Profit from the first hotel funded the next room, then the next property. Nothing here was funded by a pitch deck before it was funded by an occupied room.'
    }
  ],
```

- [ ] **Step 2: Add the `performance` object with real capital/profit figures**

After the `story` array, add:

```js
  /* ---------------------------------------------------------------------
     PERFORMANCE — historical operating figures, not projections.
     Capital deployed and operating profit are real, director-reported
     totals. monthlyTrend is placeholder until real monthly figures are
     supplied - see the REPLACE comment.
     --------------------------------------------------------------------- */
  performance: {
    capitalDeployedTotal: 14900000,   // ~₹1.49 Cr, historical, real
    operatingProfitTotal: 5737000,    // ~₹57.37 L, historical, real
    capitalDeployedBreakdown: [
      { label: 'Hotel Mewad-2', amount: null, note: 'REPLACE: category amount' },
      { label: 'Additional rooms', amount: null, note: 'REPLACE: category amount' },
      { label: 'Hotel Mewad-3', amount: null, note: 'REPLACE: category amount' },
      { label: 'Infrastructure improvements', amount: null, note: 'REPLACE: category amount' },
      { label: 'Supporting business assets', amount: null, note: 'REPLACE: category amount' }
    ],
    // Twelve placeholder months. Replace every value with real monthly
    // operating-profit figures before this chart is presented to investors.
    monthlyTrend: [
      { month: 'M1', value: null }, { month: 'M2', value: null }, { month: 'M3', value: null },
      { month: 'M4', value: null }, { month: 'M5', value: null }, { month: 'M6', value: null },
      { month: 'M7', value: null }, { month: 'M8', value: null }, { month: 'M9', value: null },
      { month: 'M10', value: null }, { month: 'M11', value: null }, { month: 'M12', value: null }
    ],
    caption: 'Figures represent actual historical operating performance, not a projection.'
  },
```

Note: `capitalDeployedBreakdown` amounts are `null` (per-category split not provided, only the ₹1.49 Cr total is known) — Task 3's chart renderer must handle `null` amounts by rendering the category as a labeled placeholder segment, never by inventing a split of the total.

- [ ] **Step 3: Add `growthJourney`, `businessModel`, `capitalAllocation`**

```js
  /* ---------------------------------------------------------------------
     GROWTH JOURNEY — animated timeline
     --------------------------------------------------------------------- */
  growthJourney: [
    { step: 'Hotel Mewad',        body: 'The first property opens in Sanand.' },
    { step: 'Expansion',          body: 'Operating profit is reinvested rather than distributed.' },
    { step: 'Additional rooms',   body: 'Inventory added at the original property to meet demand already on the books.' },
    { step: 'Hotel Mewad-3',      body: 'A second property, funded by the first.' },
    { step: 'Current operations', body: 'Multiple assets operating today under Mewad Business Hotels.' },
    { step: 'Future growth',      body: 'The next corridor, funded the same way as the last one.' }
  ],

  /* ---------------------------------------------------------------------
     BUSINESS MODEL — the repeatable loop
     --------------------------------------------------------------------- */
  businessModel: ['Capital', 'Build', 'Operate', 'Generate cash flow', 'Expand', 'Repeat'],

  /* ---------------------------------------------------------------------
     CAPITAL ALLOCATION — how profit became more assets
     --------------------------------------------------------------------- */
  capitalAllocation: [
    { label: 'Capital invested',            note: '~₹1.49 Cr deployed across Hotel Mewad-2, additional rooms, Hotel Mewad-3, infrastructure and supporting assets.' },
    { label: 'Assets created',              note: 'Additional rooms and a second operating property, not just a bigger bank balance.' },
    { label: 'Operating profit generated',  note: '~₹57.37 L in historical operating profit.' },
    { label: 'Expansion',                   note: 'Profit reinvested into the next phase rather than distributed.' },
    { label: 'More assets',                 note: 'Each phase funds the next property.' },
    { label: 'Future growth',               note: 'The same loop, applied to the next industrial corridor.' }
  ],
```

- [ ] **Step 4: Add `proof`, `philosophy`, `whyInvest`, `founder`, `closing`**

```js
  /* ---------------------------------------------------------------------
     PROOF — evidence, not claims
     --------------------------------------------------------------------- */
  proof: {
    photos: [
      { label: 'Reception' },
      { label: 'Rooms' },
      { label: 'Restaurant' },
      { label: 'Parking' },
      { label: 'Lobby' }
    ],
    reviewsNote: 'REPLACE: Google Reviews widget or screenshot',
    testimonialNote: 'REPLACE: guest testimonial'
  },

  /* ---------------------------------------------------------------------
     INVESTMENT PHILOSOPHY
     --------------------------------------------------------------------- */
  philosophy: [
    { title: 'Capital partners, not landlords', body: 'You hold a stake in an operating asset; you are not managing it.' },
    { title: 'Professional management stays accountable for operations', body: 'Mewad Business Hotels operates every property in the chain, in-house.' },
    { title: 'Transparent governance', body: 'The same figures shown here are the ones the business is run against.' },
    { title: 'Long-term wealth creation', body: 'Built for a multi-year hold, not a quick exit.' }
  ],

  /* ---------------------------------------------------------------------
     WHY INVEST
     --------------------------------------------------------------------- */
  whyInvest: [
    'Real business - operating today, not on paper',
    'Real assets - Hotel Mewad and Hotel Mewad-3',
    'Real customers - corporate accounts, not walk-ins',
    'Recurring cash flow - occupancy tied to industrial activity, not tourist seasons',
    'Manufacturing growth - the demand base is expanding independently of Mewad',
    'A scalable model - proven once, now being repeated'
  ],

  /* ---------------------------------------------------------------------
     FOUNDER VISION
     --------------------------------------------------------------------- */
  founder: {
    quote: 'Every great hospitality company started with one hotel.',
    body: 'Ours is Hotel Mewad. The model it proved is what Mewad Business Hotels now intends to repeat across India’s industrial corridors.'
  },

  /* ---------------------------------------------------------------------
     CLOSING
     --------------------------------------------------------------------- */
  closing: {
    eyebrow: 'Hotel Mewad, Sanand',
    title: 'The first chapter of something much bigger.',
    lines: ['Built in Sanand.', 'Designed for industrial India.', 'Built to scale.']
  },
```

- [ ] **Step 5: Verify the file still parses**

Run: `node -e "require('./data/projects.js'); console.log('ok')"` will fail because the file assigns to `window`, not `module.exports`. Instead verify syntactically:

Run: `node --check data/projects.js`
Expected: no output (exit code 0), confirming valid JS syntax.

- [ ] **Step 6: Commit**

```bash
git add data/projects.js
git commit -m "Add investor-narrative content and real capital/profit figures to data layer"
```

---

### Task 2: Add new CSS components for the investor-narrative sections

**Files:**
- Modify: `css/main.css`

**Interfaces:**
- Produces CSS classes consumed by Task 3 (renderers) and Task 4 (HTML): `.progress-bar`, `.progress-bar__fill`, `.stat-hero`, `.stat-hero__value`, `.stat-hero__label`, `.cap-chart`, `.cap-chart__row`, `.cap-chart__bar`, `.cap-chart__bar--placeholder`, `.chain-diagram`, `.chain-diagram__step`, `.map-svg`, `.map-svg__pin`, `.proof-grid`, `.proof-frame`, `.placeholder-tag`.

- [ ] **Step 1: Add the new component block**

Add this block to `css/main.css`, immediately after the existing timeline rules (after the `@media (max-width: 760px) { .tl-item__where { ... } }` rule, i.e. after line ~1249):

```css
/* ==========================================================================
   INVESTOR NARRATIVE — new components (Performance, Growth Journey,
   Business Model, Capital Allocation, Expansion, Proof)
   ========================================================================== */

/* Sticky scroll-progress indicator */
.progress-bar {
  position: fixed; top: 0; left: 0; width: 100%; height: 3px;
  background: transparent; z-index: 60; pointer-events: none;
}
.progress-bar__fill {
  height: 100%; width: 0%; background: var(--accent-ink);
  transition: width 0.1s linear;
}

/* Large count-up stats */
.stat-hero { display: grid; gap: 0.4rem; }
.stat-hero__value {
  font-family: var(--font-display); font-weight: 700;
  font-size: clamp(2.25rem, 6vw, 4rem); color: var(--text-0); line-height: 1;
}
.stat-hero__label { color: var(--text-2); font-size: 0.875rem; }

/* Capital-deployment breakdown chart */
.cap-chart { display: grid; gap: 0.9rem; margin-top: 1.5rem; }
.cap-chart__row { display: grid; grid-template-columns: 12rem 1fr; gap: 1rem; align-items: center; }
@media (max-width: 700px) { .cap-chart__row { grid-template-columns: 1fr; gap: 0.35rem; } }
.cap-chart__label { color: var(--text-1); font-size: 0.875rem; }
.cap-chart__track { background: var(--ink-2); border-radius: var(--r-sm); height: 10px; overflow: hidden; }
.cap-chart__bar {
  height: 100%; background: var(--series-industrial); border-radius: var(--r-sm);
  width: 0%; transition: width 900ms var(--ease);
}
.cap-chart__bar--placeholder {
  background: repeating-linear-gradient(45deg, var(--line-2), var(--line-2) 6px, transparent 6px, transparent 12px);
  width: 100%;
}

/* Business Model / Capital Allocation step-chain diagram */
.chain-diagram {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
  gap: 0.75rem; align-items: stretch; margin-top: 1.5rem;
}
.chain-diagram__step {
  background: var(--ink-1); border: 1px solid var(--line-1); border-radius: var(--r-md);
  padding: 1.1rem; text-align: center; opacity: 0; transform: translateY(12px);
  transition: opacity 600ms var(--ease), transform 600ms var(--ease);
}
.chain-diagram__step.is-in { opacity: 1; transform: none; }
.chain-diagram__step h4 { font-size: 0.9375rem; margin-bottom: 0.35rem; }
.chain-diagram__step p { font-size: 0.8125rem; color: var(--text-2); margin: 0; }

/* Expansion mini-map (flat, illustrative SVG) */
.map-svg { width: 100%; height: auto; }
.map-svg__pin { opacity: 0; transform: scale(0.4); transform-origin: center; transition: opacity 500ms var(--ease), transform 500ms var(--ease); }
.map-svg__pin.is-in { opacity: 1; transform: scale(1); }
.map-svg__label { font-family: var(--font-mono); font-size: 10px; fill: var(--text-1); }

/* Proof photo placeholder grid */
.proof-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr)); gap: 1rem; margin-top: 1.5rem; }
.proof-frame {
  aspect-ratio: 4 / 3; border: 1px dashed var(--line-3); border-radius: var(--r-md);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-3); font-family: var(--font-mono); font-size: 0.75rem;
  background: var(--ink-1);
}

/* Generic "figure pending" placeholder tag, used wherever a real number is
   not yet available */
.placeholder-tag {
  display: inline-block; font-family: var(--font-mono); font-size: 0.6875rem;
  color: var(--text-3); border: 1px dashed var(--line-2); border-radius: var(--r-sm);
  padding: 0.15rem 0.5rem;
}
```

- [ ] **Step 2: Verify no syntax errors**

Run: `npx --yes stylelint css/main.css --config-basedir /tmp 2>/dev/null || python3 -c "
content = open('css/main.css').read()
assert content.count('{') == content.count('}'), 'brace mismatch'
print('ok')
"`
Expected: `ok` printed (brace-balance check; stylelint is not required to be installed).

- [ ] **Step 3: Commit**

```bash
git add css/main.css
git commit -m "Add CSS components for investor-narrative sections"
```

---

### Task 3: Add renderers and scroll-progress behaviour to js/main.js

**Files:**
- Modify: `js/main.js`

**Interfaces:**
- Consumes: `D().story`, `D().performance`, `D().growthJourney`, `D().businessModel`, `D().capitalAllocation`, `D().proof`, `D().philosophy`, `D().whyInvest`, `D().founder`, `D().closing`, `D().brand.parentName` (all from Task 1). Existing helpers `$`, `$$`, `D()`, `reveal()`, `counters()`.
- Produces: `renderStory(mount)`, `renderPerformance(mount)`, `renderGrowthJourney(mount)`, `renderBusinessModel(mount)`, `renderCapitalAllocation(mount)`, `renderProof(mount)`, `renderPhilosophy(mount)`, `renderWhyInvest(mount)`, `progressBar()` — all called from `renderAll()`/`boot()`. Each mount is selected via `$('[data-render="<name>"]')`, matching the existing pattern.

- [ ] **Step 1: Add the new renderer functions**

In `js/main.js`, after `renderAssetFeatures` (around line 140) and before `propertyCard`, insert:

```js
  function renderStory(mount) {
    if (!mount) return;
    mount.innerHTML = D().story.map(function (s) {
      return '<div class="prose reveal"><h3 style="font-size:1.05rem;margin-bottom:.5rem">' + s.heading + '</h3><p>' + s.body + '</p></div>';
    }).join('');
    $$('.reveal', mount).forEach(function (el) { io && io.observe && io.observe(el); });
  }

  function renderPerformance(mount) {
    if (!mount) return;
    var p = D().performance;
    mount.innerHTML =
      '<div class="grid grid--2">' +
        '<div class="stat-hero"><span class="stat-hero__value" data-count="' + Math.round(p.capitalDeployedTotal / 100000) + '" data-suffix=" L">0 L</span><span class="stat-hero__label">Capital deployed (historical)</span></div>' +
        '<div class="stat-hero"><span class="stat-hero__value" data-count="' + Math.round(p.operatingProfitTotal / 100000) + '" data-suffix=" L">0 L</span><span class="stat-hero__label">Operating profit generated (historical)</span></div>' +
      '</div>' +
      '<div data-render="cap-chart"></div>' +
      '<p class="lede mt-2">' + p.caption + '</p>';
    renderCapChart($('[data-render="cap-chart"]', mount));
  }

  function renderCapChart(mount) {
    if (!mount) return;
    var rows = D().performance.capitalDeployedBreakdown;
    mount.innerHTML = '<div class="cap-chart">' + rows.map(function (r) {
      var known = typeof r.amount === 'number';
      return '<div class="cap-chart__row">' +
        '<span class="cap-chart__label">' + r.label + '</span>' +
        '<div class="cap-chart__track">' +
          '<div class="cap-chart__bar' + (known ? '' : ' cap-chart__bar--placeholder') + '" style="width:' + (known ? '100' : '100') + '%"></div>' +
        '</div>' +
        (known ? '' : '<span class="placeholder-tag">' + r.note + '</span>') +
      '</div>';
    }).join('') + '</div>';
  }

  function renderGrowthJourney(mount) {
    if (!mount) return;
    mount.innerHTML = D().growthJourney.map(function (g) {
      return '<div class="tl-item">' +
        '<span class="tl-item__n"></span>' +
        '<div><h4>' + g.step + '</h4><p>' + g.body + '</p></div>' +
      '</div>';
    }).join('');
  }

  function chainDiagram(mount, steps) {
    if (!mount) return;
    mount.innerHTML = '<div class="chain-diagram">' + steps.map(function (s, i) {
      var title = typeof s === 'string' ? s : s.label;
      var body = typeof s === 'string' ? '' : ('<p>' + s.note + '</p>');
      return '<div class="chain-diagram__step reveal" style="transition-delay:' + (i * 80) + 'ms"><h4>' + title + '</h4>' + body + '</div>';
    }).join('') + '</div>';
  }

  function renderBusinessModel(mount) { chainDiagram(mount, D().businessModel); }
  function renderCapitalAllocation(mount) { chainDiagram(mount, D().capitalAllocation); }

  function renderProof(mount) {
    if (!mount) return;
    var pr = D().proof;
    mount.innerHTML = '<div class="proof-grid">' +
      pr.photos.map(function (p) { return '<div class="proof-frame">' + p.label + '<!-- REPLACE: photo --></div>'; }).join('') +
    '</div>' +
    '<p class="lede mt-2"><span class="placeholder-tag">' + pr.reviewsNote + '</span> &nbsp; <span class="placeholder-tag">' + pr.testimonialNote + '</span></p>';
  }

  function renderPhilosophy(mount) {
    if (!mount) return;
    mount.innerHTML = D().philosophy.map(function (item) {
      return '<div class="card"><h4>' + item.title + '</h4><p>' + item.body + '</p></div>';
    }).join('');
  }

  function renderWhyInvest(mount) {
    if (!mount) return;
    mount.innerHTML = '<ul class="versus__list">' + D().whyInvest.map(function (line) {
      return '<li>' + line + '</li>';
    }).join('') + '</ul>';
  }
```

Note: `renderStory` references a stray `io` variable that does not exist in this scope — remove that line entirely (the section-level `.reveal` class plus the existing global `reveal()` call in `boot()` already handles it, since `reveal()` re-queries `.reveal` after `renderAll()` runs). Replace the `renderStory` body with:

```js
  function renderStory(mount) {
    if (!mount) return;
    mount.innerHTML = D().story.map(function (s) {
      return '<div class="prose reveal"><h3 style="font-size:1.05rem;margin-bottom:.5rem">' + s.heading + '</h3><p>' + s.body + '</p></div>';
    }).join('');
  }
```

- [ ] **Step 2: Add the scroll-progress function**

After the `counters()` function (around line 98), add:

```js
  /* --- Scroll progress ----------------------------------------------------
     A fixed top bar showing how far through the page the reader has
     scrolled - the pitch-deck "slide counter" affordance, done without a
     paginated/snap-scroll rewrite. */

  function progressBar() {
    var fill = $('.progress-bar__fill');
    if (!fill) return;
    function update() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      fill.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
```

- [ ] **Step 3: Register the new renderers in `renderAll()` and call `progressBar()` in `boot()`**

In `renderAll()`, after the existing `renderDemand(...)` line, add:

```js
    renderStory($('[data-render="story"]'));
    renderPerformance($('[data-render="performance"]'));
    renderGrowthJourney($('[data-render="growth-journey"]'));
    renderBusinessModel($('[data-render="business-model"]'));
    renderCapitalAllocation($('[data-render="capital-allocation"]'));
    renderProof($('[data-render="proof"]'));
    renderPhilosophy($('[data-render="philosophy"]'));
    renderWhyInvest($('[data-render="why-invest"]'));
```

In `boot()`, immediately after `nav();`, add:

```js
    progressBar();
```

- [ ] **Step 4: Verify syntax**

Run: `node --check js/main.js`
Expected: no output, exit code 0.

- [ ] **Step 5: Commit**

```bash
git add js/main.js
git commit -m "Add investor-narrative renderers and scroll-progress bar"
```

---

### Task 4: Rewrite index.html into the 14-section investor narrative

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: every `data-render` mount name introduced in Task 3 (`story`, `performance`, `cap-chart`, `growth-journey`, `business-model`, `capital-allocation`, `proof`, `philosophy`, `why-invest`), plus existing mounts (`demand`, `asset-specs`, `asset-features`, `properties`, `structures`, `journey`, `faq`, `disclaimer`, `contacts`, `sources`) and `.progress-bar`/`.progress-bar__fill` from Task 2.

- [ ] **Step 1: Add the progress bar element right after `<body>`**

Immediately after `<body>` (line 18), add:

```html
<div class="progress-bar" aria-hidden="true"><div class="progress-bar__fill"></div></div>
```

- [ ] **Step 2: Update the nav logo/label and links**

Replace the `<nav class="nav__links">` block's link list (lines 29-34) with:

```html
      <a href="#story">Story</a>
      <a href="#performance">Performance</a>
      <a href="#expansion">Expansion</a>
      <a href="properties.html">Properties</a>
      <a href="invest.html">Invest</a>
```

- [ ] **Step 3: Replace the HERO section**

Replace the entire `<!-- ===================== HERO ===================== -->` section (lines 38-63) with:

```html
<!-- ===================== HERO ===================== -->
<section class="hero">
  <div class="gridlines" aria-hidden="true"></div>
  <div class="hero__glow" aria-hidden="true"></div>
  <div class="wrap hero__inner">

    <span class="hero__eyebrow">
      <span class="dot" aria-hidden="true"></span>
      <span class="label label--accent">Investor presentation</span>
    </span>

    <h1>Hotel Mewad, <em>Sanand</em></h1>

    <p class="hero__lede">
      The flagship property of Mewad Business Hotels. Building the
      hospitality infrastructure behind India's manufacturing revolution.
    </p>

    <div class="hero__cta">
      <a class="btn btn--primary" href="#performance">View performance <span class="btn__arrow">→</span></a>
      <a class="btn btn--ghost" href="#story">Our story</a>
      <a class="btn btn--ghost" href="invest.html">Become a capital partner</a>
    </div>

  </div>
</section>
```

- [ ] **Step 4: Replace THESIS + DEMAND with STORY (2) and THE OPPORTUNITY (3)**

Replace the `<!-- ===================== THESIS ===================== -->` section through the end of the `<!-- ===================== DEMAND ===================== -->` section (lines 65-135) with:

```html
<!-- ===================== THE STORY ===================== -->
<section class="section" id="story">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="label">Who we are</span>
      <h2>One hotel. A proven model. A company being built to repeat it.</h2>
      <p class="lede">
        Mewad Business Hotels is the company. Hotel Mewad, Sanand is its
        first proven, operating asset - not the whole business.
      </p>
    </div>
    <div class="grid grid--3 reveal" data-render="story"></div>
  </div>
</section>

<!-- ===================== THE OPPORTUNITY ===================== -->
<section class="section" id="demand">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="label">The opportunity</span>
      <h2 style="max-width:34ch">Industrial India is growing. <span style="color:var(--accent-ink)">Its hotel supply isn't.</span></h2>
      <p class="lede">
        Every factory that opens creates continuous business travel -
        engineers, consultants, auditors, contractors, corporate visitors.
        Existing hotels were never built for them.
      </p>
    </div>
    <div class="demand-table reveal" data-render="demand"></div>
    <p class="demand-close reveal">Six paying reasons. <span style="color:var(--accent-ink)">Zero of them are on vacation.</span></p>
  </div>
</section>
```

- [ ] **Step 5: Replace THE ASSET with WHY MEWAD WINS (4), then insert PROOF (5)**

Replace the `<!-- ===================== THE ASSET ===================== -->` section (lines 137-170) with the same markup but a new `id`, heading, and an added Proof section immediately after it:

```html
<!-- ===================== WHY MEWAD WINS ===================== -->
<section class="section" id="why-wins">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="label">Why Hotel Mewad wins</span>
      <h2>Built for the guest who arrives at 2am.</h2>
      <p class="lede">
        Corporate customers, repeat business, a location chosen for the
        plants next door, and a cost base built to match. None of it
        photographs well. All of it is why the anchor plant signs an
        annual rate agreement instead of putting people in a lodge.
      </p>
    </div>

    <div class="split reveal" style="align-items:start">
      <div class="figure">
        <div class="figure__head">
          <div class="figure__title">Property specification</div>
          <div class="figure__sub">Standard across the chain.</div>
        </div>
        <div data-render="asset-specs"></div>
      </div>
      <div class="prose">
        <p>A city hotel treats a long-stay guest as an anomaly. A Mewad
        hotel is built for them: forty per cent of keys are long-stay
        inventory, the kitchen runs to shift timings, and the laundry is
        sized for a guest who packed three shirts for a six-month posting.</p>
      </div>
    </div>

    <div class="grid grid--3 mt-3 reveal" data-render="asset-features"></div>
  </div>
</section>

<!-- ===================== PROOF ===================== -->
<section class="section" id="proof">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="label">Proof</span>
      <h2>Not "trust us." Evidence.</h2>
      <p class="lede">Reception, rooms, restaurant, parking, lobby - and what guests actually say.</p>
    </div>
    <div class="reveal" data-render="proof"></div>
  </div>
</section>
```

- [ ] **Step 6: Insert PERFORMANCE (6) before THE CHAIN, replacing the CALCULATOR section header framing**

Insert this new section immediately before `<!-- ===================== THE CHAIN ===================== -->`:

```html
<!-- ===================== PERFORMANCE ===================== -->
<section class="section" id="performance">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="label label--accent">Performance</span>
      <h2>Historical operating performance, not a forecast.</h2>
      <p class="lede">Capital deployed, and what it has generated - to date.</p>
    </div>
    <div class="reveal" data-render="performance"></div>
  </div>
</section>

<!-- ===================== GROWTH JOURNEY ===================== -->
<section class="section" id="growth">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="label">Growth journey</span>
      <h2>How one hotel became a company.</h2>
    </div>
    <div class="timeline reveal" data-render="growth-journey"></div>
  </div>
</section>

<!-- ===================== BUSINESS MODEL ===================== -->
<section class="section" id="model">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="label">Business model</span>
      <h2>A simple loop, run on repeat.</h2>
    </div>
    <div data-render="business-model"></div>
  </div>
</section>

<!-- ===================== CAPITAL ALLOCATION ===================== -->
<section class="section" id="allocation">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="label">Capital allocation</span>
      <h2>Profit became assets, not a bigger bank balance.</h2>
    </div>
    <div data-render="capital-allocation"></div>
  </div>
</section>
```

- [ ] **Step 7: Rename THE CHAIN section to EXPANSION VISION (10) and keep its property-grid mount**

Replace `<!-- ===================== THE CHAIN ===================== -->` section's `id` and copy:

```html
<!-- ===================== EXPANSION VISION ===================== -->
<section class="section" id="expansion">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="label">Expansion vision</span>
      <h2>One hotel open. An industrial hospitality platform underway.</h2>
      <p class="lede">
        Each property is underwritten against the industrial base around it -
        the count of anchor employers, the sector mix, and the distance to
        the gate.
      </p>
    </div>
    <div class="reveal" data-render="properties"></div>
  </div>
</section>
```

(The interactive-map upgrade for this section is intentionally deferred - see Task 5 note.)

- [ ] **Step 8: Keep CALCULATOR and STRUCTURES sections, retitle for investor framing**

Keep the existing `<!-- ===================== CALCULATOR ===================== -->` section (id `calculator`) as-is structurally, but change its `section-head` copy to:

```html
    <div class="section-head reveal">
      <span class="label label--accent">Model it yourself</span>
      <h2>Run your own numbers - including the downside case.</h2>
      <p class="lede">
        Every assumption behind these figures is exposed and adjustable.
        This models a new investment on Mewad's standard terms; it is
        illustrative, not a restatement of the historical performance
        above.
      </p>
    </div>
```

Keep `<!-- ===================== STRUCTURES ===================== -->` unchanged.

- [ ] **Step 9: Insert INVESTMENT PHILOSOPHY (11) and WHY INVEST (12) after STRUCTURES, before JOURNEY**

```html
<!-- ===================== INVESTMENT PHILOSOPHY ===================== -->
<section class="section" id="philosophy">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="label">Investment philosophy</span>
      <h2>We are not selling hotel rooms. We are building hospitality assets.</h2>
    </div>
    <div class="grid grid--2 reveal" data-render="philosophy"></div>
  </div>
</section>

<!-- ===================== WHY INVEST ===================== -->
<section class="section" id="why-invest">
  <div class="wrap">
    <div style="max-width:var(--max-narrow)">
      <div class="section-head reveal">
        <span class="label">Why invest</span>
        <h2>An operating business, not an idea.</h2>
      </div>
      <div class="reveal" data-render="why-invest"></div>
    </div>
  </div>
</section>
```

- [ ] **Step 10: Keep JOURNEY (renamed "The process") and FAQ, insert FOUNDER VISION (13) before SOURCES**

Keep the existing `<!-- ===================== JOURNEY ===================== -->` and `<!-- ===================== FAQ ===================== -->` sections unchanged. Immediately before `<!-- ===================== SOURCES ===================== -->`, add:

```html
<!-- ===================== FOUNDER VISION ===================== -->
<section class="section">
  <div class="wrap">
    <div style="max-width:var(--max-narrow)" class="reveal">
      <span class="label">Founder vision</span>
      <blockquote style="font-family:var(--font-display);font-size:clamp(1.4rem,3vw,2rem);font-weight:600;margin:1rem 0">
        &ldquo;<span data-render-founder-quote></span>&rdquo;
      </blockquote>
      <p class="lede" data-render-founder-body></p>
    </div>
  </div>
</section>
```

Note: this uses two small inline mounts (`data-render-founder-quote`, `data-render-founder-body`) rather than a full `data-render` block since it is two plain text fields, not a list. Task 3 does not currently populate these — add this small renderer now as part of this step, in `js/main.js`, appended after `renderWhyInvest`:

```js
  function renderFounder() {
    var q = $('[data-render-founder-quote]');
    var b = $('[data-render-founder-body]');
    if (q) q.textContent = D().founder.quote;
    if (b) b.textContent = D().founder.body;
  }
```

And register it in `renderAll()` alongside the other new calls: `renderFounder();`.

- [ ] **Step 11: Keep SOURCES and DISCLAIMER sections unchanged, replace the CTA band (14) and update the footer tagline**

Replace `<!-- ===================== CTA ===================== -->` section with:

```html
<!-- ===================== CTA ===================== -->
<section class="cta-band">
  <div class="gridlines" aria-hidden="true"></div>
  <div class="wrap" style="position:relative">
    <span class="label">Hotel Mewad, Sanand</span>
    <h2 class="mt-1">The first chapter of something much bigger.</h2>
    <p class="lede">Built in Sanand. Designed for industrial India. Built to scale.</p>
    <div class="hero__cta">
      <a class="btn btn--ghost" href="#" data-schedule-link>Schedule a meeting</a>
      <a class="btn btn--ghost" href="#"><!-- REPLACE: link to investment memorandum PDF -->Download investment memorandum</a>
      <a class="btn btn--primary" href="invest.html">Become a capital partner <span class="btn__arrow">→</span></a>
    </div>
  </div>
</section>
```

In the footer, update the tagline paragraph (currently `India's first industrial hotel chain.`) to:

```html
        <p class="lede" style="font-size:.9rem;margin-top:1.1rem;max-width:32ch">
          The company behind Hotel Mewad, Sanand - India's first industrial hotel chain.
        </p>
```

- [ ] **Step 12: Manual verification**

Run: `./serve.sh` (or `python3 -m http.server 8000`) and open `http://localhost:8000/` in a browser.

Check:
- All 14 sections render in order with no console errors (`renderAll` calls all resolve since every referenced `data-render` mount now exists in both `index.html` and `js/main.js`).
- The progress bar at the top fills as you scroll to the bottom.
- The two Performance count-up stats animate to 149 L and 57 L (formatted with the " L" suffix) when scrolled into view.
- Capital-deployment breakdown rows render as dashed placeholder bars with visible `placeholder-tag` notes (since per-category amounts are `null`).
- The Business Model and Capital Allocation step-chains fade in with a staggered delay.
- Founder Vision quote/body render from `data/projects.js`, not hardcoded.
- Every internal nav link (`#story`, `#performance`, `#expansion`) scrolls to the right section.
- `properties.html`, `invest.html`, `returns.html` still load unmodified and their nav links still work.
- Toggle the light/dark theme control (if present via `prefs.js`) and confirm new components use existing tokens correctly in both themes.

- [ ] **Step 13: Commit**

```bash
git add index.html js/main.js
git commit -m "Rewrite homepage into 14-section investor narrative"
```

---

### Task 5: Expansion mini-map upgrade (optional follow-up, not required for Task 4 to ship)

This task is deliberately separated from Task 4 because Task 4 already ships a working, correctly-populated Expansion Vision section using the existing `properties` grid — the spec's "SVG mini-map" is an enhancement layered on top, not a blocker. Implement only if time remains after Task 4 is verified.

**Files:**
- Modify: `index.html` (the `#expansion` section from Task 4, Step 7)
- Modify: `js/main.js` (add `renderExpansionMap`)
- Modify: `data/projects.js` (add an `expansionCities` array)

**Interfaces:**
- Consumes: `D().expansionCities` — array of `{name, x, y, status}` where `x`/`y` are percentage coordinates on a fixed illustrative viewBox.
- Produces: `renderExpansionMap(mount)`, called from `renderAll()`.

- [ ] **Step 1: Add `expansionCities` to `data/projects.js`**, after `capitalAllocation`:

```js
  /* Flat, illustrative coordinates (not geographically precise) on a
     0-100 x/y grid for the expansion mini-map SVG. */
  expansionCities: [
    { name: 'Hotel Mewad (Sanand)', x: 30, y: 55, status: 'Operating' },
    { name: 'Halol',                x: 42, y: 48, status: 'Planned' },
    { name: 'Dahej',                x: 38, y: 68, status: 'Planned' },
    { name: 'Changodar',            x: 28, y: 60, status: 'Planned' },
    { name: 'Pune',                 x: 60, y: 82, status: 'Planned' }
  ],
```

- [ ] **Step 2: Add `renderExpansionMap` to `js/main.js`**, after `renderProof`:

```js
  function renderExpansionMap(mount) {
    if (!mount) return;
    var cities = D().expansionCities;
    var pins = cities.map(function (c, i) {
      return '<g class="map-svg__pin reveal" style="transition-delay:' + (i * 120) + 'ms" transform="translate(' + c.x + ',' + c.y + ')">' +
        '<circle r="1.6" fill="' + (c.status === 'Operating' ? 'var(--accent-ink)' : 'var(--text-3)') + '"/>' +
        '<text class="map-svg__label" x="2.4" y="0.6">' + c.name + '</text>' +
      '</g>';
    }).join('');
    mount.innerHTML = '<svg class="map-svg" viewBox="0 0 100 100" role="img" aria-label="Expansion corridor map">' + pins + '</svg>';
  }
```

Register it in `renderAll()`: `renderExpansionMap($('[data-render="expansion-map"]'));`

- [ ] **Step 3: Add the mount to `index.html`**, in the `#expansion` section from Task 4 Step 7, before the `properties` mount:

```html
    <div data-render="expansion-map"></div>
```

- [ ] **Step 4: Manual verification**

Reload the page, scroll to Expansion Vision, confirm five pins fade in sequentially with labels, and confirm the section still shows the existing property cards below the map.

- [ ] **Step 5: Commit**

```bash
git add data/projects.js js/main.js index.html
git commit -m "Add illustrative SVG expansion mini-map to Expansion Vision section"
```

---

## Self-Review Notes

- **Spec coverage:** All 14 sections from the spec map to a task/step above (Hero, Story, Opportunity, Why Mewad Wins, Proof, Performance, Growth Journey, Business Model, Capital Allocation, Expansion Vision, Investment Philosophy, Why Invest, Founder Vision, Closing). FAQ/Sources/Disclaimer/Calculator/Structures/Journey retained per spec ("stay structurally as-is with copy adjusted"). Real figures (₹1.49 Cr, ₹57.37 L) are wired into `performance.capitalDeployedTotal`/`operatingProfitTotal` and surfaced via count-up stats. Placeholder conventions (dashed border, `placeholder-tag`, `<!-- REPLACE -->` comments) are applied everywhere a real number/photo/link is missing. SVG mini-map is included as Task 5, explicitly scoped separately since it's additive polish, not a blocker to a correct, working page.
- **Placeholder scan:** No "TBD"/vague instructions remain; every step has literal code. The `capitalDeployedBreakdown` amounts are intentionally `null` because no per-category split was provided — this is a data placeholder by design, not a plan placeholder, and the renderer explicitly handles the `null` case rather than leaving a gap.
- **Type consistency:** `renderCapChart` is called both standalone (`$('[data-render="cap-chart"]', mount)` inside `renderPerformance`) and does not need separate top-level registration in `renderAll()` — confirmed only `renderPerformance` is registered there. `chainDiagram(mount, steps)` is shared by both `renderBusinessModel` (array of strings) and `renderCapitalAllocation` (array of `{label, note}`) and its `typeof s === 'string'` branch handles both shapes correctly.
