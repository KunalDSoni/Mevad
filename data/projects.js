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
    placeholderNotice: 'Preview build · every figure on this page is placeholder data, not a real offer'
  },

  brand: {
    name: 'Mevad',
    positioning: "India's First Industrial Hotel Chain",
    email: 'invest@mevad.example',
    phone: '+91 00000 00000',
    // Third-party services — swap in real links before launch.
    schedulingUrl: '#',   // Calendly / Zoho Bookings
    kycUrl: '#',          // compliant KYC form provider
    esignUrl: '#'         // Zoho Sign / DocuSign
  },

  /* ---------------------------------------------------------------------
     MARKET — the numbers behind the thesis
     --------------------------------------------------------------------- */
  market: {
    headline: [
      { value: 0,  suffix: '',  label: 'Organised industrial hotel chains in India',       note: 'Mevad is the first' },
      { value: 40, suffix: '+', label: 'Anchor factories within 5km of a typical site',    note: 'Demand does not need to be marketed' },
      { value: 92, suffix: '%', label: 'Of industrial-corridor demand is weekday',         note: 'Counter-cyclical to leisure hotels' },
      { value: 0,  suffix: '%', label: 'OTA commission on contracted corporate stays',     note: 'Booked direct, on rate agreements' }
    ],

    // Illustrative annual occupancy, Jan–Dec. The single most important
    // chart on the site: stability vs seasonality.
    occupancy: {
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      series: [
        {
          id: 'industrial',
          label: 'Industrial hotel',
          sublabel: 'Mevad model',
          color: 'var(--series-industrial)',
          values: [76, 78, 81, 79, 77, 74, 73, 75, 78, 82, 80, 77]
        },
        {
          id: 'leisure',
          label: 'Leisure hotel',
          sublabel: 'Comparable tier',
          color: 'var(--series-leisure)',
          values: [88, 84, 66, 48, 41, 34, 31, 38, 52, 79, 91, 94]
        }
      ]
    },

    // Organised hotel rooms per 1,000 industrial workers, by corridor.
    // The supply gap, made visible.
    supplyGap: {
      unit: 'organised hotel rooms per 1,000 industrial workers',
      benchmark: { label: 'Business-district benchmark', value: 24 },
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
      title: 'Commissioning teams',
      stay: '4–9 months',
      body: 'A new production line arrives with 30–50 engineers who must be housed continuously until it runs. This is a purchase order, not a booking.'
    },
    {
      title: 'EPC contractors',
      stay: '6–24 months',
      body: 'Plant construction runs for years. Project managers, site supervisors and QA staff rotate through the same block of rooms for the duration.'
    },
    {
      title: 'OEM service engineers',
      stay: '3–15 nights',
      body: 'Every machine on the floor has a service contract behind it. When it stops, someone flies in that night — at whatever rate is available.'
    },
    {
      title: 'Auditors & buyers',
      stay: '2–6 nights',
      body: 'Quality audits, vendor inspections and buying visits run on fixed calendars, and they run whether or not it is tourist season.'
    },
    {
      title: 'Corporate transferees',
      stay: '1–3 months',
      body: 'Staff relocating to a plant need bridge accommodation before family housing. Paid by the employer, on a corporate rate agreement.'
    },
    {
      title: 'Training cohorts',
      stay: '1–4 weeks',
      body: 'Apprentice batches and dealer trainings fill rooms in blocks, booked months ahead against an annual training budget.'
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
      blurb: 'Gujarat\'s most concentrated automotive cluster, with a serviced-hotel supply that never followed the factories in.'
    },
    {
      id: 'dahej',
      name: 'Mevad Dahej',
      state: 'Gujarat',
      corridor: 'Dahej PCPIR · Bharuch',
      status: 'Operational',
      keys: 84,
      opened: '2025',
      anchors: ['Petrochemicals', 'Speciality chemicals', 'Port logistics'],
      unitPrice: 4200000,
      adr: 4600,
      occupancy: 81,
      appreciation: 7,
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
      blurb: 'The centre of India\'s EV build-out, absorbing capital faster than it is absorbing infrastructure.'
    }
  ],

  /* ---------------------------------------------------------------------
     INVESTMENT STRUCTURES
     The calculator models all four against the same property and amount.
     --------------------------------------------------------------------- */
  structures: [
    {
      id: 'revshare',
      name: 'Ownership + Revenue Share',
      short: 'Revenue share',
      summary: 'You own a specific, registered room. You receive a share of what that room earns.',
      ownerShare: 0.36,     // owner's share of GROSS room revenue, net of operating costs
      assured: null,
      liquidity: 'Resale of the registered unit',
      risk: 'Return moves with occupancy',
      forWho: 'Investors who want the upside of a performing asset and can accept variability.',
      detail: 'Room revenue is calculated as ADR × 365 × occupancy. Operating costs are borne by Mevad; the owner\'s share is struck on net room revenue and paid quarterly.'
    },
    {
      id: 'assured',
      name: 'Ownership + Assured Return',
      short: 'Assured return',
      summary: 'You own the room. Mevad leases it back at a fixed annual rate, regardless of occupancy.',
      ownerShare: null,
      assured: 0.075,       // 7.5% of invested capital per year — below the base-case
                            // revenue share, because certainty is paid for in upside
      liquidity: 'Resale of the registered unit',
      risk: 'Fixed payment, dependent on Mevad\'s covenant',
      forWho: 'Investors who value predictability over participation in upside.',
      detail: 'A lease/licence agreement fixes the annual payment. It does not vary with occupancy — which also means it does not rise when the property outperforms.'
    },
    {
      id: 'hybrid',
      name: 'Hybrid — Floor then Share',
      short: 'Hybrid',
      summary: 'A guaranteed floor while the property stabilises, then a revenue share once it does.',
      ownerShare: 0.32,
      assured: 0.07,
      floorYears: 3,
      liquidity: 'Resale of the registered unit',
      risk: 'Protected early, variable later',
      forWho: 'Investors backing a pre-opening property who want cover during ramp-up.',
      detail: 'For the first three years the owner receives the higher of the floor or the revenue share. From year four it is revenue share only, at a slightly lower owner percentage in exchange for the earlier protection.'
    },
    {
      id: 'spv',
      name: 'SPV Units',
      short: 'SPV units',
      summary: 'Units in the entity that holds several Mevad hotels. No specific room; exposure to the portfolio.',
      ownerShare: 0.34,
      assured: null,
      portfolioDiversification: true,
      liquidity: 'Unit transfer, subject to the SPV agreement',
      risk: 'Diversified across properties; no single-asset concentration',
      forWho: 'Investors who want the chain rather than one hotel, at a lower entry ticket.',
      detail: 'Returns are struck on the blended performance of every property in the SPV, which smooths the ramp-up of any single asset. Entry tickets are smaller because no whole room is being purchased.'
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
      heading: 'All four structures, same money',
      payoutYr: 'Stabilised payout / yr',
      perMonth: 'Per month',
      yieldOnCost: 'Yield on cost',
      firstPayout: 'First payout',
      income: 'Income',
      exitValue: 'Exit value',
      multiple: 'Total / invested',
      footnote: 'IRR is computed on the full cashflow: capital out at year zero, payouts each year, and sale of the holding at the end of the period. Construction and stabilisation are applied — a property that has not opened does not pay.'
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
    { step: 'Model your returns',      body: 'Run your own numbers across all four structures, including the downside case.',                     where: 'On this site' },
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
      a: 'It is not good on its own — it is good in combination. Lower rate, far higher and steadier occupancy, near-zero acquisition cost and no seasonal trough produce a RevPAR that is less impressive in a peak month and considerably more reliable across a decade. You are buying the shape of the curve, not its highest point.'
    },
    {
      q: 'Is the assured return guaranteed?',
      a: 'It is a contractual obligation of the operating entity, not a guarantee in the regulatory sense, and it is only as strong as the covenant behind it. That is precisely why the calculator on this site shows you the revenue-share case alongside it: you should understand what the asset actually earns before choosing to be paid a fixed sum from it.'
    },
    {
      q: 'Can I use the room myself?',
      a: 'Owner stay entitlements are defined in the agreement and vary by structure. They are limited by design — an inventory that owners occupy is an inventory that is not earning.'
    },
    {
      q: 'How do I exit?',
      a: 'Ownership structures are exited by selling the registered unit; SPV units are transferred under the terms of the SPV agreement. Neither is a listed instrument, and neither should be treated as liquid. Plan on the full horizon.'
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
