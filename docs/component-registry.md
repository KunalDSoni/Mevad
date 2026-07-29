# Component Registry

Inventory of reusable CSS/JS patterns that already exist in `css/main.css`
and `js/main.js`. Check here before adding anything new — most interaction
primitives a "premium SaaS" checklist asks for already have a home.

## Layout primitives

| Class | Defined | Purpose |
|---|---|---|
| `.wrap`, `.wrap--narrow` | `css/main.css:205-212` | Page-width container |
| `.section`, `.section--flush` | `css/main.css:216-221` | Vertical rhythm block |
| `.section-head` | `css/main.css:223-226` | Label + heading + lede header pattern |
| `.grid`, `.grid--2`, `.grid--3`, `.grid--live` | `css/main.css:706-725` | Hairline-divided card grids |
| `.split` | `css/main.css:652-659` | Two-column layout |
| `.gridlines` | `css/main.css:238-248` | Blueprint grid backdrop, brand motif |

## Typography primitives

| Class | Purpose |
|---|---|
| `.label`, `.label--accent` | Monospace uppercase eyebrow/annotation |
| `.lede` | Intro paragraph styling |
| `.prose` | Body copy column |
| `.num` | Tabular-numeral formatting |
| `.step-headline` (`.step-1/2/3`) | Three-tier growing headline |

## Interactive components

| Component | Files | Behavior |
|---|---|---|
| Nav + mobile toggle | `css/main.css:270-361`, `js/main.js:24-42` | Sticky nav, hamburger toggle on mobile |
| Language toggle | `css/main.css:372-397`, `js/prefs.js` | EN/HI switch |
| Theme toggle | `css/main.css:399-418` | Light/dark, icon swaps via CSS attribute selector |
| `.btn`, `.btn--primary`, `.btn--ghost`, `.btn--sm` | `css/main.css:457-494` | Button system with hover lift + arrow slide |
| `.card` | `css/main.css:727-744` | Base content card, hover background shift |
| `.chip`, `.chip--accent` | `css/main.css:746-773` | Status tag, accent variant pulses |
| `.acc` (accordion) | `css/main.css:1357-1407`, `js/main.js:121-128` | FAQ accordion, grid-rows expand technique |
| `.segmented` | `css/main.css:1120-1148` | Toggle control (calculator scenario switch) |
| Range slider | `css/main.css:1080-1108` | Custom-styled `input[type=range]` |
| `.results`, `.result`, `.result.is-best` | `css/main.css:1151-1234` | Calculator output cards |
| `.tooltip` | `css/main.css:897-927` | Chart hover tooltip |
| `.timeline`, `.tl-item` | `css/main.css:1236-1276` | Numbered process steps |
| `.chain-diagram`, `.chain-diagram__step` | `css/main.css:1324-1336`, `js/main.js:220-231` | Staggered-reveal step chain (the one place stagger already exists) |
| `.demand-table`, `.demand-col` | `css/main.css:777-831` | Six-column stat table |
| `.versus`, `.versus__col` | `css/main.css:661-702` | Two-column comparison |
| `.bars`, `.bar-row` | `css/main.css:930-962` | Horizontal bar chart |
| `.cap-chart` | `css/main.css:1301-1321` | Capital deployment breakdown bars |
| `.proof-grid`, `.proof-frame` | `css/main.css:1338-1345` | Placeholder photo grid |
| `.stat`, `.statstrip` | `css/main.css:573-615` | Hero stat strip |
| `.stat-hero` | `css/main.css:1294-1299` | Large single-stat display |

## JS behaviors (all in `js/main.js`, IIFE-scoped)

| Function | Purpose |
|---|---|
| `nav()` | Mobile menu toggle |
| `reveal()` | IntersectionObserver-driven `.reveal` → `.is-in` |
| `counters()` | Count-up animation for `[data-count]` |
| `progressBar()` | Scroll-position fill bar |
| `accordion(scope)` | Wires `.acc__q` click → `aria-expanded` toggle |
| `renderAll()` | Master render pass, calls every `render*` function against `data/projects.js` |
| `sourceAt()` / `renderCitations()` / `renderSources()` | Footnote numbering system, walks `[data-source]` in document order |

## Data flow

All page content (except static hero copy and section headers written
directly in HTML) is rendered from `data/projects.js` (English) merged with
`data/lang-hi.js` (Hindi overrides) via `js/prefs.js`. Any new component that
needs translated or data-driven content should add a `render*` function
following the existing pattern in `js/main.js`, not hardcode strings in HTML.

## Reuse rule for the motion work

Before adding a new animation utility class or JS helper: check this table
first. The `chain-diagram__step` stagger pattern (opacity + translateY +
`transition-delay`) is the template to generalize for card-grid staggering
rather than inventing a new stagger mechanism.
