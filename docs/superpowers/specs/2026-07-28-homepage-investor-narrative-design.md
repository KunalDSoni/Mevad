# Homepage Investor Narrative — Design

## Goal

Rewrite `index.html` so scrolling it feels like reading an institutional
investor pitch deck for **Mewad Business Hotels**, not browsing a hotel
website. Visual identity (colors, type, layout system, nav style) is
unchanged — only content, information hierarchy, storytelling, data
visualization, and scroll animation improve.

Positioning to hold throughout: **Mewad Business Hotels** is the company.
**Hotel Mewad, Sanand** is its first proven, operating asset — not the
business itself. Every section that names "Mewad" must make clear which of
the two it means.

## Non-goals

- No redesign of color palette, typography, or the `.section` / `.wrap` /
  `.reveal` / `.grid` / `.split` / `.figure` / `.timeline` component system
  in `css/main.css`. New visuals are built from these primitives.
- `properties.html`, `invest.html`, `returns.html` are unchanged. They stay
  linked from CTAs as deep-dive pages (calculator, structures, per-property
  detail).
- `pitch-deck/` (the standalone slide-deck app with real Mewad-2/Mewad-3
  figures) is unchanged. The closing CTA links to it for investors who want
  the full detailed deck.
- No fabricated revenue, occupancy, or projection figures. Only the real
  figures given below are presented as historical fact; everything else
  needing a number is an explicit, commented placeholder.
- No new JS libraries/frameworks and no mapping API. Charts, counters, and
  the expansion map are hand-built from SVG/CSS, extending the existing
  `.reveal` IntersectionObserver pattern already in `js/main.js`.

## Real figures to use (historical, not projections)

- Total historical capital deployed: **~₹1.49 Cr**, across five categories:
  Hotel Mewad-2, additional rooms, Hotel Mewad-3, infrastructure
  improvements, supporting business assets.
- Historical operating profit generated: **~₹57.37 Lakhs**.
- Hotel Mewad, Sanand: operating and profitable today (real anchor fact
  already established in this project's `pitch-deck/` data).
- No monthly time-series, occupancy %, ADR, ROI, or EBITDA figures were
  provided — these render as clearly-marked placeholders (dashed border /
  "illustrative — figure pending" tag) with an HTML comment
  `<!-- REPLACE: ... -->` at the exact insertion point, so the site can be
  built and reviewed before the real numbers arrive. Same convention as
  `PLACEHOLDER_MODE` in `pitch-deck/data/deck.js`.

## Data architecture

All new slide copy and figures live in `data/projects.js` (extending the
existing `window.MEWAD`-style single-source-of-truth object), not hardcoded
in `index.html`. `js/main.js` gains one `data-render="..."` handler per new
component, following the existing pattern used for `demand`, `properties`,
`journey`, `faq`.

## Section-by-section (replaces current index.html sections)

1. **Hero** — Headline "Hotel Mewad, Sanand", subhead "The Flagship Property
   of Mewad Business Hotels", tagline "Building the Hospitality
   Infrastructure Behind India's Manufacturing Revolution." Three CTAs: View
   Performance (→ #performance), Our Story (→ #story), Become a Capital
   Partner (→ invest.html).

2. **The Story** (`#story`, new) — Why Hotel Mewad was built, why Sanand, why
   industrial travellers, told as narrative beats, not paragraphs of prose.

3. **The Opportunity** (`#demand`, rebuilt) — Manufacturing growth →
   industrial corridors → business travel → corporate accommodation → long
   stay demand, as an infographic. Reuses the existing `demand` render/data
   (six guest personas) reframed with investor-facing headline copy.

4. **Why Mewad Wins** (rebuilt from current "asset" section) — Corporate
   customers, location, repeat business, operational efficiency, asset
   ownership, long-term demand. Reuses `asset-specs` / `asset-features`
   render pattern.

5. **Proof** (new) — Styled placeholder photo frames labeled Reception /
   Rooms / Restaurant / Parking / Lobby, each with
   `<!-- REPLACE: photo -->`. Google Reviews and guest-testimonial
   placeholder cards alongside.

6. **Performance** (`#performance`, new — the dashboard slide) — Two
   count-up hero stats: Capital Deployed (₹1.49 Cr) and Operating Profit
   Generated (₹57.37 L). A capital-deployment breakdown chart across the
   five real categories (Mewad-2, rooms, Mewad-3, infra, other assets)
   totaling ₹1.49 Cr. A monthly-operating-performance chart shell wired to a
   placeholder data array with `<!-- REPLACE: monthly figures -->`. Caption:
   "Figures represent actual historical operating performance, not a
   projection."

7. **Growth Journey** (new) — Animated vertical timeline (reusing
   `.timeline` styles from the current `journey` section): Hotel Mewad →
   Expansion → Additional Rooms → Hotel Mewad-3 → Current Operations →
   Future Growth.

8. **Business Model** (new) — Animated step-chain diagram: Capital → Build →
   Operate → Generate Cash Flow → Expand → Repeat. Sequential reveal on
   scroll.

9. **Capital Allocation** (new) — Flow diagram using the same five real
   capital-deployment categories as building blocks: Capital Invested →
   Assets Created → Operating Profit Generated → Expansion → More Assets →
   Future Growth. Diagram, not a table.

10. **Expansion Vision** (`#chain`, rebuilt) — Stylized SVG mini-map of
    Gujarat/Western India with sequentially-animated pinned dots: Hotel
    Mewad (Sanand) → Halol → Dahej → Changodar → Pune → "Industrial
    Hospitality Platform." Existing `properties` data/render feeds a
    companion list beside the map.

11. **Investment Philosophy** (new) — Capital Partners, professional
    management remains responsible for operations, transparent governance,
    long-term wealth creation.

12. **Why Invest** (rebuilt, consolidating current "thesis"/versus content)
    — Real business, real assets, real customers, recurring cash flow,
    manufacturing growth, scalable model.

13. **Founder Vision** (new) — "Every great hospitality company started with
    one hotel. Ours is Hotel Mewad."

14. **Closing** (rebuilt CTA band) — "Hotel Mewad, Sanand — The First
    Chapter of Something Much Bigger. Built in Sanand. Designed for
    Industrial India. Built to Scale." Three CTAs: Schedule Meeting
    (external scheduling link placeholder, same pattern as
    `brand.schedulingUrl`), Download Investment Memorandum (placeholder
    link — no PDF exists yet), Become a Capital Partner (→ invest.html).

FAQ, sources, and legal-disclaimer sections stay structurally as-is with
copy adjusted to the investor tone established above.

## New visual components (built from existing CSS primitives)

- **Sticky scroll-progress indicator** — fixed slide counter + progress bar
  using existing nav color tokens.
- **Count-up number animation** — IntersectionObserver-triggered, added as a
  variant of the existing `.reveal` mechanism; reused for Performance stats.
- **Capital-deployment breakdown chart** and **monthly-trend chart** — small
  hand-built SVG bar/line charts, no charting library, styled with the
  existing `--series-*` chart color tokens.
- **Animated step-chain diagram** — CSS/SVG horizontal chain with staggered
  reveal, for Business Model and Capital Allocation slides.
- **SVG mini-map** — flat, illustrative (not geographically precise)
  Gujarat/Western India outline with animated pins.
- **Placeholder photo grid** — labeled frames with dashed borders and
  `<!-- REPLACE: photo -->` comments.

## Animation approach

Extend the existing `.reveal` IntersectionObserver pattern already driving
fade/slide-in in `js/main.js`. Add count-up, progress-bar, and
staggered-sequence variants to that same mechanism rather than introducing a
new animation library, so all scroll motion stays on one code path.

## Testing / verification

No automated test suite exists for this static site. Verification is
manual: serve locally (`./serve.sh` or equivalent), scroll through all 14
sections in both light and dark theme (the CSS defines both), confirm
counters/charts/timeline/map animate correctly, confirm every placeholder
is visually distinct and comment-marked, and confirm cross-links to
properties/invest/returns/pitch-deck resolve.
