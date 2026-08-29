(() => {
  const isEn = document.documentElement.lang === 'en';
  const lang = isEn ? 'en' : 'zh';

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

  function parseInfoTxt(text) {
    const data = {};
    const lines = text.split(/\r?\n/);
    let currentKey = null;

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const eqIdx = line.indexOf('=');
      if (eqIdx !== -1) {
        currentKey = line.slice(0, eqIdx).trim();
        data[currentKey] = line.slice(eqIdx + 1).trim();
      } else if (currentKey) {
        // Multi-line continuation
        data[currentKey] += '\n' + trimmed;
      }
    }
    return data;
  }

  function getField(data, key, currentLang) {
    return data[`${key}_${currentLang}`] || data[key] || '';
  }

  function openModalFromData(data) {
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
        title: data.jobTitle || data.labTitle || '',
        photo: data.photo,
        infoHtml: infoHtml
      });
    }
  }

  function createMemberCard(memberData) {
    const card = document.createElement('div');
    card.className = 'person-card profile';
    card.tabIndex = 0;

    const img = document.createElement('img');
    img.src = memberData.photo;
    img.alt = memberData.name;

    const p = document.createElement('p');
    p.className = isEn ? 'lang-en' : 'lang-zh';

    const strong = document.createElement('strong');
    strong.textContent = memberData.name;
    p.appendChild(strong);

    if (memberData.labTitle) {
      p.appendChild(document.createElement('br'));
      const parts = memberData.labTitle.split(/<br\s*\/?>/i);
      parts.forEach((part, i) => {
        if (i > 0) p.appendChild(document.createElement('br'));
        p.appendChild(document.createTextNode(part.trim()));
      });
    }

    card.appendChild(img);
    card.appendChild(p);

    card.addEventListener('click', () => openModalFromData(memberData));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModalFromData(memberData);
      }
    });

    return card;
  }

  async function loadMembers() {
    const currentGrid = document.getElementById('current-members-grid');
    const alumniGrid = document.getElementById('alumni-members-grid');
    const alumniPlaceholder = document.getElementById('alumni-placeholder');

    if (!currentGrid) return;

    try {
      const res = await fetch('members/members.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const membersData = await res.json();

      let currentList = [];
      let alumniList = [];

      if (Array.isArray(membersData)) {
        currentList = membersData;
      } else if (membersData && typeof membersData === 'object') {
        currentList = membersData.current || [];
        alumniList = membersData.alumni || [];
      }

      // Load current members
      if (currentList.length > 0) {
        currentGrid.innerHTML = '';
        for (const folder of currentList) {
          try {
            const infoRes = await fetch(`members/${folder}/info.txt`);
            if (!infoRes.ok) throw new Error(`HTTP ${infoRes.status}`);
            const text = await infoRes.text();
            const parsed = parseInfoTxt(text);
            const photoFile = parsed.photo || 'image.avif';
            const photoPath = photoFile.startsWith('http') || photoFile.startsWith('/')
              ? photoFile
              : `members/${folder}/${photoFile}`;

            const memberObj = {
              folder,
              name: getField(parsed, 'name', lang) || folder,
              labTitle: getField(parsed, 'labTitle', lang),
              jobTitle: getField(parsed, 'jobTitle', lang),
              degree: getField(parsed, 'degree', lang),
              office: getField(parsed, 'office', lang),
              fields: getField(parsed, 'fields', lang),
              expertise: getField(parsed, 'expertise', lang),
              experience: getField(parsed, 'experience', lang),
              phone: getField(parsed, 'phone', lang),
              email: getField(parsed, 'email', lang),
              website: getField(parsed, 'website', lang),
              cv: getField(parsed, 'cv', lang),
              photo: photoPath
            };
            currentGrid.appendChild(createMemberCard(memberObj));
          } catch (e) {
            console.warn(`Could not load member ${folder}:`, e);
          }
        }
      } else {
        currentGrid.innerHTML = `<p style="color:#888;">${isEn ? 'No current members.' : '尚無現任成員資料。'}</p>`;
      }

      // Load alumni
      if (alumniGrid) {
        if (alumniList.length > 0) {
          alumniGrid.innerHTML = '';
          if (alumniPlaceholder) alumniPlaceholder.style.display = 'none';
          for (const folder of alumniList) {
            try {
              const infoRes = await fetch(`members/${folder}/info.txt`);
              if (!infoRes.ok) throw new Error(`HTTP ${infoRes.status}`);
              const text = await infoRes.text();
              const parsed = parseInfoTxt(text);
              const photoFile = parsed.photo || 'image.avif';
              const photoPath = photoFile.startsWith('http') || photoFile.startsWith('/')
                ? photoFile
                : `members/${folder}/${photoFile}`;

              const memberObj = {
                folder,
                name: getField(parsed, 'name', lang) || folder,
                labTitle: getField(parsed, 'labTitle', lang),
                jobTitle: getField(parsed, 'jobTitle', lang),
                degree: getField(parsed, 'degree', lang),
                office: getField(parsed, 'office', lang),
                fields: getField(parsed, 'fields', lang),
                expertise: getField(parsed, 'expertise', lang),
                experience: getField(parsed, 'experience', lang),
                phone: getField(parsed, 'phone', lang),
                email: getField(parsed, 'email', lang),
                website: getField(parsed, 'website', lang),
                cv: getField(parsed, 'cv', lang),
                photo: photoPath
              };
              alumniGrid.appendChild(createMemberCard(memberObj));
            } catch (e) {
              console.warn(`Could not load alumni ${folder}:`, e);
            }
          }
        } else {
          alumniGrid.innerHTML = '';
          if (alumniPlaceholder) alumniPlaceholder.style.display = '';
        }
      }

    } catch (err) {
      console.warn('Could not load members/members.json:', err);
      const warningText = isEn
        ? 'Unable to load members info. Please check members/members.json.'
        : '無法載入成員資訊，請檢查 members/members.json 設定。';
      currentGrid.innerHTML = `<p style="text-align:center; padding: 2rem; color: #888; font-size: 15px;">⚠️ ${warningText}</p>`;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadMembers);
  } else {
    loadMembers();
  }
})();
