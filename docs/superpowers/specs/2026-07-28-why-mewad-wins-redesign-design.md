# "Why Hotel Mewad Wins" Section Redesign

## Context

The `#why-wins` section on `index.html` (lines 104–138) currently presents the "unglamorous but defensible" argument as: headline + lede paragraph → a `split` block (property-spec table on the left, one prose paragraph on the right) → a 6-card feature grid. The core idea — corporate demand doesn't photograph well, but it's exactly why the anchor plant signs an annual rate agreement — is strong, but it's diluted by a spec table that reads like a data-room sheet and a feature grid that overlaps with content elsewhere on the page.

## Goal

Restructure the section around an explicit contrast: the unglamorous guest-facing realities vs. the commercial outcome they produce, with the property specs repositioned as evidence for that outcome rather than a floating fact sheet.

## Copy

- **Headline**: unchanged — "Built for the guest who arrives at 2am." It's the sharpest line in the section.
- **Lede**: tightened version of the existing paragraph, kept as the trade-off framing: unglamorous inputs → the one output that matters (the rate agreement). Existing text is close; light edit only.

## Layout

Replace the current `.split` (figure + prose) block with a two-column contrast block, reusing the existing `.split` CSS (no new components):

- **Left column — "What a guest sees"**: a plain, unstyled text list (not cards) of the unglamorous realities — 2am arrivals, shift-timed kitchen hours, three-shirt six-month stays, industrial laundry. Deliberately spare styling to reinforce "this doesn't photograph well."
- **Right column — "What a plant signs"**: the commercial outcome — annual rate agreement, single-PO billing, GST-clean invoicing, repeat occupancy — followed immediately by the existing property-spec table (`asset.specs`) underneath, repositioned as supporting evidence rather than a standalone figure.

Below the two-column block, keep the feature card grid but trim from 6 cards to 3, keeping the most concrete and least redundant: shift-aligned kitchens, transport desk, corporate contracting. Drop laundry, room-build, and meeting-infrastructure cards since their substance now lives in the left/right columns.

## Data changes

- `data/projects.js` → `asset` object: restructure `features` conceptually — repurpose existing copy into a `guestSide` list, a `plantSide` list, and a trimmed `features` array (3 items), reusing existing phrasing where possible rather than inventing new claims. `specs` array is unchanged in content, only repositioned in the DOM.
- `data/lang-hi.js` → mirror the same restructuring for the Hindi `asset` object, translating any new/reworded copy consistently with existing tone.
- `js/main.js`: update `renderAssetSpecs`/`renderAssetFeatures` (or add a small `renderAssetContrast` render function) to emit the new two-column markup, and `index.html` `#why-wins` markup updates to match.

## Out of scope

No new CSS components, no changes to other sections, no changes to the underlying claims/data (build times, keys, percentages) — only how they're organized and worded.
