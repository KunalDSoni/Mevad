# Remove fabricated market data (headline stats, Exhibit 01, Exhibit 02)

## Background

`data/projects.js` documents its own sourcing rule: every figure in `market`
carries a `source: { label, url }`, and the rule is explicit — "Fill BOTH
fields only when a real, checkable citation supports that exact number...
Never cite a source that does not state the number it is attached to."

Every figure under `market` currently has an empty source, and investigation
confirmed none of them can be honestly filled in:

- **`market.headline`** (4 stat tiles) — "first industrial hotel chain,"
  "40+ anchor factories within 5km," "92% weekday demand," "0% OTA
  commission" are either unverifiable claims or would-be site-audit facts
  with nothing behind them yet.
- **`market.occupancy`** (Exhibit 01) — a month-by-month industrial-vs-leisure
  occupancy comparison. No published source splits occupancy this way; the
  values are invented. Real, citable data (HVS Anarock 2025) exists only as a
  coarse national figure (~63–65% annual, dips off-season, ~72–74% peak in
  November) with no industrial/leisure split — not enough to support the
  chart's argument.
- **`market.supplyGap`** (Exhibit 02) — "organised hotel rooms per 1,000
  industrial workers" by corridor (Sanand, Dahej, Halol, Chakan, Sri City,
  Hosur) plus a "business-district benchmark" of 24. This metric does not
  exist in any public source; only qualitative confirmation that these
  corridors are under-hotelled was found (no citable numbers).

Additionally, `PLACEHOLDER_MODE` is currently `false` even though the file's
own header states all values are placeholders and the banner should show
while that's true — the banner is silently off while fake data is live.

Separately, `properties[].occupancy` / `.adr` (calculator base-case
assumptions) are out of scope: they are modeling inputs, not market-research
claims, and are already labeled honestly via the site's disclaimer
(`data/projects.js:401`, "illustrative projections based on stated
assumptions").

## Decision

Per direction from the site owner: unverifiable/fabricated figures are
removed outright rather than kept illustrative-but-labeled or backfilled
with off-topic real numbers. Confirmed only `index.html` references these
exhibits (`properties.html`, `invest.html` do not).

## Changes

### 1. `data/projects.js`
- Set `PLACEHOLDER_MODE: true`.
- Delete the `market.headline` array (all 4 entries).
- Delete `market.occupancy`.
- Delete `market.supplyGap`.
- Leave `market: {}` structurally valid even if now empty of these keys (no
  other code outside the deleted call sites reads `market.*`).

### 2. `index.html`
- Remove the headline-stats render mount and its surrounding markup (wherever
  `data-render="headline"` or equivalent lives).
- Remove the "EXHIBIT 01 — OCCUPANCY" `<section>` (`index.html:127-173`).
- Remove the "EXHIBIT 02 — SUPPLY GAP" `<section>` (`index.html:175-210`).
- Adjust the prose immediately before Exhibit 01 (`index.html:118-123`, "The
  chart below is the whole argument in one picture") so it doesn't dangle
  now that there's no chart directly below it.
- Adjust the transition into the Demand section (right after the deleted
  Exhibit 02) so the page still reads as one continuous argument without an
  abrupt jump.

### 3. `js/main.js`
- Remove the render calls / wiring for `headline`, `occupancy` chart,
  `occupancy-table`, and `supply-gap` chart (the calls into
  `window.MevadCharts.occupancy(...)` and `window.MevadCharts.supplyGap(...)`
  and their headline-stat equivalent).
- Leave the generic `sourceAt` / citation-numbering machinery in place — it's
  still used by other sourced figures on the site (unaffected).

### 4. `js/charts.js`
- Remove the now-dead `occupancy`, `table`, and `supplyGap` chart-rendering
  functions once nothing calls them.

### 5. `data/lang-hi.js`
- Remove the Hindi translation entries tied to the deleted headline stats,
  Exhibit 01, and Exhibit 02 strings (around `lang-hi.js:321-336` and any
  headline-stat translation entries).

## Out of scope

- `properties[].occupancy` / `.adr` and all calculator behavior — these are
  labeled modeling assumptions, not market claims, and are untouched.
- No new real citations are being added in this pass (the owner chose
  removal over backfilling with coarser real numbers, given the mismatch in
  specificity).

## Testing

- Load `index.html` locally (`serve.sh`) and confirm: placeholder banner
  shows, headline-stats section and both exhibits are gone, no console
  errors, page flow reads cleanly across the removed sections.
- Toggle to Hindi and confirm no broken/missing-string fallback text appears
  where the deleted entries used to be.
- Grep for leftover references to `headline`, `market.occupancy`,
  `market.supplyGap`, `Exhibit 01`, `Exhibit 02` across `index.html`,
  `js/main.js`, `js/charts.js`, `data/lang-hi.js` to confirm nothing dangling
  remains.
