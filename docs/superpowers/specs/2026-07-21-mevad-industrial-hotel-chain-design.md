# Mevad — India's First Industrial Hotel Chain

**Date:** 2026-07-21
**Status:** Approved, in build

## What this is

An investor-facing marketing site for Mevad, a chain of hotels built to serve India's
industrial corridors. The site's job is to convert a cold visitor into a booked meeting,
and a warm visitor into a signed investment agreement.

## The argument

Tourist hotels chase discretionary guests: seasonal, OTA-dependent, competitive.
Industrial hotels serve guests whose presence is set by capital expenditure — plant
commissioning teams, EPC contractors, OEM technicians, auditors, corporate visitors.

The result is a different asset:

- Demand is contractual, not discretionary. A commissioning line housing 40 engineers
  for eight months is a purchase order, not a booking.
- Weekday-heavy and counter-cyclical to tourism.
- Near-zero customer acquisition cost — 15–20 anchor factories within 5km.
- Lower ADR, higher and steadier RevPAR. **Stability is the product.**

India is mid-manufacturing-capex-wave (PLI, Gati Shakti, freight corridors; the
Sanand, Dahej, Halol, Chakan, Sri City, Hosur belts) with almost no organised
hospitality near industrial estates.

Positioning line: *the most boring, most defensible hotel asset class in India.*

## Approach

Data-led scrollytelling. The homepage argues rather than asserts — corridor maps,
supply gap, occupancy curves — with the returns calculator promoted high for warm
traffic. Rejected: classic brochure site (forgettable), calculator-first (weak for
cold visitors who need the thesis).

## Architecture

Static HTML/CSS/JS, no build step, matching existing sibling sites in this directory.

| File | Purpose |
|---|---|
| `index.html` | The pitch — thesis, data, calculator, structures, process |
| `thesis.html` | Deep case: corridor analysis, demand drivers, comparables |
| `properties.html` | Portfolio index + per-property detail |
| `returns.html` | Standalone calculator |
| `invest.html` | Investment structures, process, scheduling, KYC explanation |
| `data/projects.json` | **Every number on the site** |
| `css/main.css` | Design system |
| `js/*.js` | Calculator, charts, scroll behaviour |

### Data isolation

All properties, prices, ADR, occupancy, and return figures live in
`data/projects.json`. Swapping real numbers never touches HTML. Until real data
arrives, values are obviously-marked placeholders — never plausible-looking fakes —
so nothing can accidentally ship looking real.

## The calculator

Investor sets amount and property, then sees all four investment structures compared
in one view:

1. Room ownership + revenue share
2. Assured/fixed return
3. Hybrid — assured floor for N years, then revenue share
4. SPV units (fractional, no specific room)

Occupancy and ADR are exposed as adjustable sliders, not hidden assumptions. A
downside case is shown alongside base and upside. Showing the downside is what makes
the upside believable.

## Design language

Industrial precision, not hotel luxury. Engineering-drawing structure carrying
hospitality warmth.

- **Palette:** graphite/near-black, concrete greys, warm off-white, signal-amber accent
  (industrial signage) — deliberately unlike the teal-gradient default.
- **Type:** grotesque for text, monospace with tabular numerals for all data.
- **Motifs:** grid rules, measurement ticks, blueprint annotation, data readouts.

## Journey coverage

Visitor journey steps 1–4 (land → explore → calculate → choose amount) are fully
served by the site. Steps 5–9 (book meeting → KYC → investor kit → site visit →
sign) are driven *to* third-party services:

- Scheduling: Calendly / Zoho Bookings embed
- KYC: compliant third-party form provider
- E-signature: Zoho Sign / DocuSign
- Investor kit: email delivery

**The static site never handles identity documents.** Handling KYC uploads requires a
real backend with real security; the site links out and explains the process.

## Compliance note

Expected-return figures and the assured-return structure sit near SEBI/RERA
territory. All calculator output uses illustrative framing with visible disclaimer
treatment. Final copy requires review by the client's legal counsel before launch.

## Open items

- Real property data, pricing, and return figures — pending from client
- Brand assets: logo, renders, photography — pending
- Third-party service accounts (scheduling, KYC, e-sign) — pending
