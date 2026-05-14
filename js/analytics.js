/**
 * analytics.js
 * CTA target: https://www.12bet.com/vn/join
 * Replace console.log with GA4 gtag() in production.
 */
(function () {
  const JOIN_URL = 'https://219go.lomget.com/mp5atkosnimt';

  function track(event, params = {}) {
    console.log('[Analytics]', { event, ...params, ts: new Date().toISOString() });
    /* GA4: if (typeof gtag === 'function') gtag('event', event, params); */
  }

  function bindCTAs() {
    document.querySelectorAll('[data-track]').forEach(el => {
      el.addEventListener('click', () => {
        track('cta_click', {
          label:   el.dataset.track,
          section: el.closest('[id]')?.id || 'global',
          target:  JOIN_URL,
        });
      });
    });
  }

  function bindSectionViews() {
    if (!('IntersectionObserver' in window)) return;
    const seen = new Set();
    const obs  = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !seen.has(e.target.id)) {
          seen.add(e.target.id);
          track('section_view', { section: e.target.id });
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s));
  }

  const hit = new Set();
  function onScroll() {
    const pct = Math.round(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100);
    [25, 50, 75, 90].forEach(m => {
      if (pct >= m && !hit.has(m)) { hit.add(m); track('scroll_depth', { percent: m }); }
    });
  }

  function bindFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      item.addEventListener('toggle-open', () => {
        track('faq_open', { question: item.querySelector('.faq-question')?.textContent?.trim() });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindCTAs();
    bindSectionViews();
    bindFAQ();
    window.addEventListener('scroll', onScroll, { passive: true });
    track('page_view', { url: location.href, join_url: JOIN_URL });
  });
})();
