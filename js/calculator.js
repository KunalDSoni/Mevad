/* ==========================================================================
   MEWAD: RETURNS CALCULATOR

   Models both investment structures against the same property, amount
   and assumptions, then reports IRR on a full cashflow - not a headline
   yield. Construction delay and stabilisation ramp are applied honestly:
   a property that has not opened does not pay in year one.

   EVERY OUTPUT IS ILLUSTRATIVE. See data/projects.js.
   ========================================================================== */

(function () {
  'use strict';

  /* Language-aware dataset - Hindi overrides merged in by prefs.js. Numbers
     always come from projects.js; only labels differ between languages. */
  function D() { return window.MewadPrefs ? window.MewadPrefs.data() : window.MEWAD; }
  if (!D()) return;

  /* --- Formatting ------------------------------------------------------- */

  function inrGroup(n) {
    n = Math.round(n);
    var s = String(Math.abs(n));
    var last3 = s.slice(-3);
    var rest = s.slice(0, -3);
    if (rest) last3 = ',' + last3;
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return (n < 0 ? '-' : '') + '₹' + rest + last3;
  }

  function inrCompact(n) {
    var a = Math.abs(n);
    if (a >= 10000000) return '₹' + (n / 10000000).toFixed(2).replace(/\.00$/, '') + ' Cr';
    if (a >= 100000)   return '₹' + (n / 100000).toFixed(1).replace(/\.0$/, '') + ' L';
    return inrGroup(n);
  }

  function pct(n, dp) { return n.toFixed(dp === undefined ? 1 : dp) + '%'; }

  /* --- Finance ---------------------------------------------------------- */

  function npv(rate, flows) {
    var v = 0;
    for (var t = 0; t < flows.length; t++) v += flows[t] / Math.pow(1 + rate, t);
    return v;
  }

  /* Bisection IRR. Returns null when the cashflow has no sign change. */
  function irr(flows) {
    var lo = -0.95, hi = 2.0;
    var fLo = npv(lo, flows), fHi = npv(hi, flows);
    if (isNaN(fLo) || isNaN(fHi) || fLo * fHi > 0) return null;

    for (var i = 0; i < 200; i++) {
      var mid = (lo + hi) / 2;
      var fMid = npv(mid, flows);
      if (Math.abs(fMid) < 0.5) return mid;
      if (fLo * fMid < 0) { hi = mid; fHi = fMid; }
      else { lo = mid; fLo = fMid; }
    }
    return (lo + hi) / 2;
  }

  /* --- Timing ------------------------------------------------------------
     A property still being built cannot pay a return. A property that just
     opened does not hit stabilised occupancy in month one.
     ----------------------------------------------------------------------- */

  function timingFor(property) {
    var delay = property.status === 'Operational' ? 0
              : property.status === 'Under construction' ? 2
              : 3;
    return { delay: delay, ramp: [0.60, 0.85] };
  }

  /* Fraction of stabilised performance achieved in year `yr` (1-indexed). */
  function performanceFactor(yr, timing) {
    if (yr <= timing.delay) return 0;
    var sinceOpen = yr - timing.delay;
    if (sinceOpen <= timing.ramp.length) return timing.ramp[sinceOpen - 1];
    return 1;
  }

  /* --- The model --------------------------------------------------------- */

  function portfolioAverages() {
    var ps = D().properties;
    var adr = 0, occ = 0, price = 0, app = 0, margin = 0;
    ps.forEach(function (p) {
      adr += p.adr; occ += p.occupancy; price += p.unitPrice * p.keys;
      app += p.appreciation; margin += p.profitMargin;
    });
    return {
      adr: adr / ps.length,
      occupancy: occ / ps.length,
      propertyPrice: price / ps.length,
      appreciation: app / ps.length,
      profitMargin: margin / ps.length
    };
  }

  /**
   * @param {Object} input  { property, amount, occupancy, adr, horizon }
   * @returns {Array} one result per structure
   *
   * Both structures are the same economics: gross room revenue, less Mewad's
   * flat management fee, split by ownership percentage. "direct" is struck
   * on the one selected property; "spv" is struck on the portfolio blend,
   * because the parent company holds a stake across every hotel rather than
   * one room.
   */
  function model(input) {
    var p = input.property;
    var A = input.amount;
    var N = input.horizon;
    var feePct = D().managementFeePct;

    return D().structures.map(function (s) {
      var isSpv = s.id === 'spv';
      var avg = portfolioAverages();

      /* The SPV sits on portfolio averages rather than this one property - but it
         must still respond to the sliders, or the panel would show one card frozen
         while the other moves. The user's assumptions are applied to the
         portfolio as a proportional shift from the selected property's baseline. */
      var occRatio = p.occupancy ? input.occupancy / p.occupancy : 1;
      var adrRatio = p.adr ? input.adr / p.adr : 1;

      var adr = isSpv ? avg.adr * adrRatio : input.adr;
      var occ = isSpv ? Math.min(95, avg.occupancy * occRatio) : input.occupancy;
      var propertyPrice = isSpv ? avg.propertyPrice : p.unitPrice * p.keys;
      var margin = isSpv ? avg.profitMargin : p.profitMargin;
      var growth = (isSpv ? avg.appreciation : p.appreciation) / 100;
      var timing = isSpv ? { delay: 1, ramp: [0.75] } : timingFor(p);

      var ownershipPct = propertyPrice > 0 ? A / propertyPrice : 0;
      var stabilisedRevenue = p.keys * adr * 365 * (occ / 100);
      var stabilisedProfit = stabilisedRevenue * margin;

      var flows = [-A];
      var incomeTotal = 0;
      var firstFullYear = 0;

      for (var yr = 1; yr <= N; yr++) {
        var f = performanceFactor(yr, timing);
        var profit = stabilisedProfit * f;
        var payout = profit * (1 - feePct) * ownershipPct;

        incomeTotal += payout;
        if (!firstFullYear && f === 1) firstFullYear = payout;

        flows.push(payout);
      }

      /* Exit at the end of the horizon. */
      var exitValue = A * Math.pow(1 + growth, N);
      flows[flows.length - 1] += exitValue;

      var rate = irr(flows);
      var totalReturn = incomeTotal + exitValue;

      return {
        structure: s,
        ownershipPct: ownershipPct * 100,
        irr: rate === null ? null : rate * 100,
        stabilisedAnnual: firstFullYear || 0,
        stabilisedMonthly: (firstFullYear || 0) / 12,
        yieldOnCost: A > 0 ? ((firstFullYear || 0) / A) * 100 : 0,
        incomeTotal: incomeTotal,
        exitValue: exitValue,
        totalReturn: totalReturn,
        multiple: A > 0 ? totalReturn / A : 0,
        firstPayoutYear: timing.delay + 1,
        flows: flows
      };
    });
  }

  /* --- UI ---------------------------------------------------------------- */

  function init(root) {
    if (!root) return;

    var state = {
      propertyId: D().properties[0].id,
      amount: D().calculator.defaultAmount,
      horizon: D().calculator.defaultHorizon,
      scenario: 'base',
      occAdjust: 0,
      adrAdjust: 0
    };

    var C = D().calculator;
    var L = D().calculator.labels, W = D().words;

    root.innerHTML =
      '<div class="calc__grid">' +
        '<div class="calc__controls">' +

          '<div class="field">' +
            '<div class="field__head">' +
              '<span class="label">'+L.investment+'</span>' +
              '<span class="field__value" data-c="amountOut"></span>' +
            '</div>' +
            '<input type="range" data-c="amount" min="' + C.minAmount + '" max="' + C.maxAmount +
              '" step="' + C.stepAmount + '" value="' + state.amount + '" aria-label="Investment amount">' +
            '<div class="field__scale"><span>' + inrCompact(C.minAmount) + '</span><span>' +
              inrCompact(C.maxAmount) + '</span></div>' +
          '</div>' +

          '<div class="field">' +
            '<div class="field__head">' +
              '<span class="label">'+L.horizon+'</span>' +
              '<span class="field__value" data-c="horizonOut"></span>' +
            '</div>' +
            '<input type="range" data-c="horizon" min="5" max="20" step="1" value="' +
              state.horizon + '" aria-label="Holding period in years">' +
            '<div class="field__scale"><span>5 yrs</span><span>20 yrs</span></div>' +
          '</div>' +

          '<div class="field">' +
            '<div class="field__head"><span class="label">'+L.scenario+'</span></div>' +
            '<div class="segmented" data-c="scenario" role="group" aria-label="Scenario">' +
              C.scenarios.map(function (sc) {
                return '<button type="button" data-s="' + sc.id + '" aria-pressed="' +
                  (sc.id === 'base') + '">' + sc.label + '</button>';
              }).join('') +
            '</div>' +
          '</div>' +

          '<div class="field">' +
            '<div class="field__head">' +
              '<span class="label">'+L.occupancy+'</span>' +
              '<span class="field__value" data-c="occOut"></span>' +
            '</div>' +
            '<input type="range" data-c="occ" min="40" max="95" step="1" aria-label="Stabilised occupancy">' +
            '<div class="field__scale"><span>40%</span><span>95%</span></div>' +
          '</div>' +

          '<div class="field">' +
            '<div class="field__head">' +
              '<span class="label">'+L.adr+'</span>' +
              '<span class="field__value" data-c="adrOut"></span>' +
            '</div>' +
            '<input type="range" data-c="adr" min="1200" max="1800" step="50" aria-label="Average daily rate">' +
            '<div class="field__scale"><span>₹1,200</span><span>₹1,800</span></div>' +
          '</div>' +

        '</div>' +

        '<div class="calc__results">' +
          '<div class="figure__head" style="margin-bottom:1.25rem">' +
            '<div class="figure__title">'+L.heading+'</div>' +
            '<div class="figure__sub" data-c="summary"></div>' +
          '</div>' +
          '<div class="results" data-c="results"></div>' +
          '<p class="field__scale" style="margin-top:1rem;line-height:1.6;display:block">' +
            L.footnote + '</p>' +
        '</div>' +
      '</div>';

    var q = function (sel) { return root.querySelector('[data-c="' + sel + '"]'); };

    var ui = {
      amount: q('amount'), amountOut: q('amountOut'),
      horizon: q('horizon'), horizonOut: q('horizonOut'),
      occ: q('occ'), occOut: q('occOut'),
      adr: q('adr'), adrOut: q('adrOut'),
      scenario: q('scenario'), results: q('results'), summary: q('summary')
    };

    function currentProperty() {
      return D().properties.filter(function (p) { return p.id === state.propertyId; })[0];
    }

    /* Scenario changes the *baseline* the sliders sit at. */
    function applyScenarioBaseline() {
      var p = currentProperty();
      var sc = C.scenarios.filter(function (s) { return s.id === state.scenario; })[0];
      var occ = Math.max(40, Math.min(95, Math.round(p.occupancy + sc.occupancyDelta)));
      ui.occ.value = occ;
      ui.adr.value = 1200;
    }

    function render() {
      var p = currentProperty();

      state.amount  = +ui.amount.value;
      state.horizon = +ui.horizon.value;

      var occ = +ui.occ.value;
      var adr = +ui.adr.value;

      ui.amountOut.textContent  = inrCompact(state.amount);
      ui.horizonOut.textContent = state.horizon + ' ' + W.years;
      ui.occOut.textContent     = occ + '%';
      ui.adrOut.textContent     = inrGroup(adr);

      var results = model({
        property: p, amount: state.amount, horizon: state.horizon,
        occupancy: occ, adr: adr
      });

      var best = results.reduce(function (a, b) {
        if (a.irr === null) return b;
        if (b.irr === null) return a;
        return b.irr > a.irr ? b : a;
      });

      ui.summary.textContent = C.summaryTemplate
        .replace('{amount}', inrCompact(state.amount))
        .replace('{property}', p.name)
        .replace('{years}', state.horizon)
        .replace('{occ}', occ)
        .replace('{adr}', inrGroup(adr));

      var prevIrrText = {};
      root.querySelectorAll('.result').forEach(function (card, i) {
        var irrEl = card.querySelector('.result__irr');
        if (irrEl) prevIrrText[i] = irrEl.textContent;
      });

      ui.results.innerHTML = results.map(function (r) {
        var neg = r.irr !== null && r.irr < 0;
        return '<div class="result' + (r === best && results.length > 1 ? ' is-best' : '') + '">' +
          '<div class="result__name">' + r.structure.name + '</div>' +
          '<div class="result__hero">' +
            '<span class="result__irr' + (neg ? ' result__irr--neg' : '') + '">' +
              (r.irr === null ? '-' : pct(r.irr)) + '</span>' +
            '<span class="result__irrlabel">'+W.irr+'</span>' +
          '</div>' +
          '<dl class="result__rows">' +
            '<div class="result__row"><dt>'+L.ownershipPct+'</dt><dd>' + pct(r.ownershipPct, 2) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.payoutYr+'</dt><dd>' + inrCompact(r.stabilisedAnnual) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.perMonth+'</dt><dd>' + inrCompact(r.stabilisedMonthly) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.yieldOnCost+'</dt><dd>' + pct(r.yieldOnCost) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.firstPayout+'</dt><dd>'+W.year+' ' + r.firstPayoutYear + '</dd></div>' +
            '<div class="result__row"><dt>'+L.income+', ' + state.horizon + ' '+W.yrs+'</dt><dd>' + inrCompact(r.incomeTotal) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.exitValue+'</dt><dd>' + inrCompact(r.exitValue) + '</dd></div>' +
            '<div class="result__row"><dt>'+L.multiple+'</dt><dd>' + r.multiple.toFixed(2) + '×</dd></div>' +
          '</dl>' +
        '</div>';
      }).join('');

      if (window.MewadPrefs) window.MewadPrefs.translate(ui.results);

      if (window.MewadMotion) {
        root.querySelectorAll('.result').forEach(function (card, i) {
          var irrEl = card.querySelector('.result__irr');
          if (!irrEl) return;
          var finalText = irrEl.textContent;
          if (prevIrrText[i] !== undefined && prevIrrText[i] !== finalText) {
            irrEl.textContent = prevIrrText[i];
            window.MewadMotion.animateValueChange(irrEl, finalText);
          }
        });
      }
    }

    /* Events */
    ['amount', 'horizon', 'occ', 'adr'].forEach(function (k) {
      ui[k].addEventListener('input', render);
    });

    ui.scenario.addEventListener('click', function (ev) {
      var btn = ev.target.closest('button[data-s]');
      if (!btn) return;
      state.scenario = btn.getAttribute('data-s');
      Array.prototype.forEach.call(this.querySelectorAll('button'), function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      applyScenarioBaseline();
      render();
    });

    applyScenarioBaseline();
    render();
  }

  window.MewadCalculator = { init: init, model: model, format: { inrGroup: inrGroup, inrCompact: inrCompact } };
})();
