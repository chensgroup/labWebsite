(() => {
  const isEn = document.documentElement.lang === 'en';

  const label = isEn ? {
    degree: 'Degree: ',
    office: 'Office: ',
    fields: 'Research Areas: ',
    expertise: 'Expertise: ',
    experience: 'Experience: ',
    phone: 'Phone: ',
    email: 'Email: ',
    website: 'Website: ',
    cv: 'CV: '
  } : {
    degree: '最高學歷：',
    office: 'Office：',
    fields: '研究領域：',
    expertise: '研究專長：',
    experience: '研究經歷：',
    phone: '電話：',
    email: '信箱：',
    website: '個人網站：',
    cv: '簡歷：'
  };

  function withLineBreaks(str) {
    return (str || '').replace(/\n/g, '<br>');
  }

  function openModalFromCard(card) {
    const data = {
      name: card.dataset.name || '',
      title: card.dataset.title || '',
      degree: card.dataset.degree || '',
      office: card.dataset.office || '',
      fields: card.dataset.fields || '',
      expertise: card.dataset.expertise || '',
      experience: card.dataset.experience || '',
      phone: card.dataset.phone || '',
      email: card.dataset.email || '',
      website: card.dataset.website || '',
      cv: card.dataset.cv || '',
      photo: card.dataset.photo || card.querySelector('img')?.src || ''
    };

    const rows = [
      ['degree', data.degree],
      ['office', data.office],
      ['fields', data.fields],
      ['expertise', data.expertise],
      ['experience', data.experience],
      ['phone', data.phone],
      ['email', data.email],
      ['website', data.website],
      ['cv', data.cv]
    ];

    let infoHtml = '';
    rows.forEach(([key, val]) => {
      if (!val) return;
      const content = withLineBreaks(val);

      if (key === 'email') {
        infoHtml += `<p><strong>${label[key]}</strong><a href="mailto:${content}">${content}</a></p>`;
      } else if (key === 'website' || key === 'cv') {
        if (/^https?:\/\//i.test(content)) {
          infoHtml += `<p><strong>${label[key]}</strong><a href="${content}" target="_blank" rel="noopener">${content}</a></p>`;
        } else {
          infoHtml += `<p><strong>${label[key]}</strong>${content}</p>`;
        }
      } else {
        infoHtml += `<p><strong>${label[key]}</strong>${content}</p>`;
      }
    });

    if (window.SiteModal) {
      window.SiteModal.open({
        name: data.name,
        title: data.title,
        photo: data.photo,
        infoHtml: infoHtml
      });
    }
  }

  const clickableCards = document.querySelectorAll('.person-card.profile');
  clickableCards.forEach(card => {
    card.addEventListener('click', () => openModalFromCard(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModalFromCard(card);
      }
    });
  });
})();
