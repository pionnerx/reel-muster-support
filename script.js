(() => {
  const toggle = document.getElementById('language-toggle');
  let language = 'en';
  try { if (localStorage.getItem('site.language') === 'zh') language = 'zh'; } catch {}
  function apply() {
    document.documentElement.lang = language === 'zh' ? 'zh-Hans' : 'en';
    for (const el of document.querySelectorAll('[data-en][data-zh]')) el.textContent = el.dataset[language];
    for (const el of document.querySelectorAll('[data-label-en][data-label-zh]')) el.setAttribute('aria-label', language === 'zh' ? el.dataset.labelZh : el.dataset.labelEn);
    for (const img of document.querySelectorAll('[data-alt-en]')) img.alt = language === 'zh' ? img.dataset.altZh : img.dataset.altEn;
    if (toggle) {
      toggle.textContent = language === 'en' ? '简中' : 'English';
      toggle.setAttribute('aria-label', language === 'en' ? '切换到简体中文' : 'Switch to English');
      toggle.lang = language === 'en' ? 'zh-Hans' : 'en';
    }
  }
  toggle?.addEventListener('click', () => {
    language = language === 'en' ? 'zh' : 'en';
    try { localStorage.setItem('site.language', language); } catch {}
    apply();
  });
  apply();
  const dialog = document.getElementById('gallery');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = document.getElementById('gallery-image');
  let opener;
  for (const link of document.querySelectorAll('[data-shot]')) link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    document.getElementById('gallery-caption').textContent = link.closest('article').querySelector('h3').textContent;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
  document.getElementById('gallery-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus({preventScroll:true}); });
})();
