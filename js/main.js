/* ==========================================================================
   MEWAD: SITE BEHAVIOUR
   Renders every data-driven region from data/projects.js, then wires
   navigation, reveal, counters and the accordion.
   ========================================================================== */

(function () {
  'use strict';

  /* Language-aware dataset - Hindi overrides are merged in by prefs.js. */
  function D() { return window.MewadPrefs ? window.MewadPrefs.data() : window.MEWAD; }

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* --- Placeholder banner ------------------------------------------------ */

  function placeholderBanner() {
    /* Banner UI disabled; PLACEHOLDER_MODE still gates the underlying data flag. */
  }

  /* --- Navigation -------------------------------------------------------- */

  function nav() {
    var toggle = $('.nav__toggle');
    var links  = $('.nav__links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? D().words.close : D().words.menu;
    });

    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = D().words.menu;
      }
    });
  }

  /* --- Scroll reveal ----------------------------------------------------- */

  function reveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (i) { i.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

    items.forEach(function (i) { io.observe(i); });
  }

  /* --- Count-up ---------------------------------------------------------- */

  function counters() {
    var els = $$('[data-count]');
    if (!els.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      if (target === 0) { el.textContent = '0' + suffix; return; }

      var dur = 1400, t0 = null;
      function frame(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.5 });

    els.forEach(function (e) { io.observe(e); });
  }

  /* --- Scroll progress ----------------------------------------------------
     A fixed top bar showing how far through the page the reader has
     scrolled - the pitch-deck "slide counter" affordance, done without a
     paginated/snap-scroll rewrite. */

  function progressBar() {
    var fill = $('.progress-bar__fill');
    if (!fill) return;
    function update() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      fill.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* --- Accordion --------------------------------------------------------- */

  function accordion(scope) {
    $$('.acc__q', scope || document).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
      });
    });
  }

  /* --- Renderers --------------------------------------------------------- */

  function renderDemand(mount) {
    if (!mount) return;
    mount.innerHTML = D().demand.map(function (d) {
      return '<div class="demand-col">' +
        '<span class="demand-num">' + d.num + '</span>' +
        '<h3>' + d.title + '</h3>' +
        '<span class="demand-stay">' + d.stay.toUpperCase() + '</span>' +
        '<p>' + d.body + '</p>' +
      '</div>';
    }).join('');
  }

  function renderAssetContrast(mount) {
    if (!mount) return;
    var a = D().asset;
    var specsHtml = '<div class="table-scroll"><table class="table--compact"><tbody>' +
      a.specs.map(function (s) {
        return '<tr><td style="color:var(--text-2)">' + s.k + '</td>' +
               '<td class="num" style="color:var(--text-0)">' + s.v + '</td></tr>';
      }).join('') +
      '</tbody></table></div>';
    mount.innerHTML =
      '<div class="versus__col">' +
        '<div class="versus__head"><span class="versus__swatch" style="background:var(--text-3)"></span><span>What a guest sees</span></div>' +
        '<ul class="versus__list">' + a.guestSide.map(function (line) { return '<li>' + line + '</li>'; }).join('') + '</ul>' +
      '</div>' +
      '<div class="versus__col versus__col--mewad">' +
        '<div class="versus__head"><span class="versus__swatch" style="background:var(--accent)"></span><span>What a plant signs</span></div>' +
        '<ul class="versus__list">' + a.plantSide.map(function (line) { return '<li>' + line + '</li>'; }).join('') + '</ul>' +
        specsHtml +
      '</div>';
  }

  function renderAssetFeatures(mount) {
    if (!mount) return;
    mount.innerHTML = D().asset.features.map(function (f) {
      return '<div class="card"><h4>' + f.title + '</h4><p>' + f.body + '</p></div>';
    }).join('');
  }

  function renderStory(mount) {
    if (!mount) return;
    mount.innerHTML = D().story.map(function (s) {
      return '<div class="card reveal prose"><h3 style="font-size:1.05rem;margin-bottom:.5rem">' + s.heading + '</h3><p>' + s.body + '</p></div>';
    }).join('');
  }

  function renderPerformance(mount) {
    if (!mount) return;
    var p = D().performance;
    mount.innerHTML =
      '<div class="grid grid--2">' +
        '<div class="stat-hero"><span class="stat-hero__value" data-count="' + Math.round(p.capitalDeployedTotal / 100000) + '" data-suffix=" L">0 L</span><span class="stat-hero__label">Capital deployed (historical)</span></div>' +
        '<div class="stat-hero"><span class="stat-hero__value" data-count="' + Math.round(p.operatingProfitTotal / 100000) + '" data-suffix=" L">0 L</span><span class="stat-hero__label">Operating profit generated (historical)</span></div>' +
      '</div>' +
      '<div data-render="cap-chart"></div>' +
      '<p class="lede mt-2">' + p.caption + '</p>';
    renderCapChart($('[data-render="cap-chart"]', mount));
  }

  function renderCapChart(mount) {
    if (!mount) return;
    var rows = D().performance.capitalDeployedBreakdown;
    mount.innerHTML = '<div class="cap-chart">' + rows.map(function (r) {
      var known = typeof r.amount === 'number';
      var pct = known ? Math.round((r.amount / D().performance.capitalDeployedTotal) * 100) : 100;
      return '<div class="cap-chart__row">' +
        '<span class="cap-chart__label">' + r.label + '</span>' +
        '<div class="cap-chart__track">' +
          '<div class="cap-chart__bar' + (known ? '' : ' cap-chart__bar--placeholder') + '" style="width:' + pct + '%"></div>' +
        '</div>' +
        (known ? '' : '<span class="placeholder-tag">' + r.note + '</span>') +
      '</div>';
    }).join('') + '</div>';
  }

  function renderGrowthJourney(mount) {
    if (!mount) return;
    mount.innerHTML = D().growthJourney.map(function (g) {
      return '<div class="tl-item">' +
        '<span class="tl-item__n"></span>' +
        '<div><h4>' + g.step + '</h4><p>' + g.body + '</p></div>' +
      '</div>';
    }).join('');
  }

  var BUSINESS_MODEL_ICONS = ['&#128176;', '&#127959;&#65039;', '&#9881;&#65039;', '&#128200;', '&#8599;&#65039;', '&#128260;'];

  function chainDiagram(mount, steps, icons) {
    if (!mount) return;
    mount.innerHTML = '<div class="chain-diagram">' + steps.map(function (s, i) {
      var title = typeof s === 'string' ? s : s.label;
      var body = typeof s === 'string' ? '' : ('<p>' + s.note + '</p>');
      var icon = (icons && icons[i]) ? '<span class="chain-diagram__icon">' + icons[i] + '</span>' : '';
      return '<div class="chain-diagram__step reveal" style="transition-delay:' + (i * 80) + 'ms"><h4>' + icon + title + '</h4>' + body + '</div>';
    }).join('') + '</div>';
  }

  function renderBusinessModel(mount) { chainDiagram(mount, D().businessModel, BUSINESS_MODEL_ICONS); }
  function renderCapitalAllocation(mount) { chainDiagram(mount, D().capitalAllocation); }

  function renderProof(mount) {
    if (!mount) return;
    var pr = D().proof;
    mount.innerHTML = '<div class="proof-grid">' +
      pr.photos.map(function (p) { return '<div class="proof-frame">' + p.label + '<!-- REPLACE: photo --></div>'; }).join('') +
    '</div>';
  }

  function renderPhilosophy(mount) {
    if (!mount) return;
    mount.innerHTML = D().philosophy.map(function (item) {
      return '<div class="card"><h4>' + item.title + '</h4><p>' + item.body + '</p></div>';
    }).join('');
  }

  function renderWhyInvest(mount) {
    if (!mount) return;
    mount.innerHTML = '<ul class="versus__list">' + D().whyInvest.map(function (line) {
      return '<li>' + line + '</li>';
    }).join('') + '</ul>';
  }

  function renderFounder() {
    var q = $('[data-render-founder-quote]');
    var b = $('[data-render-founder-body]');
    if (q) q.textContent = D().founder.quote;
    if (b) b.textContent = D().founder.body;
  }

  function propertyCard(p) {
    var live = p.status === 'Operational';
    return '<div class="card">' +
      '<div class="card__meta">' +
        '<span class="label">' + p.state + '</span>' +
        (live ? '<span class="chip chip--accent">' + p.status + '</span>' : '') +
      '</div>' +
      '<h3>' + p.name + '</h3>' +
      '<p style="color:var(--text-2);font-family:var(--font-mono);font-size:.75rem;margin-bottom:.9rem">' +
        p.corridor + ' · ' + p.keys + ' ' + D().words.keys + ' · ' + p.opened + '</p>' +
      '<p>' + p.blurb + '</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1.15rem">' +
        p.anchors.map(function (a) { return '<span class="chip">' + a + '</span>'; }).join('') +
      '</div>' +
    '</div>';
  }

  function renderProperties(mount, limit) {
    if (!mount) return;
    var list = limit ? D().properties.slice(0, limit) : D().properties;
    var live = list.filter(function (p) { return p.status === 'Operational'; });
    var pipeline = list.filter(function (p) { return p.status !== 'Operational'; });

    var html = '';
    if (live.length) {
      html += '<div class="chain-group">' +
        '<span class="label label--accent chain-group__label">' + D().words.chainLiveLabel + '</span>' +
        '<div class="grid grid--live">' + live.map(propertyCard).join('') + '</div>' +
      '</div>';
    }
    if (pipeline.length) {
      html += '<div class="chain-group">' +
        '<span class="label chain-group__label">' + D().words.chainPipelineLabel + '</span>' +
        '<div class="grid grid--2">' + pipeline.map(propertyCard).join('') + '</div>' +
      '</div>';
    }
    mount.innerHTML = html;
  }

  function renderStructures(mount) {
    if (!mount) return;
    mount.innerHTML = D().structures.map(function (s) {
      return '<div class="card">' +
        '<div class="card__meta">' +
          '<span class="label label--accent">' + s.short + '</span>' +
          (s.roadmap ? '<span class="chip">Roadmap</span>' : '') +
        '</div>' +
        '<h3>' + s.name + '</h3>' +
        '<p style="color:var(--text-0);margin-bottom:1rem">' + s.summary + '</p>' +
        '<p>' + s.detail + '</p>' +
        '<dl class="result__rows" style="margin-top:1.25rem">' +
          '<div class="result__row"><dt>' + D().words.risk + '</dt><dd style="font-family:var(--font-body);text-align:right;max-width:16rem">' + s.risk + '</dd></div>' +
          '<div class="result__row"><dt>' + D().words.exit + '</dt><dd style="font-family:var(--font-body);text-align:right;max-width:16rem">' + s.liquidity + '</dd></div>' +
          '<div class="result__row"><dt>' + D().words.suits + '</dt><dd style="font-family:var(--font-body);text-align:right;max-width:16rem">' + s.forWho + '</dd></div>' +
        '</dl>' +
      '</div>';
    }).join('');
  }

  function renderJourney(mount) {
    if (!mount) return;
    mount.innerHTML = D().journey.map(function (j) {
      return '<div class="tl-item">' +
        '<span class="tl-item__n"></span>' +
        '<div><h4>' + j.step + '</h4><p>' + j.body + '</p></div>' +
        '<span class="tl-item__where">' + j.where + '</span>' +
      '</div>';
    }).join('');
  }

  function renderFaq(mount) {
    if (!mount) return;
    mount.innerHTML = D().faq.map(function (f, i) {
      return '<div class="acc">' +
        '<button class="acc__q" aria-expanded="false" aria-controls="faq-' + i + '">' +
          '<span>' + f.q + '</span><span class="acc__icon" aria-hidden="true"></span>' +
        '</button>' +
        '<div class="acc__a" id="faq-' + i + '"><div><p>' + f.a + '</p></div></div>' +
      '</div>';
    }).join('');
    accordion(mount);
  }

  /* --- Citations ----------------------------------------------------------
     A figure in the data file carries an optional { label, url } source.
     Markers are numbered here, after every region has rendered, by walking
     [data-source] in document order - so the numbering always reads 1, 2,
     3 down the page regardless of which renderer produced the marker.

     A source with an empty label renders nothing at all. That is the point:
     an unsourced figure must look unsourced, never carry a marker that
     leads nowhere. */

  function sourceAt(path) {
    return path.split('.').reduce(function (o, k) {
      return (o === null || o === undefined) ? o : o[k];
    }, D());
  }

  function renderCitations() {
    var used = [];
    $$('[data-source]').forEach(function (el) {
      var src = sourceAt(el.getAttribute('data-source'));
      if (!src || !src.label) { el.innerHTML = ''; return; }

      /* One number per distinct source, so a report cited three times is
         listed once. */
      var n = 0;
      for (var i = 0; i < used.length; i++) {
        if (used[i].label === src.label && used[i].url === src.url) { n = i + 1; break; }
      }
      if (!n) { used.push(src); n = used.length; }

      el.innerHTML = '<a class="cite" href="#sources"' +
        ' aria-label="' + D().words.source + ' ' + n + '">' + n + '</a>';
    });
    return used;
  }

  function renderSources(mount, used) {
    if (!mount) return;
    var section = mount.closest('section');
    if (!used.length) {
      if (section) section.hidden = true;
      mount.innerHTML = '';
      return;
    }
    if (section) section.hidden = false;
    mount.innerHTML = '<ol class="sources__list">' + used.map(function (s) {
      return '<li>' + (s.url
        ? '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + s.label + '</a>'
        : s.label) + '</li>';
    }).join('') + '</ol>';
  }

  function renderContacts(mount) {
    if (!mount) return;
    var list = (D().brand && D().brand.contacts) || [];
    mount.innerHTML = list.map(function (c) {
      var link = c.email ? 'mailto:' + c.email : (c.phone ? 'tel:' + c.phone : '');
      return '<li>' + (link
        ? '<a href="' + link + '">' + c.name + '</a>'
        : c.name) + '</li>';
    }).join('');
  }

  function renderFooterMeta() {
    $$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
    $$('[data-schedule-link]').forEach(function (e) { e.href = D().brand.schedulingUrl; });
  }

  /* --- Boot -------------------------------------------------------------- */

  /* Everything that is generated from data. Re-runnable, because switching
     language rebuilds these regions from the merged dataset. */
  function renderAll() {
    if (!D()) return;

    /* The "best result" badge is a CSS ::before, so its text has to reach CSS
       as a custom property rather than as DOM content. */
    document.documentElement.style.setProperty('--best-badge', '"' + D().words.bestBadge + '"');

    var bar = $('.placeholder-bar');
    if (bar) bar.textContent = D().words.placeholderNotice;

    renderDemand($('[data-render="demand"]'));
    renderStory($('[data-render="story"]'));
    renderPerformance($('[data-render="performance"]'));
    renderGrowthJourney($('[data-render="growth-journey"]'));
    renderBusinessModel($('[data-render="business-model"]'));
    renderCapitalAllocation($('[data-render="capital-allocation"]'));
    renderProof($('[data-render="proof"]'));
    renderPhilosophy($('[data-render="philosophy"]'));
    renderWhyInvest($('[data-render="why-invest"]'));
    renderFounder();
    renderAssetContrast($('[data-render="asset-contrast"]'));
    renderAssetFeatures($('[data-render="asset-features"]'));
    renderStructures($('[data-render="structures"]'));
    renderJourney($('[data-render="journey"]'));
    renderFaq($('[data-render="faq"]'));
    renderContacts($('[data-render="contacts"]'));
    renderFooterMeta();

    var propsMount = $('[data-render="properties"]');
    if (propsMount) {
      renderProperties(propsMount, propsMount.getAttribute('data-limit')
        ? +propsMount.getAttribute('data-limit') : null);
    }

    if (window.MewadCalculator) {
      window.MewadCalculator.init($('[data-calculator]'));
    }

    /* Last, so every marker on the page exists before it is numbered. */
    renderSources($('[data-render="sources"]'), renderCitations());

    counters();   /* renderFaq wires its own accordion listeners */
  }

  function boot() {
    if (!D()) return;

    placeholderBanner();
    nav();
    progressBar();
    renderAll();

    /* Table-view toggles */
    $$('[data-toggle-table]').forEach(function (btn) {
      var target = $('#' + btn.getAttribute('data-toggle-table'));
      if (!target) return;
      target.hidden = true;
      btn.addEventListener('click', function () {
        target.hidden = !target.hidden;
        btn.textContent = target.hidden ? D().words.showTable : D().words.hideTable;
      });
    });

    reveal();

    /* Static page copy is snapshotted by prefs.js before this point; the
       generated regions above only exist now, so translate the whole document. */
    if (window.MewadPrefs) window.MewadPrefs.translate(document);
  }

  window.MewadRender = { all: renderAll };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
