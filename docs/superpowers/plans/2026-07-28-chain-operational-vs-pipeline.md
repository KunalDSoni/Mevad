# Chain Operational-vs-Pipeline Grouping Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split "The Chain" property grid on `index.html` and `properties.html` into an "Operational now" block (Sanand alone) and a "Pipeline · future corridors" block (the other four), driven by each property's existing `status` field, and correct the homepage heading that currently implies all five are live.

**Architecture:** `renderProperties()` in `js/main.js` currently maps the full property list into one grid of cards. It changes to partition the list by `status === 'Operational'` and emit two labeled HTML blocks (live block full-width, pipeline block in the existing 3-column grid) into the same mount element. The two `<div data-render="properties">` wrapper elements in the HTML lose their `grid grid--3` classes since the renderer now owns internal layout. No data file schema changes — only two new `words` labels are added, in English and Hindi.

**Tech Stack:** Plain HTML/CSS/JS, no build step, no test runner. This is a static site — "testing" means opening the page in a browser and visually verifying, plus reading the generated HTML.

## Global Constraints

- No changes to `status` values or any numeric property data (per spec "Out of scope").
- No changes to card content/fields, the calculator, or any section other than "The Chain" / properties grid (per spec "Out of scope").
- No change to `properties.html` hero copy (per spec).
- No change to the unused `data-limit` attribute handling in `renderProperties` (per spec).
- Hindi translations live in `data/lang-hi.js`, keyed by the exact English source string in the `ui` map (for raw HTML copy) or mirrored under `data.words` (for JS-generated strings) — follow the existing pattern documented at the top of that file.
- `status` string values themselves are never translated (the calculator branches on them) — only their display text.

---

### Task 1: Add new label strings (English + Hindi)

**Files:**
- Modify: `data/projects.js` (the `words` block, ~line 26-43)
- Modify: `data/lang-hi.js` (the `data.words` block, ~line 23-40)

**Interfaces:**
- Produces: `D().words.chainLiveLabel` (string, "Operational now" / Hindi), `D().words.chainPipelineLabel` (string, "Pipeline · future corridors" / Hindi) — consumed by Task 2's `renderProperties`.

- [ ] **Step 1: Add the two new keys to `data/projects.js`**

In the `words: { ... }` object (currently ends with `placeholderNotice: '...'` around line 42), add two entries after `placeholderNotice`:

```js
    placeholderNotice: 'Preview build · every figure on this page is placeholder data, not a real offer',
    chainLiveLabel: 'Operational now',
    chainPipelineLabel: 'Pipeline · future corridors'
  },
```

(Only the two new lines are added; `placeholderNotice`'s existing line and the closing `},` are shown for placement context — don't duplicate them.)

- [ ] **Step 2: Add the matching Hindi keys to `data/lang-hi.js`**

In `data.words { ... }` (currently ends with `placeholderNotice: '...'` around line 39), add:

```js
      placeholderNotice: 'पूर्वावलोकन संस्करण · इस पृष्ठ का हर आँकड़ा काल्पनिक है, वास्तविक प्रस्ताव नहीं',
      chainLiveLabel: 'अभी परिचालन में',
      chainPipelineLabel: 'भविष्य के गलियारे'
    },
```

- [ ] **Step 3: Verify by loading the page**

Open `index.html` directly in a browser (`file://` path is fine, no server needed) and in the browser console run:

```js
window.MEVAD.words.chainLiveLabel
window.MEVAD.words.chainPipelineLabel
```

Expected: `"Operational now"` and `"Pipeline · future corridors"`. Then switch the site to Hindi (using its existing language toggle) and re-check `window.MevadPrefs.data().words.chainLiveLabel` returns the Hindi string.

- [ ] **Step 4: Commit**

```bash
git add data/projects.js data/lang-hi.js
git commit -m "Add chain live/pipeline label strings"
```

---

### Task 2: Split `renderProperties` into live/pipeline blocks

**Files:**
- Modify: `js/main.js:157-176` (the `renderProperties` function)

**Interfaces:**
- Consumes: `D().words.chainLiveLabel`, `D().words.chainPipelineLabel` (from Task 1); `D().properties` (array of property objects, each with `.status`, unchanged shape); `D().words.keys` (existing).
- Produces: `renderProperties(mount, limit)` — same signature as before, called from `renderAll()` at `js/main.js:322-326` with no changes needed there.

- [ ] **Step 1: Replace the function body**

Current code (`js/main.js:157-176`):

```js
  function renderProperties(mount, limit) {
    if (!mount) return;
    var list = limit ? D().properties.slice(0, limit) : D().properties;
    mount.innerHTML = list.map(function (p) {
      var live = p.status === 'Operational';
      return '<div class="card">' +
        '<div class="card__meta">' +
          '<span class="label">' + p.state + '</span>' +
          '<span class="chip' + (live ? ' chip--accent' : '') + '">' + p.status + '</span>' +
        '</div>' +
        '<h3>' + p.name + '</h3>' +
        '<p style="color:var(--text-2);font-family:var(--font-mono);font-size:.75rem;margin-bottom:.9rem">' +
          p.corridor + ' · ' + p.keys + ' ' + D().words.keys + ' · ' + p.opened + '</p>' +
        '<p>' + p.blurb + '</p>' +
        '<div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1.15rem">' +
          p.anchors.map(function (a) { return '<span class="chip">' + a + '</span>'; }).join('') +
        '</div>' +
      '</div>';
    }).join('');
  }
```

Replace with:

```js
  function propertyCard(p) {
    var live = p.status === 'Operational';
    return '<div class="card">' +
      '<div class="card__meta">' +
        '<span class="label">' + p.state + '</span>' +
        '<span class="chip' + (live ? ' chip--accent' : '') + '">' + p.status + '</span>' +
      '</div>' +
      '<h3>' + p.name + '</h3>' +
      '<p style="color:var(--text-2);font-family:var(--font-mono);font-size:.75rem;margin-bottom:.9rem">' +
        p.corridor + ' · ' + p.keys + ' ' + D().words.keys + ' · ' + p.opened + '</p>' +
      '<p>' + p.blurb + '</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1.15rem">' +
        p.anchors.map(function (a) { return '<span class="chip">' + a + '</span>'; }).join('') +
      '</div>' +
    '</div>';
  }

  function renderProperties(mount, limit) {
    if (!mount) return;
    var list = limit ? D().properties.slice(0, limit) : D().properties;
    var live = list.filter(function (p) { return p.status === 'Operational'; });
    var pipeline = list.filter(function (p) { return p.status !== 'Operational'; });

    var html = '';
    if (live.length) {
      html += '<div class="chain-group">' +
        '<span class="label label--accent chain-group__label">' + D().words.chainLiveLabel + '</span>' +
        '<div class="grid grid--live">' + live.map(propertyCard).join('') + '</div>' +
      '</div>';
    }
    if (pipeline.length) {
      html += '<div class="chain-group">' +
        '<span class="label chain-group__label">' + D().words.chainPipelineLabel + '</span>' +
        '<div class="grid grid--3">' + pipeline.map(propertyCard).join('') + '</div>' +
      '</div>';
    }
    mount.innerHTML = html;
  }
```

- [ ] **Step 2: Add supporting CSS**

In `css/main.css`, near the existing `.grid--3 { ... }` / `.grid--2 { ... }` rules (~line 698-704), add:

```css
.chain-group + .chain-group { margin-top: clamp(2rem, 4vw, 3rem); }
.chain-group__label { display: block; margin-bottom: 1.25rem; }
.grid--live { grid-template-columns: 1fr; }
```

Place this immediately after the existing `@media (max-width: 900px) { .grid--3 { ... } }` block so it reads as part of the same grid-variants group.

- [ ] **Step 3: Update the HTML mounts to drop `grid grid--3`**

`index.html` (~line 273), change:

```html
    <div class="grid grid--3 reveal" data-render="properties"></div>
```
to:
```html
    <div class="reveal" data-render="properties"></div>
```

`properties.html` (~line 51), change:

```html
    <div class="grid grid--3" data-render="properties"></div>
```
to:
```html
    <div data-render="properties"></div>
```

- [ ] **Step 4: Manual verification in browser**

Open `index.html` in a browser, scroll to "The Chain" section. Expected:
- A single full-width card for Mevad Sanand under an "Operational now" label, with an accented "Operational" chip.
- Below it, a 3-column grid of the other four properties under a "Pipeline · future corridors" label, each showing its own status chip (`Announced` / `Under construction`, not accented) and "(expected)" opening year.
- Open `properties.html` directly and confirm the same two-block structure appears there too.
- Resize the browser to mobile width and confirm the pipeline grid collapses to 1 column (existing `@media` rule at `css/main.css:701-704` still applies since `.grid--3` class is still used inside the renderer's output).

- [ ] **Step 5: Commit**

```bash
git add js/main.js css/main.css index.html properties.html
git commit -m "Split chain property grid into operational and pipeline groups"
```

---

### Task 3: Rewrite the homepage "Chain" heading

**Files:**
- Modify: `index.html:266-271` (section head inside `<section id="chain">`)
- Modify: `data/lang-hi.js:359` (the `ui` map entry keyed by the old heading text)

**Interfaces:**
- Consumes: none new.
- Produces: none consumed by later tasks (final task in this plan).

- [ ] **Step 1: Update the heading text in `index.html`**

Current (`index.html:265-271`):

```html
    <div class="section-head reveal">
      <span class="label">The chain</span>
      <h2>Five corridors. One operating standard.</h2>
      <p class="lede">
        Each property is underwritten against the industrial base around it - the
        count of anchor employers, the sector mix, and the distance to the gate.
      </p>
    </div>
```

Change the `<h2>` line only:

```html
    <div class="section-head reveal">
      <span class="label">The chain</span>
      <h2>One hotel open. Four more corridors underwritten.</h2>
      <p class="lede">
        Each property is underwritten against the industrial base around it - the
        count of anchor employers, the sector mix, and the distance to the gate.
      </p>
    </div>
```

- [ ] **Step 2: Update the Hindi translation key in `data/lang-hi.js`**

Current (`data/lang-hi.js:359`):

```js
    'Five corridors. One operating standard.': 'पाँच गलियारे। एक संचालन मानक।',
```

Replace with a translation of the new English string, keyed by the new exact text (the `ui` map is keyed by source-string match, so the old key must be replaced, not kept alongside):

```js
    'One hotel open. Four more corridors underwritten.': 'एक होटल परिचालन में। चार और गलियारे प्रगति पर।',
```

- [ ] **Step 3: Manual verification**

Open `index.html`, confirm the "Chain" section heading now reads "One hotel open. Four more corridors underwritten." Switch to Hindi via the site's language toggle and confirm the heading switches to the Hindi text above (the `ui` map replaces text nodes matching the English source, per the existing i18n mechanism documented at the top of `data/lang-hi.js`).

- [ ] **Step 4: Commit**

```bash
git add index.html data/lang-hi.js
git commit -m "Rewrite chain heading to reflect one live property"
```
