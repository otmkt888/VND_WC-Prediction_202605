/**
 * countdown.js — đếm ngược đến 2026-06-10 00:00:00 giờ địa phương.
 */
(function () {
  const DEADLINE = new Date('2026-06-10T00:00:00').getTime();
  const pad = n => String(n).padStart(2, '0');

  function tick() {
    const diff = DEADLINE - Date.now();

    if (diff <= 0) {
      document.querySelectorAll('[data-countdown="timer"]').forEach(el => { el.style.display = 'none'; });
      document.querySelectorAll('[data-countdown="expired"]').forEach(el => { el.style.display = 'block'; });
      document.querySelectorAll('[data-days-remaining]').forEach(el => { el.textContent = '0'; });

      const banner = document.querySelector('.top-banner-countdown');
      if (banner) banner.textContent = '🚫 Hết hạn dự đoán';
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);

    document.querySelectorAll('[data-countdown="days"]')   .forEach(el => { el.textContent = pad(days); });
    document.querySelectorAll('[data-countdown="hours"]')  .forEach(el => { el.textContent = pad(hours); });
    document.querySelectorAll('[data-countdown="minutes"]').forEach(el => { el.textContent = pad(minutes); });
    document.querySelectorAll('[data-countdown="seconds"]').forEach(el => { el.textContent = pad(seconds); });

    document.querySelectorAll('[data-days-remaining]').forEach(el => { el.textContent = days; });
  }

  document.addEventListener('DOMContentLoaded', () => {
    tick();
    setInterval(tick, 1000);
  });
})();
