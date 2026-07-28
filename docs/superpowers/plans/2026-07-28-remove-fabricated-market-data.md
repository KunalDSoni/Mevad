# Remove Fabricated Market Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove every market-thesis figure on the site that has no real, checkable citation behind it (the 4 hero headline stats, Exhibit 01 occupancy chart, Exhibit 02 supply-gap chart), and turn the placeholder banner back on since the underlying data is still fake.

**Architecture:** This is a static site (`index.html` + `data/projects.js` as the single source of truth + `js/main.js` render functions + `js/charts.js` SVG chart builders + `data/lang-hi.js` Hindi overrides). Removing a figure means deleting it in all four places it's threaded through: the data object, the HTML mount/section, the JS renderer/call site, and the Hindi translation entries. No build step — verification is grepping for leftover references and loading the page in a browser via `serve.sh`.

**Tech Stack:** Plain HTML/CSS/JS, no framework, no test runner. "Testing" in this plan means: (a) grep assertions that dead references are gone, (b) loading `index.html` locally and checking the console + visual flow in both English and Hindi.

## Global Constraints

- Never leave a `data-source`, `data-chart`, or `data-render` attribute in HTML with no corresponding data/renderer (per spec: dangling references are bugs, not degradation).
- Only touch the files/lines identified below — property/calculator occupancy figures (`properties[].occupancy`, `.adr`) are explicitly out of scope; they're modeling assumptions already labeled by the site's disclaimer.
- Keep commits small and scoped to one task each.
- No CSS changes in this plan (out of scope per spec — dead CSS selectors for removed charts are not cleaned up here).

---

### Task 1: Flip `PLACEHOLDER_MODE` back on

**Files:**
- Modify: `data/projects.js:22`

**Interfaces:**
- Consumes: nothing new.
- Produces: `window.MEVAD.PLACEHOLDER_MODE === true`, read by `placeholderBanner()` in `js/main.js:18-24`.

- [ ] **Step 1: Flip the flag**

In `data/projects.js`, change:

```js
  PLACEHOLDER_MODE: false,
```

to:

```js
  PLACEHOLDER_MODE: true,
```

- [ ] **Step 2: Verify in browser**

Run: `cd /Users/kunal/Downloads/Agentic/Websites/Mevad && python3 -m http.server 8080` (or reuse the already-running `serve.sh` instance), then load `http://localhost:8080/` and hard-refresh.

Expected: a banner bar reading "Preview build · every figure on this page is placeholder data, not a real offer" appears at the very top of the page, above the nav.

- [ ] **Step 3: Commit**

```bash
git add data/projects.js
git commit -m "Turn placeholder banner back on while market data is still fake"
```

---

### Task 2: Remove the 4 headline stat tiles

**Files:**
- Modify: `data/projects.js:74-83` (delete `market.headline` array)
- Modify: `index.html:62` (remove the stat-strip mount)
- Modify: `js/main.js` (delete `renderStats` function and its call)
- Modify: `data/lang-hi.js:54-59` (delete the Hindi `market.headline` mirror)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing later tasks depend on — `market.headline` and `renderStats` cease to exist anywhere in the codebase after this task.

- [ ] **Step 1: Delete `market.headline` from the data file**

In `data/projects.js`, delete this entire block (currently lines 74-83, immediately inside `market: {`):

```js
    headline: [
      { value: 0,  suffix: '',  label: 'Organised industrial hotel chains in India',       note: 'Mevad is the first',
        source: { label: '', url: '' } },
      { value: 40, suffix: '+', label: 'Anchor factories within 5km of a typical site',    note: 'Demand does not need to be marketed',
        source: { label: '', url: '' } },
      { value: 92, suffix: '%', label: 'Of industrial-corridor demand is weekday',         note: 'Counter-cyclical to leisure hotels',
        source: { label: '', url: '' } },
      { value: 0,  suffix: '%', label: 'OTA commission on contracted corporate stays',     note: 'Booked direct, on rate agreements',
        source: { label: '', url: '' } }
    ],

```

(Leave the `market: {` opening and the comment above `headline` — the comment documents the `source` convention and still applies to the remaining `market` figures... but after Tasks 3 and 4, `market` will be empty. Leave `market: {}` as an empty object with the sourcing-convention comment still above it, so the comment's guidance survives for whoever adds real figures later.)

- [ ] **Step 2: Remove the stat-strip mount from the hero**

In `index.html`, delete this line (currently line 62, inside the hero section):

```html
    <div class="statstrip" data-render="stats"></div>
```

- [ ] **Step 3: Remove `renderStats` and its call site**

In `js/main.js`, delete the function (currently lines 117-127):

```js
  function renderStats(mount) {
    if (!mount) return;
    mount.innerHTML = D().market.headline.map(function (s, i) {
      return '<div class="stat">' +
        '<div class="stat__value"><span data-count="' + s.value + '" data-suffix="' + s.suffix + '">0</span>' +
          '<span data-source="market.headline.' + i + '.source"></span></div>' +
        '<div class="stat__label">' + s.label + '</div>' +
        '<div class="stat__note">' + s.note + '</div>' +
      '</div>';
    }).join('');
  }

```

And delete its call site in `renderAll()` (currently line 330):

```js
    renderStats($('[data-render="stats"]'));
```

- [ ] **Step 4: Remove the Hindi mirror of `market.headline`**

In `data/lang-hi.js`, delete this block from inside `data.market` (currently lines 54-59):

```js
      headline: [
        { label: 'भारत में संगठित औद्योगिक होटल श्रृंखलाएँ', note: 'मेवाड़ पहली है' },
        { label: 'एक सामान्य स्थल के 5 किमी भीतर एंकर कारखाने', note: 'मांग का विपणन नहीं करना पड़ता' },
        { label: 'औद्योगिक गलियारे की मांग कार्यदिवसों की है', note: 'अवकाश होटलों के विपरीत चक्र' },
        { label: 'अनुबंधित कॉर्पोरेट ठहराव पर OTA कमीशन', note: 'सीधी बुकिंग, दर अनुबंध पर' }
      ],
```

- [ ] **Step 5: Verify no leftover references**

Run: `grep -rn "market.headline\|renderStats\|data-render=\"stats\"\|statstrip" /Users/kunal/Downloads/Agentic/Websites/Mevad --include="*.html" --include="*.js"`

Expected: no output (empty result). If `.statstrip` still appears in `css/main.css`, that's fine — CSS cleanup is out of scope for this plan.

- [ ] **Step 6: Verify in browser**

Reload `http://localhost:8080/`. Expected: the hero section (headline "Tourists cancel. Factories don't.") no longer shows a row of stat tiles beneath the CTA buttons. No JS console errors.

- [ ] **Step 7: Commit**

```bash
git add data/projects.js index.html js/main.js data/lang-hi.js
git commit -m "Remove fabricated headline stats — no real citation exists"
```

---

### Task 3: Remove Exhibit 01 (occupancy chart)

**Files:**
- Modify: `data/projects.js:85-106` (delete `market.occupancy`)
- Modify: `index.html:111-123` (trim dangling sentence), `index.html:127-173` (delete whole section)
- Modify: `js/main.js` (delete occupancy chart render block inside `renderAll()`)
- Modify: `data/lang-hi.js:60-66` (delete Hindi `market.occupancy` mirror), `data/lang-hi.js:321-333` (delete Exhibit 1 `ui` entries)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Delete `market.occupancy` from the data file**

In `data/projects.js`, delete this block (currently lines 85-106):

```js
    // Illustrative annual occupancy, Jan–Dec. The single most important
    // chart on the site: stability vs seasonality.
    occupancy: {
      source: { label: '', url: '' },
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      series: [
        {
          id: 'industrial',
          label: 'Industrial hotel',
          sublabel: 'Mevad model',
          color: 'var(--series-industrial)',
          values: [76, 78, 81, 79, 77, 74, 73, 75, 78, 82, 80, 77]
        },
        {
          id: 'leisure',
          label: 'Leisure hotel',
          sublabel: 'Comparable tier',
          color: 'var(--series-leisure)',
          values: [88, 84, 66, 48, 41, 34, 31, 38, 52, 79, 91, 94]
        }
      ]
    },

```

- [ ] **Step 2: Trim the dangling "chart below" sentence in the Thesis section**

In `index.html`, this paragraph (currently lines 118-122) references a chart that will no longer be directly below it:

```html
      <div class="prose">
        <p>You are not buying the highest point on the curve. You are buying
        <strong>the shape of the curve</strong> - and over a ten-year hold, shape
        beats peak. The chart below is the whole argument in one picture.</p>
      </div>
```

Change it to end at "shape beats peak" instead of referencing a chart:

```html
      <div class="prose">
        <p>You are not buying the highest point on the curve. You are buying
        <strong>the shape of the curve</strong> - and over a ten-year hold, shape
        beats peak.</p>
      </div>
```

- [ ] **Step 3: Delete the Exhibit 01 section**

In `index.html`, delete the entire section (currently lines 127-173, from the `<!-- ===================== EXHIBIT 01 — OCCUPANCY ===================== -->` comment through its closing `</section>`):

```html
<!-- ===================== EXHIBIT 01 — OCCUPANCY ===================== -->
<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="label">Exhibit 01: occupancy</span>
      <h2>One of these is an investment. The other is a season.</h2>
    </div>

    <div class="figure reveal">
      <div class="figure__head">
        <div class="figure__title">Monthly occupancy: industrial vs leisure<span data-source="market.occupancy.source"></span></div>
        <div class="figure__sub">Illustrative stabilised year. Hover for monthly values.</div>
      </div>

      <div class="legend">
        <span class="legend__item">
          <span class="legend__swatch" style="background:var(--series-industrial)"></span>
          Industrial hotel - Mevad model
        </span>
        <span class="legend__item">
          <span class="legend__swatch" style="background:var(--series-leisure)"></span>
          Leisure hotel - comparable tier
        </span>
      </div>

      <div class="chart" data-chart="occupancy"></div>

      <div style="margin-top:1.25rem">
        <button class="btn btn--ghost btn--sm" data-toggle-table="occ-table">Show data table</button>
        <div id="occ-table" class="mt-1" data-chart="occupancy-table"></div>
      </div>
    </div>

    <div class="split mt-3 reveal">
      <div class="prose">
        <p>The leisure line peaks higher. It also spends a third of the year below
        50% - and a hotel at 40% occupancy is not earning a reduced return, it is
        losing money, because the cost base does not shrink when the guests leave.</p>
      </div>
      <div class="prose">
        <p>The industrial line never touches the leisure peak. It never touches the
        leisure trough either. <strong>Stability is the product</strong> - and it is
        what turns a hotel from a trade into an asset.</p>
      </div>
    </div>
  </div>
</section>

```

- [ ] **Step 4: Remove the occupancy chart render block from `js/main.js`**

In `renderAll()`, delete this block (currently lines 347-354 — note: leave the `if (window.MevadCharts) {` wrapper and the `supplyGap` line inside it alone for now, that's handled in Task 4):

```js
      var occ = $('[data-chart="occupancy"]');
      if (occ) {
        occ.innerHTML = '';
        window.MevadCharts.occupancy(occ, D().market.occupancy);
        var tbl = $('[data-chart="occupancy-table"]');
        if (tbl) tbl.innerHTML = window.MevadCharts.table(D().market.occupancy);
      }
```

- [ ] **Step 5: Remove the Hindi mirror of `market.occupancy`**

In `data/lang-hi.js`, delete this block from inside `data.market` (currently lines 60-66):

```js
      occupancy: {
        months: ['जन','फर','मार्च','अप्रै','मई','जून','जुल','अग','सित','अक्तू','नव','दिस'],
        series: [
          { label: 'औद्योगिक होटल', sublabel: 'मेवाड़ मॉडल' },
          { label: 'अवकाश होटल', sublabel: 'समकक्ष श्रेणी' }
        ]
      },
```

- [ ] **Step 6: Remove the Exhibit 1 `ui` translation entries**

In `data/lang-hi.js`, delete this block (currently lines 321-334, the `/* Exhibit 1 */` comment through its last entry):

```js
    /* Exhibit 1 */
    'Exhibit 01: occupancy': 'प्रदर्श 01: अधिभोग',
    'One of these is an investment. The other is a season.': 'इनमें से एक निवेश है। दूसरा एक मौसम।',
    'Monthly occupancy: industrial vs leisure': 'मासिक अधिभोग: औद्योगिक बनाम अवकाश',
    'Illustrative stabilised year. Hover for monthly values.': 'उदाहरणात्मक स्थिर वर्ष। मासिक आँकड़ों के लिए कर्सर ले जाएँ।',
    'Industrial hotel - Mevad model': 'औद्योगिक होटल - मेवाड़ मॉडल',
    'Leisure hotel - comparable tier': 'अवकाश होटल - समकक्ष श्रेणी',
    'Show data table': 'डेटा तालिका देखें',
    'Month': 'माह',
    'The leisure line peaks higher. It also spends a third of the year below 50% - and a hotel at 40% occupancy is not earning a reduced return, it is losing money, because the cost base does not shrink when the guests leave.':
      'अवकाश वाली रेखा ऊँचा शिखर छूती है। वह साल का एक तिहाई हिस्सा 50% से नीचे भी बिताती है - और 40% अधिभोग वाला होटल कम प्रतिफल नहीं कमा रहा होता, वह घाटे में होता है, क्योंकि मेहमानों के जाने से लागत घटती नहीं।',
    'The industrial line never touches the leisure peak. It never touches the leisure trough either. <strong>Stability is the product</strong> - and it is what turns a hotel from a trade into an asset.':
      'औद्योगिक रेखा अवकाश वाले शिखर को कभी नहीं छूती। वह उसकी गहराई को भी कभी नहीं छूती। <strong>स्थिरता ही उत्पाद है</strong> - और यही होटल को सौदे से संपत्ति बनाती है।',

```

- [ ] **Step 7: Verify no leftover references**

Run: `grep -rn "market.occupancy\|Exhibit 01\|data-chart=\"occupancy\|occ-table" /Users/kunal/Downloads/Agentic/Websites/Mevad --include="*.html" --include="*.js"`

Expected: no output.

- [ ] **Step 8: Verify in browser**

Reload `http://localhost:8080/`. Expected: the Thesis section now flows directly into the Demand engine section (Exhibit 01 and Exhibit 02 sections both still present until Task 4 removes the second one — after this step only Exhibit 01 is gone). No console errors. The Thesis section's closing paragraph now ends cleanly at "shape beats peak."

- [ ] **Step 9: Commit**

```bash
git add data/projects.js index.html js/main.js data/lang-hi.js
git commit -m "Remove Exhibit 01 occupancy chart — no real source for the industrial/leisure split"
```

---

### Task 4: Remove Exhibit 02 (supply-gap chart)

**Files:**
- Modify: `data/projects.js:108-122` (delete `market.supplyGap`, leaving `market: {}`)
- Modify: `index.html:175-210` (delete whole section)
- Modify: `js/main.js` (delete the `supplyGap` render call and the now-empty `if (window.MevadCharts) { ... }` wrapper)
- Modify: `data/lang-hi.js:67-78` (delete Hindi `market.supplyGap` mirror), `data/lang-hi.js:335-345` (delete Exhibit 2 `ui` entries)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `market` object in `data/projects.js` becomes `market: {}` — Task 5 depends on `js/charts.js` having zero remaining callers after this task.

- [ ] **Step 1: Delete `market.supplyGap` from the data file, leaving `market: {}`**

In `data/projects.js`, delete this block (currently lines 108-122, the last remaining content of `market`):

```js
    // Organised hotel rooms per 1,000 industrial workers, by corridor.
    // The supply gap, made visible.
    supplyGap: {
      source: { label: '', url: '' },
      unit: 'organised hotel rooms per 1,000 industrial workers',
      benchmark: { label: 'Business-district benchmark', value: 24, source: { label: '', url: '' } },
      corridors: [
        { name: 'Sanand, GJ',    value: 2.1 },
        { name: 'Dahej, GJ',     value: 1.4 },
        { name: 'Halol, GJ',     value: 2.8 },
        { name: 'Chakan, MH',    value: 3.6 },
        { name: 'Sri City, AP',  value: 1.9 },
        { name: 'Hosur, TN',     value: 3.1 }
      ]
    }
```

After this and Task 2/3's deletions, `market` should read:

```js
  market: {
    /* Each figure carries a `source`. Fill BOTH fields only when a real,
       checkable citation supports that exact number: `label` is what the
       reader sees ("CRISIL, Indian Hospitality Report, 2025"), `url` is where
       they can verify it. While `label` is empty the marker renders nothing
       and the Sources section stays hidden, so the site never shows a
       reference it cannot honour. Never cite a source that does not state
       the number it is attached to. */
  },
```

- [ ] **Step 2: Delete the Exhibit 02 section**

In `index.html`, delete the entire section (currently lines 175-210, from the `<!-- ===================== EXHIBIT 02 — SUPPLY GAP ===================== -->` comment through its closing `</section>`):

```html
<!-- ===================== EXHIBIT 02 — SUPPLY GAP ===================== -->
<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="label">Exhibit 02: supply</span>
      <h2>India is building factories faster than it is building beds.</h2>
      <p class="lede">
        PLI, Gati Shakti and the freight corridors have moved hundreds of thousands
        of manufacturing jobs into industrial estates. Organised hospitality did not
        follow.
      </p>
    </div>

    <div class="figure reveal">
      <div class="figure__head">
        <div class="figure__title">Organised hotel rooms per 1,000 industrial workers<span data-source="market.supplyGap.source"></span></div>
        <div class="figure__sub">Selected corridors, against the business-district benchmark.</div>
      </div>
      <div data-chart="supply-gap"></div>
    </div>

    <div class="split mt-3 reveal">
      <div class="prose">
        <p>Every corridor above runs at a fraction of the benchmark. That gap is not
        a forecast or a projection - it is the current state of the ground, and it is
        why an engineer flying into Dahej tonight will sleep in an unbranded lodge or
        commute from Vadodara.</p>
      </div>
      <div class="prose">
        <p>Supply gaps this wide usually close fast. This one has not, because
        building a hotel for factories requires you to want the least glamorous
        asset in hospitality. <strong>That reluctance is the moat.</strong></p>
      </div>
    </div>
  </div>
</section>

```

- [ ] **Step 3: Remove the `supplyGap` render call and its now-empty wrapper**

In `js/main.js`, after Task 3's Step 4, `renderAll()` should have this remaining block:

```js
    if (window.MevadCharts) {
      window.MevadCharts.supplyGap($('[data-chart="supply-gap"]'), D().market.supplyGap);
    }
```

Delete it entirely (both the `if` wrapper and the call — there's nothing else left inside it):

```js

```

(i.e. remove those 3 lines with nothing replacing them.)

- [ ] **Step 4: Remove the Hindi mirror of `market.supplyGap`**

In `data/lang-hi.js`, delete this block from inside `data.market` (currently lines 67-78 — this is also the last entry in `data.market`, so `market` becomes `market: {}` there too):

```js
      supplyGap: {
        unit: 'प्रति 1,000 औद्योगिक कर्मचारियों पर संगठित होटल कमरे',
        benchmark: { label: 'व्यावसायिक क्षेत्र मानक' },
        corridors: [
          { name: 'साणंद, गुज' },
          { name: 'दहेज, गुज' },
          { name: 'हालोल, गुज' },
          { name: 'चाकण, महा' },
          { name: 'श्री सिटी, आंध्र' },
          { name: 'होसुर, तमि' }
        ]
      }
```

- [ ] **Step 5: Remove the Exhibit 2 `ui` translation entries**

In `data/lang-hi.js`, delete this block (currently lines 335-346, the `/* Exhibit 2 */` comment through its last entry):

```js
    /* Exhibit 2 */
    'Exhibit 02: supply': 'प्रदर्श 02: आपूर्ति',
    'India is building factories faster than it is building beds.': 'भारत कारखाने बिस्तरों से तेज़ बना रहा है।',
    'PLI, Gati Shakti and the freight corridors have moved hundreds of thousands of manufacturing jobs into industrial estates. Organised hospitality did not follow.':
      'PLI, गति शक्ति और माल गलियारों ने लाखों विनिर्माण नौकरियाँ औद्योगिक क्षेत्रों में पहुँचा दीं। संगठित आतिथ्य पीछे नहीं आया।',
    'Organised hotel rooms per 1,000 industrial workers': 'प्रति 1,000 औद्योगिक कर्मचारियों पर संगठित होटल कमरे',
    'Selected corridors, against the business-district benchmark.': 'चुनिंदा गलियारे, व्यावसायिक क्षेत्र के मानक के मुकाबले।',
    'Every corridor above runs at a fraction of the benchmark. That gap is not a forecast or a projection - it is the current state of the ground, and it is why an engineer flying into Dahej tonight will sleep in an unbranded lodge or commute from Vadodara.':
      'ऊपर का हर गलियारा मानक के एक अंश पर चल रहा है। यह अंतर कोई पूर्वानुमान या प्रक्षेपण नहीं - यह ज़मीन की मौजूदा हालत है, और इसीलिए आज रात दहेज पहुँचने वाला इंजीनियर या तो बेनाम लॉज में सोएगा या वडोदरा से आना-जाना करेगा।',
    'Supply gaps this wide usually close fast. This one has not, because building a hotel for factories requires you to want the least glamorous asset in hospitality. <strong>That reluctance is the moat.</strong>':
      'इतने चौड़े आपूर्ति अंतर आमतौर पर जल्दी भर जाते हैं। यह नहीं भरा, क्योंकि कारखानों के लिए होटल बनाने का अर्थ है आतिथ्य की सबसे कम चमकदार संपत्ति चाहना। <strong>यही अनिच्छा हमारी खाई है।</strong>',

```

- [ ] **Step 6: Verify no leftover references**

Run: `grep -rn "market.supplyGap\|Exhibit 02\|data-chart=\"supply-gap\"\|MevadCharts" /Users/kunal/Downloads/Agentic/Websites/Mevad --include="*.html" --include="*.js"`

Expected: only the 4 `<script src="js/charts.js"></script>` tags and the `window.MevadCharts = {...}` definition in `js/charts.js` itself should show up (those are cleaned up in Task 5) — no calls into `MevadCharts.*` should remain in `js/main.js`.

- [ ] **Step 7: Verify in browser**

Reload `http://localhost:8080/`. Expected: page now flows Nav → Hero → Thesis → Demand engine → The asset → ... with no Exhibit 01 or Exhibit 02 sections in between, and no console errors (there will be a harmless "MevadCharts is defined but unused" — not an error, since `js/charts.js` is still loaded; Task 5 removes it).

- [ ] **Step 8: Commit**

```bash
git add data/projects.js index.html js/main.js data/lang-hi.js
git commit -m "Remove Exhibit 02 supply-gap chart — metric and corridor values are fabricated"
```

---

### Task 5: Delete the now-dead `js/charts.js` and its script tags

**Files:**
- Delete: `js/charts.js`
- Modify: `index.html:432`, `properties.html:121`, `invest.html:160`, `returns.html:125` (remove `<script src="js/charts.js"></script>`)

**Interfaces:**
- Consumes: confirmation from Task 4 that no code calls `window.MevadCharts.*` anymore.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Confirm charts.js has no remaining callers**

Run: `grep -rn "MevadCharts" /Users/kunal/Downloads/Agentic/Websites/Mevad/js/main.js /Users/kunal/Downloads/Agentic/Websites/Mevad/js/calculator.js /Users/kunal/Downloads/Agentic/Websites/Mevad/js/prefs.js 2>/dev/null`

Expected: no output. (If anything shows up, stop and investigate before deleting the file — do not delete `js/charts.js` if it's still called anywhere.)

- [ ] **Step 2: Delete the file**

```bash
git rm js/charts.js
```

- [ ] **Step 3: Remove the script tag from each of the 4 pages**

In `index.html`, delete:

```html
<script src="js/charts.js"></script>
```

In `properties.html`, delete the same line.

In `invest.html`, delete the same line.

In `returns.html`, delete the same line.

- [ ] **Step 4: Verify no leftover references**

Run: `grep -rln "charts.js\|MevadCharts" /Users/kunal/Downloads/Agentic/Websites/Mevad --include="*.html" --include="*.js"`

Expected: no output.

- [ ] **Step 5: Verify all 4 pages still load cleanly**

For each of `index.html`, `properties.html`, `invest.html`, `returns.html`: load `http://localhost:8080/<page>` and check the browser console for errors (specifically, no "MevadCharts is not defined" or 404 for `charts.js`).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Delete dead js/charts.js and its script tags — no chart calls it anymore"
```

---

### Task 6: Full-site verification pass

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Grep for every removed identifier across the whole site**

Run:

```bash
grep -rn "market\.headline\|market\.occupancy\|market\.supplyGap\|Exhibit 01\|Exhibit 02\|renderStats\|MevadCharts\|charts\.js\|statstrip\|data-chart=\"occupancy\|data-chart=\"supply-gap\"\|occ-table" /Users/kunal/Downloads/Agentic/Websites/Mevad --include="*.html" --include="*.js"
```

Expected: no output.

- [ ] **Step 2: Load the English site end to end**

Load `http://localhost:8080/`, hard-refresh. Confirm:
- Placeholder banner shows at the top.
- No stat tiles under the hero CTA buttons.
- Thesis section ends at "...shape beats peak." with no dangling chart reference.
- Page flows directly from Thesis into "The demand engine" section.
- No JS errors in the console.

- [ ] **Step 3: Load the Hindi site end to end**

Switch to Hindi (via whatever the site's language toggle is — check `js/prefs.js` / nav for the control). Confirm:
- No untranslated/missing-key fallback text appears where the deleted headline stats or exhibits used to be (there should simply be nothing there, not broken text).
- No JS console errors.

- [ ] **Step 4: Spot-check the other 3 pages**

Load `properties.html`, `invest.html`, `returns.html`. Confirm each loads without console errors (they never referenced the deleted market data, only `charts.js`, which Task 5 removed cleanly).

- [ ] **Step 5: Final review of `git log`**

Run: `git log --oneline -7`

Expected: 5 commits from this plan (Tasks 1-5) sitting on top of the previously committed design spec, each with a clear message.
