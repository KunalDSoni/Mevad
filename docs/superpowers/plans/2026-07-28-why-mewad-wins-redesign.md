# "Why Hotel Mewad Wins" Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current spec-table-plus-prose layout in the `#why-wins` section of `index.html` with an explicit two-column contrast ("what a guest sees" vs. "what a plant signs"), reusing the site's existing `.versus` CSS component, and trim the feature-card grid from 6 to 3 cards to remove overlap with the new columns.

**Architecture:** This is a static site (plain HTML/CSS/JS, no build step, no test runner). Content lives in `data/projects.js` (English) and `data/lang-hi.js` (Hindi), rendered into the DOM by small render functions in `js/main.js` that read from a merged dataset accessor `D()`. "Testing" in this codebase means: open `index.html` in a browser (or grep the rendered output) and visually/structurally verify the markup, since there is no automated test suite.

**Tech Stack:** Vanilla HTML/CSS/JS, no framework, no build tool.

## Global Constraints

- No new CSS components — reuse `.versus`, `.versus__col`, `.versus__col--mewad`, `.versus__head`, `.versus__swatch`, `.versus__list`, `.table-scroll`, `.table--compact`, `.card`, `.grid.grid--3` exactly as defined in `css/main.css`.
- No changes to underlying factual claims (keys, acreage, build times, percentages) — only reorganization and wording.
- Both `data/projects.js` (English) and `data/lang-hi.js` (Hindi) must be updated in parallel with equivalent content.
- Headline text ("Built for the guest who arrives at 2am.") stays unchanged.

---

### Task 1: Restructure `asset` data in `data/projects.js`

**Files:**
- Modify: `data/projects.js:167-187` (the `asset` object)

**Interfaces:**
- Produces: `D().asset.guestSide` (array of strings), `D().asset.plantSide` (array of strings), `D().asset.specs` (unchanged, array of `{k, v}`), `D().asset.features` (array of `{title, body}`, trimmed to 3 items) — consumed by Task 3's render functions.

- [ ] **Step 1: Replace the `asset` object**

Replace lines 167-187 of `data/projects.js` with:

```js
  asset: {
    intro: 'Engineered for a guest who arrives at 2am, works a 12-hour shift, and stays for months. Not for a honeymoon.',
    guestSide: [
      'Checks in at 2am after a shift change, not a flight.',
      'Kitchen serves hot meals at 3am and 3pm — when shifts turn over, not brunch hours.',
      'Packed three shirts for a six-month posting; laundry is industrial-grade, same-day, included.',
      'Sleeps through daylight: blackout curtains, sound isolation, a desk and wired ethernet instead of a view.'
    ],
    plantSide: [
      'An annual rate agreement instead of a per-night booking.',
      'Single-PO billing and GST-clean invoicing a procurement team can actually process.',
      'Occupancy tied to shift rosters and contractor cycles, not seasons or holidays.',
      'A location chosen for the plant gate, under 15 minutes away, not the view.'
    ],
    specs: [
      { k: 'Keys per property',      v: '60 – 90' },
      { k: 'Land footprint',         v: '1.5 – 3.0 acres' },
      { k: 'Distance to anchor gate',v: 'Under 15 minutes' },
      { k: 'F&B hours',              v: '24 / 7, shift-timed' },
      { k: 'Long-stay inventory',    v: '40% of keys' },
      { k: 'Build-to-open',          v: '14 – 18 months' },
      { k: 'Stabilisation',          v: '9 – 12 months' },
      { k: 'Operator',               v: 'Mewad, in-house' }
    ],
    features: [
      { title: 'Shift-aligned kitchens', body: 'Hot meals at 3am and 3pm, because that is when shifts change. Vegetarian, Jain and regional menus as standard.' },
      { title: 'Transport desk',         body: 'Scheduled shuttles to anchor plant gates, timed to shift changes and airport arrivals.' },
      { title: 'Corporate contracting',  body: 'Annual rate agreements, GST-clean invoicing and single-PO billing that a procurement team can actually process.' }
    ]
  },
```

- [ ] **Step 2: Verify the file still parses as valid JS**

Run: `node -e "require('./data/projects.js'); console.log('ok')"` from the repo root.

If `data/projects.js` doesn't use `module.exports` (browser-global script), instead run: `node --check data/projects.js` to verify syntax only.

Expected: no syntax errors printed (either `ok` or silent success from `--check`).

- [ ] **Step 3: Commit**

```bash
git add data/projects.js
git commit -m "Restructure asset data for why-wins contrast layout"
```

---

### Task 2: Mirror the restructuring in `data/lang-hi.js`

**Files:**
- Modify: `data/lang-hi.js:92-112` (the `asset` object)

**Interfaces:**
- Consumes: the English structure from Task 1 (`guestSide`, `plantSide`, `specs`, `features` shape) as the template to translate.
- Produces: `D().asset.guestSide`, `D().asset.plantSide`, `D().asset.features` (3 items) in Hindi, matching the same keys Task 3 will render.

- [ ] **Step 1: Replace the Hindi `asset` object**

Replace lines 92-112 of `data/lang-hi.js` with:

```js
    asset: {
      intro: 'ऐसे मेहमान के लिए बनाया गया जो रात 2 बजे पहुँचता है, 12 घंटे की शिफ़्ट करता है और महीनों रुकता है। हनीमून के लिए नहीं।',
      guestSide: [
        'रात 2 बजे शिफ़्ट बदलने के बाद पहुँचता है, फ़्लाइट से नहीं।',
        'रसोई रात 3 बजे और दोपहर 3 बजे गरम भोजन परोसती है — जब शिफ़्ट बदलती है, ब्रंच के समय नहीं।',
        'छह महीने के प्रवास के लिए तीन कमीज़ें लाया; लॉन्ड्री औद्योगिक स्तर की, उसी दिन, शुल्क में शामिल।',
        'दिन में सोता है: ब्लैकआउट पर्दे, ध्वनिरोधन, नज़ारे की जगह मेज़ और वायर्ड इंटरनेट।'
      ],
      plantSide: [
        'प्रति-रात बुकिंग की जगह वार्षिक दर अनुबंध।',
        'एकल-PO बिलिंग और GST-अनुरूप चालान, जिसे खरीद विभाग वास्तव में संसाधित कर सके।',
        'शिफ़्ट रोस्टर और ठेका चक्रों से जुड़ा अधिभोग, मौसम या छुट्टियों से नहीं।',
        'संयंत्र के गेट से 15 मिनट से कम दूरी के लिए चुना गया स्थान, नज़ारे के लिए नहीं।'
      ],
      specs: [
        { k: 'प्रति संपत्ति कमरे',      v: '60 – 90' },
        { k: 'भूमि क्षेत्र',            v: '1.5 – 3.0 एकड़' },
        { k: 'एंकर गेट से दूरी',        v: '15 मिनट से कम' },
        { k: 'भोजन सेवा',              v: '24 / 7, शिफ़्ट अनुसार' },
        { k: 'दीर्घ-ठहराव कमरे',        v: 'कुल कमरों का 40%' },
        { k: 'निर्माण से उद्घाटन',      v: '14 – 18 महीने' },
        { k: 'स्थिरीकरण',              v: '9 – 12 महीने' },
        { k: 'संचालक',                 v: 'मेवाड़, स्वयं' }
      ],
      features: [
        { title: 'शिफ़्ट के अनुरूप रसोई', body: 'रात 3 बजे और दोपहर 3 बजे गरम भोजन, क्योंकि तभी शिफ़्ट बदलती है। शाकाहारी, जैन और क्षेत्रीय भोजन मानक रूप से।' },
        { title: 'परिवहन डेस्क', body: 'एंकर संयंत्र के गेट तक निर्धारित शटल, शिफ़्ट बदलने और हवाई अड्डे के आगमन के समय अनुसार।' },
        { title: 'कॉर्पोरेट अनुबंध', body: 'वार्षिक दर अनुबंध, GST-अनुरूप चालान और एकल-PO बिलिंग, जिसे खरीद विभाग वास्तव में संसाधित कर सके।' }
      ]
    },
```

- [ ] **Step 2: Verify syntax**

Run: `node --check data/lang-hi.js`

Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add data/lang-hi.js
git commit -m "Mirror why-wins contrast restructuring in Hindi data"
```

---

### Task 3: Replace render functions in `js/main.js`

**Files:**
- Modify: `js/main.js:144-159` (`renderAssetSpecs`, `renderAssetFeatures`)
- Modify: `js/main.js:423-424` (call sites inside `renderAll`)

**Interfaces:**
- Consumes: `D().asset.guestSide`, `D().asset.plantSide`, `D().asset.specs`, `D().asset.features` from Tasks 1–2.
- Produces: `renderAssetContrast(mount)` — new function replacing `renderAssetSpecs`. `renderAssetFeatures(mount)` — unchanged signature, now renders 3 cards instead of 6 since the data array shrank.

- [ ] **Step 1: Replace `renderAssetSpecs` with `renderAssetContrast`**

Replace lines 144-152 of `js/main.js` (the current `renderAssetSpecs` function) with:

```js
  function renderAssetContrast(mount) {
    if (!mount) return;
    var a = D().asset;
    var specsHtml = '<div class="table-scroll"><table class="table--compact"><tbody>' +
      a.specs.map(function (s) {
        return '<tr><td style="color:var(--text-2)">' + s.k + '</td>' +
               '<td class="num" style="color:var(--text-0)">' + s.v + '</td></tr>';
      }).join('') +
      '</tbody></table></div>';
    mount.innerHTML =
      '<div class="versus__col">' +
        '<div class="versus__head"><span class="versus__swatch" style="background:var(--text-3)"></span><span>What a guest sees</span></div>' +
        '<ul class="versus__list">' + a.guestSide.map(function (line) { return '<li>' + line + '</li>'; }).join('') + '</ul>' +
      '</div>' +
      '<div class="versus__col versus__col--mewad">' +
        '<div class="versus__head"><span class="versus__swatch" style="background:var(--accent)"></span><span>What a plant signs</span></div>' +
        '<ul class="versus__list">' + a.plantSide.map(function (line) { return '<li>' + line + '</li>'; }).join('') + '</ul>' +
        specsHtml +
      '</div>';
  }
```

Leave the existing `renderAssetFeatures` function (lines 154-159, now shifted) untouched — it already reads `D().asset.features` generically and will render 3 cards automatically once Task 1's data lands.

- [ ] **Step 2: Update the call site in `renderAll`**

In the `renderAll` function, replace:

```js
    renderAssetSpecs($('[data-render="asset-specs"]'));
    renderAssetFeatures($('[data-render="asset-features"]'));
```

with:

```js
    renderAssetContrast($('[data-render="asset-contrast"]'));
    renderAssetFeatures($('[data-render="asset-features"]'));
```

- [ ] **Step 3: Verify syntax**

Run: `node --check js/main.js`

Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add js/main.js
git commit -m "Replace asset-specs render with two-column contrast render"
```

---

### Task 4: Update `#why-wins` markup in `index.html`

**Files:**
- Modify: `index.html:120-136`

**Interfaces:**
- Consumes: `renderAssetContrast` and the updated `renderAssetFeatures` from Task 3, wired via `data-render` attributes.

- [ ] **Step 1: Replace the split block**

Replace lines 120-134 of `index.html`:

```html
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
```

with:

```html
    <div class="versus reveal" data-render="asset-contrast"></div>
```

- [ ] **Step 2: Confirm the feature grid line below is unchanged**

Line 136 (`<div class="grid grid--3 mt-3 reveal" data-render="asset-features"></div>`) needs no edit — it will render 3 cards automatically from Task 1's trimmed data.

- [ ] **Step 3: Visually verify in a browser**

Open `index.html` directly in a browser (e.g. `open index.html` on macOS, or serve the directory with `python3 -m http.server 8000` and visit `http://localhost:8000`).

Expected: the `#why-wins` section shows a two-column panel — left column "What a guest sees" with 4 bullet points on a darker background, right column "What a plant signs" with 4 bullet points followed by the property-spec table, all styled per the existing `.versus` component (no visual regressions, no console errors). Below it, exactly 3 feature cards ("Shift-aligned kitchens", "Transport desk", "Corporate contracting").

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Redesign why-wins section as a guest-vs-plant contrast layout"
```

---

## Self-Review Notes

- **Spec coverage:** headline unchanged (Task 4 leaves it untouched), lede kept (untouched, only the `.split` block below it is replaced), two-column contrast (Task 3 + 4), specs repositioned as evidence under the right column (Task 3), feature grid trimmed to 3 (Task 1), English + Hindi mirrored (Tasks 1 + 2), no new CSS (confirmed — reuses `.versus`/`.table--compact`/`.grid`). All spec requirements covered.
- **Type consistency:** `renderAssetContrast(mount)` takes one `mount` element param, matches the call `renderAssetContrast($('[data-render="asset-contrast"]'))` in Task 3 Step 2 and the `data-render="asset-contrast"` attribute added in Task 4 Step 1. `renderAssetFeatures` signature and call site are untouched from the original code.
- **No placeholders:** all code blocks contain full literal content (no TBD/TODO), all copy is either kept from the existing site or fully written out.
