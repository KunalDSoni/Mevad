# Motion Design System — Library Ownership

Which tool owns which category, and why. Scope: index.html, invest.html,
properties.html, returns.html. Colors, tokens, and content are frozen (see
spec); this only assigns *how motion gets implemented*.

## Native CSS/JS (already in place — no new dependency)
★★★★★

**Owns:**
- Reveal-on-scroll (`.reveal` + IntersectionObserver, `js/main.js:46-65`)
- Count-up numbers (`js/main.js:69-98`)
- Scroll progress bar (`js/main.js:105-117`)
- Accordion expand/collapse (`.acc__a`, grid-template-rows technique)
- Hover states on buttons/cards/nav links
- Bar-chart fill width transitions
- Chip pulse, eyebrow dot pulse

**Why:** these are simple, well-understood CSS transitions and one small
IntersectionObserver pattern. Reaching for a library here would add weight
for zero capability gain. This is also the site's existing convention —
extending it keeps the codebase coherent.

**Keep doing this for:** any new hover/press state, any new scroll-triggered
class toggle that's just opacity/transform.

## Motion (motion.dev vanilla)
★★★★★

**Owns:**
- Staggered entrance sequencing (hero eyebrow → h1 → lede → CTA → stat strip;
  chain-diagram steps — replacing the current hardcoded per-index
  `transition-delay` inline styles at `js/main.js:226`)
- Magnetic-pull on primary CTA buttons
- Result-card number transition when calculator inputs change
- Split-text/blur reveal on section headlines (used sparingly — h2s only)

**Why:** these need per-element timing/stagger control that plain CSS
transitions can't express cleanly, but don't need scroll-scrubbing or
pinning. Motion's WAAPI base is the lightest way to get that.

## GSAP + ScrollTrigger
★★★★☆

**Owns:**
- SVG chart line/path draw-in on the `returns.html` trend charts
- Any future scroll-scrubbed sequence (none currently planned, but this is
  the tool of record if one is added)

**Why:** GSAP is overkill for anything Motion already covers — reserve it for
scroll-scrubbed or multi-timeline work where Motion's simpler API runs out.
Load it only on pages that use it (`returns.html`), not site-wide.

## Rough Notation
★★★☆☆

**Owns:**
- At most one or two emphasis marks per page on a key number or phrase (e.g.
  underlining "India's first industrial hotel chain" in the footer tagline,
  or circling one hero stat)

**Why:** powerful but easy to overuse; Mewad's brand voice is precise/
engineering-drawing, not hand-drawn. Treat every use as a deliberate,
individually-justified exception, not a pattern applied broadly.

## Lenis
★★☆☆☆ — opt-in, evaluate last

**Owns:** nothing yet. Candidate for replacing native `scroll-behavior:
smooth` site-wide, but only after the other four are in place and validated,
since it changes global scroll behavior and interacts with the sticky nav,
scroll progress bar, and anchor links (`index.html#story` etc. used across
all four pages' nav/footer).

**Why last:** highest blast radius of the five options for the smallest
incremental visual gain over the existing native smooth scroll.

## Assignment summary

| Category | Owner |
|---|---|
| Hover/press states | Native CSS (existing) |
| Reveal-on-scroll (block-level) | Native CSS + IO (existing) |
| Staggered entrance/sequencing | Motion |
| Number/value transitions | Motion |
| Magnetic buttons | Motion |
| SVG path/chart draw-in | GSAP |
| Sparse emphasis marks | Rough Notation |
| Global scroll feel | Lenis (deferred) |
