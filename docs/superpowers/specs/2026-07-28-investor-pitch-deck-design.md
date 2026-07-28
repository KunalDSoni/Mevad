# Mevad Investor Pitch Deck

**Date:** 2026-07-28
**Status:** Approved, in build

## What this is

A standalone, self-contained HTML slide deck for raising capital for Hotel Mevad
Palace (Sanand GIDC, Gujarat) and its Phase-2 expansion. Separate from the existing
placeholder-driven marketing site (`index.html`, `invest.html`, etc.) — this deck
carries real business figures and is meant to be presented live, browsed, or
exported to PDF for HNIs, family offices, angel investors and PE.

## Positioning

India's first scalable Industrial Business Hotel chain. Premium business hotels for
industrial zones — not luxury, not budget lodges. Target guest: engineers,
supervisors, plant managers, vendor teams, auditors, consultants, long-stay
contractors. Closing line: *"Building the Hospitality Infrastructure Behind India's
Manufacturing Revolution."*

## Architecture

New top-level directory, isolated from the main site:

```
pitch-deck/
  index.html
  css/deck.css
  js/deck.js       -- slide rendering, keyboard/click/swipe nav, fullscreen
  js/charts.js      -- hand-rolled SVG charts (bar, waterfall, timeline, dot-map)
  data/deck.js      -- every number and label on every slide
```

No build step, no dependencies — matches the rest of the repo. `data/deck.js` is
the single source of truth; no figure is hardcoded into `index.html`.

Print stylesheet (`@media print`) renders one slide per page for clean PDF export
via the browser's print dialog — this is the deck's path to a shareable PDF
without a separate PPTX build.

## Visual system

Reuses the main site's existing theme rather than introducing a new one:

- **Palette:** deep teal `#1B3A38` / cream `#FDFDF1`, same dark-default / light-toggle
  behavior as the main site, accent flips with theme.
- **Type:** grotesque for text, monospace with tabular numerals for all figures —
  same as the main site.
- **Motifs:** grid rules, measurement ticks, blueprint annotation — same
  engineering-drawing language, extended to slide format (large numerals, thin
  rule dividers, one idea per slide, no walls of text).
- Reuses `css/main.css` custom properties from the main site directly where
  possible (import or copy the variable block) so the two never drift out of sync.

## Slide sequence (24 slides)

1. Cover — company, vision line, closing statement seeded here
2. The problem — industrial India's accommodation gap
3. Who needs it — engineers, auditors, consultants, installation teams
4. What's currently available — old / inconsistent / tourist-oriented hotels
5. Our solution — Premium Business Hotels for Industrial India
6. Target guest profile
7. What each hotel includes — amenities grid
8. Proof point — Hotel Mevad Palace today (real current-hotel figures)
9. Why Sanand — GIDC scale, anchor companies
10. Business model — revenue streams (8 current + 2 future)
11. Phase 1 — 21 → 47 rooms (timeline graphic)
12. Future — G+2 provision, 94+ rooms
13. Expansion roadmap — Changodar, Becharaji, Halol, Dahej, Vithalapur, Pune,
    Hosur, Sriperumbudur (dot-map diagram)
14. Vision — India's leading Industrial Business Hotel chain
15. Investment model — Capital Partner structure, ₹5L minimum, proportional
    ownership
16. Investor benefits — cash flow, appreciation, portfolio growth, wealth creation
17. Governance — what investors receive
18. Governance — what investors don't control; what requires investor approval
19. Management fee — 20% of distributable profit, waterfall example with real
    numbers
20. Financials — project cost, revenue, EBITDA, ROI, stated assumptions (real,
    estimated figures — see Financial data below)
21. Financial trend chart — monthly P&L trajectory (Nov'23–Jun'26), reported,
    unscaled
22. Why invest — summary grid
23. Long-term vision — 50+ hotels, national brand, exit paths (REIT, IPO,
    strategic sale, PE acquisition)
24. The ask — investment ask, use of funds, contact info, closing statement

## Financial data — provenance and scaling

Source: a real spreadsheet from one founder director, covering entities
`Mewad-2`, `Mewad-2 Extra Room`, `Mewad-3`, `Mewad-3 Shade Work Exp`, and
`Scrap Business`. The director's data reflects a 20% share (Mewad-2 rows) and a
30% share (Mewad-3 rows) of the real totals. For this deck, everything maps onto
a single entity — **Mevad Sanand Hotel** — with Mewad-2 (+Extra Room) as the
current, operating hotel and Mewad-3 (+Shade Work Exp) as Phase-2. `Scrap
Business` is excluded as unrelated to the hotel.

Scaling: Mewad-2 rows × 5 (1 ÷ 0.20), Mewad-3 rows × 3.33 (1 ÷ 0.30), to produce
100%-entity figures.

| | Current hotel (×5) | Phase-2 (×3.33) | Combined |
|---|---|---|---|
| Investment | ~₹1.52Cr | ~₹3.63Cr | **~₹5.15Cr** |
| Net profit (life-to-date) | ~₹1.13Cr | ~₹1.14Cr | **~₹2.27Cr** |
| Outstanding | ~₹39.3L | ~₹2.49Cr | **~₹2.88Cr** |

**Every scaled figure carries a visible footnote**: *"Estimated at 100% based on
director's reported ownership share (20% / 30%); pending audited confirmation."*
This is not optional — these numbers are extrapolated from a partial share, not
verified totals, and the deck must not present an estimate as an audited fact.

The monthly P&L trend (slide 21) is shown **unscaled**, labeled "reported, one
director's share" — it illustrates trajectory, not a claimed total, so scaling it
would misrepresent a time series as something it isn't.

## Compliance note

Same territory as the main site: return figures and capital-partner structure
sit near SEBI/RERA-adjacent framing. All financial figures are marked illustrative
or estimated as appropriate; nothing is presented as an audited number. Final
copy requires review by the client's legal counsel before this is used with
investors.

## Out of scope

- No changes to the existing site (`index.html`, `data/projects.js`, etc.) —
  this deck is fully separate.
- No PPTX export in this pass — HTML/print-to-PDF only, matching the accepted
  format choice.
- No real photography/renders — the deck uses the same no-images, motif-driven
  visual language as the main site until real assets exist.
