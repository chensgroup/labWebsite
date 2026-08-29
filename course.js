(() => {
  const isEn = document.documentElement.lang === 'en';
  const lang = isEn ? 'en' : 'zh';

  function openCourseModal(course) {
    const name = isEn ? (course.name_en || course.name_zh) : (course.name_zh || course.name_en);
    const episodes = course.episodes || [];
    let infoHtml = '';

    if (episodes.length > 0) {
      infoHtml = '<ul style="list-style: none; padding: 0; margin: 1.5rem 0; text-align: left;">' +
        episodes.map(ep => {
          const title = isEn ? (ep.title_en || ep.title_zh || '') : (ep.title_zh || ep.title_en || '');
          return `
            <li style="margin: 1rem 0; font-size: 16px; line-height: 1.5;">
              <a href="${ep.url}" target="_blank" rel="noopener" style="color: var(--blue, #007bff); text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
                🎬 ${title}
              </a>
            </li>
          `;
        }).join('') +
        '</ul>';
    } else {
      const placeholderText = isEn
        ? 'Course details coming soon!'
        : '課程詳細資訊規劃中，敬請期待！';
      infoHtml = `<p style="text-align: center; margin: 2rem 0; font-size: 16px;">${placeholderText}</p>`;
    }

    if (window.SiteModal) {
      window.SiteModal.open({
        name: name,
        infoHtml: infoHtml
      });
    }
  }

  function createCourseCard(course) {
    const name = isEn ? (course.name_en || course.name_zh) : (course.name_zh || course.name_en);
    const btn = document.createElement('a');
    btn.className = 'course-button person-card';
    btn.href = 'javascript:void(0);';
    btn.setAttribute('tabindex', '0');

    const strong = document.createElement('strong');
    strong.textContent = name;
    btn.appendChild(strong);

    btn.addEventListener('click', e => {
      e.preventDefault();
      openCourseModal(course);
    });

    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCourseModal(course);
      }
    });

    return btn;
  }

  async function loadCourses() {
    const activeGrid = document.getElementById('active-courses-grid') || document.querySelector('.photo-grid');
    const pastGrid = document.getElementById('past-courses-grid');
    const pastPlaceholder = document.getElementById('past-courses-placeholder');
    const handoutsContainer = document.getElementById('handouts-container');

    try {
      const res = await fetch('courses/courses.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // Render Active Courses
      if (activeGrid) {
        activeGrid.innerHTML = '';
        const activeList = data.activeCourses || [];
        if (activeList.length > 0) {
          activeList.forEach(course => {
            activeGrid.appendChild(createCourseCard(course));
          });
        } else {
          activeGrid.innerHTML = `<p style="color:#888;">${isEn ? 'No active courses currently.' : '目前尚無開課資訊。'}</p>`;
        }
      }

      // Render Past Courses
      if (pastGrid) {
        const pastList = data.pastCourses || [];
        if (pastList.length > 0) {
          pastGrid.innerHTML = '';
          if (pastPlaceholder) pastPlaceholder.style.display = 'none';
          pastList.forEach(course => {
            pastGrid.appendChild(createCourseCard(course));
          });
        } else {
          pastGrid.innerHTML = '';
          if (pastPlaceholder) pastPlaceholder.style.display = '';
        }
      }

      // Render Handouts
      if (handoutsContainer && data.handouts) {
        handoutsContainer.innerHTML = '';
        data.handouts.forEach(handout => {
          const title = isEn ? (handout.title_en || handout.title_zh) : (handout.title_zh || handout.title_en);
          const p = document.createElement('p');
          const a = document.createElement('a');
          a.href = handout.file;
          a.target = '_blank';
          a.rel = 'noopener';
          a.textContent = `📄 ${title}`;
          p.appendChild(a);
          handoutsContainer.appendChild(p);
        });
      }

    } catch (err) {
      console.warn('Could not load courses/courses.json:', err);
      if (activeGrid) {
        const warningText = isEn
          ? 'Unable to load course info. Please check courses/courses.json.'
          : '無法載入課程資訊，請檢查 courses/courses.json 設定。';
        activeGrid.innerHTML = `<p style="text-align:center; padding: 2rem; color: #888; font-size: 15px;">⚠️ ${warningText}</p>`;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCourses);
  } else {
    loadCourses();
  }
})();
