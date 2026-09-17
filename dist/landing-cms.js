/**
 * Phoenix Tours - Dynamic Landing Page CMS Engine
 * Syncs landing page content with customizations stored in localStorage (phoenixLandingCMS).
 */
(function() {
  function getPageKey() {
    var path = (window.location.pathname + window.location.search).toLowerCase();
    if (path.indexOf('desert-safari') !== -1) return 'safari';
    if (path.indexOf('quad-bike') !== -1) return 'quad';
    if (path.indexOf('dune-buggy') !== -1 || path.indexOf('buggy') !== -1) return 'buggy';
    if (path.indexOf('burj-khalifa') !== -1 || path.indexOf('lake-ride') !== -1) return 'lake-ride';
    if (path.indexOf('dubai-city') !== -1) return 'dubai-city';
    if (path.indexOf('abu-dhabi') !== -1) return 'abu-dhabi';
    return null;
  }

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function applyLandingCMS() {
    var pageKey = getPageKey();
    if (!pageKey) return;

    var defaults = window.PHOENIX_DEFAULT_LANDING_PAGES && window.PHOENIX_DEFAULT_LANDING_PAGES[pageKey];
    if (!defaults) return;

    var stored = {};
    try {
      var raw = localStorage.getItem('phoenixLandingCMS');
      if (raw) stored = JSON.parse(raw);
    } catch (e) {
      console.warn('Error reading phoenixLandingCMS', e);
    }

    var custom = stored[pageKey];
    if (!custom) return; // Keep pre-rendered static markup if no custom edits saved

    var data = {
      name: custom.name || defaults.name,
      hero: Object.assign({}, defaults.hero, custom.hero || {}),
      narrative: Object.assign({}, defaults.narrative, custom.narrative || {}),
      packages: custom.packages && custom.packages.length ? custom.packages : defaults.packages,
      highlights: custom.highlights && custom.highlights.length ? custom.highlights : defaults.highlights,
      faqs: custom.faqs && custom.faqs.length ? custom.faqs : defaults.faqs
    };

    // 1. HERO SECTION
    if (data.hero) {
      var heroEyebrow = document.querySelector('.hero .eyebrow, .sands-hero .sands-eyebrow, .sands-hero .eyebrow');
      if (heroEyebrow && data.hero.eyebrow) heroEyebrow.textContent = data.hero.eyebrow;

      var heroH1 = document.querySelector('.hero h1, .sands-hero h1');
      if (heroH1 && data.hero.title) heroH1.textContent = data.hero.title;

      var heroSub = document.querySelector('.hero-content p, .sands-hero-sub, .sands-hero p');
      if (heroSub && data.hero.subtitle) heroSub.textContent = data.hero.subtitle;

      var heroImg = document.querySelector('.hero-image, .sands-hero-media img');
      if (heroImg && data.hero.image) heroImg.src = data.hero.image;

      var trustRow = document.querySelector('.trust-row, .sands-trust');
      if (trustRow && Array.isArray(data.hero.trust) && data.hero.trust.length) {
        trustRow.innerHTML = data.hero.trust.map(function(t) {
          return '<span>' + esc(t) + '</span>';
        }).join('');
      }
    }

    // 2. NARRATIVE SECTION
    if (data.narrative) {
      var narrativeEyebrow = document.querySelector('.sands-narrative .eyebrow, .sands-narrative .sands-eyebrow');
      if (narrativeEyebrow && data.narrative.eyebrow) narrativeEyebrow.textContent = data.narrative.eyebrow;

      var narrativeH2 = document.querySelector('.sands-narrative h2');
      if (narrativeH2 && data.narrative.title) narrativeH2.textContent = data.narrative.title;

      var narrativeLead = document.querySelector('.sands-lead');
      if (narrativeLead && data.narrative.lead) narrativeLead.textContent = data.narrative.lead;

      var narrativeBody = document.querySelector('#landingNarrativeBody, .sands-narrative p:not(.sands-lead)');
      if (narrativeBody && data.narrative.body) narrativeBody.textContent = data.narrative.body;
    }

    // 3. HIGHLIGHTS
    if (Array.isArray(data.highlights) && data.highlights.length) {
      var hlContainer = document.querySelector('#landingHighlightsList, .sands-highlights');
      if (hlContainer) {
        hlContainer.innerHTML = data.highlights.map(function(item) {
          return '<li><span class="sands-dot">•</span><span>' + esc(item) + '</span></li>';
        }).join('');
      }
    }

    // 4. PACKAGES / PRICING
    if (Array.isArray(data.packages) && data.packages.length) {
      var pkgContainer = document.querySelector('#landingPackagesContainer, #safari-packages, #city-packages, #packages, .safari-packages-grid');
      if (pkgContainer) {
        // Render custom styled cards
        pkgContainer.innerHTML = data.packages.map(function(pkg) {
          var waText = encodeURIComponent(pkg.waMsg || ('Hi Phoenix Tours, I would like to book ' + pkg.name + ' at AED ' + pkg.price + '.'));
          var waUrl = 'https://wa.me/971561505270?text=' + waText;
          var inclHtml = Array.isArray(pkg.inclusions) && pkg.inclusions.length
            ? '<ul style="list-style:none;padding:0;margin:16px 0;display:grid;gap:8px;font-size:13px;color:#4f6b73;">' +
              pkg.inclusions.map(function(inc) {
                return '<li style="display:flex;align-items:flex-start;gap:8px;"><span style="color:#18aaa6;font-weight:900;">✓</span><span>' + esc(inc) + '</span></li>';
              }).join('') +
              '</ul>'
            : '';

          return '<article class="safari-package-card' + (pkg.badge ? ' featured' : '') + '" style="background:#fff;border:1px solid #dce8e5;border-radius:18px;padding:24px;display:flex;flex-direction:column;position:relative;box-shadow:0 8px 24px rgba(6,60,73,0.06);">' +
            (pkg.badge ? '<span class="package-badge" style="position:absolute;top:-12px;right:20px;background:linear-gradient(135deg,#c59238,#e2b45e);color:#063c49;padding:4px 12px;border-radius:999px;font-size:10px;font-weight:900;letter-spacing:0.8px;text-transform:uppercase;">' + esc(pkg.badge) + '</span>' : '') +
            '<h3 style="font-size:20px;color:#063c49;margin:0 0 6px;">' + esc(pkg.name) + '</h3>' +
            (pkg.desc ? '<p style="font-size:13px;color:#617c84;margin:0 0 16px;line-height:1.5;">' + esc(pkg.desc) + '</p>' : '') +
            '<div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #edf4f2;">' +
              '<span style="font-size:32px;font-weight:900;color:#063c49;">AED ' + Number(pkg.price || 0).toLocaleString() + '</span>' +
              (pkg.unit ? '<span style="font-size:12px;color:#7c9197;margin-left:6px;">/ ' + esc(pkg.unit) + '</span>' : '') +
            '</div>' +
            inclHtml +
            '<div style="margin-top:auto;padding-top:18px;display:flex;gap:10px;flex-wrap:wrap;">' +
              '<a href="' + waUrl + '" target="_blank" rel="noopener" class="btn btn-primary" style="flex:1;text-align:center;padding:12px 18px;border-radius:10px;font-weight:800;font-size:13px;background:linear-gradient(135deg,#063c49,#18aaa6);color:#fff;text-decoration:none;display:inline-block;">Book on WhatsApp</a>' +
              '<a href="/book?tour=' + encodeURIComponent(pkg.name) + '" class="btn btn-ghost" style="padding:12px 16px;border-radius:10px;font-weight:800;font-size:13px;border:1px solid #18aaa6;color:#063c49;text-decoration:none;display:inline-block;">Online Form</a>' +
            '</div>' +
          '</article>';
        }).join('');
      }
    }

    // 5. FAQS
    if (Array.isArray(data.faqs) && data.faqs.length) {
      var faqContainer = document.querySelector('#landingFaqContainer, .sands-faq-grid');
      if (faqContainer) {
        faqContainer.innerHTML = data.faqs.map(function(item) {
          return '<details style="background:#fff;border:1px solid #dce8e5;border-radius:12px;padding:16px 20px;margin-bottom:12px;box-shadow:0 4px 12px rgba(6,60,73,0.03);">' +
            '<summary style="font-weight:800;color:#063c49;cursor:pointer;font-size:15px;line-height:1.4;outline:none;">' + esc(item.q) + '</summary>' +
            '<p style="margin:12px 0 0;font-size:14px;color:#4f6b73;line-height:1.65;">' + esc(item.a) + '</p>' +
          '</details>';
        }).join('');
      }
    }
  }

  // Run on DOMContentLoaded or immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLandingCMS);
  } else {
    applyLandingCMS();
  }

  window.refreshLandingCMS = applyLandingCMS;
})();
