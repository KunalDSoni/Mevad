# UI Roadmap & Backlog

Scaled to a 4-page vanilla-JS marketing/investment site. The original
brief's "Dashboard" and "AI Components" phases are dropped — this site has
neither. Phases are ordered by dependency, not calendar time; each is small
enough to ship and verify independently.

## Phase 1 — Foundation

Add the two lowest-risk libraries and the shared stagger/reduced-motion
infrastructure everything else depends on.

- Load Motion (deferred module) on all 4 pages
- Load Rough Notation (deferred module) only where used
- Build one shared stagger helper generalizing the existing
  `chain-diagram__step` pattern (`js/main.js:220-231`), so card grids can
  reuse it instead of each getting bespoke code
- Add a `prefers-reduced-motion` check helper used by every new JS-driven
  animation (see `performance-guide.md` rule 4)

## Phase 2 — Landing page (index.html)

- Staggered hero entrance (eyebrow → h1 → lede → CTA → stat strip)
- Apply the Phase 1 stagger helper to any card grid still using block-level
  `.reveal`

## Phase 3 — Remaining pages (invest, properties, returns)

- Add `.reveal` + entrance stagger to the three heroes currently missing it
  (audit finding #1)
- Apply card-grid stagger (audit finding #2) uniformly
- Standardize `.reveal` coverage per the rule in audit finding #4

## Phase 4 — Calculator & data surfaces

- Animate `.result__irr` value transitions on input change (audit #3)
- SVG line/area chart draw-in on `returns.html` via GSAP (audit #5)
- Extend card hover to include a subtle lift, matching the existing button
  hover pattern (audit #6)

## Phase 5 — Micro-interactions

- Magnetic pull on primary CTA buttons (Motion)
- At most 1–2 Rough Notation emphasis marks, placed deliberately (design
  brief explicitly warns against overuse)
- Promote duplicated inline hero `style=` overrides to a `.hero--compact`
  utility class (audit #7) — spacing-only, no visual change

## Phase 6 — Accessibility verification

- Manual pass confirming every new effect respects
  `prefers-reduced-motion` (test via OS setting, not just DevTools emulation)
- Focus-visible spot-check on range sliders and segmented controls (audit
  #9)
- Keyboard-only pass through magnetic buttons and any hover-dependent
  effect

## Phase 7 — Performance

- Confirm total added script weight against the budget in
  `performance-guide.md` (~75KB ceiling)
- Verify GSAP loads only on `returns.html`, not site-wide
- Lighthouse pass on all 4 pages, before/after comparison

## Phase 8 (deferred, opt-in) — Lenis smooth scroll

Evaluated last, after Phases 1–7 ship and are validated, since it's the
highest-blast-radius item (global scroll behavior change interacting with
sticky nav + scroll progress bar). Not committed to this roadmap — a
follow-up decision, not a default.

---

## Prioritized backlog

| # | Item | Priority | Difficulty | Effort | Dependencies | Business value | Visual impact | Perf impact |
|---|---|---|---|---|---|---|---|---|
| 1 | Stagger helper (Phase 1) | High | Low | S | none | Enables all other stagger work | Low (invisible infra) | Negligible |
| 2 | Reduced-motion check helper (Phase 1) | High | Low | S | none | Accessibility compliance | None | Negligible |
| 3 | Missing hero entrance on invest/properties/returns (audit #1) | High | Low | S | #1, #2 | First impression on 3 of 4 pages | High | Negligible |
| 4 | Card-grid stagger (audit #2) | High | Low | M | #1, #2 | Consistency across all card grids | Medium-High | Negligible |
| 5 | Calculator result transition (audit #3) | High | Medium | M | Motion loaded | Highest-intent surface, direct conversion impact | Medium | Negligible |
| 6 | Uniform `.reveal` coverage (audit #4) | Medium | Low | S | #1 | Consistency | Medium | Negligible |
| 7 | Card hover lift (audit #6) | Medium | Low | S | none, pure CSS | Reinforces interactivity | Low-Medium | None |
| 8 | SVG chart draw-in on returns.html (audit #5) | Medium | Medium | M | GSAP loaded | Matches existing bar-chart polish | Medium | Low (one page only) |
| 9 | Magnetic CTA buttons | Low | Medium | S | Motion loaded | Premium feel on primary conversion actions | Medium | Negligible |
| 10 | `.hero--compact` utility (audit #7) | Low | Low | S | none | Maintainability, not visual | None | None |
| 11 | Rough Notation emphasis marks (1-2 total) | Low | Low | S | Rough Notation loaded | Small delight, high risk of overuse if not disciplined | Low (by design) | Negligible |
| 12 | Consolidate `pulse`/`chip-pulse` keyframes (audit #10) | Low | Low | XS | none | Code hygiene | None | None |
| 13 | Lenis smooth scroll (Phase 8) | Deferred | High | M | Phases 1-7 validated | Marginal over existing native smooth scroll | Medium | Low, but highest regression risk |

Effort scale: XS (<1hr), S (few hrs), M (half-to-full day), L (multi-day) —
scaled to this codebase's size, not a large SaaS product.
