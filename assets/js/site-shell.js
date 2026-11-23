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

  // One small Winter Veil treatment shared by every page and nested gallery.
  if (document.body.dataset.siteSeason !== 'winter-veil') return;
  const assetBase = new URL('../images/', document.currentScript.src);
  const ribbon = document.createElement('div');
  ribbon.className = 'wv-ribbon';
  const inner = document.createElement('div');
  inner.className = 'wv-ribbon-inner';
  const emblem = document.createElement('img');
  emblem.src = new URL('winter-veil-emblem.svg', assetBase).href;
  emblem.className = 'wv-emblem';
  emblem.alt = '';
  emblem.width = 120;
  emblem.height = 120;
  const name = document.createElement('span');
  name.className = 'wv-name';
  name.textContent = 'Winter Veil';
  const greeting = document.createElement('span');
  greeting.className = 'wv-greeting';
  greeting.textContent = 'A little magic for every road.';
  const snowButton = document.createElement('button');
  snowButton.type = 'button';
  snowButton.className = 'wv-snow-toggle';
  snowButton.setAttribute('aria-label', 'Snow animation');
  inner.append(emblem, name, greeting, snowButton);
  ribbon.append(inner);
  header.querySelector('.site-bar').after(ribbon);

  const snow = document.createElement('div');
  snow.className = 'wv-snow';
  snow.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 12; i++) {
    const flake = document.createElement('i');
    flake.style.setProperty('--wv-left', (3 + i * 8.2) + '%');
    flake.style.setProperty('--wv-duration', (9 + i % 4 * 2) + 's');
    flake.style.setProperty('--wv-delay', (-i * 1.7) + 's');
    flake.style.setProperty('--wv-size', (i % 3 === 0 ? 3 : 2) + 'px');
    snow.append(flake);
  }
  header.prepend(snow);
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let snowEnabled = !motion.matches;
  try { if (localStorage.getItem('chronicles-winter-snow') === 'off') snowEnabled = false; } catch {}
  const renderSnow = () => {
    const active = snowEnabled && !motion.matches;
    document.body.dataset.winterSnow = active ? 'on' : 'off';
    snowButton.setAttribute('aria-pressed', String(active));
    snowButton.textContent = active ? 'Snow on' : 'Snow off';
    snowButton.title = active ? 'Pause snowfall' : 'Enable snowfall';
  };
  snowButton.addEventListener('click', () => {
    snowEnabled = !snowEnabled;
    try { localStorage.setItem('chronicles-winter-snow', snowEnabled ? 'on' : 'off'); } catch {}
    renderSnow();
  });
  motion.addEventListener('change', renderSnow);
  renderSnow();

  const footer = document.querySelector('.site-footer-inner');
  if (footer) {
    const wish = document.createElement('p');
    wish.className = 'wv-footer-wish';
    wish.textContent = 'Warm fires. Good company. Happy Winter Veil, traveller.';
    footer.append(wish);
  }
})();
