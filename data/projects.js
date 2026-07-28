/* ==========================================================================
   MEWAD: SINGLE SOURCE OF TRUTH
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

window.MEWAD = {

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
    name: 'Mewad',
    parentName: 'Mewad Business Hotels',
    positioning: "India's First Industrial Hotel Chain",
    phone: '+91 00000 00000',
    /* Named contacts shown in the footer. Add `email` or `phone` to an entry
       and it renders as a link; a bare name renders as plain text. */
    contacts: [
      { name: 'Hemendra Sinh Solanki' },
      { name: 'Bheru Singh Rajput' }
    ],
    // Third-party services - swap in real links before launch.
    schedulingUrl: '#',   // Calendly / Zoho Bookings
    kycUrl: '#',          // compliant KYC form provider
    esignUrl: '#'         // Zoho Sign / DocuSign
  },

  /* ---------------------------------------------------------------------
     THE STORY - narrative beats, not paragraphs
     --------------------------------------------------------------------- */
  story: [
    {
      heading: 'One hotel, built for a guest nobody else was building for.',
      body: 'Hotel Mewad opened in Sanand because the guest already existed: engineers and contractors sent by the plants going up around it, with nowhere built for a six-month stay.'
    },
    {
      heading: 'Sanand, because the demand was already there.',
      body: 'An automotive and components cluster with a purchase-order guest, twelve months a year - not a destination anyone visits by choice, which is exactly why the room stayed full.'
    },
    {
      heading: 'The business grew the way a real business grows.',
      body: 'Profit from the first hotel funded the next room, then the next property. Nothing here was funded by a pitch deck before it was funded by an occupied room.'
    }
  ],

  /* ---------------------------------------------------------------------
     MARKET - the numbers behind the thesis
     --------------------------------------------------------------------- */
  market: {
    /* Each figure carries a `source`. Fill BOTH fields only when a real,
       checkable citation supports that exact number: `label` is what the
       reader sees ("CRISIL, Indian Hospitality Report, 2025"), `url` is where
       they can verify it. While `label` is empty the marker renders nothing
       and the Sources section stays hidden, so the site never shows a
       reference it cannot honour. Never cite a source that does not state
       the number it is attached to. */
  },

  /* ---------------------------------------------------------------------
     PERFORMANCE - historical operating figures, not projections.
     Capital deployed and operating profit are real, director-reported
     totals. monthlyTrend is placeholder until real monthly figures are
     supplied - see the REPLACE comment.
     --------------------------------------------------------------------- */
  performance: {
    capitalDeployedTotal: 14900000,   // ~₹1.49 Cr, historical, real
    operatingProfitTotal: 5737000,    // ~₹57.37 L, historical, real
    capitalDeployedBreakdown: [
      { label: 'Additional rooms', amount: null, note: 'REPLACE: category amount' },
      { label: 'Infrastructure improvements', amount: null, note: 'REPLACE: category amount' },
      { label: 'Supporting business assets', amount: null, note: 'REPLACE: category amount' }
    ],
    // Twelve placeholder months. Replace every value with real monthly
    // operating-profit figures before this chart is presented to investors.
    monthlyTrend: [
      { month: 'M1', value: null }, { month: 'M2', value: null }, { month: 'M3', value: null },
      { month: 'M4', value: null }, { month: 'M5', value: null }, { month: 'M6', value: null },
      { month: 'M7', value: null }, { month: 'M8', value: null }, { month: 'M9', value: null },
      { month: 'M10', value: null }, { month: 'M11', value: null }, { month: 'M12', value: null }
    ],
    caption: 'Figures represent actual historical operating performance, not a projection.'
  },

  /* ---------------------------------------------------------------------
     WHO SLEEPS IN A MEWAD HOTEL
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
     THE ASSET - what one Mewad hotel is
     --------------------------------------------------------------------- */
  asset: {
    intro: 'Engineered for a guest who arrives anytime, works a 12-hour shift, and stays for months. Not for a honeymoon.',
    guestSide: [
      'Checks in anytime after a shift change, not a flight.',
      'Kitchen serves hot meals 24x7 - when shifts turn over, not brunch hours.',
      'Packed three shirts for a six-month posting; laundry is industrial-grade, same-day, included.',
      'Sleeps through daylight: blackout curtains, sound isolation, a desk and wired ethernet instead of a view.'
    ],
    plantSide: [
      'An annual rate agreement instead of a per-night booking.',
      'Single-PO billing and GST-clean invoicing a procurement team can actually process.',
      'Occupancy tied to shift rosters and contractor cycles, not seasons or holidays.',
      'A location chosen for the plant gate, under 15 minutes away, not the view.'
    ],
    specs: [
      { k: 'Keys per property',      v: '60 – 90' },
      { k: 'Land footprint',         v: '1.5 – 3.0 acres' },
      { k: 'Distance to anchor gate',v: 'Under 15 minutes' },
      { k: 'F&B hours',              v: '24 / 7, shift-timed' },
      { k: 'Long-stay inventory',    v: '40% of keys' },
      { k: 'Build-to-open',          v: '14 – 18 months' },
      { k: 'Stabilisation',          v: '9 – 12 months' },
      { k: 'Operator',               v: 'Mewad, in-house' }
    ],
    features: [
      { title: 'Shift-aligned kitchens', body: 'Hot meals at 3am and 3pm, because that is when shifts change. Vegetarian, Jain and regional menus as standard.' },
      { title: 'Transport desk',         body: 'Scheduled shuttles to anchor plant gates, timed to shift changes and airport arrivals.' },
      { title: 'Corporate contracting',  body: 'Annual rate agreements, GST-clean invoicing and single-PO billing that a procurement team can actually process.' }
    ]
  },

  /* ---------------------------------------------------------------------
     PROPERTIES
     --------------------------------------------------------------------- */
  properties: [
    {
      id: 'sanand',
      name: 'Mewad Sanand',
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
      id: 'vatva',
      name: 'Mewad Vatva',
      state: 'Gujarat',
      corridor: 'GIDC Vatva · Ahmedabad',
      status: 'Announced',
      keys: 80,
      opened: '2027 (expected)',
      anchors: ['Chemicals', 'Dyes and pigments', 'Engineering'],
      unitPrice: 4200000,
      adr: 4300,
      occupancy: 78,
      appreciation: 7,
      profitMargin: 0.45,
      blurb: 'One of Gujarat\'s oldest and most concentrated chemical estates, still without organised accommodation inside the gate.'
    },
    {
      id: 'naroda',
      name: 'Mewad Naroda',
      state: 'Gujarat',
      corridor: 'GIDC Naroda · Ahmedabad',
      status: 'Announced',
      keys: 76,
      opened: '2027 (expected)',
      anchors: ['Textiles', 'Engineering', 'Plastics'],
      unitPrice: 4100000,
      adr: 4200,
      occupancy: 77,
      appreciation: 7,
      profitMargin: 0.45,
      blurb: 'A dense manufacturing estate on Ahmedabad\'s eastern edge, feeding constant vendor and contractor traffic into the city.'
    },
    {
      id: 'odhav',
      name: 'Mewad Odhav',
      state: 'Gujarat',
      corridor: 'GIDC Odhav · Ahmedabad',
      status: 'Announced',
      keys: 72,
      opened: '2028 (expected)',
      anchors: ['Engineering', 'Auto components', 'Packaging'],
      unitPrice: 4000000,
      adr: 4100,
      occupancy: 76,
      appreciation: 7,
      profitMargin: 0.44,
      blurb: 'A long-established industrial estate absorbing overflow demand from Ahmedabad\'s tighter corridors.'
    },
    {
      id: 'changodar',
      name: 'Mewad Changodar',
      state: 'Gujarat',
      corridor: 'GIDC Changodar · Ahmedabad',
      status: 'Announced',
      keys: 78,
      opened: '2028 (expected)',
      anchors: ['Automotive OEM', 'Auto components', 'Logistics'],
      unitPrice: 4300000,
      adr: 4400,
      occupancy: 78,
      appreciation: 7,
      profitMargin: 0.45,
      blurb: 'A fast-growing corridor on Ahmedabad\'s southwestern edge, drawing overflow from the Sanand automotive cluster next door.'
    }
  ],

  /* ---------------------------------------------------------------------
     INVESTMENT STRUCTURES
     Two structures. Both are profit-share, proportional-ownership models -
     there is no fixed/assured leg. Mewad takes a flat management fee off
     property profit before anything is distributed to owners.
     --------------------------------------------------------------------- */
  managementFeePct: 0.20,   // Mewad's share of property profit, taken first, both structures

  structures: [
    {
      id: 'direct',
      name: 'Direct Property Ownership',
      short: 'Single hotel',
      summary: 'You invest directly into one hotel. Your stake is the share of the property your capital represents - invest 10% of the property\'s value, own 10% of it.',
      ownerShare: null,     // computed per-investment: amount / property price
      assured: null,
      liquidity: 'Sale of your stake, by agreement with Mewad or an incoming investor',
      risk: 'Return moves with that hotel\'s occupancy and rate',
      forWho: 'Investors who want direct exposure to one named property and can accept single-asset variability.',
      detail: 'Mewad operates the hotel and takes a flat 20% management fee off annual profit. The remaining 80% is distributed to owners in proportion to their stake in that specific hotel.'
    },
    {
      id: 'spv',
      name: 'SPV Units (Parent Company)',
      short: 'Parent company',
      summary: 'Units in the Mewad parent entity, which holds a stake across every operating hotel. No single property; exposure to the whole chain.',
      ownerShare: null,
      assured: null,
      portfolioDiversification: true,
      roadmap: true,        // not live yet - opens once 4-5 hotels are operational
      liquidity: 'Unit transfer, subject to the parent company\'s constitutional documents',
      risk: 'Diversified across every hotel in the chain; no single-asset concentration',
      forWho: 'Investors who want the chain rather than one hotel, once the parent company opens for investment.',
      detail: 'The parent company holds an equity stake in every Mewad hotel, including Mewad Sanand. Its own profit - after each hotel\'s 20% management fee - is distributed to parent-company unit holders in proportion to their holding. This structure opens once Mewad is operating 4-5 hotels; direct property ownership is live today, starting with Mewad Sanand.'
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
      footnote: 'Payouts are 80% of property profit (after Mewad\'s 20% management fee), split by ownership percentage. IRR is computed on the full cashflow: capital out at year zero, payouts each year, and sale of the holding at the end of the period. Construction and stabilisation are applied - a property that has not opened does not pay.'
    },
    // Sensitivity applied to the base occupancy for the two side cases.
    scenarios: [
      { id: 'down', label: 'Downside', occupancyDelta: -12, adrDelta: -8 },
      { id: 'base', label: 'Base',     occupancyDelta: 0,   adrDelta: 0  },
      { id: 'up',   label: 'Upside',   occupancyDelta: +7,  adrDelta: +6 }
    ]
  },

  /* ---------------------------------------------------------------------
     GROWTH JOURNEY - animated timeline
     --------------------------------------------------------------------- */
  growthJourney: [
    { step: 'Hotel Mewad',        body: 'The first property opens in Sanand.' },
    { step: 'Expansion',          body: 'Operating profit is reinvested rather than distributed.' },
    { step: 'Additional rooms',   body: 'Inventory added at the original property to meet demand already on the books.' },
    { step: 'Current operations', body: 'The property operating today under Mewad Business Hotels.' },
    { step: 'Future growth',      body: 'The next corridor, funded the same way as the last one.' }
  ],

  /* ---------------------------------------------------------------------
     BUSINESS MODEL - the repeatable loop
     --------------------------------------------------------------------- */
  businessModel: ['Capital', 'Build', 'Operate', 'Generate cash flow', 'Expand', 'Repeat'],

  /* ---------------------------------------------------------------------
     CAPITAL ALLOCATION - how profit became more assets
     --------------------------------------------------------------------- */
  capitalAllocation: [
    { label: 'Capital invested',            note: '~₹1.49 Cr deployed across additional rooms, infrastructure and supporting assets.' },
    { label: 'Assets created',              note: 'Additional rooms and expanded capacity, not just a bigger bank balance.' },
    { label: 'Operating profit generated',  note: '~₹57.37 L in historical operating profit.' },
    { label: 'Expansion',                   note: 'Profit reinvested into the next phase rather than distributed.' },
    { label: 'More assets',                 note: 'Each phase funds the next property.' },
    { label: 'Future growth',               note: 'The same loop, applied to the next industrial corridor.' }
  ],

  /* ---------------------------------------------------------------------
     INVESTOR JOURNEY
     --------------------------------------------------------------------- */
  journey: [
    { step: 'Explore the thesis',      body: 'Understand why industrial hospitality behaves differently from every other hotel asset in India.', where: 'On this site' },
    { step: 'Model your returns',      body: 'Run your own numbers across both structures, including the downside case.',                          where: 'On this site' },
    { step: 'Choose your structure',   body: 'Pick the property, the amount and the return model that matches your risk appetite.',              where: 'On this site' },
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
      q: 'Who operates the hotels?',
      a: 'Mewad operates every property in the chain in-house. The brand, the standards and the corporate rate agreements are the asset; outsourcing operations would give away the thing that makes the demand contractual.'
    },
    {
      q: 'What is the 20% management fee for?',
      a: 'Mewad operates every property in the chain - staffing, corporate rate agreements, F&B, maintenance, everything. The fee is taken off profit, not revenue, and it is taken first: what remains is split among owners strictly by ownership percentage, so Mewad only earns more when the property does.'
    },
    {
      q: 'What is my ownership percentage, exactly?',
      a: 'The amount you invest divided by that property\'s total value at the time you invest. Put in 10% of what a hotel is worth, and you hold 10% of it - and 10% of its distributable profit, for as long as you hold the stake.'
    },
    {
      q: 'When can I invest in the parent company instead of one hotel?',
      a: 'Not yet. Direct ownership in a single, named hotel is open today, starting with Mewad Sanand. The parent company - which will hold a stake across every operating hotel - opens for investment once Mewad has 4-5 hotels running, so that "the chain" is an actual portfolio rather than a promise.'
    },
    {
      q: 'How do I exit?',
      a: 'By selling your stake - in a hotel, or later in the parent company - by agreement with Mewad or to an incoming investor. Neither is a listed instrument, and neither should be treated as liquid. Plan on the full horizon.'
    },
    {
      q: 'What happens if a single anchor factory shuts down?',
      a: 'No Mewad site depends on one tenant. Each property is underwritten against a minimum count of independent anchor employers within a fixed radius, across more than one sector, so that the closure of any single plant is absorbed rather than fatal.'
    },
    {
      q: 'Industrial ADR is lower than city hotels. Why is that good?',
      a: 'It is not good on its own - it is good in combination. Lower rate, far higher and steadier occupancy, near-zero acquisition cost and no seasonal trough produce a RevPAR that is less impressive in a peak month and considerably more reliable across a decade. You are buying the shape of the curve, not its highest point.'
    }
  ],

  /* ---------------------------------------------------------------------
     PROOF - evidence, not claims
     --------------------------------------------------------------------- */
  proof: {
    photos: [
      { label: 'Reception' },
      { label: 'Rooms' },
      { label: 'Restaurant' },
      { label: 'Parking' },
      { label: 'Lobby' }
    ]
  },

  /* ---------------------------------------------------------------------
     INVESTMENT PHILOSOPHY
     --------------------------------------------------------------------- */
  philosophy: [
    { title: 'Capital partners, not landlords', body: 'You hold a stake in an operating asset; you are not managing it.' },
    { title: 'Professional management stays accountable for operations', body: 'Mewad Business Hotels operates every property in the chain, in-house.' },
    { title: 'Transparent governance', body: 'The same figures shown here are the ones the business is run against.' },
    { title: 'Long-term wealth creation', body: 'Built for a multi-year hold, not a quick exit.' }
  ],

  /* ---------------------------------------------------------------------
     WHY INVEST
     --------------------------------------------------------------------- */
  whyInvest: [
    'Real business - operating today, not on paper',
    'Real assets - Hotel Mewad, operating today',
    'Real customers - corporate accounts, not walk-ins',
    'Recurring cash flow - occupancy tied to industrial activity, not tourist seasons',
    'Manufacturing growth - the demand base is expanding independently of Mewad',
    'A scalable model - proven once, now being repeated'
  ],

  /* ---------------------------------------------------------------------
     FOUNDER VISION
     --------------------------------------------------------------------- */
  founder: {
    quote: 'Every great hospitality company started with one hotel.',
    body: 'Ours is Hotel Mewad. The model it proved is what Mewad Business Hotels now intends to repeat across India\'s industrial corridors.'
  },

  /* ---------------------------------------------------------------------
     CLOSING
     --------------------------------------------------------------------- */
  closing: {
    eyebrow: 'Hotel Mewad, Sanand',
    title: 'The first chapter of something much bigger.',
    lines: ['Built in Sanand.', 'Designed for industrial India.', 'Built to scale.']
  }
};
