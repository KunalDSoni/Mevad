/* ==========================================================================
   MEWAD PITCH DECK — renderer + navigation
   renderSlide/renderAll are pure (data) -> string functions, testable from
   Node without a DOM. mount() is the only part that touches document/window
   chrome, and only runs in a browser.
   ========================================================================== */

window.MewadDeck = (function () {
  'use strict';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function header(slide) {
    return '<div class="slide-kicker">' + esc(slide.kicker || '') + '</div>' +
           '<h1 class="slide-title">' + esc(slide.title) + '</h1>';
  }

  function footnote(slide) {
    if (!slide.footnote) return '';
    var text = (typeof window !== 'undefined' && window.MEWAD_DECK) ? window.MEWAD_DECK.footnoteEstimate : '';
    return '<p class="footnote">' + esc(text) + '</p>';
  }

  var renderers = {
    cover: function (s) {
      return '<div class="slide-kicker">' + esc(s.kicker) + '</div>' +
             '<h1 class="slide-title">' + esc(s.title) + '</h1>' +
             '<p class="slide-body">' + esc(s.subtitle) + '</p>' +
             '<p class="footnote">' + esc(s.closing) + '</p>';
    },
    statement: function (s) {
      return header(s) + '<p class="slide-body">' + esc(s.body) + '</p>';
    },
    iconGrid: function (s) {
      var grid = '<div class="item-grid">' + s.items.map(function (it) {
        return '<div>' + esc(it) + '</div>';
      }).join('') + '</div>';
      var footer = s.footer ? '<p class="slide-body">' + esc(s.footer) + '</p>' : '';
      return header(s) + grid + footer;
    },
    stat: function (s) {
      var row = '<div class="stat-row">' + s.stats.map(function (st) {
        return '<div><div class="stat-k">' + esc(st.k) + '</div><div class="stat-v">' + esc(st.v) + '</div></div>';
      }).join('') + '</div>';
      return header(s) + row;
    },
    revenueList: function (s) {
      var cur = '<div class="item-grid">' + s.current.map(function (it) { return '<div>' + esc(it) + '</div>'; }).join('') + '</div>';
      var fut = '<div class="item-grid">' + s.future.map(function (it) { return '<div>' + esc(it) + ' (future)</div>'; }).join('') + '</div>';
      return header(s) + cur + fut;
    },
    timeline: function (s) {
      var svg = window.MewadCharts ? window.MewadCharts.timeline(s.steps) : '';
      return header(s) + svg;
    },
    dotMap: function (s) {
      var svg = window.MewadCharts ? window.MewadCharts.dotMap(s.cities) : '';
      var footer = s.footer ? '<p class="slide-body">' + esc(s.footer) + '</p>' : '';
      return header(s) + svg + footer;
    },
    waterfall: function (s) {
      var svg = window.MewadCharts ? window.MewadCharts.waterfall(s.example) : '';
      return header(s) + svg;
    },
    financials: function (s) {
      var rows = '<table class="fin-table"><thead><tr><th>Entity</th><th>Investment</th><th>Net Profit</th><th>Outstanding</th></tr></thead><tbody>' +
        s.rows.map(function (r) {
          var cls = r.isTotal ? ' class="fin-total"' : '';
          return '<tr' + cls + '><td>' + esc(r.label) + '</td><td>₹' + r.investment.toLocaleString('en-IN') +
                 '</td><td>₹' + r.netProfit.toLocaleString('en-IN') +
                 '</td><td>₹' + r.outstanding.toLocaleString('en-IN') + '</td></tr>';
        }).join('') + '</tbody></table>';
      var targets = '<div class="stat-row">' + s.targets.map(function (t) {
        return '<div><div class="stat-k">' + esc(t.k) + '</div><div class="stat-v">' + esc(t.v) + '</div></div>';
      }).join('') + '</div>';
      var assumptions = '<ul>' + s.assumptions.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>';
      return header(s) + rows + targets + assumptions + footnote(s);
    },
    trendChart: function (s) {
      var svg = window.MewadCharts ? window.MewadCharts.trendBar(s.series) : '';
      return header(s) + svg + '<p class="slide-body">' + esc(s.note) + '</p>';
    },
    governance: function (s) {
      var receive = s.receive ? '<div class="item-grid">' + s.receive.map(function (it) { return '<div>' + esc(it) + '</div>'; }).join('') + '</div>' : '';
      var cannot = s.cannot ? '<div class="item-grid">' + s.cannot.map(function (it) { return '<div>' + esc(it) + '</div>'; }).join('') + '</div>' : '';
      var approval = s.requiresApproval ? '<p class="slide-body">' + esc(s.requiresApproval) + '</p>' : '';
      return header(s) + receive + cannot + approval;
    },
    ask: function (s) {
      return header(s) + '<p class="slide-body">' + esc(s.body) + '</p>' +
             '<div class="stat-row"><div><div class="stat-k">' + esc(s.contactLabel) + '</div><div class="stat-v">' + esc(s.contactValue) + '</div></div></div>' +
             '<p class="footnote">' + esc(s.closing) + '</p>';
    }
  };

  function renderSlide(slide) {
    var fn = renderers[slide.type];
    if (!fn) throw new Error('no renderer for slide type: ' + slide.type);
    return '<section class="slide" data-slide-id="' + slide.id + '">' + fn(slide) + '</section>';
  }

  function renderAll(slides) {
    return slides.map(renderSlide);
  }

  function mount() {
    var slides = window.MEWAD_DECK.slides;
    var deck = document.getElementById('deck');
    deck.innerHTML = renderAll(slides).join('');

    var els = deck.querySelectorAll('.slide');
    var idx = 0;
    var counter = document.getElementById('counter');

    function show(i) {
      idx = Math.max(0, Math.min(els.length - 1, i));
      els.forEach(function (el, j) { el.classList.toggle('is-active', j === idx); });
      counter.textContent = (idx + 1) + ' / ' + els.length;
    }

    document.getElementById('prev').addEventListener('click', function () { show(idx - 1); });
    document.getElementById('next').addEventListener('click', function () { show(idx + 1); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === ' ') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });

    show(0);
  }

  return { renderSlide: renderSlide, renderAll: renderAll, mount: mount };
})();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', window.MewadDeck.mount);
}
if (typeof module !== 'undefined') { module.exports = window.MewadDeck; }
