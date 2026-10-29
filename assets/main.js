// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  // On phones the menu covers the screen; the page behind it stops scrolling
  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    document.documentElement.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
}

// Project filters (Projects page)
const filterButtons = document.querySelectorAll('.filters button');
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filterButtons.forEach((b) => b.setAttribute('aria-pressed', b === btn));
    document.querySelectorAll('.project').forEach((p) => {
      p.hidden = f !== 'all' && !p.dataset.brand.split(' ').includes(f);
    });
  });
});

// Footer year
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Scroll-in animation: content eases up as it enters the screen
(() => {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // What animates: headings and text blocks, photos, cards, list items
  const groups = [
    '.hero .wrap > *', '.section-head',
    '.brand-cards > *', '.steps > li', '.rows > .row', '.brand-media figure', '.brand-copy > *', '.brand-col > :not(.brand-media)',
    '.about-grid > :not(.region-list)', '.region-list > li', '.territory-head > *', '.projects > .project',
    '.footer-top > *'
  ];
  const items = document.querySelectorAll(groups.join(','));

  // Siblings in the same row come in one after another
  items.forEach((el) => {
    const sibs = [...el.parentElement.children].filter((c) => c.matches(groups.join(',')));
    const i = Math.min(sibs.indexOf(el), 5);
    el.style.setProperty('--reveal-delay', (i * 0.08) + 's');
    el.classList.add('reveal');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  items.forEach((el) => io.observe(el));
  document.documentElement.classList.add('motion-ready');
})();

// Homepage full-screen hero: crossfades project photos and updates the caption
(() => {
  const imgs = [...document.querySelectorAll('.fhero-slides img')];
  const cap = document.querySelector('.fhero-caption');
  if (imgs.length < 2 || !cap) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('load', () => imgs.forEach((im) => { im.loading = 'eager'; }));
  let i = 0, visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(document.querySelector('.fhero'));
  }
  setInterval(() => {
    if (!visible || document.hidden) return;
    imgs[i].classList.remove('on');
    i = (i + 1) % imgs.length;
    imgs[i].classList.add('on');
    cap.classList.add('swap');
    setTimeout(() => {
      cap.querySelector('.meta').textContent = imgs[i].dataset.meta;
      cap.querySelector('strong').textContent = imgs[i].dataset.title;
      cap.classList.remove('swap');
    }, 300);
  }, 5500);
})();

// Statement that fills in word by word as you scroll past it
(() => {
  const el = document.querySelector('.fill-text');
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Wrap each word in a span, keeping any emphasis (<em>) intact
  const wrapWords = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.append(part);
          else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.append(s); }
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) wrapWords(n);
    });
  };
  wrapWords(el);
  const words = [...el.querySelectorAll('.w')];

  // Words light up as the statement moves from the lower part of the screen to the upper third
  let ticking = false;
  const update = () => {
    ticking = false;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const startY = vh * 0.85, endY = vh * 0.35;
    const p = Math.min(Math.max((startY - r.top) / (startY - endY + r.height * 0.5), 0), 1);
    const n = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('lit', i < n));
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
