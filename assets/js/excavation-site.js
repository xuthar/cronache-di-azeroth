/* The Wetlands expedition in the lore archive, character dossier and photo gallery. */
(() => {
  'use strict';
  const page = document.body.dataset.page;
  const main = document.getElementById('main');
  if (!main || !['gallery','lore','xuthar','forever'].includes(page)) return;
  const make = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const dispatch = make('section', 'ex-dispatch wrap');
  dispatch.id = 'excavation-site';
  dispatch.setAttribute('aria-labelledby', 'excavation-dispatch-title');
  const backdrop = make('img', 'ex-backdrop');
  backdrop.src = 'assets/images/screenshots/WoWScrnShot_112226_164658.jpg';
  backdrop.alt = ''; backdrop.width = 1920; backdrop.height = 1080;
  backdrop.loading = 'lazy'; backdrop.decoding = 'async';
  const copy = make('div', 'ex-dispatch-copy');
  copy.append(make('p','eyebrow',page === 'lore' ? 'WETLANDS · THE MOUNTAIN’S BURIED MEMORY' : '22 NOVEMBER 2026 · EXCAVATION SITE: WETLANDS'));
  const title = make('h2', '', 'Where the Mountain Remembers');
  title.id = 'excavation-dispatch-title'; copy.append(title);
  copy.append(make('p', '', page === 'lore'
    ? 'Above Whelgar’s dig, the Explorers’ League follows a mystery of ancient titan machinery and a valley reclaimed by wildlife. The excavated cliffs place the work of living hands beside a past far older than kingdoms. Xuthar and Carro’s journey gives that setting a personal voice in The Last Witness.'
    : 'Xuthar and Carro Steelcave return from the hidden valley: Saltspine, Shadetooth and the Relic Guardian defeated. Eleven new chapters follow the expedition, the fossil cliffs and the friendship that brings them home.'));
  const links = make('div', 'ex-actions');
  for (const [label, href] of [
    ['The adventure, lore & dungeon guide', 'dungeons/excavation-site.html'],
    ['The Last Witness · Chapters 187–197', 'book.html?character=xuthar#x-nov22-wetlands-rendezvous'],
    ['All 22 original photographs', 'gallery.html#excavation-site-photos']
  ]) { const link = make('a', '', label); link.href = href; links.append(link); }
  copy.append(links); dispatch.append(backdrop, copy);
  const loreCover = main.querySelector('.lore-cover');
  if (page === 'lore' && loreCover) loreCover.after(dispatch);
  else main.prepend(dispatch);

  if (page !== 'gallery') {
    if (location.hash === '#excavation-site') requestAnimationFrame(() => dispatch.scrollIntoView({block:'start'}));
    return;
  }
  const album = make('section', 'ex-gallery wrap');
  album.id = 'excavation-site-photos';
  album.append(make('p', 'eyebrow', '22 NOVEMBER · XUTHAR, CARRO & BROKEN TOOTH'));
  album.append(make('h2', '', 'Excavation Site · The complete expedition'));
  album.append(make('p', '', 'Twenty-two original 1920×1080 photographs, from the expedition camp to the open path beyond the mountain. Open any frame at full size or save the original.'));
  const status = make('p', 'ex-note', 'Loading the expedition photographs…');
  album.append(status); dispatch.after(album);
  fetch('assets/data/excavation-site-2026-11-22.json?v=20261122-excavation')
    .then(response => { if (!response.ok) throw Error('Album unavailable'); return response.json(); })
    .then(data => {
      if (!Array.isArray(data.photos) || data.photos.length !== 22) throw Error('Invalid album');
      const grid = make('div', 'ex-album-grid');
      for (const p of data.photos) {
        if (!/^assets\/images\/screenshots\/WoWScrnShot_112226_\d{6}\.jpg$/.test(p.src)) continue;
        const figure = make('figure', 'ex-photo');
        const view = make('a'); view.href = p.src; view.target = '_blank'; view.rel = 'noopener noreferrer';
        const img = make('img'); img.src = p.src; img.alt = p.alt;
        img.width = 1920; img.height = 1080; img.loading = 'lazy'; img.decoding = 'async';
        view.append(img);
        const caption = make('figcaption', '', p.time + ' · ' + p.title + ' · ');
        const save = make('a', '', 'Save original'); save.href = p.src; save.download = p.src.split('/').pop();
        caption.append(save); figure.append(view, caption); grid.append(figure);
      }
      status.remove(); album.append(grid);
      if (location.hash === '#excavation-site-photos') requestAnimationFrame(() => album.scrollIntoView({block:'start'}));
    }).catch(() => {
      status.replaceChildren(document.createTextNode('The full photographic chronicle is also available in the '));
      const link = make('a', '', 'dungeon album'); link.href = 'dungeons/excavation-site.html#expedition-album'; status.append(link, '.');
    });
})();
