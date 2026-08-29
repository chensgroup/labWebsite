(() => {
  const isEn = document.documentElement.lang === 'en';
  const lang = isEn ? 'en' : 'zh';

  function openUnitModal(name, options, selectedIndex = 0) {
    const selectList = document.createElement("select");
    selectList.className = "course-select";
    options.forEach((v, i) => {
      const newOpt = new Option(v, i);
      selectList.add(newOpt);
    });
    selectList.selectedIndex = selectedIndex;

    if (window.SiteModal) {
      window.SiteModal.open({
        name: name,
        infoHtml: selectList.outerHTML
      });
    }
  }

  function createLinkCard(item) {
    const title = isEn ? (item.title_en || item.title_zh) : (item.title_zh || item.title_en);
    const a = document.createElement('a');
    a.className = 'course-button';
    a.href = item.url;
    a.target = '_blank';
    a.rel = 'noopener';

    const strong = document.createElement('strong');
    strong.textContent = title;
    a.appendChild(strong);

    return a;
  }

  function createUnitCard(unit) {
    const name = isEn ? (unit.name_en || unit.name_zh) : (unit.name_zh || unit.name_en);
    const options = isEn ? (unit.options_en || unit.options_zh || []) : (unit.options_zh || unit.options_en || []);

    const container = document.createElement('div');
    container.className = 'person-card dropdown-container';
    container.setAttribute('tabindex', '0');

    const button = document.createElement('button');
    button.className = 'course-button';
    const strong = document.createElement('strong');
    strong.textContent = name;
    button.appendChild(strong);
    container.appendChild(button);

    const hoverDrop = document.createElement('div');
    hoverDrop.className = 'dropdown-content';

    options.forEach((opt, idx) => {
      const subItem = document.createElement('a');
      subItem.textContent = opt;
      subItem.href = 'javascript:void(0);';
      subItem.onclick = e => {
        e.preventDefault();
        e.stopPropagation();
        openUnitModal(name, options, idx);
      };
      hoverDrop.appendChild(subItem);
    });

    container.appendChild(hoverDrop);

    container.addEventListener('click', () => openUnitModal(name, options, 0));
    container.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openUnitModal(name, options, 0);
      }
    });

    return container;
  }

  async function loadResources() {
    const recommendedGrid = document.getElementById('recommended-sites-grid');
    const unitsGrid = document.getElementById('physics-units-grid');
    const otherGrid = document.getElementById('other-resources-grid');

    try {
      const res = await fetch('resources/resources.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // Render Recommended Sites
      if (recommendedGrid && data.recommendedSites) {
        recommendedGrid.innerHTML = '';
        data.recommendedSites.forEach(item => {
          recommendedGrid.appendChild(createLinkCard(item));
        });
      }

      // Render Physics Units
      if (unitsGrid && data.physicsUnits) {
        unitsGrid.innerHTML = '';
        data.physicsUnits.forEach(unit => {
          unitsGrid.appendChild(createUnitCard(unit));
        });
      }

      // Render Other Resources
      if (otherGrid && data.otherResources) {
        otherGrid.innerHTML = '';
        data.otherResources.forEach(item => {
          otherGrid.appendChild(createLinkCard(item));
        });
      }

    } catch (err) {
      console.warn('Could not load resources/resources.json:', err);
      const warningContainer = recommendedGrid || document.querySelector('.photo-grid');
      if (warningContainer) {
        const warningText = isEn
          ? 'Unable to load resources. Please check resources/resources.json.'
          : '無法載入資源清單，請檢查 resources/resources.json 設定。';
        warningContainer.innerHTML = `<p style="text-align:center; padding: 2rem; color: #888; font-size: 15px;">⚠️ ${warningText}</p>`;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadResources);
  } else {
    loadResources();
  }
})();
