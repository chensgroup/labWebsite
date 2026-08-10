(() => {
  const modal = document.getElementById('profile-modal');
  if (!modal) return;

  const panel = modal.querySelector('.modal__panel');
  const closeBtns = modal.querySelectorAll('.modal__close');
  const topbar = modal.querySelector('.modal__topbar');
  const imgEl = document.getElementById('m-photo');
  const nameEl = document.getElementById('m-name');
  const nameMobileEl = document.getElementById('m-name-mobile');
  const titleEl = document.getElementById('m-title');
  const infoEl = document.getElementById('m-info');
  const actionsEl = document.getElementById('m-actions');
  const bodyEl = modal.querySelector('.modal__body');

  let _scrollY = 0;
  let isFullscreen = false;

  function lockBodyScroll() {
    _scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.setProperty('--scroll-lock', `-${_scrollY}px`);
    document.body.classList.add('no-scroll');
  }

  function unlockBodyScroll() {
    document.body.classList.remove('no-scroll');
    document.body.style.removeProperty('--scroll-lock');
    window.scrollTo(0, _scrollY);
    document.documentElement.style.scrollBehavior = '';
  }

  function toggleFullscreen() {
    isFullscreen = !isFullscreen;
    const iframe = infoEl ? infoEl.querySelector('iframe') : null;
    const fullBtn = infoEl ? infoEl.querySelector('.modal__fullscreen-btn') : null;
    const isEn = document.documentElement.lang === 'en';

    if (isFullscreen) {
      panel.classList.add('modal__panel--fullscreen');
      if (iframe) iframe.style.height = '';
      if (fullBtn) fullBtn.innerHTML = isEn ? '🗗 Restore' : '🗗 恢復原大小';
    } else {
      panel.classList.remove('modal__panel--fullscreen');
      if (iframe) iframe.style.height = 'min(75vh, 700px)';
      if (fullBtn) fullBtn.innerHTML = isEn ? '🗖 Maximize' : '🗖 滿版全螢幕';
    }
  }

  function closeModal() {
    panel.classList.remove('modal__panel--large', 'modal__panel--fullscreen');
    isFullscreen = false;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    unlockBodyScroll();
    document.removeEventListener('keydown', escToClose);
  }

  function escToClose(e) {
    if (e.key === 'Escape') closeModal();
  }

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  if (panel) {
    panel.addEventListener('click', e => e.stopPropagation());
  }

  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('touchmove', e => {
    if (!e.target.closest('.modal__panel')) e.preventDefault();
  }, { passive: false });

  window.SiteModal = {
    open(config = {}) {
      const {
        name = '',
        title = '',
        photo = '',
        infoHtml = '',
        isLarge = false,
        isIframe = false,
        iframeUrl = ''
      } = config;

      if (nameEl) nameEl.textContent = name;
      if (nameMobileEl) nameMobileEl.textContent = name;

      if (titleEl) {
        titleEl.textContent = title;
        titleEl.style.display = title ? 'block' : 'none';
      }

      if (imgEl) {
        if (photo) {
          imgEl.src = photo;
          imgEl.style.display = 'block';
        } else {
          imgEl.style.display = 'none';
        }
      }

      if (actionsEl) actionsEl.innerHTML = '';

      if (isIframe && iframeUrl) {
        panel.classList.add('modal__panel--large');
        panel.classList.remove('modal__panel--fullscreen');
        isFullscreen = false;

        const isEn = document.documentElement.lang === 'en';
        const openNewTabLabel = isEn ? 'Open in New Tab' : '在新分頁開啟';
        const maximizeLabel = isEn ? '🗖 Maximize' : '🗖 滿版全螢幕';

        infoEl.innerHTML = `
          <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
            <button class="modal__fullscreen-btn" type="button">${maximizeLabel}</button>
            <a href="${encodeURI(iframeUrl)}" target="_blank" rel="noopener" style="display: inline-block; padding: 6px 14px; background: #007bff; color: #fff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
              ↗ ${openNewTabLabel}
            </a>
          </div>
          <iframe src="${encodeURI(iframeUrl)}" style="width: 100%; height: min(75vh, 700px); min-height: 450px; border: 1px solid #ddd; border-radius: 8px; background: #fff; transition: height 0.25s ease;" title="${name}" allowfullscreen></iframe>
        `;

        const fullBtn = infoEl.querySelector('.modal__fullscreen-btn');
        if (fullBtn) fullBtn.addEventListener('click', toggleFullscreen);
      } else {
        panel.classList.remove('modal__panel--large', 'modal__panel--fullscreen');
        if (infoEl) infoEl.innerHTML = infoHtml;
      }

      if (window.matchMedia('(max-width: 720px)').matches) {
        if (topbar) topbar.style.display = 'flex';
      } else {
        if (topbar) topbar.style.display = 'none';
      }

      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
      lockBodyScroll();

      if (bodyEl) bodyEl.scrollTop = 0;
      document.addEventListener('keydown', escToClose);
    },
    close: closeModal
  };
})();
