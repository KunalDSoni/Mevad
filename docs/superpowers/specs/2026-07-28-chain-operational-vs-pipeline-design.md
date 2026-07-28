# The Chain: Operational vs Pipeline grouping

## Problem

"The Chain" section on `index.html` and the standalone `properties.html` page
both render all five properties as one uniform grid. Only Mevad Sanand is
`status: 'Operational'`; the other four (Dahej, Chakan, Sri City, Hosur) are
`'Announced'` or `'Under construction'`. The current heading on `index.html`
("Five corridors. One operating standard.") and the flat grid both read as if
all five corridors are live today, which is not accurate.

## Goal

Visually and textually separate the one live property from the four future
ones, on both pages, without changing the underlying data model.

## Data layer

No changes. `status` and `opened` (with a `(expected)` suffix for future
properties) already carry everything needed per property in
`data/projects.js`.

## Rendering (`js/main.js`, `renderProperties`)

Split the property list by status instead of mapping it flat:

- `live = list.filter(p => p.status === 'Operational')`
- `pipeline = list.filter(p => p.status !== 'Operational')`

Render two labeled blocks into the mount:

1. A `label label--accent` heading (`words.chainLiveLabel`, "Operational
   now") above the live card(s). These render full-width/alone, not
   squeezed into the 3-column grid, so the section reads as featured. If
   `live` is empty, this block renders nothing.
2. A `label` heading (`words.chainPipelineLabel`, "Pipeline · future
   corridors") above the remaining cards, in the existing 3-column grid.
   Card markup is unchanged — same status chip, same "(expected)" opening
   date. If `pipeline` is empty, this block renders nothing.

The split is driven purely by `status`, not by property id — if a second
property goes operational later, it automatically joins the live block.

## Markup changes

`index.html` and `properties.html` both currently have:

```html
<div class="grid grid--3" data-render="properties"></div>
```

The `grid grid--3` classes move off this wrapper, since `renderProperties`
now owns its own internal layout (one section for live, one grid for
pipeline):

```html
<div data-render="properties"></div>
```

`index.html` keeps its `reveal` class on that div if present.

## Copy changes

`index.html`, "The Chain" section head only:

- Heading: `"Five corridors. One operating standard."` →
  `"One hotel open. Four more corridors underwritten."`
- Lede: unchanged — the underwriting-methodology sentence is still accurate
  for all five properties.

`properties.html` hero copy is unchanged; it doesn't claim anything false
about how many properties are live, only its card grid restructures.

## New labels

Add to `data/projects.js` `words` block, with Hindi equivalents in
`data/lang-hi.js`:

- `chainLiveLabel: 'Operational now'`
- `chainPipelineLabel: 'Pipeline · future corridors'`

## Out of scope

- No change to card content/fields, calculator, or any other section.
- No change to `properties.html` hero copy.
- No change to the unused `data-limit` attribute handling in
  `renderProperties`.
