(() => {
  function openModalFromCard(card, selectedIndex = 0) {
    const data = {
      name: card.dataset.name || '',
      options: card.dataset.options || ''
    };

    const selectList = document.createElement("select");
    selectList.className = "course-select";
    data.options.split(' ').filter(Boolean).forEach((v, i) => {
      const newOpt = new Option(v, i);
      selectList.add(newOpt);
    });
    selectList.selectedIndex = selectedIndex;

    if (window.SiteModal) {
      window.SiteModal.open({
        name: data.name,
        infoHtml: selectList.outerHTML
      });
    }
  }

  const clickableCards = document.querySelectorAll('.person-card');
  clickableCards.forEach(card => {
    const data = {
      options: card.dataset.options || ''
    };

    let hoverDrop = card.querySelector('.dropdown-content');
    if (hoverDrop && data.options) {
      hoverDrop.innerHTML = '';
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
        openModalFromCard(card, 0);
      }
    });
  });
})();
