# UI/UX Audit

Scope: `index.html`, `invest.html`, `properties.html`, `returns.html`,
`css/main.css`, `js/main.js`. Findings ranked High → Low impact. No
color/content/theme changes proposed anywhere in this audit.

## High impact

**1. Hero sections on invest/properties/returns have zero entrance motion.**
Only `index.html`'s hero is inside the page's visual rhythm; the other three
pages' `.hero` blocks (`invest.html:34-47`, `properties.html:34-47`,
`returns.html:34-47`) have no `.reveal` class and no stagger — h1, lede, and
gridlines all appear instantly on load. These are the first thing a visitor
sees on 3 of 4 pages. Fix: staggered entrance via Motion (see
`design-system.md`).

**2. Card grids reveal as one block, not individually.** Every `.grid
grid--2 reveal` / `.grid grid--3 reveal` wrapper (e.g. `properties.html:65`,
`invest.html:99`, `returns.html:65`) puts `.reveal` on the *grid container*,
so all cards inside fade in simultaneously rather than staggering. The
`chain-diagram__step` pattern already solves this correctly with per-index
delay (`js/main.js:226`) — that pattern isn't applied to plain `.card` grids
anywhere else. Fix: generalize the stagger helper, apply to all card grids.

**3. Calculator result values change with no transition.** `returns.html`'s
calculator (`.result__irr`, `css/calculator.js`-driven) swaps numbers
instantly when a user drags a slider — the site's single most interactive,
highest-intent surface has no motion feedback at all, while static stat
strips elsewhere get a full count-up treatment. Fix: animate value changes
(Motion), reusing the existing count-up easing curve for consistency.

## Medium impact

**4. Inconsistent reveal coverage across pages.** `index.html` uses
`.reveal` on ~7 elements; `invest.html` uses it on 5 sections but skips the
hero and the `.split` two-column block (`invest.html:53-67`);
`properties.html` and `returns.html` apply it to only 2 of their 3
non-hero sections. There's no single rule for what gets `.reveal` — it reads
as applied ad hoc rather than systematically. Fix: define one rule ("every
`.section-head` and every direct content block below the fold gets
`.reveal`") and apply it uniformly.

**5. SVG trend charts (`returns.html`) render fully static.** Bar charts
already animate fill width (`.bar-row__fill`, `css/main.css:948-954`) but
line/area charts have no equivalent — they appear instantly with no draw-in,
which is inconsistent with the bar chart right next to them on the same
page. Fix: path draw-in via GSAP or Motion (see `animation-catalog.md`).

**6. `.card:hover` only changes background, no lift.** Buttons get
`translateY(-1px)` + shadow on hover (`css/main.css:478-482`); cards only get
a background swap (`css/main.css:732`). Given how heavily this site relies
on `.card` for content (structures, philosophy, FAQ intro, site-selection
tests), the muted hover treatment undersells interactivity on the dominant
content unit. Fix: extend the existing button-hover transform pattern to
cards — no new library needed, pure CSS.

**7. Inline `style=` attributes duplicate spacing/sizing that could be
classes.** Every page hero overrides padding/font-size via inline `style=`
(`invest.html:34,38`, `properties.html:34,38`, `returns.html:34,38`,
identical values across all three). This isn't a visual bug, but it means a
future spacing tweak requires editing three separate inline strings instead
of one CSS rule — a real inconsistency risk given the "spacing/type fixable"
constraint from the design brief. Fix: promote to a `.hero--compact`
utility class (spacing-only, no visual change).

## Low impact

**8. No loading/skeleton state for data-rendered regions.** Every
`[data-render]` mount (`js/main.js:130-406`) is empty until
`data/projects.js` executes and `renderAll()` runs. On a fast connection this
is invisible; on a slow one, sections briefly show nothing. Given this is a
same-origin, small (`<50KB`) data file with no network fetch, actual risk is
low — noted for completeness, not worth solving with a spinner/skeleton
system.

**9. Focus-visible ring is uniform but not tested against every custom
control.** `:focus-visible` is defined once globally (`css/main.css:148-152`)
and looks correct for links/buttons; range inputs and segmented-control
buttons should be spot-checked in a real browser pass once motion work
starts, since custom-styled range thumbs sometimes suppress the native focus
ring. Not a code defect today — a verification item for implementation time.

**10. `chip--accent` pulse and `pulse` keyframe are near-duplicates.**
`chip-pulse` (`css/main.css:766-769`) and `pulse` (`css/main.css:535-538`)
both animate a box-shadow ring outward on a ~2.6s loop with very similar
easing, defined independently. Not urgent, but if new pulse-style affordances
get added, consolidate into one keyframe with a CSS custom property for the
color instead of a third near-duplicate.

## What's already good (don't touch)

- Global `prefers-reduced-motion` handling at the reset level
  (`css/main.css:120-127`) plus a second, more granular override on
  `.reveal` (`css/main.css:1479-1481`) and `.chip--accent`
  (`css/main.css:771-773`) — this is more thorough reduced-motion coverage
  than most production marketing sites ship with.
- Accordion uses the `grid-template-rows: 0fr → 1fr` technique
  (`css/main.css:1395-1401`) instead of JS height measurement — modern,
  correct, no library needed.
- Count-up, bar-fill, and scroll-progress are all IntersectionObserver-gated
  (only animate once, only when visible) — good performance hygiene already
  in place.
- Two-tone accent system and stepped headline (`step-1/2/3`) give the site a
  distinct, consistent typographic voice — motion work should reinforce this
  rhythm (stagger by the same step logic), not compete with it.
