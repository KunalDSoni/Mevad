# Premium Motion & Interaction Layer — Design

## Context

Mevad is a static, vanilla HTML/CSS/JS real-estate investment site (no bundler,
no framework): `index.html`, `invest.html`, `properties.html`, `returns.html`,
plus a separate `pitch-deck/` mini-app. Styling lives in `css/main.css`
(~1500 lines), behavior in `js/main.js` (~500 lines) plus `calculator.js` and
`prefs.js`. No animation library is currently in use.

Goal: bring the interaction quality up to the level of premium AI/SaaS sites
(Linear, Vercel, Stripe, Apple, Anthropic) — tasteful motion, not gimmicks —
without changing content or the existing color/theme tokens.

## Hard constraints

- No copy/content changes.
- No color or theme token changes (`--font-*`, color variables in
  `css/main.css` stay as-is).
- Spacing and type-scale values may be adjusted only where the audit finds a
  genuine inconsistency — not a general restyle.
- `pitch-deck/` is out of scope for this pass.
- No build tooling introduced. Any library must be usable via a `<script>`
  tag / ES module import, no React/JSX-only libraries.

## Library shortlist (vanilla-compatible)

| Library | Role |
|---|---|
| GSAP + ScrollTrigger | complex scroll-driven sequencing, timeline choreography |
| Motion (motion.dev vanilla build) | lightweight declarative animations, honors `prefers-reduced-motion` |
| Lenis | smooth scroll, pairs with ScrollTrigger |
| Rough Notation | hand-drawn marker/underline/circle highlights, used sparingly on key stats |

React-only libraries from the original brief (shadcn, Magic UI, React Bits,
21st.dev, Origin UI, Aceternity UI, Motion Primitives, Cult UI, Animata) are
recorded in the libraries doc as not applicable to this codebase, with a short
note each rather than deep evaluation.

## Deliverables (docs only, no code in this pass)

1. `docs/ui-libraries.md` — comparison table; vanilla-usable libraries
   evaluated in full (install, size, license, a11y, prod-readiness), others
   noted N/A with reason.
2. `docs/animation-catalog.md` — effect catalogue filtered to what's
   realistically achievable in vanilla CSS/GSAP/Motion/Rough Notation for a
   marketing/investment site (drops dashboard-only categories like command
   palette, AI chat, conversation trees).
3. `docs/design-system.md` — which library owns which effect category, with
   a short rationale per assignment.
4. `docs/ui-roadmap.md` — phased plan scaled to a 4-page static site (drops
   "Dashboard" and "AI Components" phases from the original brief since this
   site has neither).
5. `docs/ui-audit.md` — findings from reading `index.html`, `invest.html`,
   `properties.html`, `returns.html`, `css/main.css`, `js/main.js`: missing
   hover/focus states, missing scroll reveals, spacing inconsistencies,
   accessibility gaps — ranked by impact.
6. `docs/component-registry.md` — inventory of existing reusable CSS/JS
   patterns already in the codebase, so new motion work reuses instead of
   duplicating.
7. `docs/performance-guide.md` — lazy-loading approach, GPU-transform rules,
   `prefers-reduced-motion` handling, and a script-weight budget for adding
   GSAP/Lenis/Motion via CDN/self-hosted `<script>` tags (no bundler, so this
   matters more than usual).

Plus a prioritized backlog at the end of the roadmap doc: priority,
difficulty, estimated effort, dependencies, business value, visual impact,
performance impact — per backlog item.

## Out of scope for this pass

- Any actual code/dependency changes to the site.
- pitch-deck/.
- Color/theme redesign.
- Content rewrites.

## Next step

After these docs are approved, a separate implementation plan (via
writing-plans) will sequence the actual code changes, starting with whichever
backlog items rank highest priority/impact for lowest risk.
