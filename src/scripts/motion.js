/* Scroll reveals + member count-up. All opacity/transform, no layout thrash. */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const els = document.querySelectorAll('.rv');
if (reduced || !('IntersectionObserver' in window)) {
  els.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el) => io.observe(el));
}

const cnt = document.getElementById('cnt');
if (cnt) {
  const target = parseInt(cnt.dataset.target || '0', 10);
  if (!reduced && target > 0) {
    cnt.textContent = '0';
    setTimeout(() => {
      let t0 = null;
      requestAnimationFrame(function tick(ts) {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / 1100, 1);
        cnt.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      });
    }, 1050);
  }
}
