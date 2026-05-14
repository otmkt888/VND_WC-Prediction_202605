/**
 * main.js
 * Smooth scrolling · FAQ accordion · scroll-reveal · number counter
 */
(function () {

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const btn    = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!btn || !answer) return;

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq-item--open');

        document.querySelectorAll('.faq-item--open').forEach(open => {
          open.classList.remove('faq-item--open');
          open.querySelector('.faq-answer').style.maxHeight = '0';
          open.querySelector('.faq-question .faq-icon').textContent = '+';
          open.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('faq-item--open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          btn.querySelector('.faq-icon').textContent = '−';
          btn.setAttribute('aria-expanded', 'true');
          item.dispatchEvent(new Event('toggle-open'));
        }
      });
    });
  }

  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('reveal--visible'));
      return;
    }
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal--visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  function initCounters() {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el  = entry.target;
        const end = parseInt(el.dataset.countTo, 10);
        const dur = 1800;
        const t0  = performance.now();
        obs.unobserve(el);
        (function step(now) {
          const p = Math.min((now - t0) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(e * end).toLocaleString();
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count-to]').forEach(el => obs.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initFAQ();
    initScrollReveal();
    initCounters();
  });
})();
