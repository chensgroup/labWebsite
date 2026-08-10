(() => {
  const modalButtons = document.querySelectorAll('.simulation-card');
  modalButtons.forEach(btn => {
    const title = btn.dataset.title || btn.textContent.trim();
    const url = btn.dataset.url || '';
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (url && window.SiteModal) {
        window.SiteModal.open({
          name: title,
          isIframe: true,
          iframeUrl: url
        });
      }
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (url && window.SiteModal) {
          window.SiteModal.open({
            name: title,
            isIframe: true,
            iframeUrl: url
          });
        }
      }
    });
  });
})();
