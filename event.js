(() => {
  const isEn = document.documentElement.lang === 'en';

  async function loadEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;

    try {
      const res = await fetch('events/events.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const groups = await res.json();

      if (Array.isArray(groups) && groups.length > 0) {
        container.innerHTML = '';
        groups.forEach(group => {
          const h3 = document.createElement('h3');
          h3.textContent = group.year;
          container.appendChild(h3);

          const ul = document.createElement('ul');
          (group.items || []).forEach(item => {
            const date = isEn ? (item.date_en || item.date_zh || '') : (item.date_zh || item.date_en || '');
            const text = isEn ? (item.text_en || item.text_zh || '') : (item.text_zh || item.text_en || '');

            const li = document.createElement('li');
            li.innerHTML = `${date ? `${date}: ` : ''}${text}`;
            ul.appendChild(li);
          });
          container.appendChild(ul);
        });
      } else {
        container.innerHTML = `<p style="color:#888;">${isEn ? 'No events recorded.' : '尚無活動紀錄。'}</p>`;
      }
    } catch (err) {
      console.warn('Could not load events/events.json:', err);
      const warningText = isEn
        ? 'Unable to load events. Please check events/events.json.'
        : '無法載入活動資訊，請檢查 events/events.json 設定。';
      container.innerHTML = `<p style="text-align:center; padding: 2rem; color: #888; font-size: 15px;">⚠️ ${warningText}</p>`;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadEvents);
  } else {
    loadEvents();
  }
})();

