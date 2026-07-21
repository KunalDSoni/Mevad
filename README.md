# Mevad — India's First Industrial Hotel Chain

Investor-facing site. Static HTML/CSS/JS, no build step, no dependencies.

## Run it

```sh
./serve.sh          # http://localhost:8080
```

Opening `index.html` directly from the filesystem also works — data is loaded via
a `<script>` tag rather than `fetch`, specifically so there is no CORS problem.

## Pages

| File | What it does |
|---|---|
| `index.html` | The pitch: thesis, occupancy and supply-gap charts, demand, asset, chain, calculator, structures, process, FAQ |
| `properties.html` | The chain + the four site-selection tests |
| `returns.html` | Standalone calculator + how to read the model |
| `invest.html` | Four structures compared, process, compliance, FAQ |

## Changing the numbers

**Every figure on this site comes from `data/projects.js`.** Nothing is hardcoded
in the HTML. To go live:

1. Replace the placeholder values in `data/projects.js` with real, counsel-approved figures.
2. Set `PLACEHOLDER_MODE: false` to remove the striped preview banner.
3. That's it — do not edit the HTML.

Current values are deliberately synthetic. While `PLACEHOLDER_MODE` is `true`, a
banner across every page says so, so nothing can be mistaken for a real offer.

### Things that still need real input

- Property data, pricing, ADR/occupancy, return percentages
- Brand assets — logo, renders, photography (the site currently uses no images)
- Third-party service URLs in `data/projects.js` → `brand`:
  `schedulingUrl` (Calendly/Zoho Bookings), `kycUrl`, `esignUrl`
- Contact email and phone

## How the calculator works

`js/calculator.js` models all four structures against the same property and amount.

- **IRR on a full cashflow**, not a headline yield: capital out at year zero, each
  year's payout in sequence, and sale of the holding at the end of the horizon.
- **Construction delay is applied.** `Under construction` = 2 years to opening,
  `Announced` = 3. No payout before opening, including on the assured structure.
- **Stabilisation ramp** of 60% then 85% of stabilised performance in the first two
  years after opening.
- **The SPV** is modelled on portfolio averages, but still responds to the sliders
  as a proportional shift from the selected property's baseline — otherwise one
  card would sit frozen while the other three moved.

The placeholder shares are tuned so the narrative is actually true: revenue share
leads in the base case, and dragging occupancy to 40% inverts the ranking so the
assured return wins decisively. **If you change `ownerShare` or `assured` in
`data/projects.js`, re-check that this still holds** — the site's copy on the
returns and invest pages explicitly promises the inversion.

## Language and theme

Both toggle from the nav, persist in `localStorage`, and default to **English +
dark**. The controls are injected by `js/prefs.js` rather than authored into four
HTML files, so they can never drift between pages.

Hindi lives entirely in `data/lang-hi.js`, in two parts:

- `data` — mirrors the shape of `projects.js` and is deep-merged over it. Only
  translated fields appear; **no number is ever repeated**, so `projects.js` stays
  the single source of truth for every figure.
- `ui` — maps normalised English page copy to Hindi, keyed by the source string
  itself. That is why no HTML needed key annotations, and why a missing entry
  falls back to English instead of rendering a raw key.

`status` is deliberately **not** translated: the calculator compares it against
`'Operational'` / `'Under construction'` to decide construction delay. Its display
text is translated through the `ui` map instead. Translating that field would
silently break the payout timing.

## Colour

Two-tone, from the brand deck: deep teal `#1B3A38` and cream `#FDFDF1`. Dark theme
is cream-on-teal, light is teal-on-cream, and the accent flips with them —
hierarchy comes from weight, scale and surface rather than a third hue.

Light mode is *selected*, not inverted. Text-on-accent is pinned to `--on-accent`
so it never follows the theme, and the chart palette was re-validated against the
cream surface (`#8f6b12` x `#31699e`) because the dark steps fail contrast there.

## Charts

Hand-rolled SVG in `js/charts.js`, no library. The two-series palette
(`#c98500` industrial × `#3987e5` leisure) was validated against the teal surface
`#1B3A38`: all-pairs CVD ΔE 27.4, normal-vision ΔE 30.7, both above threshold.
Light mode uses its own validated pair — see Colour above.
Series are direct-labelled as well as coloured, and the occupancy chart has a
table view, so identity is never colour-alone.

## Compliance

Expected-return figures and the assured-return structure sit near SEBI/RERA
territory. All calculator output is framed as illustrative and the full disclaimer
(`data/projects.js` → `legal.disclaimer`) appears on the home, returns and invest
pages. **Have counsel review all copy before launch.**

## Verified

Run against the live server at `localhost:8080`, not just as files:

- All 11 routes return 200; no 404s in the server log.
- Calculator executes and renders over HTTP.
- **Driven, not just loaded.** Clicked the scenario toggle, dragged the occupancy
  slider to 40%, and switched to an under-construction property in a live page.
  Base case: revenue share leads at 13.8%. At 40% occupancy: assured return wins
  at 12.8% against revenue share's 10.4% — the ranking inverts, as the copy claims.
  Chakan correctly shows first payout in Year 3. Zero JS errors throughout.
- Calculator maths independently checked in Node across operational /
  under-construction / announced properties and 10- and 20-year horizons.
- Language and theme switching driven in a live page: EN→HI translates headlines,
  nav, stat labels, FAQ, chips and chart series labels; theme flips the body to
  cream; switching back restores English fully. Zero JS errors.
- No horizontal overflow on any page (`scrollWidth === clientWidth`).

- **Mobile verified at a true 390x844** via CDP device emulation
  (`Emulation.setDeviceMetricsOverride`), which is the only way past headless
  Chrome's 500px minimum window width. `scrollWidth === clientWidth === 390` on
  all four pages, no overflowing elements, nav collapsed to the hamburger.
- **Translation coverage swept programmatically** across all four pages x both
  languages: every text element checked for the wrong script. 8/8 clean — full
  Hindi coverage, and English fully restored on switching back.

**Caveat:** the site has only ever been rendered in Chrome (headless and
emulated). Safari and Firefox are untested, as is any real physical device.
