/* ==========================================================================
   MEVAD — SINGLE SOURCE OF TRUTH
   ==========================================================================

   EVERY NUMBER ON THIS WEBSITE COMES FROM THIS FILE.

   >> ALL VALUES BELOW ARE PLACEHOLDERS. NONE OF THEM ARE REAL. <<

   They exist so the site can be built and reviewed before real figures
   arrive. They are deliberately round and obviously synthetic so that no
   one mistakes them for a real offer. While `PLACEHOLDER_MODE` is true,
   the site displays a persistent banner saying so.

   TO GO LIVE:
     1. Replace the values below with real, counsel-approved figures.
     2. Set PLACEHOLDER_MODE to false.
     3. Nothing else. Do not edit the HTML.
   ========================================================================== */

window.MEVAD = {

  PLACEHOLDER_MODE: true,

  /* Words that JS builds strings from, rather than authoring in HTML.
     They live here so the Hindi file can override them like anything else. */
  words: {
    menu: 'Menu',
    close: 'Close',
    showTable: 'Show data table',
    hideTable: 'Hide data table',
    keys: 'keys',
    year: 'Year',
    irr: 'IRR',
    years: 'years',
    yrs: 'yrs',
    typicalStay: 'Typical stay',
    risk: 'Risk',
    exit: 'Exit',
    suits: 'Suits',
    bestBadge: 'Highest modelled IRR',
    source: 'Source',
    placeholderNotice: 'Preview build · every figure on this page is placeholder data, not a real offer',
    chainLiveLabel: 'Operational now',
    chainPipelineLabel: 'Pipeline · future corridors'
  },

  brand: {
    name: 'Mevad',
    positioning: "India's First Industrial Hotel Chain",
    phone: '+91 00000 00000',
    /* Named contacts shown in the footer. Add `email` or `phone` to an entry
       and it renders as a link; a bare name renders as plain text. */
    contacts: [
      { name: 'Hemendra Sinh Solanki' },
      { name: 'Bheru Singh Rajput' }
    ],
    // Third-party services — swap in real links before launch.
    schedulingUrl: '#',   // Calendly / Zoho Bookings
    kycUrl: '#',          // compliant KYC form provider
    esignUrl: '#'         // Zoho Sign / DocuSign
  },

  /* ---------------------------------------------------------------------
     MARKET — the numbers behind the thesis
     --------------------------------------------------------------------- */
  market: {
    /* Each figure carries a `source`. Fill BOTH fields only when a real,
       checkable citation supports that exact number: `label` is what the
       reader sees ("CRISIL, Indian Hospitality Report, 2025"), `url` is where
       they can verify it. While `label` is empty the marker renders nothing
       and the Sources section stays hidden, so the site never shows a
       reference it cannot honour. Never cite a source that does not state
       the number it is attached to. */
    // Organised hotel rooms per 1,000 industrial workers, by corridor.
    // The supply gap, made visible.
    supplyGap: {
      source: { label: '', url: '' },
      unit: 'organised hotel rooms per 1,000 industrial workers',
      benchmark: { label: 'Business-district benchmark', value: 24, source: { label: '', url: '' } },
      corridors: [
        { name: 'Sanand, GJ',    value: 2.1 },
        { name: 'Dahej, GJ',     value: 1.4 },
        { name: 'Halol, GJ',     value: 2.8 },
        { name: 'Chakan, MH',    value: 3.6 },
        { name: 'Sri City, AP',  value: 1.9 },
        { name: 'Hosur, TN',     value: 3.1 }
      ]
    }
  },

  /* ---------------------------------------------------------------------
     WHO SLEEPS IN A MEVAD HOTEL
     --------------------------------------------------------------------- */
  demand: [
    {
      num: '01',
      title: 'New-factory crews',
      stay: '4–9 months',
      body: 'Housed until the production line runs. 30–50 engineers on a purchase order, not a booking.'
    },
    {
      num: '02',
      title: 'Plant construction teams',
      stay: '6–24 months',
      body: 'The same block of rooms, booked out for years while the plant is built.'
    },
    {
      num: '03',
      title: 'Emergency repair engineers',
      stay: '3–15 nights',
      body: 'In that night, whatever the rate, when a machine on the floor stops.'
    },
    {
      num: '04',
      title: 'Quality inspectors',
      stay: '2–6 nights',
      body: 'Fixed audit and buyer-visit calendar, all year, tourist season or not.'
    },
    {
      num: '05',
      title: 'Relocating staff',
      stay: '1–3 months',
      body: 'Bridge housing before family housing, paid by the employer.'
    },
    {
      num: '06',
      title: 'Training cohorts',
      stay: '1–4 weeks',
      body: 'Booked months ahead in batches, against an annual training budget.'
    }
  ],

  /* ---------------------------------------------------------------------
     THE ASSET — what one Mevad hotel is
     --------------------------------------------------------------------- */
  asset: {
    intro: 'Engineered for a guest who arrives at 2am, works a 12-hour shift, and stays for months. Not for a honeymoon.',
    specs: [
      { k: 'Keys per property',      v: '60 – 90' },
      { k: 'Land footprint',         v: '1.5 – 3.0 acres' },
      { k: 'Distance to anchor gate',v: 'Under 15 minutes' },
      { k: 'F&B hours',              v: '24 / 7, shift-timed' },
      { k: 'Long-stay inventory',    v: '40% of keys' },
      { k: 'Build-to-open',          v: '14 – 18 months' },
      { k: 'Stabilisation',          v: '9 – 12 months' },
      { k: 'Operator',               v: 'Mevad, in-house' }
    ],
    features: [
      { title: 'Shift-aligned kitchens', body: 'Hot meals at 3am and 3pm, because that is when shifts change. Vegetarian, Jain and regional menus as standard.' },
      { title: 'Laundry at scale',       body: 'Industrial-grade, same-day, included. A guest here has three shirts and a six-month stay.' },
      { title: 'Rooms built for work',   body: 'Desk, wired ethernet, blackout for day-sleepers, and sound isolation rated for 24-hour occupancy.' },
      { title: 'Transport desk',         body: 'Scheduled shuttles to anchor plant gates, timed to shift changes and airport arrivals.' },
      { title: 'Meeting infrastructure', body: 'Rooms that hold a 20-person vendor review, because the alternative is a two-hour drive to a city hotel.' },
      { title: 'Corporate contracting',  body: 'Annual rate agreements, GST-clean invoicing and single-PO billing that a procurement team can actually process.' }
    ]
  },

  /* ---------------------------------------------------------------------
     PROPERTIES
     --------------------------------------------------------------------- */
  properties: [
    {
      id: 'sanand',
      name: 'Mevad Sanand',
      state: 'Gujarat',
      corridor: 'Sanand GIDC · Ahmedabad',
      status: 'Operational',
      keys: 72,
      opened: '2024',
      anchors: ['Automotive OEM', 'Auto components', 'Packaging', 'Pharma'],
      unitPrice: 4500000,   // per room / per unit, INR
      adr: 4200,            // average daily rate, INR
      occupancy: 78,        // stabilised %, base case
      appreciation: 7,      // annual capital appreciation %, illustrative
      profitMargin: 0.45,   // net operating profit as % of gross room revenue, illustrative
      blurb: 'Gujarat\'s most concentrated automotive cluster, with a serviced-hotel supply that never followed the factories in.'
    },
    {
      id: 'dahej',
      name: 'Mevad Dahej',
      state: 'Gujarat',
      corridor: 'Dahej PCPIR · Bharuch',
      status: 'Announced',
      keys: 84,
      opened: '2027 (expected)',
      anchors: ['Petrochemicals', 'Speciality chemicals', 'Port logistics'],
      unitPrice: 4200000,
      adr: 4600,
      occupancy: 81,
      appreciation: 7,
      profitMargin: 0.47,
      blurb: 'A petrochemical investment region running continuous shutdown-and-turnaround cycles, each one importing hundreds of contractors.'
    },
    {
      id: 'chakan',
      name: 'Mevad Chakan',
      state: 'Maharashtra',
      corridor: 'Chakan MIDC · Pune',
      status: 'Under construction',
      keys: 90,
      opened: '2027 (expected)',
      anchors: ['Automotive OEM', 'Heavy engineering', 'Electronics'],
      unitPrice: 5400000,
      adr: 5100,
      occupancy: 76,
      appreciation: 8,
      profitMargin: 0.42,
      blurb: 'India\'s densest auto-manufacturing belt, where visiting engineers currently commute ninety minutes each way from Pune city.'
    },
    {
      id: 'sricity',
      name: 'Mevad Sri City',
      state: 'Andhra Pradesh',
      corridor: 'Sri City SEZ · Tirupati',
      status: 'Announced',
      keys: 78,
      opened: '2028 (expected)',
      anchors: ['Electronics', 'FMCG', 'Mobility', 'Food processing'],
      unitPrice: 3900000,
      adr: 3800,
      occupancy: 74,
      appreciation: 8,
      profitMargin: 0.43,
      blurb: 'A multi-sector SEZ with more than two hundred operating units and effectively no organised accommodation inside the gate.'
    },
    {
      id: 'hosur',
      name: 'Mevad Hosur',
      state: 'Tamil Nadu',
      corridor: 'Hosur · Krishnagiri',
      status: 'Announced',
      keys: 66,
      opened: '2028 (expected)',
      anchors: ['EV manufacturing', 'Electronics', 'Aerospace'],
      unitPrice: 4100000,
      adr: 4000,
      occupancy: 75,
      appreciation: 8,
      profitMargin: 0.44,
      blurb: 'The centre of India\'s EV build-out, absorbing capital faster than it is absorbing infrastructure.'
    }
  ],

  /* ---------------------------------------------------------------------
     INVESTMENT STRUCTURES
     Two structures. Both are profit-share, proportional-ownership models -
     there is no fixed/assured leg. Mevad takes a flat management fee off
     property profit before anything is distributed to owners.
     --------------------------------------------------------------------- */
  managementFeePct: 0.20,   // Mevad's share of property profit, taken first, both structures

  structures: [
    {
      id: 'direct',
      name: 'Direct Property Ownership',
      short: 'Single hotel',
      summary: 'You invest directly into one hotel. Your stake is the share of the property your capital represents - invest 10% of the property\'s value, own 10% of it.',
      ownerShare: null,     // computed per-investment: amount / property price
      assured: null,
      liquidity: 'Sale of your stake, by agreement with Mevad or an incoming investor',
      risk: 'Return moves with that hotel\'s occupancy and rate',
      forWho: 'Investors who want direct exposure to one named property and can accept single-asset variability.',
      detail: 'Mevad operates the hotel and takes a flat 20% management fee off annual profit. The remaining 80% is distributed to owners in proportion to their stake in that specific hotel.'
    },
    {
      id: 'spv',
      name: 'SPV Units (Parent Company)',
      short: 'Parent company',
      summary: 'Units in the Mevad parent entity, which holds a stake across every operating hotel. No single property; exposure to the whole chain.',
      ownerShare: null,
      assured: null,
      portfolioDiversification: true,
      roadmap: true,        // not live yet - opens once 4-5 hotels are operational
      liquidity: 'Unit transfer, subject to the parent company\'s constitutional documents',
      risk: 'Diversified across every hotel in the chain; no single-asset concentration',
      forWho: 'Investors who want the chain rather than one hotel, once the parent company opens for investment.',
      detail: 'The parent company holds an equity stake in every Mevad hotel, including Mevad Sanand. Its own profit - after each hotel\'s 20% management fee - is distributed to parent-company unit holders in proportion to their holding. This structure opens once Mevad is operating 4-5 hotels; direct property ownership is live today, starting with Mevad Sanand.'
    }
  ],

  /* ---------------------------------------------------------------------
     CALCULATOR DEFAULTS
     --------------------------------------------------------------------- */
  calculator: {
    defaultAmount: 5000000,
    minAmount: 1000000,
    maxAmount: 50000000,
    stepAmount: 100000,
    defaultHorizon: 10,
    // {amount} {property} {years} {occ} {adr} are substituted at render time.
    summaryTemplate: '{amount} into {property} over {years} years, at {occ}% occupancy and {adr} ADR.',
    labels: {
      property: 'Property',
      investment: 'Investment',
      horizon: 'Holding period',
      scenario: 'Scenario',
      occupancy: 'Occupancy',
      adr: 'Average daily rate',
      heading: 'Both structures, same money',
      ownershipPct: 'Your ownership stake',
      payoutYr: 'Stabilised payout / yr',
      perMonth: 'Per month',
      yieldOnCost: 'Yield on cost',
      firstPayout: 'First payout',
      income: 'Income',
      exitValue: 'Exit value',
      multiple: 'Total / invested',
      footnote: 'Payouts are 80% of property profit (after Mevad\'s 20% management fee), split by ownership percentage. IRR is computed on the full cashflow: capital out at year zero, payouts each year, and sale of the holding at the end of the period. Construction and stabilisation are applied - a property that has not opened does not pay.'
    },
    // Sensitivity applied to the base occupancy for the two side cases.
    scenarios: [
      { id: 'down', label: 'Downside', occupancyDelta: -12, adrDelta: -8 },
      { id: 'base', label: 'Base',     occupancyDelta: 0,   adrDelta: 0  },
      { id: 'up',   label: 'Upside',   occupancyDelta: +7,  adrDelta: +6 }
    ]
  },

  /* ---------------------------------------------------------------------
     INVESTOR JOURNEY
     --------------------------------------------------------------------- */
  journey: [
    { step: 'Explore the thesis',      body: 'Understand why industrial hospitality behaves differently from every other hotel asset in India.', where: 'On this site' },
    { step: 'Model your returns',      body: 'Run your own numbers across both structures, including the downside case.',                          where: 'On this site' },
    { step: 'Choose your structure',   body: 'Pick the property, the amount and the return model that matches your risk appetite.',              where: 'On this site' },
    { step: 'Book a meeting',          body: 'A 45-minute call with the investment team. No obligation, no documents required.',                 where: 'Scheduling' },
    { step: 'Complete KYC',            body: 'Identity and source-of-funds verification, handled entirely by our compliance partner.',           where: 'Compliance partner' },
    { step: 'Receive the investor kit',body: 'Property financials, legal structure, title documents and the full agreement, by email.',          where: 'Email' },
    { step: 'Visit the site',          body: 'Walk the property. Meet the operating team. Talk to the anchor tenants next door.',                where: 'On site' },
    { step: 'Sign and fund',           body: 'Execute the agreement digitally and complete registration.',                                       where: 'E-signature' }
  ],

  /* ---------------------------------------------------------------------
     FAQ
     --------------------------------------------------------------------- */
  faq: [
    {
      q: 'What happens if a single anchor factory shuts down?',
      a: 'No Mevad site depends on one tenant. Each property is underwritten against a minimum count of independent anchor employers within a fixed radius, across more than one sector, so that the closure of any single plant is absorbed rather than fatal.'
    },
    {
      q: 'Industrial ADR is lower than city hotels. Why is that good?',
      a: 'It is not good on its own - it is good in combination. Lower rate, far higher and steadier occupancy, near-zero acquisition cost and no seasonal trough produce a RevPAR that is less impressive in a peak month and considerably more reliable across a decade. You are buying the shape of the curve, not its highest point.'
    },
    {
      q: 'What is the 20% management fee for?',
      a: 'Mevad operates every property in the chain - staffing, corporate rate agreements, F&B, maintenance, everything. The fee is taken off profit, not revenue, and it is taken first: what remains is split among owners strictly by ownership percentage, so Mevad only earns more when the property does.'
    },
    {
      q: 'What is my ownership percentage, exactly?',
      a: 'The amount you invest divided by that property\'s total value at the time you invest. Put in 10% of what a hotel is worth, and you hold 10% of it - and 10% of its distributable profit, for as long as you hold the stake.'
    },
    {
      q: 'When can I invest in the parent company instead of one hotel?',
      a: 'Not yet. Direct ownership in a single, named hotel is open today, starting with Mevad Sanand. The parent company - which will hold a stake across every operating hotel - opens for investment once Mevad has 4-5 hotels running, so that "the chain" is an actual portfolio rather than a promise.'
    },
    {
      q: 'How do I exit?',
      a: 'By selling your stake - in a hotel, or later in the parent company - by agreement with Mevad or to an incoming investor. Neither is a listed instrument, and neither should be treated as liquid. Plan on the full horizon.'
    },
    {
      q: 'Who operates the hotels?',
      a: 'Mevad operates every property in the chain in-house. The brand, the standards and the corporate rate agreements are the asset; outsourcing operations would give away the thing that makes the demand contractual.'
    }
  ],

  legal: {
    disclaimer: 'All figures shown on this website, including every output of the returns calculator, are illustrative projections based on stated assumptions. They are not a forecast, a guarantee, or an offer or invitation to invest. Actual returns will differ, may be materially lower, and may be negative. Hotel investments are illiquid, are exposed to occupancy, rate, regulatory and operator risk, and are not capital-protected. Nothing on this site constitutes investment, legal or tax advice. Prospective investors must read the complete offer documentation and take independent professional advice before committing capital.'
  }
};
