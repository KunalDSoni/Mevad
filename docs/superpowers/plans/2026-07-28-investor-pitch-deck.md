# Mevad Investor Pitch Deck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone, self-contained HTML slide deck (`pitch-deck/`) that presents Mevad's investor pitch — 24 slides, real (partly estimated/labeled) financial figures, teal/cream theme matching the existing site, hand-rolled SVG charts, keyboard/click navigation, print-to-PDF export.

**Architecture:** Plain static HTML/CSS/JS, no build step, no dependencies — matches the rest of this repo. All slide content and figures live in one data file (`data/deck.js`, `window.MEVAD_DECK`); `js/deck.js` renders slides from that data as pure string-building functions (testable from Node without a browser) and separately mounts them to the DOM; `js/charts.js` builds the SVG charts the renderer calls into.

**Tech Stack:** Vanilla JS (ES5-style, matching `js/main.js`/`js/prefs.js` conventions), no npm, no bundler. Verification is via `node -e` assertions against the pure render functions (no test framework exists in this repo — see `serve.sh` / README "Verified" section for the established pattern) plus manual browser checks for anything DOM/visual.

## Global Constraints

- No build step, no external dependencies — plain `<script>` tags, same as the main site.
- Every figure/label lives in `data/deck.js`; `index.html` and `js/*.js` contain no hardcoded numbers or copy strings.
- Palette: deep teal `#1B3A38` background / cream `#FDFDF1` text, reusing the main site's token values — no new palette introduced (per explicit user instruction: don't change site color/theme).
- Type: grotesque for text, monospace with tabular numerals for all figures (matches main site's `--font-body` / `--font-mono` usage).
- Every scaled/estimated financial figure must carry the visible footnote: *"Estimated at 100% based on director's reported ownership share (20% / 30%); pending audited confirmation."*
- The deck is fully separate from the existing site — no edits to `index.html`, `data/projects.js`, `invest.html`, `properties.html`, `returns.html`, or `css/main.css`.
- Fixed dark theme only (no light/dark toggle) — a live investor presentation doesn't need a theme switch, and it removes a class of print-stylesheet bugs. (Deviation from the spec's "same dark-default/light-toggle behavior" line — flagged here rather than silently dropped.)

---

## File Structure

```
pitch-deck/
  index.html        -- shell: 24 empty <section> mount points + nav chrome, script tags
  css/deck.css       -- copied token subset (teal/cream) + slide layout + print stylesheet
  js/charts.js        -- pure SVG-string builders: bar, waterfall, timeline, dot-map
  js/deck.js          -- pure renderSlide()/renderAll() functions + mount()/nav wiring
  data/deck.js        -- window.MEVAD_DECK = { slides: [...24 slide objects...] }
```

---

### Task 1: Data file — all 24 slides, real content and figures

**Files:**
- Create: `pitch-deck/data/deck.js`

**Interfaces:**
- Produces: `window.MEVAD_DECK.slides` — an array of exactly 24 objects, each `{ id: number, type: string, title: string, ...type-specific fields }`. `type` is one of: `cover`, `statement`, `iconGrid`, `stat`, `revenueList`, `timeline`, `dotMap`, `waterfall`, `financials`, `trendChart`, `governance`, `ask`. Later tasks (renderer, charts) consume this exact shape.
- Produces: `window.MEVAD_DECK.footnoteEstimate` — the exact footnote string required by Global Constraints, referenced by any slide needing it via `footnote: true`.

- [ ] **Step 1: Write the data file**

```js
/* ==========================================================================
   MEVAD INVESTOR PITCH DECK — DATA
   Every number and label on every slide lives here. No figure is hardcoded
   into index.html or js/*.js.
   ========================================================================== */

window.MEVAD_DECK = {
  footnoteEstimate: 'Estimated at 100% based on director’s reported ownership share (20% / 30%); pending audited confirmation.',

  slides: [
    {
      id: 1, type: 'cover',
      kicker: 'INVESTOR PRESENTATION',
      title: 'Mevad',
      subtitle: 'India’s first scalable Industrial Business Hotel chain',
      closing: 'Building the Hospitality Infrastructure Behind India’s Manufacturing Revolution.'
    },
    {
      id: 2, type: 'statement',
      kicker: 'THE PROBLEM',
      title: 'Industrial India has nowhere good to sleep',
      body: 'Thousands of industrial estates run on visiting professionals — engineers, auditors, contractors, project teams — who need accommodation every single week of the year. The hotel supply around those estates was never built for them.'
    },
    {
      id: 3, type: 'iconGrid',
      kicker: 'WHO NEEDS IT',
      title: 'Every industrial cluster runs on visiting professionals',
      items: ['Engineers', 'Consultants', 'Factory Auditors', 'Machine Installation Teams', 'Vendor Representatives', 'Contractors', 'Project Teams', 'Training Staff']
    },
    {
      id: 4, type: 'iconGrid',
      kicker: 'THE GAP',
      title: 'What’s there today misses the guest completely',
      items: ['Old and poorly maintained', 'Inconsistent standards', 'Built for tourists, not business travel', 'No real business facilities', 'Poor internet', 'Poor service', 'No long-stay facilities']
    },
    {
      id: 5, type: 'statement',
      kicker: 'OUR SOLUTION',
      title: 'Premium Business Hotels for Industrial India',
      body: 'Not a luxury hotel. Not a budget lodge. A category built specifically for the industrial business traveller — consistent, corporate-ready, and priced for a segment that stays days to months, not one night.'
    },
    {
      id: 6, type: 'iconGrid',
      kicker: 'TARGET GUEST',
      title: 'One guest profile, engineered for',
      items: ['Engineers', 'Supervisors', 'Plant Managers', 'Vendor Teams', 'Corporate Visitors', 'Auditors', 'Consultants', 'Long-Stay Guests']
    },
    {
      id: 7, type: 'iconGrid',
      kicker: 'THE PRODUCT',
      title: 'What every Mevad hotel includes',
      items: ['Premium Reception', 'Business Lounge', 'Landscaped Courtyard', 'Café', 'Meeting Room', 'Laundry', 'High-Speed WiFi', 'Corporate-Friendly Rooms', 'Long-Stay Packages', 'Digital Check-in', 'Future EV Charging'],
      footer: 'Every building is designed for future vertical expansion from day one.'
    },
    {
      id: 8, type: 'stat',
      kicker: 'PROOF POINT',
      title: 'Hotel Mevad Palace, Sanand — operating today',
      stats: [
        { k: 'Rooms', v: '21' },
        { k: 'Average room rate', v: '₹1,200 / night' },
        { k: 'Positioning', v: 'Budget business hotel' },
        { k: 'Status', v: 'Existing, profitable operations' }
      ]
    },
    {
      id: 9, type: 'iconGrid',
      kicker: 'WHY SANAND',
      title: 'One of India’s largest industrial hubs',
      items: ['Tata Motors', 'MG Motor', 'Auto Component Manufacturers', 'Japanese Companies', 'Korean Suppliers', 'Engineering Companies'],
      footer: 'Thousands of visiting professionals pass through Sanand GIDC every month, and demand is increasing every year.'
    },
    {
      id: 10, type: 'revenueList',
      kicker: 'BUSINESS MODEL',
      title: 'Eight revenue streams today, two more on the roadmap',
      current: ['Room Revenue', 'Restaurant / Café', 'Laundry', 'Meeting Room Rentals', 'Corporate Monthly Contracts', 'Business Lounge', 'Shuttle Services', 'EV Charging'],
      future: ['Rooftop Restaurant', 'Training Centre']
    },
    {
      id: 11, type: 'timeline',
      kicker: 'PHASE 1',
      title: 'From 21 rooms to 47 — then beyond',
      steps: [
        { label: 'Current hotel', value: '21 rooms' },
        { label: 'Phase-2 expansion', value: '+26 rooms' },
        { label: 'Total after Phase-2', value: '47 rooms' }
      ]
    },
    {
      id: 12, type: 'stat',
      kicker: 'FUTURE',
      title: 'Every building holds a G+2 provision',
      stats: [
        { k: 'Phase-2 footprint', v: 'G+2 ready' },
        { k: 'Rooms after additional floors', v: '94+' }
      ]
    },
    {
      id: 13, type: 'dotMap',
      kicker: 'EXPANSION ROADMAP',
      title: 'After Sanand stabilises, the next corridors',
      cities: ['Changodar', 'Becharaji', 'Halol', 'Dahej', 'Vithalapur', 'Pune', 'Hosur', 'Sriperumbudur'],
      footer: 'The objective is to build India’s largest Industrial Hospitality Brand.'
    },
    {
      id: 14, type: 'statement',
      kicker: 'VISION',
      title: 'India’s leading Industrial Business Hotel chain',
      body: 'Not one hotel. A repeatable, scalable platform — the same product, the same standards, dropped into every industrial corridor in the country that currently has none of it.'
    },
    {
      id: 15, type: 'stat',
      kicker: 'INVESTMENT MODEL',
      title: 'Investors become Capital Partners',
      stats: [
        { k: 'Minimum investment', v: '₹5 lakh (customisable)' },
        { k: 'Ownership', v: 'Proportional to investment' },
        { k: 'Distributions', v: 'Annual profit distribution' }
      ]
    },
    {
      id: 16, type: 'iconGrid',
      kicker: 'INVESTOR BENEFITS',
      title: 'What a Capital Partner holds',
      items: ['Cash Flow', 'Asset Appreciation', 'Portfolio Expansion', 'Long-Term Wealth Creation']
    },
    {
      id: 17, type: 'governance',
      kicker: 'GOVERNANCE',
      title: 'Investors are financial partners — what they receive',
      receive: ['Quarterly Reports', 'Audited Financial Statements', 'Annual Profit Distribution', 'Annual Investor Meeting']
    },
    {
      id: 18, type: 'governance',
      kicker: 'GOVERNANCE',
      title: 'Management operates; investors don’t',
      cannot: ['Interfere in operations', 'Hire staff', 'Negotiate vendor contracts', 'Decide pricing', 'Control management'],
      requiresApproval: 'Major decisions — sale of the property, merger or liquidation — require investor approval.'
    },
    {
      id: 19, type: 'waterfall',
      kicker: 'MANAGEMENT FEE',
      title: '20% of distributable profit, then owners split the rest',
      example: {
        distributableProfit: 1000000,
        managementFeePct: 0.20,
        managementFee: 200000,
        toOwners: 800000
      }
    },
    {
      id: 20, type: 'financials',
      kicker: 'FINANCIALS',
      title: 'Mevad Sanand Hotel — current hotel + Phase-2, combined',
      footnote: true,
      rows: [
        { label: 'Current hotel (Mewad-2 + Extra Room)', investment: 9563830, netProfit: 7341230, outstanding: 2222600 },
        { label: 'Phase-2 (Mewad-3 + Shade Work Exp)', investment: 34872610, netProfit: 11420533, outstanding: 23452077 },
        { label: 'Combined', investment: 51462160, netProfit: 22676393, outstanding: 28785767, isTotal: true }
      ],
      assumptions: [
        'Current hotel figures scaled ×5 from a director’s reported 20% ownership share.',
        'Phase-2 figures scaled ×3.33 from a director’s reported 30% ownership share.',
        'Scrap Business entity excluded — unrelated to hotel operations.',
        'EBITDA and ROI targets below are management projections, not audited figures.'
      ],
      targets: [
        { k: 'Target EBITDA margin', v: '40–45%' },
        { k: 'Long-term investor ROI objective', v: '17–20%' }
      ]
    },
    {
      id: 21, type: 'trendChart',
      kicker: 'FINANCIAL TREND',
      title: 'Monthly profit, reported — one director’s share',
      note: 'Unscaled. Shown to illustrate trajectory, not a claimed total.',
      series: [
        { m: 'Nov’23–Dec’23', mewad2: 70032.80, mewad3: 0, extra: 0 },
        { m: 'Jan-24', mewad2: 65289.40, mewad3: 0, extra: 0 },
        { m: 'Feb-24', mewad2: 62266.80, mewad3: 0, extra: 0 },
        { m: 'Mar-24', mewad2: 71500.00, mewad3: 0, extra: 0 },
        { m: 'Apr-24', mewad2: 70420.00, mewad3: 0, extra: 0 },
        { m: 'May-24', mewad2: 58913.00, mewad3: 2386.10, extra: 0 },
        { m: 'Jun-24', mewad2: 49644.80, mewad3: 112118.50, extra: 0 },
        { m: 'Jul-24', mewad2: 38672.40, mewad3: 23443.50, extra: 0 },
        { m: 'Aug-24', mewad2: 87295.40, mewad3: 28242.00, extra: 0 },
        { m: 'Sep-24', mewad2: 62572.60, mewad3: 152197.00, extra: 0 },
        { m: 'Oct-24', mewad2: 11716.80, mewad3: -72921.00, extra: 0 },
        { m: 'Nov-24', mewad2: -6470.00, mewad3: 213213.00, extra: 0 },
        { m: 'Dec-24', mewad2: 46628.20, mewad3: 180268.00, extra: 16200.00 },
        { m: 'Jan-25', mewad2: 42694.00, mewad3: 142280.00, extra: 1320.00 },
        { m: 'Feb-25', mewad2: 21762.60, mewad3: 75639.00, extra: 12870.00 },
        { m: 'Mar-25', mewad2: 23258.60, mewad3: 215558.00, extra: 9090.00 },
        { m: 'Apr-25', mewad2: 57081.00, mewad3: 116768.00, extra: 39810.00 },
        { m: 'May-25', mewad2: 69352.80, mewad3: 129821.00, extra: 61290.00 },
        { m: 'Jun-25', mewad2: 69730.40, mewad3: 61365.00, extra: 78900.00 },
        { m: 'Jul-25', mewad2: 97936.40, mewad3: 45806.00, extra: 87720.00 },
        { m: 'Aug-25', mewad2: 77089.77, mewad3: 226480.00, extra: 76110.00 },
        { m: 'Sep-25', mewad2: 30397.07, mewad3: 77418.00, extra: 35100.00 },
        { m: 'Oct-25', mewad2: 4751.00, mewad3: 260621.00, extra: 18600.00 },
        { m: 'Nov-25', mewad2: 34767.80, mewad3: 290904.00, extra: 42600.00 },
        { m: 'Dec-25', mewad2: 22997.35, mewad3: 191062.00, extra: 36900.00 },
        { m: 'Jan-26', mewad2: 65231.03, mewad3: 123897.05, extra: 63180.00 },
        { m: 'Feb-26', mewad2: 4707.72, mewad3: 29550.00, extra: 118306.20 },
        { m: 'Mar-26', mewad2: 41227.75, mewad3: 255110.00, extra: 40080.00 },
        { m: 'Apr-26', mewad2: 27154.94, mewad3: 172891.00, extra: 48750.00 },
        { m: 'May-26', mewad2: 25663.30, mewad3: 174981.70, extra: 56220.00 },
        { m: 'Jun-26', mewad2: 63960.00, mewad3: 108305.00, extra: 28635.87 }
      ]
    },
    {
      id: 22, type: 'iconGrid',
      kicker: 'WHY INVEST',
      title: 'The case in eight lines',
      items: ['India’s Manufacturing Boom', 'Growing Industrial Corridors', 'Real Estate Asset Backing', 'Recurring Cash Flow', 'Scalable Business Model', 'Experienced Promoters', 'Multiple Revenue Streams', 'Long-Term Expansion Strategy']
    },
    {
      id: 23, type: 'iconGrid',
      kicker: 'LONG-TERM VISION',
      title: '50+ Industrial Hotels across India',
      items: ['Preferred accommodation partner for manufacturing companies', 'A recognisable national hospitality brand'],
      footer: 'Potential exits: REIT · IPO · Strategic Sale · Private Equity Acquisition'
    },
    {
      id: 24, type: 'ask',
      kicker: 'THE ASK',
      title: 'Join us in building it',
      body: 'Minimum investment ₹5 lakh, customisable, proportional ownership, annual distributions.',
      contactLabel: 'Contact',
      contactValue: 'invest@mevad.in',
      closing: 'Building the Hospitality Infrastructure Behind India’s Manufacturing Revolution.'
    }
  ]
};
```

- [ ] **Step 2: Verify slide count and required fields**

Run:
```bash
node -e "
global.window = {};
require('./pitch-deck/data/deck.js');
var s = window.MEVAD_DECK.slides;
if (s.length !== 24) throw new Error('expected 24 slides, got ' + s.length);
s.forEach(function (slide, i) {
  if (!slide.type || !slide.title) throw new Error('slide ' + (i+1) + ' missing type/title');
});
if (!window.MEVAD_DECK.footnoteEstimate) throw new Error('missing footnoteEstimate');
console.log('OK: 24 slides, all have type+title, footnote present');
"
```
Expected: `OK: 24 slides, all have type+title, footnote present`

- [ ] **Step 3: Commit**

```bash
git add pitch-deck/data/deck.js
git commit -m "Add investor pitch deck data (24 slides, real Sanand figures)"
```

---

### Task 2: Slide shell, tokens, and base layout

**Files:**
- Create: `pitch-deck/index.html`
- Create: `pitch-deck/css/deck.css`

**Interfaces:**
- Consumes: `window.MEVAD_DECK.slides` (Task 1) — only for a slide count sanity check in this task; actual rendering happens in Task 3.
- Produces: `<div id="deck">` container in `index.html` that `js/deck.js` (Task 3) mounts into. CSS classes `.slide`, `.slide-kicker`, `.slide-title`, `.deck-nav`, `.deck-counter` that Task 3's templates must use verbatim.

- [ ] **Step 1: Write `css/deck.css`**

```css
/* ==========================================================================
   MEVAD PITCH DECK — tokens copied from ../css/main.css (teal/cream, dark only)
   ========================================================================== */

:root {
  --ink-1:  #1B3A38;
  --ink-2:  #224442;
  --ink-3:  #2B514E;
  --text-0: #FDFDF1;
  --text-1: #B4C4C1;
  --line-1: rgba(253, 253, 241, 0.10);
  --line-2: rgba(253, 253, 241, 0.17);
  --accent:      #FDFDF1;
  --on-accent:   #1B3A38;
  --accent-wash: rgba(253, 253, 241, 0.09);
  --series-a: #c98500;
  --series-b: #3987e5;
  --font-display: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono:    'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  background: var(--ink-1);
  color: var(--text-0);
  font-family: var(--font-body);
  height: 100%;
}

#deck { position: relative; }

.slide {
  display: none;
  min-height: 100vh;
  padding: clamp(2rem, 6vw, 6rem);
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}
.slide.is-active { display: flex; }

.slide-kicker {
  font-family: var(--font-mono);
  letter-spacing: 0.12em;
  color: var(--text-1);
  font-size: 0.8rem;
}
.slide-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 3rem);
  margin: 0;
  max-width: 40ch;
}
.slide-body { font-size: 1.1rem; color: var(--text-1); max-width: 60ch; }

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1px;
  background: var(--line-1);
  border: 1px solid var(--line-1);
}
.item-grid > div {
  background: var(--ink-1);
  padding: 1rem 1.25rem;
  font-family: var(--font-mono);
}

.stat-row { display: flex; flex-wrap: wrap; gap: 2.5rem; }
.stat-k { font-family: var(--font-mono); color: var(--text-1); font-size: 0.85rem; }
.stat-v { font-family: var(--font-mono); font-size: 1.75rem; }

.footnote {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-1);
  border-top: 1px solid var(--line-2);
  padding-top: 0.75rem;
  max-width: 70ch;
}

.deck-nav {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  font-family: var(--font-mono);
  z-index: 10;
}
.deck-nav button {
  background: var(--accent-wash);
  border: 1px solid var(--line-2);
  color: var(--text-0);
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  font-family: var(--font-mono);
}
.deck-counter { color: var(--text-1); font-size: 0.85rem; }

@media print {
  .deck-nav { display: none; }
  .slide {
    display: flex !important;
    page-break-after: always;
    min-height: 100vh;
  }
}
```

- [ ] **Step 2: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mevad — Investor Presentation</title>
  <link rel="stylesheet" href="css/deck.css">
</head>
<body>
  <div id="deck"></div>
  <nav class="deck-nav">
    <button id="prev" aria-label="Previous slide">&larr;</button>
    <span class="deck-counter" id="counter">1 / 24</span>
    <button id="next" aria-label="Next slide">&rarr;</button>
  </nav>

  <script src="data/deck.js"></script>
  <script src="js/charts.js"></script>
  <script src="js/deck.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verify with a static server**

Run:
```bash
cd pitch-deck && python3 -m http.server 8099 &
sleep 1
curl -s http://localhost:8099/ | grep -o '<title>[^<]*</title>'
curl -s http://localhost:8099/data/deck.js | grep -c 'id: 1,'
kill %1
```
Expected: `<title>Mevad — Investor Presentation</title>` and a count of `1` (confirms `data/deck.js` is served).

- [ ] **Step 4: Commit**

```bash
git add pitch-deck/index.html pitch-deck/css/deck.css
git commit -m "Add pitch deck shell, tokens, and print stylesheet"
```

---

### Task 3: Chart builders (SVG string functions)

**Files:**
- Create: `pitch-deck/js/charts.js`

**Interfaces:**
- Consumes: plain JS arrays/objects — no DOM access, no dependency on `deck.js` or `data/deck.js`.
- Produces (attached to `window.MevadCharts`):
  - `timeline(steps)` — `steps: [{label, value}]` → SVG string
  - `dotMap(cities)` — `cities: [string]` → SVG string
  - `waterfall(example)` — `example: {distributableProfit, managementFeePct, managementFee, toOwners}` → SVG string
  - `trendBar(series)` — `series: [{m, mewad2, mewad3, extra}]` → SVG string

- [ ] **Step 1: Write `js/charts.js`**

```js
/* ==========================================================================
   MEVAD PITCH DECK — chart builders
   Pure functions: (data) -> SVG markup string. No DOM access, so these are
   testable directly from Node.
   ========================================================================== */

window.MevadCharts = (function () {
  'use strict';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function timeline(steps) {
    var w = 800, h = 160, gap = w / steps.length;
    var parts = ['<svg viewBox="0 0 ' + w + ' ' + h + '" class="chart chart-timeline">'];
    parts.push('<line x1="20" y1="80" x2="' + (w - 20) + '" y2="80" stroke="var(--line-2)" stroke-width="2"/>');
    steps.forEach(function (s, i) {
      var cx = 20 + gap * i + gap / 2;
      parts.push('<circle cx="' + cx + '" cy="80" r="8" fill="var(--accent)"/>');
      parts.push('<text x="' + cx + '" y="50" text-anchor="middle" fill="var(--text-0)" font-family="var(--font-mono)" font-size="20">' + esc(s.value) + '</text>');
      parts.push('<text x="' + cx + '" y="115" text-anchor="middle" fill="var(--text-1)" font-family="var(--font-mono)" font-size="12">' + esc(s.label) + '</text>');
    });
    parts.push('</svg>');
    return parts.join('');
  }

  function dotMap(cities) {
    var w = 800, h = 200, cols = 4;
    var parts = ['<svg viewBox="0 0 ' + w + ' ' + h + '" class="chart chart-dotmap">'];
    cities.forEach(function (city, i) {
      var col = i % cols, row = Math.floor(i / cols);
      var cx = 100 + col * 180, cy = 60 + row * 90;
      parts.push('<circle cx="' + cx + '" cy="' + cy + '" r="6" fill="var(--series-b)"/>');
      parts.push('<text x="' + cx + '" y="' + (cy + 24) + '" text-anchor="middle" fill="var(--text-0)" font-family="var(--font-mono)" font-size="13">' + esc(city) + '</text>');
    });
    parts.push('</svg>');
    return parts.join('');
  }

  function waterfall(example) {
    var w = 800, h = 220;
    var total = example.distributableProfit;
    var feeH = (example.managementFee / total) * 150;
    var ownH = (example.toOwners / total) * 150;
    var parts = ['<svg viewBox="0 0 ' + w + ' ' + h + '" class="chart chart-waterfall">'];
    parts.push('<rect x="60" y="' + (170 - 150) + '" width="120" height="150" fill="var(--accent-wash)" stroke="var(--line-2)"/>');
    parts.push('<text x="120" y="' + (170 - 150 - 10) + '" text-anchor="middle" fill="var(--text-0)" font-family="var(--font-mono)" font-size="13">Distributable Profit</text>');

    parts.push('<rect x="340" y="' + (170 - feeH) + '" width="120" height="' + feeH + '" fill="var(--series-a)"/>');
    parts.push('<text x="400" y="' + (170 - feeH - 10) + '" text-anchor="middle" fill="var(--text-0)" font-family="var(--font-mono)" font-size="13">Management Fee (' + (example.managementFeePct * 100) + '%)</text>');

    parts.push('<rect x="580" y="' + (170 - ownH) + '" width="120" height="' + ownH + '" fill="var(--series-b)"/>');
    parts.push('<text x="640" y="' + (170 - ownH - 10) + '" text-anchor="middle" fill="var(--text-0)" font-family="var(--font-mono)" font-size="13">To Owners</text>');

    parts.push('<line x1="40" y1="170" x2="760" y2="170" stroke="var(--line-2)" stroke-width="2"/>');
    parts.push('</svg>');
    return parts.join('');
  }

  function trendBar(series) {
    var w = 1000, h = 260, barW = w / series.length;
    var totals = series.map(function (r) { return r.mewad2 + r.mewad3 + r.extra; });
    var max = Math.max.apply(null, totals.map(Math.abs));
    var zero = 190;
    var scale = 90 / max;
    var parts = ['<svg viewBox="0 0 ' + w + ' ' + h + '" class="chart chart-trend">'];
    parts.push('<line x1="0" y1="' + zero + '" x2="' + w + '" y2="' + zero + '" stroke="var(--line-2)"/>');
    series.forEach(function (r, i) {
      var total = r.mewad2 + r.mewad3 + r.extra;
      var barH = Math.abs(total) * scale;
      var y = total >= 0 ? zero - barH : zero;
      parts.push('<rect x="' + (i * barW + 2) + '" y="' + y + '" width="' + (barW - 4) + '" height="' + barH + '" fill="var(--series-b)"/>');
    });
    parts.push('</svg>');
    return parts.join('');
  }

  return { timeline: timeline, dotMap: dotMap, waterfall: waterfall, trendBar: trendBar };
})();

if (typeof module !== 'undefined') { module.exports = window.MevadCharts; }
```

- [ ] **Step 2: Verify with Node**

Run:
```bash
node -e "
global.window = {};
require('./pitch-deck/js/charts.js');
var C = window.MevadCharts;

var t = C.timeline([{label:'A', value:'21'}, {label:'B', value:'47'}]);
if (t.indexOf('<svg') !== 0) throw new Error('timeline: not an svg string');
if (t.indexOf('21') === -1) throw new Error('timeline: missing value');

var d = C.dotMap(['Changodar', 'Halol']);
if (d.indexOf('Changodar') === -1) throw new Error('dotMap: missing city label');

var wf = C.waterfall({distributableProfit: 1000000, managementFeePct: 0.2, managementFee: 200000, toOwners: 800000});
if (wf.indexOf('20') === -1) throw new Error('waterfall: missing fee pct');

var tb = C.trendBar([{m:'x', mewad2: 100, mewad3: 0, extra: 0}, {m:'y', mewad2: -50, mewad3: 0, extra: 0}]);
if (tb.indexOf('<rect') === -1) throw new Error('trendBar: no bars rendered');

console.log('OK: all four chart builders return valid SVG strings');
"
```
Expected: `OK: all four chart builders return valid SVG strings`

- [ ] **Step 3: Commit**

```bash
git add pitch-deck/js/charts.js
git commit -m "Add pitch deck SVG chart builders"
```

---

### Task 4: Slide renderer (pure functions) + DOM mount + navigation

**Files:**
- Create: `pitch-deck/js/deck.js`

**Interfaces:**
- Consumes: `window.MEVAD_DECK.slides` (Task 1), `window.MevadCharts` (Task 3).
- Produces: `window.MevadDeck.renderSlide(slide)` → HTML string (pure, no DOM), `window.MevadDeck.renderAll(slides)` → array of HTML strings, `window.MevadDeck.mount()` → wires `#deck`/`.deck-nav` in the live document (browser-only, no return value).

- [ ] **Step 1: Write `js/deck.js`**

```js
/* ==========================================================================
   MEVAD PITCH DECK — renderer + navigation
   renderSlide/renderAll are pure (data) -> string functions, testable from
   Node without a DOM. mount() is the only part that touches document/window
   chrome, and only runs in a browser.
   ========================================================================== */

window.MevadDeck = (function () {
  'use strict';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function header(slide) {
    return '<div class="slide-kicker">' + esc(slide.kicker || '') + '</div>' +
           '<h1 class="slide-title">' + esc(slide.title) + '</h1>';
  }

  function footnote(slide) {
    if (!slide.footnote) return '';
    var text = (typeof window !== 'undefined' && window.MEVAD_DECK) ? window.MEVAD_DECK.footnoteEstimate : '';
    return '<p class="footnote">' + esc(text) + '</p>';
  }

  var renderers = {
    cover: function (s) {
      return '<div class="slide-kicker">' + esc(s.kicker) + '</div>' +
             '<h1 class="slide-title">' + esc(s.title) + '</h1>' +
             '<p class="slide-body">' + esc(s.subtitle) + '</p>' +
             '<p class="footnote">' + esc(s.closing) + '</p>';
    },
    statement: function (s) {
      return header(s) + '<p class="slide-body">' + esc(s.body) + '</p>';
    },
    iconGrid: function (s) {
      var grid = '<div class="item-grid">' + s.items.map(function (it) {
        return '<div>' + esc(it) + '</div>';
      }).join('') + '</div>';
      var footer = s.footer ? '<p class="slide-body">' + esc(s.footer) + '</p>' : '';
      return header(s) + grid + footer;
    },
    stat: function (s) {
      var row = '<div class="stat-row">' + s.stats.map(function (st) {
        return '<div><div class="stat-k">' + esc(st.k) + '</div><div class="stat-v">' + esc(st.v) + '</div></div>';
      }).join('') + '</div>';
      return header(s) + row;
    },
    revenueList: function (s) {
      var cur = '<div class="item-grid">' + s.current.map(function (it) { return '<div>' + esc(it) + '</div>'; }).join('') + '</div>';
      var fut = '<div class="item-grid">' + s.future.map(function (it) { return '<div>' + esc(it) + ' (future)</div>'; }).join('') + '</div>';
      return header(s) + cur + fut;
    },
    timeline: function (s) {
      var svg = window.MevadCharts ? window.MevadCharts.timeline(s.steps) : '';
      return header(s) + svg;
    },
    dotMap: function (s) {
      var svg = window.MevadCharts ? window.MevadCharts.dotMap(s.cities) : '';
      var footer = s.footer ? '<p class="slide-body">' + esc(s.footer) + '</p>' : '';
      return header(s) + svg + footer;
    },
    waterfall: function (s) {
      var svg = window.MevadCharts ? window.MevadCharts.waterfall(s.example) : '';
      return header(s) + svg;
    },
    financials: function (s) {
      var rows = '<div class="item-grid">' + s.rows.map(function (r) {
        return '<div>' + esc(r.label) + ' — Investment: ₹' + r.investment.toLocaleString('en-IN') +
               ', Net profit: ₹' + r.netProfit.toLocaleString('en-IN') +
               ', Outstanding: ₹' + r.outstanding.toLocaleString('en-IN') + '</div>';
      }).join('') + '</div>';
      var targets = '<div class="stat-row">' + s.targets.map(function (t) {
        return '<div><div class="stat-k">' + esc(t.k) + '</div><div class="stat-v">' + esc(t.v) + '</div></div>';
      }).join('') + '</div>';
      var assumptions = '<ul>' + s.assumptions.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>';
      return header(s) + rows + targets + assumptions + footnote(s);
    },
    trendChart: function (s) {
      var svg = window.MevadCharts ? window.MevadCharts.trendBar(s.series) : '';
      return header(s) + svg + '<p class="slide-body">' + esc(s.note) + '</p>';
    },
    governance: function (s) {
      var receive = s.receive ? '<div class="item-grid">' + s.receive.map(function (it) { return '<div>' + esc(it) + '</div>'; }).join('') + '</div>' : '';
      var cannot = s.cannot ? '<div class="item-grid">' + s.cannot.map(function (it) { return '<div>' + esc(it) + '</div>'; }).join('') + '</div>' : '';
      var approval = s.requiresApproval ? '<p class="slide-body">' + esc(s.requiresApproval) + '</p>' : '';
      return header(s) + receive + cannot + approval;
    },
    ask: function (s) {
      return header(s) + '<p class="slide-body">' + esc(s.body) + '</p>' +
             '<div class="stat-row"><div><div class="stat-k">' + esc(s.contactLabel) + '</div><div class="stat-v">' + esc(s.contactValue) + '</div></div></div>' +
             '<p class="footnote">' + esc(s.closing) + '</p>';
    }
  };

  function renderSlide(slide) {
    var fn = renderers[slide.type];
    if (!fn) throw new Error('no renderer for slide type: ' + slide.type);
    return '<section class="slide" data-slide-id="' + slide.id + '">' + fn(slide) + '</section>';
  }

  function renderAll(slides) {
    return slides.map(renderSlide);
  }

  function mount() {
    var slides = window.MEVAD_DECK.slides;
    var deck = document.getElementById('deck');
    deck.innerHTML = renderAll(slides).join('');

    var els = deck.querySelectorAll('.slide');
    var idx = 0;
    var counter = document.getElementById('counter');

    function show(i) {
      idx = Math.max(0, Math.min(els.length - 1, i));
      els.forEach(function (el, j) { el.classList.toggle('is-active', j === idx); });
      counter.textContent = (idx + 1) + ' / ' + els.length;
    }

    document.getElementById('prev').addEventListener('click', function () { show(idx - 1); });
    document.getElementById('next').addEventListener('click', function () { show(idx + 1); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === ' ') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });

    show(0);
  }

  return { renderSlide: renderSlide, renderAll: renderAll, mount: mount };
})();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', window.MevadDeck.mount);
}
if (typeof module !== 'undefined') { module.exports = window.MevadDeck; }
```

- [ ] **Step 2: Verify pure render functions from Node**

Run:
```bash
node -e "
global.window = {};
require('./pitch-deck/data/deck.js');
require('./pitch-deck/js/charts.js');
require('./pitch-deck/js/deck.js');

var slides = window.MEVAD_DECK.slides;
var html = window.MevadDeck.renderAll(slides);

if (html.length !== 24) throw new Error('expected 24 rendered slides, got ' + html.length);
html.forEach(function (h, i) {
  if (h.indexOf('<section class=\"slide\"') !== 0) throw new Error('slide ' + (i+1) + ' missing wrapper');
});
if (html[7].indexOf('21') === -1) throw new Error('slide 8 (proof point) missing 21-room figure');
if (html[19].indexOf(window.MEVAD_DECK.footnoteEstimate) === -1) throw new Error('slide 20 (financials) missing required footnote');
if (html[18].indexOf('20') === -1) throw new Error('slide 19 (management fee) missing 20% figure');

console.log('OK: 24 slides render, financials footnote present, key figures present');
"
```
Expected: `OK: 24 slides render, financials footnote present, key figures present`

- [ ] **Step 3: Verify in a real browser (manual)**

```bash
cd pitch-deck && python3 -m http.server 8099 &
sleep 1
```
Open `http://localhost:8099/` in a browser. Confirm:
- Slide 1 (cover) is visible on load, styled teal background / cream text.
- Right arrow / click "next" advances through all 24 slides; counter updates `1 / 24` → `24 / 24`.
- Left arrow / "prev" goes back; can't go past slide 1 or 24.
- No JS console errors.

Then: `kill %1`

- [ ] **Step 4: Commit**

```bash
git add pitch-deck/js/deck.js
git commit -m "Add pitch deck renderer, DOM mount, and keyboard/click navigation"
```

---

### Task 5: Print-to-PDF verification and README

**Files:**
- Create: `pitch-deck/README.md`
- Modify: `pitch-deck/css/deck.css:print media query` (verify only, already written in Task 2)

**Interfaces:**
- Consumes: nothing new — this task verifies Task 2's print stylesheet end-to-end and documents usage.

- [ ] **Step 1: Write `pitch-deck/README.md`**

```markdown
# Mevad Investor Pitch Deck

Standalone, self-contained HTML slide deck. Separate from the main marketing
site — real business figures, not placeholders.

## Run it

    cd pitch-deck && python3 -m http.server 8099

Open `http://localhost:8099/`.

- **Navigate:** arrow keys, spacebar, or the on-screen prev/next buttons.
- **Export to PDF:** open in Chrome, `Cmd/Ctrl+P`, destination "Save as PDF",
  background graphics on. The print stylesheet renders one slide per page.

## Changing the numbers

Every figure and every line of copy lives in `data/deck.js`. Nothing is
hardcoded in `index.html` or `js/*.js`.

## Financial figures

Slide 20's investment/profit/outstanding figures are **estimated at 100%**
from a director's reported 20%/30% ownership share of the real entities
(Mewad-2, Mewad-3) — not audited totals. The footnote on that slide states
this; do not remove it or present the figures as verified without an actual
audit backing them.
```

- [ ] **Step 2: Verify print stylesheet renders all slides**

Run:
```bash
grep -A6 "@media print" pitch-deck/css/deck.css
```
Expected: block sets `.slide { display: flex !important; page-break-after: always; }` and hides `.deck-nav` — confirms every slide (not just `.is-active`) will paint when printed.

- [ ] **Step 3: Manual PDF export check**

Open `http://localhost:8099/` in Chrome, `Cmd+P` → Save as PDF. Confirm the resulting PDF has 24 pages, one slide per page, in order, with the teal background rendering (enable "background graphics" in the print dialog if it's missing).

- [ ] **Step 4: Commit**

```bash
git add pitch-deck/README.md
git commit -m "Add pitch deck README with run and PDF export instructions"
```

---

## Self-Review Notes

- **Spec coverage:** all 24 slides from the spec's sequence are present in Task 1's data (verified by id 1–24 matching the spec's list); teal/cream theme reused not replaced (Task 2); real + labeled-estimate financials with required footnote (Task 1 slide 20, enforced in Task 4 Step 2); unscaled monthly trend, labeled (Task 1 slide 21); print-to-PDF path (Task 2 + Task 5); no changes to the existing site (no task touches files outside `pitch-deck/`).
- **Placeholder scan:** no TBD/TODO; every step has literal code or literal verification commands and expected output.
- **Type consistency:** `slide.type` values used in Task 1's data (`cover`, `statement`, `iconGrid`, `stat`, `revenueList`, `timeline`, `dotMap`, `waterfall`, `financials`, `trendChart`, `governance`, `ask`) match exactly the `renderers` keys defined in Task 4. `window.MevadCharts` function names (`timeline`, `dotMap`, `waterfall`, `trendBar`) match what Task 4's renderer calls.
