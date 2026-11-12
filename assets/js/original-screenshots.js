/* Progressive enhancement: ordinary JPG links remain usable without JavaScript. */
(() => {
  const links = [...document.querySelectorAll('a[data-original-photo]')];
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  const dialog = document.createElement('dialog');
  dialog.className = 'original-photo-dialog';
  dialog.setAttribute('aria-label', 'Original Full HD photograph');
  dialog.innerHTML = '<div class="original-photo-toolbar"><a target="_blank" rel="noopener">Open original JPG · 1920 × 1080 ↗</a><button type="button" autofocus>Close ×</button></div><img width="1920" height="1080" alt=""><p class="original-photo-caption"></p>';
  document.body.append(dialog);
  const photo = dialog.querySelector('img');
  const original = dialog.querySelector('a');
  const caption = dialog.querySelector('p');
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  links.forEach(link => link.addEventListener('click', event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    photo.src = link.href;
    photo.alt = link.querySelector('img').alt;
    original.href = link.href;
    caption.textContent = photo.alt;
    dialog.showModal();
  }));
})();
