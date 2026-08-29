(() => {
  const isEn = document.documentElement.lang === 'en';

  function resolveSimUrl(item) {
    const file = item.file || item.url || '';
    if (!file) return '';
    if (file.startsWith('http://') || file.startsWith('https://') || file.startsWith('/') || file.startsWith('simulations/')) {
      return file;
    }
    return `simulations/${file}`;
  }

  function createSimCard(item) {
    const title = isEn ? (item.title_en || item.title_zh || item.title || '') : (item.title_zh || item.title_en || item.title || '');
    const url = resolveSimUrl(item);

    const btn = document.createElement('a');
    btn.className = 'course-button simulation-card';
    btn.href = 'javascript:void(0);';

    const strong = document.createElement('strong');
    strong.textContent = title;
    btn.appendChild(strong);

    function openModal() {
      if (url && window.SiteModal) {
        window.SiteModal.open({
          name: title,
          isIframe: true,
          iframeUrl: url
        });
      }
    }

    btn.addEventListener('click', e => {
      e.preventDefault();
      openModal();
    });

    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });

    return btn;
  }

  async function loadSimulations() {
    const grid = document.getElementById('simulations-grid') || document.querySelector('.photo-grid');
    if (!grid) return;

    try {
      const res = await fetch('simulations/simulations.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const list = await res.json();

      if (Array.isArray(list) && list.length > 0) {
        grid.innerHTML = '';
        list.forEach(item => {
          grid.appendChild(createSimCard(item));
        });
      } else {
        grid.innerHTML = `<p style="color:#888;">${isEn ? 'No simulations available.' : '目前尚無模擬實驗。'}</p>`;
      }
    } catch (err) {
      console.warn('Could not load simulations/simulations.json:', err);
      const warningText = isEn
        ? 'Unable to load simulations list. Please check simulations/simulations.json.'
        : '無法載入模擬實驗清單，請檢查 simulations/simulations.json 設定。';
      grid.innerHTML = `<p style="text-align:center; padding: 2rem; color: #888; font-size: 15px;">⚠️ ${warningText}</p>`;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSimulations);
  } else {
    loadSimulations();
  }
})();
