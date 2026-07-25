/* ============================================================
   Jay Prakash — Portfolio interactions
   ============================================================ */

/* -------- EDIT YOUR LINKS HERE --------
   Replace the "#" placeholders with your real URLs. */
const LINKS = {
  // Profiles
  github:         'https://github.com/jay0singh',
  linkedin:       'https://www.linkedin.com/in/jay-prakash-016148214/',
  leetcode:       'https://leetcode.com/u/jay0singha/',

  // Agentic AI RAG System
  'rag-github':   'https://github.com/jay0singh/agentic-ai',
  'rag-live':     'https://huggingface.co/spaces/jay0singha/agentic-ai',

  // Code Review Agent
  'review-github':'https://github.com/jay0singh/code-review-agent',
  'review-demo':  'https://github.com/jay0singh/order-fulfillment-demo/pull/2',

  // Conversational SQL Agent
  'sql-github':   'https://github.com/jay0singh/conversational-sql-agent',
  'sql-demo':     'https://conversational-sql-agent.onrender.com/',

  // URL Shortener Service
  'url-github':   'https://github.com/jay0singh/url-shortener-service',
  'url-live':     'https://url-shortener-service-theta.vercel.app/',
};

document.querySelectorAll('[data-link]').forEach((el) => {
  const key = el.getAttribute('data-link');
  const url = LINKS[key];
  if (url && url !== '#') {
    el.setAttribute('href', url);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  } else {
    el.style.opacity = '0.4';
    el.title = 'Add your link in script.js';
  }
});

/* -------- Theme toggle -------- */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* -------- Mobile menu -------- */
const burger = document.getElementById('navBurger');
const backdrop = document.getElementById('navBackdrop');
const navLinksEl = document.getElementById('navLinks');
const body = document.body;

const setMenu = (open) => {
  body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  body.style.overflow = open ? 'hidden' : '';
};
burger.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
backdrop.addEventListener('click', () => setMenu(false));
navLinksEl.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
// Reset menu state if resized up to desktop
window.addEventListener('resize', () => { if (window.innerWidth > 760) setMenu(false); });

/* -------- Nav shrink + scroll progress -------- */
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');
const onScroll = () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 40);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* -------- Reveal on scroll -------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 6) * 60 + 'ms';
  io.observe(el);
});

/* -------- Count-up stats -------- */
const animateCount = (el) => {
  const target = parseFloat(el.dataset.target ?? el.textContent);
  const suffix = el.dataset.suffix ?? '';
  const dur = 1400;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { animateCount(e.target); statObserver.unobserve(e.target); }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat__num').forEach((el) => statObserver.observe(el));

/* -------- Active nav highlight -------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navLinks.forEach((l) => l.style.color = '');
      const link = document.querySelector(`.nav__links a[href="#${e.target.id}"]`);
      if (link) link.style.color = 'var(--text-strong)';
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach((s) => activeObserver.observe(s));
