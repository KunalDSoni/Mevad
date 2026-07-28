# UI / Animation Library Research

Mevad is a vanilla HTML/CSS/JS site with no bundler and no framework. That
rules out the majority of the originally-requested list, which is built for
React + a build step. This doc evaluates the libraries that actually work
here in depth, and gives a one-line reason for excluding the rest.

## Usable in this codebase

### GSAP (+ ScrollTrigger)

| | |
|---|---|
| Purpose | Timeline-based animation engine; ScrollTrigger drives animation from scroll position |
| Website | gsap.com |
| GitHub | github.com/greensock/GSAP |
| License | Standard "No Charge" license (free for almost all commercial use since 2024); MIT-like terms for the vast majority of use cases |
| Install | `<script src=".../gsap.min.js">` + `<script src=".../ScrollTrigger.min.js">`, no bundler needed |
| Bundle size | core ~28KB min+gzip, ScrollTrigger plugin ~14KB min+gzip |
| Browser support | all evergreen browsers, IE11 (irrelevant here) |
| React compat | N/A — used directly against DOM elements, works identically without React |
| Tailwind compat | N/A, no CSS framework dependency, works with any CSS |
| TypeScript | ships types, irrelevant since this project has no TS |
| Maintenance | actively maintained, large team, frequent releases |
| Popularity | industry-standard for scroll storytelling; used by Apple, Stripe marketing pages, countless agency sites |
| Best use cases | pinned sections, multi-step scroll sequences, coordinated timelines (e.g. the stat strip revealing in sequence, the versus/split section animating in) |
| Performance impact | animates `transform`/`opacity` by default (GPU-friendly); ScrollTrigger recalculates on resize, cheap for a 4-page site |
| Accessibility | does not auto-respect `prefers-reduced-motion` — must gate manually (site already has a global CSS override, but GSAP-driven JS animations need their own check) |
| Production ready | yes |

### Motion (motion.dev, vanilla build — formerly Motion One)

| | |
|---|---|
| Purpose | Lightweight declarative animation via the Web Animations API |
| Website | motion.dev |
| GitHub | github.com/motiondivision/motion |
| License | MIT |
| Install | ES module import from CDN (`import { animate, scroll } from "motion"`) or self-hosted `.js`, no bundler required |
| Bundle size | ~5KB min+gzip core (mini API), full featured build still under 20KB |
| Browser support | modern evergreen browsers (relies on WAAPI) |
| React compat | N/A here — the vanilla build is framework-free |
| Tailwind compat | N/A |
| TypeScript | ships types, irrelevant |
| Maintenance | actively maintained (same team as Framer Motion) |
| Popularity | fast-growing, used widely in the "premium site" reference set (Vercel-adjacent projects) |
| Best use cases | simple element-level animations: card hover lift, button micro-interactions, hero entrance — cheaper than GSAP for one-off effects |
| Performance impact | uses native WAAPI where possible, very low overhead |
| Accessibility | has a documented reduced-motion pattern but doesn't auto-apply it — must gate manually |
| Production ready | yes |

### Lenis

| | |
|---|---|
| Purpose | Smooth-scroll library |
| Website | lenis.darkroom.engineering |
| GitHub | github.com/darkroomengineering/lenis |
| License | MIT |
| Install | CDN script or ES module, no bundler required |
| Bundle size | ~5KB min+gzip |
| Browser support | all evergreen browsers |
| React compat | N/A, vanilla API used directly |
| Tailwind compat | N/A |
| TypeScript | ships types, irrelevant |
| Maintenance | actively maintained |
| Popularity | the de facto smooth-scroll choice on premium marketing sites, pairs natively with GSAP ScrollTrigger |
| Best use cases | replacing native `scroll-behavior: smooth` (already used in `css/main.css:117`) with an eased, interruptible scroll feel |
| Performance impact | intercepts the scroll event loop — must be disabled under `prefers-reduced-motion` and tested against the existing sticky nav/progress bar |
| Accessibility | can interfere with keyboard/anchor scrolling and reduced-motion expectations if not explicitly disabled — needs a documented reduced-motion escape hatch |
| Production ready | yes, but adds most risk of the four (global scroll hijack) — recommend evaluating last, opt-in only |

### Rough Notation

| | |
|---|---|
| Purpose | Hand-drawn-style annotations (underline, circle, box, highlight, strike-through) drawn as SVG |
| Website | roughnotation.com |
| GitHub | github.com/rough-stuff/rough-notation |
| License | MIT |
| Install | CDN script (`RoughNotation` global) or ES module, no bundler required |
| Bundle size | ~7KB min+gzip |
| Browser support | all evergreen browsers, uses SVG |
| React compat | N/A, imperative `annotate(el, {...})` API works directly on any DOM node |
| Tailwind compat | N/A |
| TypeScript | ships types, irrelevant |
| Maintenance | stable, low-churn (feature-complete for its scope) |
| Popularity | widely used for "marker highlight" style call-outs |
| Best use cases | drawing attention to one or two key figures (e.g. the hero stat strip's headline number) — must be used sparingly given Mevad's precise, engineering-drawing visual language, not a hand-drawn brand |
| Performance impact | negligible, triggers once per element via IntersectionObserver |
| Accessibility | purely decorative SVG overlay, does not affect underlying text/DOM — safe by default, still gate via reduced-motion |
| Production ready | yes |

## Not applicable (React/build-tool dependent)

| Library | Why excluded |
|---|---|
| shadcn/ui | Distributes React component source via a CLI that assumes Tailwind + a bundler; no vanilla output |
| Magic UI | React component library (Framer Motion under the hood) |
| React Bits | Name says it — React components only |
| 21st.dev | A React component marketplace/registry, no framework-free export |
| Origin UI | React + Tailwind component set |
| Aceternity UI | React + Framer Motion + Tailwind components |
| Motion Primitives | React component wrappers around Motion |
| Cult UI | React component library |
| Animata | React + Tailwind component set |
| Rive | Needs the Rive runtime + authored `.riv` files from the Rive editor — viable long-term for a bespoke animated mark, but out of scope for a docs-only pass with no design asset pipeline |
| Rough.js | Hand-drawn *shape/sketch* rendering (not annotations) — would work vanilla, but Mevad's brand is precise/geometric ("engineering drawing, not hotel brochure" per `css/main.css:3-4`), so sketchy fills are a poor visual fit; not recommended |
| Perfect Freehand | Freehand pressure-sensitive stroke rendering for drawing/whiteboard UIs — no fit for a marketing/investment site with no drawing feature |
| Spline | 3D scene design tool with a hosted embed; heavy runtime, no clear use case on this content-first, data-dense site |
| React Three Fiber | React-only renderer for Three.js |

## Comparison table (usable libraries only)

| Library | Size (min+gzip) | Risk | Best for | Reduced-motion handling |
|---|---|---|---|---|
| GSAP + ScrollTrigger | ~42KB combined | Low | Scroll-sequenced sections | Manual gate required |
| Motion | ~5–20KB | Low | Element-level micro-interactions | Manual gate required |
| Rough Notation | ~7KB | Low | Sparse emphasis marks | Manual gate required (has none by default, safe to disable) |
| Lenis | ~5KB | Medium (global scroll behavior change) | Smooth scroll feel | Must be disabled entirely under reduced-motion |

Recommended adoption order: **Motion → Rough Notation → GSAP → Lenis** (lowest
risk/effort to highest).
