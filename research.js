(() => {
  const isEn = document.documentElement.lang === 'en';

  async function loadResearch() {
    const container = document.getElementById('research-container');
    if (!container) return;

    try {
      const res = await fetch('research/research.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const papers = await res.json();

      if (Array.isArray(papers) && papers.length > 0) {
        container.innerHTML = '';
        const ul = document.createElement('ul');
        ul.style.lineHeight = '1.8';
        papers.forEach(item => {
          const title = isEn ? (item.title_en || item.title_zh) : (item.title_zh || item.title_en);
          const year = item.year ? `[${item.year}] ` : '';
          const li = document.createElement('li');
          if (item.link) {
            li.innerHTML = `${year}<a href="${item.link}" target="_blank" rel="noopener">${title}</a>`;
          } else {
            li.textContent = `${year}${title}`;
          }
          ul.appendChild(li);
        });
        container.appendChild(ul);
      } else {
        container.innerHTML = `<p>${isEn ? 'Content coming soon.' : '待補內容。'}</p>`;
      }
    } catch (err) {
      console.warn('Could not load research/research.json:', err);
      container.innerHTML = `<p>${isEn ? 'Content coming soon.' : '待補內容。'}</p>`;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadResearch);
  } else {
    loadResearch();
  }
})();

