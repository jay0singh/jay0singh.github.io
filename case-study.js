/* ============================================================
   Case-study pages — shared interactions (null-safe, standalone)
   ============================================================ */

/* Theme (shares the same preference key as the main site) */
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

/* Nav shrink + scroll progress */
const nav = document.querySelector('.cs-nav');
const progress = document.getElementById('scrollProgress');
const onScroll = () => {
  const y = window.scrollY;
  if (nav) nav.classList.toggle('scrolled', y > 40);
  if (progress) {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
