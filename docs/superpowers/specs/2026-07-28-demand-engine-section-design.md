# Demand Engine Section Redesign

## Context

The "Demand engine" section (`index.html` `#demand`, rendered by `renderDemand()` in `js/main.js` from `D().demand` in `data/projects.js`) currently shows six guest-segment cards (title, typical stay, one-line body) in a plain 3-column grid with a clever headline ("Six reasons a room stays full on a Tuesday in July") and no closing synthesis.

Feedback from review: the headline was too clever/indirect, card titles used industry jargon (e.g. "Commissioning teams", "EPC contractors"), and the section never states its point — that six independent, uncorrelated demand sources mean no single point of failure. Several richer visual directions (a proportional segment bar, a lit-up hotel floor-plan diagram) were explored and rejected as too abstract for a client/investor audience: if the reader has to decode a chart, it fails the pitch. The approved direction is the plain, literal version.

## Design

**Headline:** Replace the current headline and lede with a direct claim.
- H2: "Six kinds of guests keep this hotel full — not tourists."
- Lede: "Each one is billed to a company, on a budget approved months in advance. None of them care if it's the off-season."

**Cards (6, unchanged grid structure — `grid grid--3`):** Each card gets a plain-English title (renamed from job-title jargon) and keeps its existing stay-length chip and one-line body, tightened for plain language. Add a numeral index (01–06) per card in place of no visual anchor (not emoji — icons read too casual for this audience).

| # | New title (was) | Stay | Body |
|---|---|---|---|
| 01 | Crews starting up a new factory (*was* Commissioning teams) | 4–9 months | 30–50 engineers need housing until the production line is running. |
| 02 | Teams building the plant itself (*was* EPC contractors) | 6–24 months | Construction runs for years — the same rooms are booked the whole time. |
| 03 | Engineers flown in to fix a machine (*was* OEM service engineers) | 3–15 nights | When equipment breaks down, someone arrives that night, whatever the rate. |
| 04 | Inspectors checking on quality (*was* Auditors & buyers) | 2–6 nights | Audits and buyer visits run on a fixed schedule, all year round. |
| 05 | Staff relocating for the job (*was* Corporate transferees) | 1–3 months | Temporary housing before their family moves, paid by the employer. |
| 06 | Groups here for training (*was* Training cohorts) | 1–4 weeks | New hires arrive in batches, booked months ahead on a training budget. |

**Synthesis banner (new):** A single bold sentence below the card grid, visually distinct (accent-tinted background, accent border) so it reads as the section's takeaway, not another card:
> "Six different reasons to stay. **If one goes quiet, the other five don't** — that's what keeps the room full on a random Tuesday."

**Rejected directions (for record):** a proportional bar chart of segment shares, and a lit-up hotel-floor-plan diagram. Both required the reader to interpret a visual encoding before getting the point; rejected in favor of directly stating the takeaway in plain text.

## Implementation notes

- Update `demand` array in `data/projects.js`: rename `title` fields, tighten `body` copy per table above, add a `num` field ('01'–'06') per entry.
- Update `renderDemand()` in `js/main.js` to render the numeral index and the card layout (numeral badge, chip, title, body) matching current card markup conventions (`.card`, `.chip`, `.card__meta` etc. — reuse existing CSS classes, add new ones only if the numeral badge isn't already covered by an existing style).
- Update the section headline/lede markup in `index.html` (`#demand` section-head).
- Add the synthesis banner as a new element after `.grid--3` inside `#demand`, styled consistently with the site's accent-tint pattern (check `css/main.css` for an existing "highlight/callout" pattern before inventing new CSS).
- No changes needed to `data/lang-hi.js` translations are in scope unless the user wants Hindi copy updated too — confirm before touching that file since it's a separate locale data source.
- No new dependencies, no build changes. Static content edit + one new CSS block if not already available.

## Testing

- Visual check in browser (light + dark theme if the site supports both — confirm via `css/main.css` theme variables already seen: `--ink-0` overrides suggest a light theme exists).
- Confirm `renderDemand()` still works with the existing `D()` data-loading/localization mechanism (check how `D()` picks language, since `data/lang-hi.js` exists).
