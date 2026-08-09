(() => {
  const modal = document.getElementById('profile-modal');
  if (!modal) return;

  const panel = modal.querySelector('.modal__panel');
  const closeBtns = modal.querySelectorAll('.modal__close');
  const topbar = modal.querySelector('.modal__topbar');
  const nameEl = document.getElementById('m-name');
  const nameMobileEl = document.getElementById('m-name-mobile');
  const infoEl = document.getElementById('m-info');
  const bodyEl = modal.querySelector('.modal__body');

  let _scrollY = 0;
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

  function openModalFromCard(card, selectedIndex = 0) {
    const data = {
      name: card.dataset.name || '',
      options: card.dataset.options || ''
    };

    nameEl.textContent = data.name;
    if (nameMobileEl) nameMobileEl.textContent = data.name;

    infoEl.innerHTML = '';

    const selectList = document.createElement("select");
    selectList.className = "course-select";
    data.options.split(' ').filter(Boolean).forEach((v, i) => {
      const newOpt = new Option(v, i);
      selectList.add(newOpt);
    });
    selectList.selectedIndex = selectedIndex;
    infoEl.appendChild(selectList);

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
  }

  function openModalWithIframe(title, url) {
    nameEl.textContent = title;
    if (nameMobileEl) nameMobileEl.textContent = title;

    const isEn = document.documentElement.lang === 'en';
    const openNewTabLabel = isEn ? 'Open in New Tab' : '在新分頁開啟';

    infoEl.innerHTML = `
      <div style="margin-bottom: 10px; text-align: right;">
        <a href="${encodeURI(url)}" target="_blank" rel="noopener" style="display: inline-block; padding: 6px 14px; background: #007bff; color: #fff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
          ↗ ${openNewTabLabel}
        </a>
      </div>
      <iframe src="${encodeURI(url)}" style="width: 100%; height: min(68vh, 600px); min-height: 420px; border: 1px solid #ddd; border-radius: 8px; background: #fff;" title="${title}" allowfullscreen></iframe>
    `;

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
  }

  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    unlockBodyScroll();
    document.removeEventListener('keydown', escToClose);
  }
  function escToClose(e) { if (e.key === 'Escape') closeModal(); }

  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  panel.addEventListener('click', e => e.stopPropagation());
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('touchmove', (e) => {
    if (!e.target.closest('.modal__panel')) e.preventDefault();
  }, { passive: false });

  const clickableCards = document.querySelectorAll('.person-card');
  clickableCards.forEach(card => {
    const data = {
      options: card.dataset.options || ''
    };

    let hoverDrop = card.querySelector('.dropdown-content');
    if (hoverDrop && data.options) {
      data.options.split(' ').filter(Boolean).forEach((v, i) => {
        const subItem = document.createElement("a");
        subItem.textContent = v;
        subItem.href = "javascript:void(0);";
        subItem.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          openModalFromCard(card, i);
        };
        hoverDrop.appendChild(subItem);
      });
    }

    card.addEventListener('click', () => openModalFromCard(card, 0));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModalFromCard(card);
      }
    });
  });

  const modalButtons = document.querySelectorAll('.resource-modal-btn');
  modalButtons.forEach(btn => {
    const title = btn.dataset.title || btn.textContent.trim();
    const url = btn.dataset.url || '';
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (url) openModalWithIframe(title, url);
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (url) openModalWithIframe(title, url);
      }
    });
  });
})();
