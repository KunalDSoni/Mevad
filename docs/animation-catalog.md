# Animation & Effect Catalogue

Filtered to what's realistic for a vanilla, content-dense, marketing +
investment-calculator site with a precise "engineering drawing" visual
language (`css/main.css:1-4`). Dashboard-only categories from the original
brief (Command Palette, Dock, AI Chat, Conversation Tree, Reasoning Timeline)
are dropped — this site has no dashboard or AI chat surface.

Each entry: effect, whether it already exists in the codebase, and which
tool would implement/extend it.

## Text

| Effect | Status | Tool |
|---|---|---|
| Split/blur reveal on scroll | Not present (only block-level `.reveal` exists) | Motion — split heading into words/lines, stagger opacity+blur |
| Count-up numbers | **Exists** (`js/main.js:69-98`, `[data-count]`) | keep as-is |
| Marker highlight (underline/circle) on a key phrase | Not present | Rough Notation, 1-2 uses max (e.g. one stat in the hero) |
| Letter/word stagger on headline entrance | Not present | Motion `stagger()` |

Excluded as off-brand: gradient/shiny/neon/glow text, 3D text, liquid text,
scramble text, wave text — all read as "SaaS gimmick," not "engineering
drawing." Hero `<em>` already carries emphasis via solid cream background
(`css/main.css:541-549`), which is the correct amount of typographic flair.

## Backgrounds

| Effect | Status | Tool |
|---|---|---|
| Radial glow behind hero | **Exists** (`.hero__glow`, `css/main.css:504-512`) | keep, could animate subtle drift with Motion |
| Blueprint gridlines | **Exists** (`.gridlines`, `css/main.css:238-248`) | keep static — it's a brand motif, animating it would cheapen it |

Excluded: aurora, particles, stars, meteor, mesh gradient, noise, galaxy,
shader backgrounds — none match the flat teal/cream, grid-based brand system.

## Buttons

| Effect | Status | Tool |
|---|---|---|
| Hover lift + shadow | **Exists** (`.btn--primary:hover`, `css/main.css:478-482`) | keep |
| Arrow slide on hover | **Exists** (`.btn__arrow`, `css/main.css:493-494`) | keep |
| Magnetic pull toward cursor | Not present | Motion, subtle (≤6px offset), primary CTAs only |
| Shimmer sweep | Not present | CSS-only via `background-position` transition, optional, low priority |

Excluded: ripple, liquid, elastic/morphing, pixel, comic, neon — mismatched
with the current restrained button style.

## Cards

| Effect | Status | Tool |
|---|---|---|
| Background shift on hover | **Exists** (`.card:hover`, `css/main.css:732`) | keep |
| Subtle lift (translateY + shadow) on hover | Not present on `.card` (present on buttons only) | CSS transition, extend existing pattern, no new library needed |
| Tilt-on-pointer | Not present | Motion `useSpring`-equivalent or plain JS pointer math; use sparingly — only on property cards, not everywhere |

Excluded: 3D flip, spotlight-follows-cursor, glow-border, noise texture — too
decorative for dense data cards.

## Cursor / Mouse Effects

Excluded entirely. Custom cursors and cursor-trailing effects actively hurt
usability on a content/data-heavy site (calculator, tables) where precise
pointer feedback matters more than flourish. None of the reference sites
(Stripe, Linear, Anthropic) use custom cursors on their marketing pages.

Recommended instead: **pointer-reactive elements**, not a replaced cursor —
e.g. the button magnetic-pull effect above.

## Hero

| Effect | Status | Tool |
|---|---|---|
| Eyebrow pulse dot | **Exists** (`@keyframes pulse`, `css/main.css:535-538`) | keep |
| Staggered entrance (eyebrow → h1 → lede → CTA → stat strip) | Not present — everything appears at once on load | Motion timeline, respects reduced-motion |

## Scroll

| Effect | Status | Tool |
|---|---|---|
| Fade+translateY reveal | **Exists** (`.reveal`, `css/main.css:1472-1481`, IO-driven in `js/main.js:46-65`) | keep, extend coverage — audit found gaps, see `ui-audit.md` |
| Staggered children reveal | Partially exists (`chain-diagram__step` has manual `transition-delay`, `js/main.js:226`) | generalize via Motion or a small stagger helper, avoid hardcoded per-index inline styles |
| Scroll-linked progress bar | **Exists** (`js/main.js:105-117`) | keep |
| Pinning / horizontal scroll / section snap | Not present, not recommended | would fight the site's long-form, citation-heavy reading pattern |

## SVG

| Effect | Status | Tool |
|---|---|---|
| Chart line/bar draw-in | Bars fill via CSS `width` transition (`.bar-row__fill`, `css/main.css:948-954`); line charts render fully static | GSAP `DrawSVG`-style path animation (via `stroke-dasharray` trick, no paid plugin needed) or Motion `animate(path, {pathLength: [0,1]})` for the trend charts in `returns.html` |

## Charts / KPIs

| Effect | Status | Tool |
|---|---|---|
| Count-up | **Exists** | keep |
| Bar fill animation | **Exists** | keep |
| Tooltip fade | **Exists** (`.tooltip`, `css/main.css:897-911`) | keep |
| Capital allocation bar reveal | **Exists** (`.cap-chart__bar`, `css/main.css:1310-1313`) | keep |

## Forms (calculator inputs)

| Effect | Status | Tool |
|---|---|---|
| Range slider thumb scale on drag | **Exists** (`css/main.css:1090-1100`) | keep |
| Segmented control active state | **Exists** (`css/main.css:1144-1148`) | keep |
| Result card value transition on input change | Not present — `.result__irr` swaps instantly when calculator inputs change | Motion, animate the number change (reuse the existing count-up pattern) |

## Decorative

| Effect | Status | Tool |
|---|---|---|
| Chip pulse (Operational status) | **Exists** (`chip-pulse`, `css/main.css:766-773`) | keep |
| Accordion expand/collapse | **Exists**, grid-rows technique (`css/main.css:1395-1401`) | keep — this is already the modern, JS-free approach |

Excluded: marquee, infinite scroll ticker, bento grid, animated beam, dock,
floating icons — none map to existing content on this site; would be motion
added for its own sake, which the brief explicitly says to avoid.

## Summary

Roughly 60% of the effect inventory the site would plausibly want **already
exists** in `css/main.css`/`js/main.js`, built without a library. The gap is
concentrated in: staggered entrances, chart/path draw-in, and a couple of
sparse emphasis marks — not a wholesale animation overhaul.
