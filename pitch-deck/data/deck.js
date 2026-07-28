/* ==========================================================================
   MEVAD INVESTOR PITCH DECK — DATA
   Every number and label on every slide lives here. No figure is hardcoded
   into index.html or js/*.js.
   ========================================================================== */

window.MEVAD_DECK = {
  footnoteEstimate: 'Estimated at 100% based on director\'s reported ownership share (20% / 30%); pending audited confirmation.',

  slides: [
    {
      id: 1, type: 'cover',
      kicker: 'INVESTOR PRESENTATION',
      title: 'Mevad',
      subtitle: 'India\'s first scalable Industrial Business Hotel chain',
      closing: 'Building the Hospitality Infrastructure Behind India\'s Manufacturing Revolution.'
    },
    {
      id: 2, type: 'statement',
      kicker: 'THE PROBLEM',
      title: 'Industrial India has nowhere good to sleep',
      body: 'Thousands of industrial estates run on visiting professionals — engineers, auditors, contractors, project teams — who need accommodation every single week of the year. The hotel supply around those estates was never built for them.'
    },
    {
      id: 3, type: 'iconGrid',
      kicker: 'WHO NEEDS IT',
      title: 'Every industrial cluster runs on visiting professionals',
      items: ['Engineers', 'Consultants', 'Factory Auditors', 'Machine Installation Teams', 'Vendor Representatives', 'Contractors', 'Project Teams', 'Training Staff']
    },
    {
      id: 4, type: 'iconGrid',
      kicker: 'THE GAP',
      title: 'What\'s there today misses the guest completely',
      items: ['Old and poorly maintained', 'Inconsistent standards', 'Built for tourists, not business travel', 'No real business facilities', 'Poor internet', 'Poor service', 'No long-stay facilities']
    },
    {
      id: 5, type: 'statement',
      kicker: 'OUR SOLUTION',
      title: 'Premium Business Hotels for Industrial India',
      body: 'Not a luxury hotel. Not a budget lodge. A category built specifically for the industrial business traveller — consistent, corporate-ready, and priced for a segment that stays days to months, not one night.'
    },
    {
      id: 6, type: 'iconGrid',
      kicker: 'TARGET GUEST',
      title: 'One guest profile, engineered for',
      items: ['Engineers', 'Supervisors', 'Plant Managers', 'Vendor Teams', 'Corporate Visitors', 'Auditors', 'Consultants', 'Long-Stay Guests']
    },
    {
      id: 7, type: 'iconGrid',
      kicker: 'THE PRODUCT',
      title: 'What every Mevad hotel includes',
      items: ['Premium Reception', 'Business Lounge', 'Landscaped Courtyard', 'Café', 'Meeting Room', 'Laundry', 'High-Speed WiFi', 'Corporate-Friendly Rooms', 'Long-Stay Packages', 'Digital Check-in', 'Future EV Charging'],
      footer: 'Every building is designed for future vertical expansion from day one.'
    },
    {
      id: 8, type: 'stat',
      kicker: 'PROOF POINT',
      title: 'Hotel Mevad Palace, Sanand — operating today',
      stats: [
        { k: 'Rooms', v: '21' },
        { k: 'Average room rate', v: '₹1,200 / night' },
        { k: 'Positioning', v: 'Budget business hotel' },
        { k: 'Status', v: 'Existing, profitable operations' }
      ]
    },
    {
      id: 9, type: 'iconGrid',
      kicker: 'WHY SANAND',
      title: 'One of India\'s largest industrial hubs',
      items: ['Tata Motors', 'MG Motor', 'Auto Component Manufacturers', 'Japanese Companies', 'Korean Suppliers', 'Engineering Companies'],
      footer: 'Thousands of visiting professionals pass through Sanand GIDC every month, and demand is increasing every year.'
    },
    {
      id: 10, type: 'revenueList',
      kicker: 'BUSINESS MODEL',
      title: 'Eight revenue streams today, two more on the roadmap',
      current: ['Room Revenue', 'Restaurant / Café', 'Laundry', 'Meeting Room Rentals', 'Corporate Monthly Contracts', 'Business Lounge', 'Shuttle Services', 'EV Charging'],
      future: ['Rooftop Restaurant', 'Training Centre']
    },
    {
      id: 11, type: 'timeline',
      kicker: 'PHASE 1',
      title: 'From 21 rooms to 47 — then beyond',
      steps: [
        { label: 'Current hotel', value: '21 rooms' },
        { label: 'Phase-2 expansion', value: '+26 rooms' },
        { label: 'Total after Phase-2', value: '47 rooms' }
      ]
    },
    {
      id: 12, type: 'stat',
      kicker: 'FUTURE',
      title: 'Every building holds a G+2 provision',
      stats: [
        { k: 'Phase-2 footprint', v: 'G+2 ready' },
        { k: 'Rooms after additional floors', v: '94+' }
      ]
    },
    {
      id: 13, type: 'dotMap',
      kicker: 'EXPANSION ROADMAP',
      title: 'After Sanand stabilises, the next corridors',
      cities: ['Changodar', 'Becharaji', 'Halol', 'Dahej', 'Vithalapur', 'Pune', 'Hosur', 'Sriperumbudur'],
      footer: 'The objective is to build India\'s largest Industrial Hospitality Brand.'
    },
    {
      id: 14, type: 'statement',
      kicker: 'VISION',
      title: 'India\'s leading Industrial Business Hotel chain',
      body: 'Not one hotel. A repeatable, scalable platform — the same product, the same standards, dropped into every industrial corridor in the country that currently has none of it.'
    },
    {
      id: 15, type: 'stat',
      kicker: 'INVESTMENT MODEL',
      title: 'Investors become Capital Partners',
      stats: [
        { k: 'Minimum investment', v: '₹5 lakh (customisable)' },
        { k: 'Ownership', v: 'Proportional to investment' },
        { k: 'Distributions', v: 'Annual profit distribution' }
      ]
    },
    {
      id: 16, type: 'iconGrid',
      kicker: 'INVESTOR BENEFITS',
      title: 'What a Capital Partner holds',
      items: ['Cash Flow', 'Asset Appreciation', 'Portfolio Expansion', 'Long-Term Wealth Creation']
    },
    {
      id: 17, type: 'governance',
      kicker: 'GOVERNANCE',
      title: 'Investors are financial partners — what they receive',
      receive: ['Quarterly Reports', 'Audited Financial Statements', 'Annual Profit Distribution', 'Annual Investor Meeting']
    },
    {
      id: 18, type: 'governance',
      kicker: 'GOVERNANCE',
      title: 'Management operates; investors don\'t',
      cannot: ['Interfere in operations', 'Hire staff', 'Negotiate vendor contracts', 'Decide pricing', 'Control management'],
      requiresApproval: 'Major decisions — sale of the property, merger or liquidation — require investor approval.'
    },
    {
      id: 19, type: 'waterfall',
      kicker: 'MANAGEMENT FEE',
      title: '20% of distributable profit, then owners split the rest',
      example: {
        distributableProfit: 1000000,
        managementFeePct: 0.20,
        managementFee: 200000,
        toOwners: 800000
      }
    },
    {
      id: 20, type: 'financials',
      kicker: 'FINANCIALS',
      title: 'Mevad Sanand Hotel — current hotel + Phase-2, combined',
      footnote: true,
      rows: [
        { label: 'Current hotel (Mewad-2 + Extra Room)', investment: 15187270, netProfit: 11255860, outstanding: 3931410 },
        { label: 'Phase-2 (Mewad-3 + Shade Work Exp)', investment: 36274890, netProfit: 11420533, outstanding: 24854357 },
        { label: 'Combined', investment: 51462160, netProfit: 22676393, outstanding: 28785767, isTotal: true }
      ],
      assumptions: [
        'Current hotel figures scaled ×5 from a director\'s reported 20% ownership share.',
        'Phase-2 figures scaled ×3.33 from a director\'s reported 30% ownership share.',
        'Scrap Business entity excluded — unrelated to hotel operations.',
        'EBITDA and ROI targets below are management projections, not audited figures.'
      ],
      targets: [
        { k: 'Target EBITDA margin', v: '40–45%' },
        { k: 'Long-term investor ROI objective', v: '17–20%' }
      ]
    },
    {
      id: 21, type: 'trendChart',
      kicker: 'FINANCIAL TREND',
      title: 'Monthly profit, reported — one director\'s share',
      note: 'Unscaled. Shown to illustrate trajectory, not a claimed total.',
      series: [
        { m: 'Nov\'23–Dec\'23', mewad2: 70032.80, mewad3: 0, extra: 0 },
        { m: 'Jan-24', mewad2: 65289.40, mewad3: 0, extra: 0 },
        { m: 'Feb-24', mewad2: 62266.80, mewad3: 0, extra: 0 },
        { m: 'Mar-24', mewad2: 71500.00, mewad3: 0, extra: 0 },
        { m: 'Apr-24', mewad2: 70420.00, mewad3: 0, extra: 0 },
        { m: 'May-24', mewad2: 58913.00, mewad3: 2386.10, extra: 0 },
        { m: 'Jun-24', mewad2: 49644.80, mewad3: 112118.50, extra: 0 },
        { m: 'Jul-24', mewad2: 38672.40, mewad3: 23443.50, extra: 0 },
        { m: 'Aug-24', mewad2: 87295.40, mewad3: 28242.00, extra: 0 },
        { m: 'Sep-24', mewad2: 62572.60, mewad3: 152197.00, extra: 0 },
        { m: 'Oct-24', mewad2: 11716.80, mewad3: -72921.00, extra: 0 },
        { m: 'Nov-24', mewad2: -6470.00, mewad3: 213213.00, extra: 0 },
        { m: 'Dec-24', mewad2: 46628.20, mewad3: 180268.00, extra: 16200.00 },
        { m: 'Jan-25', mewad2: 42694.00, mewad3: 142280.00, extra: 1320.00 },
        { m: 'Feb-25', mewad2: 21762.60, mewad3: 75639.00, extra: 12870.00 },
        { m: 'Mar-25', mewad2: 23258.60, mewad3: 215558.00, extra: 9090.00 },
        { m: 'Apr-25', mewad2: 57081.00, mewad3: 116768.00, extra: 39810.00 },
        { m: 'May-25', mewad2: 69352.80, mewad3: 129821.00, extra: 61290.00 },
        { m: 'Jun-25', mewad2: 69730.40, mewad3: 61365.00, extra: 78900.00 },
        { m: 'Jul-25', mewad2: 97936.40, mewad3: 45806.00, extra: 87720.00 },
        { m: 'Aug-25', mewad2: 77089.77, mewad3: 226480.00, extra: 76110.00 },
        { m: 'Sep-25', mewad2: 30397.07, mewad3: 77418.00, extra: 35100.00 },
        { m: 'Oct-25', mewad2: 4751.00, mewad3: 260621.00, extra: 18600.00 },
        { m: 'Nov-25', mewad2: 34767.80, mewad3: 290904.00, extra: 42600.00 },
        { m: 'Dec-25', mewad2: 22997.35, mewad3: 191062.00, extra: 36900.00 },
        { m: 'Jan-26', mewad2: 65231.03, mewad3: 123897.05, extra: 63180.00 },
        { m: 'Feb-26', mewad2: 4707.72, mewad3: 29550.00, extra: 118306.20 },
        { m: 'Mar-26', mewad2: 41227.75, mewad3: 255110.00, extra: 40080.00 },
        { m: 'Apr-26', mewad2: 27154.94, mewad3: 172891.00, extra: 48750.00 },
        { m: 'May-26', mewad2: 25663.30, mewad3: 174981.70, extra: 56220.00 },
        { m: 'Jun-26', mewad2: 63960.00, mewad3: 108305.00, extra: 28635.87 }
      ]
    },
    {
      id: 22, type: 'iconGrid',
      kicker: 'WHY INVEST',
      title: 'The case in eight lines',
      items: ['India\'s Manufacturing Boom', 'Growing Industrial Corridors', 'Real Estate Asset Backing', 'Recurring Cash Flow', 'Scalable Business Model', 'Experienced Promoters', 'Multiple Revenue Streams', 'Long-Term Expansion Strategy']
    },
    {
      id: 23, type: 'iconGrid',
      kicker: 'LONG-TERM VISION',
      title: '50+ Industrial Hotels across India',
      items: ['Preferred accommodation partner for manufacturing companies', 'A recognisable national hospitality brand'],
      footer: 'Potential exits: REIT · IPO · Strategic Sale · Private Equity Acquisition'
    },
    {
      id: 24, type: 'ask',
      kicker: 'THE ASK',
      title: 'Join us in building it',
      body: 'Minimum investment ₹5 lakh, customisable, proportional ownership, annual distributions.',
      contactLabel: 'Contact',
      contactValue: 'invest@mevad.in',
      closing: 'Building the Hospitality Infrastructure Behind India\'s Manufacturing Revolution.'
    }
  ]
};
