/* ==========================================================================
   MEVAD PITCH DECK — chart builders
   Pure functions: (data) -> SVG markup string. No DOM access, so these are
   testable directly from Node.
   ========================================================================== */

window.MevadCharts = (function () {
  'use strict';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function timeline(steps) {
    var w = 800, h = 160, gap = w / steps.length;
    var parts = ['<svg viewBox="0 0 ' + w + ' ' + h + '" class="chart chart-timeline">'];
    parts.push('<line x1="20" y1="80" x2="' + (w - 20) + '" y2="80" stroke="var(--line-2)" stroke-width="2"/>');
    steps.forEach(function (s, i) {
      var cx = 20 + gap * i + gap / 2;
      parts.push('<circle cx="' + cx + '" cy="80" r="8" fill="var(--accent)"/>');
      parts.push('<text x="' + cx + '" y="50" text-anchor="middle" fill="var(--text-0)" font-family="var(--font-mono)" font-size="20">' + esc(s.value) + '</text>');
      parts.push('<text x="' + cx + '" y="115" text-anchor="middle" fill="var(--text-1)" font-family="var(--font-mono)" font-size="12">' + esc(s.label) + '</text>');
    });
    parts.push('</svg>');
    return parts.join('');
  }

  function dotMap(cities) {
    var w = 800, h = 200, cols = 4;
    var parts = ['<svg viewBox="0 0 ' + w + ' ' + h + '" class="chart chart-dotmap">'];
    cities.forEach(function (city, i) {
      var col = i % cols, row = Math.floor(i / cols);
      var cx = 100 + col * 180, cy = 60 + row * 90;
      parts.push('<circle cx="' + cx + '" cy="' + cy + '" r="6" fill="var(--series-b)"/>');
      parts.push('<text x="' + cx + '" y="' + (cy + 24) + '" text-anchor="middle" fill="var(--text-0)" font-family="var(--font-mono)" font-size="13">' + esc(city) + '</text>');
    });
    parts.push('</svg>');
    return parts.join('');
  }

  function waterfall(example) {
    var w = 800, h = 220;
    var total = example.distributableProfit;
    var feeH = (example.managementFee / total) * 150;
    var ownH = (example.toOwners / total) * 150;
    var parts = ['<svg viewBox="0 0 ' + w + ' ' + h + '" class="chart chart-waterfall">'];
    parts.push('<rect x="60" y="' + (170 - 150) + '" width="120" height="150" fill="var(--accent-wash)" stroke="var(--line-2)"/>');
    parts.push('<text x="120" y="' + (170 - 150 - 10) + '" text-anchor="middle" fill="var(--text-0)" font-family="var(--font-mono)" font-size="13">Distributable Profit</text>');

    parts.push('<rect x="340" y="' + (170 - feeH) + '" width="120" height="' + feeH + '" fill="var(--series-a)"/>');
    parts.push('<text x="400" y="' + (170 - feeH - 10) + '" text-anchor="middle" fill="var(--text-0)" font-family="var(--font-mono)" font-size="13">Management Fee (' + (example.managementFeePct * 100) + '%)</text>');

    parts.push('<rect x="580" y="' + (170 - ownH) + '" width="120" height="' + ownH + '" fill="var(--series-b)"/>');
    parts.push('<text x="640" y="' + (170 - ownH - 10) + '" text-anchor="middle" fill="var(--text-0)" font-family="var(--font-mono)" font-size="13">To Owners</text>');

    parts.push('<line x1="40" y1="170" x2="760" y2="170" stroke="var(--line-2)" stroke-width="2"/>');
    parts.push('</svg>');
    return parts.join('');
  }

  function trendBar(series) {
    var w = 1000, h = 260, barW = w / series.length;
    var totals = series.map(function (r) { return r.mewad2 + r.mewad3 + r.extra; });
    var max = Math.max.apply(null, totals.map(Math.abs));
    var zero = 190;
    var scale = 90 / max;
    var parts = ['<svg viewBox="0 0 ' + w + ' ' + h + '" class="chart chart-trend">'];
    parts.push('<line x1="0" y1="' + zero + '" x2="' + w + '" y2="' + zero + '" stroke="var(--line-2)"/>');
    series.forEach(function (r, i) {
      var total = r.mewad2 + r.mewad3 + r.extra;
      var barH = Math.abs(total) * scale;
      var y = total >= 0 ? zero - barH : zero;
      parts.push('<rect x="' + (i * barW + 2) + '" y="' + y + '" width="' + (barW - 4) + '" height="' + barH + '" fill="var(--series-b)"/>');
    });
    parts.push('</svg>');
    return parts.join('');
  }

  return { timeline: timeline, dotMap: dotMap, waterfall: waterfall, trendBar: trendBar };
})();

if (typeof module !== 'undefined') { module.exports = window.MevadCharts; }
