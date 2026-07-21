/* ==========================================================================
   MEVAD — CHARTS
   Hand-rolled SVG. No dependencies.
   Palette validated against surface #101114:
     industrial #c98500 x leisure #3987e5 — all-pairs CVD dE 27.4, normal 30.7.
   ========================================================================== */

(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  function el(name, attrs) {
    var node = document.createElementNS(NS, name);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) {
        node.setAttribute(k, attrs[k]);
      }
    }
    return node;
  }

  /* ---------------------------------------------------------------------
     Occupancy line chart — the argument, made visible.
     --------------------------------------------------------------------- */

  function occupancyChart(mount, data) {
    if (!mount) return;

    var W = 860, H = 340;
    var M = { top: 24, right: 108, bottom: 34, left: 40 };
    var iw = W - M.left - M.right;
    var ih = H - M.top - M.bottom;

    var months = data.months;
    var series = data.series;

    var yMin = 20, yMax = 100;

    function x(i) { return M.left + (i / (months.length - 1)) * iw; }
    function y(v) { return M.top + ih - ((v - yMin) / (yMax - yMin)) * ih; }

    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      role: 'img',
      'aria-label': 'Monthly occupancy comparison. The industrial hotel line stays between 73 and 82 percent all year. The leisure hotel line swings from 94 percent in December to 31 percent in July.'
    });

    /* Grid + y axis */
    var grid = el('g', { class: 'chart__grid' });
    var axis = el('g', { class: 'chart__axis' });

    [20, 40, 60, 80, 100].forEach(function (v) {
      grid.appendChild(el('line', { x1: M.left, x2: M.left + iw, y1: y(v), y2: y(v) }));
      var t = el('text', { x: M.left - 10, y: y(v) + 3.5, 'text-anchor': 'end' });
      t.textContent = v + '%';
      axis.appendChild(t);
    });

    /* x axis */
    months.forEach(function (m, i) {
      if (i % 2 !== 0 && months.length > 8) return;
      var t = el('text', { x: x(i), y: M.top + ih + 22, 'text-anchor': 'middle' });
      t.textContent = m;
      axis.appendChild(t);
    });

    svg.appendChild(grid);
    svg.appendChild(axis);

    /* Series. Only the first (hero) series carries an area fill — two
       overlapping translucent fills read as mud and destroy the precise
       comparison this chart exists to make. */
    series.forEach(function (s, si) {
      var d = '';
      s.values.forEach(function (v, i) {
        d += (i === 0 ? 'M' : 'L') + x(i).toFixed(2) + ' ' + y(v).toFixed(2) + ' ';
      });

      if (si === 0) {
        var a = d + 'L' + x(s.values.length - 1).toFixed(2) + ' ' + y(yMin) +
                ' L' + x(0).toFixed(2) + ' ' + y(yMin) + ' Z';
        svg.appendChild(el('path', { d: a, fill: s.color, class: 'chart__area' }));
      }

      var path = el('path', { d: d, stroke: s.color, class: 'chart__line' });
      svg.appendChild(path);

      /* Animate the draw */
      try {
        var len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        path.style.transition = 'stroke-dashoffset 1.5s ' + (si * 0.18) + 's cubic-bezier(0.22,1,0.36,1)';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { path.style.strokeDashoffset = '0'; });
        });
      } catch (e) { /* getTotalLength unsupported — line still renders */ }

      /* Direct label at the line end — identity is never colour-alone */
      var last = s.values[s.values.length - 1];
      var lbl = el('text', {
        x: x(s.values.length - 1) + 12,
        y: y(last) + 4,
        fill: s.color,
        class: 'chart__label'
      });
      lbl.textContent = s.label;
      svg.appendChild(lbl);
    });

    /* Interaction layer */
    var hover = el('g', { opacity: '0' });
    var vline = el('line', { y1: M.top, y2: M.top + ih, class: 'chart__crosshair' });
    hover.appendChild(vline);

    var dots = series.map(function (s) {
      var c = el('circle', { class: 'chart__dot', fill: s.color });
      hover.appendChild(c);
      return c;
    });
    svg.appendChild(hover);

    var hit = el('rect', {
      x: M.left, y: M.top, width: iw, height: ih,
      fill: 'transparent', style: 'cursor:crosshair'
    });
    svg.appendChild(hit);

    mount.appendChild(svg);

    var tip = document.createElement('div');
    tip.className = 'tooltip';
    mount.appendChild(tip);

    function move(ev) {
      var box = svg.getBoundingClientRect();
      var px = ((ev.clientX - box.left) / box.width) * W;
      var i = Math.round(((px - M.left) / iw) * (months.length - 1));
      i = Math.max(0, Math.min(months.length - 1, i));

      hover.setAttribute('opacity', '1');
      vline.setAttribute('x1', x(i));
      vline.setAttribute('x2', x(i));

      series.forEach(function (s, si) {
        dots[si].setAttribute('cx', x(i));
        dots[si].setAttribute('cy', y(s.values[i]));
      });

      var rows = series.map(function (s) {
        return '<div class="tooltip__row">' +
               '<span class="legend__swatch" style="background:' + s.color + '"></span>' +
               '<span>' + s.label + '</span>' +
               '<span class="v">' + s.values[i] + '%</span></div>';
      }).join('');

      tip.innerHTML = '<div class="tooltip__title">' + months[i] + '</div>' + rows;
      tip.classList.add('is-visible');

      var left = (x(i) / W) * box.width;
      var flip = left > box.width - 190;
      tip.style.left = (flip ? left - 180 : left + 16) + 'px';
      tip.style.top = '12px';
    }

    hit.addEventListener('mousemove', move);
    hit.addEventListener('mouseleave', function () {
      hover.setAttribute('opacity', '0');
      tip.classList.remove('is-visible');
    });
  }

  /* ---------------------------------------------------------------------
     Supply-gap bars
     --------------------------------------------------------------------- */

  function supplyGapChart(mount, data) {
    if (!mount) return;

    var rows = data.corridors.slice();
    var max = Math.max(data.benchmark.value, Math.max.apply(null, rows.map(function (r) { return r.value; })));

    var html = rows.map(function (r) {
      return '<div class="bar-row">' +
             '<span class="bar-row__name">' + r.name + '</span>' +
             '<span class="bar-row__track"><span class="bar-row__fill" data-w="' +
               ((r.value / max) * 100).toFixed(1) + '"></span></span>' +
             '<span class="bar-row__val">' + r.value.toFixed(1) + '</span>' +
             '</div>';
    }).join('');

    html += '<div class="bar-row" style="margin-top:.6rem;padding-top:.9rem;border-top:1px solid var(--line-1)">' +
            '<span class="bar-row__name" style="color:var(--text-2)">' + data.benchmark.label + '</span>' +
            '<span class="bar-row__track"><span class="bar-row__fill bar-row__fill--benchmark" data-w="' +
              ((data.benchmark.value / max) * 100).toFixed(1) + '"></span></span>' +
            '<span class="bar-row__val">' + data.benchmark.value.toFixed(1) + '</span>' +
            '</div>';

    mount.innerHTML = '<div class="bars">' + html + '</div>';

    /* Fill on first scroll into view */
    var fills = mount.querySelectorAll('.bar-row__fill');
    function fill() {
      Array.prototype.forEach.call(fills, function (f, i) {
        setTimeout(function () { f.style.width = f.getAttribute('data-w') + '%'; }, i * 80);
      });
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { fill(); io.disconnect(); }
        });
      }, { threshold: 0.25 });
      io.observe(mount);
    } else {
      fill();
    }
  }

  /* ---------------------------------------------------------------------
     Table view — every chart has a readable equivalent
     --------------------------------------------------------------------- */

  function buildTable(data) {
    var head = '<tr><th>Month</th>' + data.series.map(function (s) {
      return '<th class="num">' + s.label + '</th>';
    }).join('') + '</tr>';

    var body = data.months.map(function (m, i) {
      return '<tr><td>' + m + '</td>' + data.series.map(function (s) {
        return '<td class="num">' + s.values[i] + '%</td>';
      }).join('') + '</tr>';
    }).join('');

    return '<div class="table-scroll"><table><thead>' + head +
           '</thead><tbody>' + body + '</tbody></table></div>';
  }

  window.MevadCharts = {
    occupancy: occupancyChart,
    supplyGap: supplyGapChart,
    table: buildTable
  };
})();
