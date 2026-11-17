(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  if (!header) return;
  const nav = header.querySelector('nav');
  const toggle = header.querySelector('.site-menu-toggle');
  const groups = [...header.querySelectorAll('details')];
  const canonical = path => path.replace(/index\.html$/, '').replace(/\/$/, '');
  const current = canonical(location.pathname);
  nav.querySelectorAll('a').forEach(a => {
    if (canonical(new URL(a.href).pathname) === current) {
      a.setAttribute('aria-current', 'page');
      a.closest('details')?.classList.add('site-current-group');
    }
  });
  const closeGroups = except => groups.forEach(g => { if (g !== except) g.open = false; });
  groups.forEach(g => g.addEventListener('toggle', () => { if (g.open) closeGroups(g); }));
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('site-open', open);
    if (!open) closeGroups();
  });
  document.addEventListener('click', e => { if (!header.contains(e.target)) closeGroups(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = groups.find(g => g.open);
    if (open) { open.open = false; open.querySelector('summary').focus(); }
    else if (toggle.getAttribute('aria-expanded') === 'true') { toggle.click(); toggle.focus(); }
  });
  document.documentElement.classList.add('site-shell-ready');
})();
