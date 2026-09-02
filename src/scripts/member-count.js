/* Progressively upgrades the static "372+" fallback to the live Circle
   count. Never blocks render, never shows a loading state: if this fails
   or times out, the server-rendered fallback just stays on the page. */
const els = document.querySelectorAll('.member-count');

if (els.length) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  fetch('/.netlify/functions/member-count', { signal: controller.signal })
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => {
      const count = Number(data?.count);
      if (Number.isFinite(count) && count > 0) {
        els.forEach((el) => {
          el.textContent = String(count);
        });
      }
    })
    .catch(() => {})
    .finally(() => clearTimeout(timeout));
}
