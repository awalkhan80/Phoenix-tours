// Phoenix Tours - Landing Pages CMS Runtime Engine
(function() {
  function getPageKey() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('safari')) return 'safari';
    if (path.includes('quad')) return 'quad';
    if (path.includes('buggy')) return 'buggy';
    if (path.includes('lake') || path.includes('burj')) return 'lake-ride';
    if (path.includes('abu-dhabi') || path.includes('abudhabi')) return 'abu-dhabi';
    if (path.includes('city')) return 'dubai-city';
    return null;
  }

  function applyLandingCMS() {
    const pageKey = getPageKey();
    if (!pageKey) return;

    let stored = {};
    try {
      const raw = localStorage.getItem('phoenixLandingCMS');
      if (raw) stored = JSON.parse(raw);
    } catch (e) {}

    const defaults = (window.PHOENIX_DEFAULT_LANDING_PAGES && window.PHOENIX_DEFAULT_LANDING_PAGES[pageKey]) || {};
    const pageData = Object.assign({}, defaults, stored[pageKey] || {});

    // 1. Hero
    if (pageData.hero) {
      const hero = pageData.hero;
      const heroImg = document.querySelector('.hero-image, .sands-hero img');
      if (heroImg && hero.image) heroImg.src = hero.image;

      const heroEyebrow = document.querySelector('.hero-content .eyebrow, .sands-hero .eyebrow');
      if (heroEyebrow && hero.eyebrow) heroEyebrow.textContent = hero.eyebrow;

      const heroH1 = document.querySelector('.hero-content h1, .sands-hero h1');
      if (heroH1 && hero.title) heroH1.textContent = hero.title;

      const heroP = document.querySelector('.hero-content > p, .sands-hero p');
      if (heroP && hero.subtitle) heroP.textContent = hero.subtitle;

      if (Array.isArray(hero.trust) && hero.trust.length) {
        const trustRow = document.querySelector('.trust-row, .sands-trust-row');
        if (trustRow) {
          trustRow.innerHTML = hero.trust.map(t => `<span>${t}</span>`).join('');
        }
      }
    }

    // 2. Narrative
    if (pageData.narrative) {
      const narrative = pageData.narrative;
      const narrEye = document.querySelector('.sands-narrative .eyebrow');
      if (narrEye && narrative.eyebrow) narrEye.textContent = narrative.eyebrow;

      const narrH2 = document.querySelector('.sands-narrative h2');
      if (narrH2 && narrative.title) narrH2.textContent = narrative.title;

      const narrLead = document.querySelector('.sands-narrative .lead-p, .sands-narrative p.lead');
      if (narrLead && narrative.lead) narrLead.textContent = narrative.lead;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLandingCMS);
  } else {
    applyLandingCMS();
  }

  window.addEventListener('storage', e => {
    if (e.key === 'phoenixLandingCMS') applyLandingCMS();
  });
})();
