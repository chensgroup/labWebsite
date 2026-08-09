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

  const COURSE_DATA = {
    'zh': {
      '物理教材教法': [
        { title: "科學教育的意義及重要性&對應課綱學習表現", url: "https://youtu.be/tkMNUhW7gTQ?si=F3JniEVQ0jXTP9na" },
        { title: "力學&動力學 運動獨立性的探討(上)", url: "https://youtu.be/8CQyVP_1K5s?si=1z-MIEefVz8w5bHO" },
        { title: "運動獨立性(中)、向量在物理學上的必要性(上)、摩擦力的性質探討(上)", url: "https://youtu.be/dX2EO6d_ibo?si=78c8TXhh7QXyFIn7" },
        { title: "運動獨立性(下)、向量在物理學上的必要性(下)、摩擦力的性質探討(下)及課程設計", url: "https://youtu.be/bdyLPfTn_GU?si=QBL5VeOQR-8k1F0k" },
        { title: "等效原理、科氏力及光的三原色探究", url: "https://youtu.be/IS1RdeSqqdY?si=Xy0fWjq3O9OsP-rA" },
        { title: "暗物質的發現、在外太空如何轉身？活動探究、熱平衡問題", url: "https://youtu.be/iJRnQ1j1ShE?si=l-j2a0vxtusW8U4s" },
        { title: "探究式教學演練─以暗物質為例；做功、動能、教學順序；位能的定義及意義(上)", url: "https://youtu.be/28dZRVf70cw?si=rSzclWKUFWFt8leT" },
        { title: "力學能守恆的概念、探究式教學技巧討論；簡諧運動單元的存在意義、可以如何教(引言)", url: "https://youtu.be/OSnnvrukei4?si=xpFNm5Spzqc2l8Yy" },
        { title: "簡諧運動的課程與實驗設計；光的漫射實驗、生活應用", url: "https://youtu.be/rbfJ0lF3O5k?si=jgLpbntjWoT5SxUm" },
        { title: "探究式教學法步驟簡介、科學核心素養簡介及討論─以大考題目為例", url: "https://youtu.be/0K70SSHD_D0?si=RfgO3VMpD_hJiHdL" },
        { title: "光的反射、折射、繞射 我們常忽略的教學內容", url: "https://youtu.be/gY61E5uqK8o?si=GPmjB8CXiw0PfzNt" },
        { title: "馬克士威方程組 國中就教過？原子結構、黑體輻射、氫原子光譜", url: "https://youtu.be/f6x3fk98s5c?si=U4-Ub8XX5iDv6h7Z" }
      ],
      '自然領域探究與實作': [
        { title: "課程概述與進行方式、徵才廣告閱讀與啟發、額外分享", url: "https://youtu.be/AVuyRHsPCKE?si=WgBwTQA7tClSpBkt" },
        { title: "兩點之間移動之變量探討、蒙地卡羅及布豐投針求圓周率實驗", url: "https://youtu.be/5ydxjwpUrYM?si=0kjiXeTCD5vdN6nm" },
        { title: "蒙地卡羅求圓周率探究實作收尾、費米問題─求臺北市男大學生擁有自小客車的人數", url: "https://youtu.be/76RJByPk0Jo?si=XNB0xktwb9xSjMxm" },
        { title: "透過雜誌照片推測爆炸能量、因次分析法步驟教學與練習、三原色光譜量測實驗", url: "https://youtu.be/0OTPfdsTnfM?si=xZyEB-VhZGB0DXql" },
        { title: "科學是真理還是信仰？IMR&D 論文架構及撰寫技巧討論", url: "https://youtu.be/qbls4lJxim4?si=Hum6SzzBDNdhZ9ue" },
        { title: "碎形(Fractal)篇第一章：碎形概述及維度計算方式探討、無人機的飛行原理討論", url: "https://youtu.be/l-TSkdtpmdY?si=0AM0lRNKTNKFeC42" },
        { title: "碎形(Fractal)篇第二章：碎形實驗完整教學：操作流程、成品維度與運用AI估測", url: "https://youtu.be/WnvlWVIdsUQ?si=MhNMqaZQIVI28LJI" },
        { title: "碎形(Fractal)篇第三章：碎形實驗、活塞點火器原理討論", url: "https://youtu.be/-dx_iBLXC-I?si=_gtTPclfqC_IHhdM" },
        { title: "碎形(Fractal)篇最終章：碎形的生活應用、天文望遠鏡與微波爐的特徵波長探討、三根蠟燭誰最快熄滅？", url: "https://youtu.be/P1r3B-mM1JU?si=rSIkHL6xykdITT3O" },
        { title: "音階是人類直覺 or 自然定律？聲譜測量實驗及消失的基頻（missing fundamental）現象", url: "https://youtu.be/Hech-uQg3Gw?si=cMHMiTllzW3VwKWX" },
        { title: "哆啦a夢的放大燈管用嗎？紙蜻蜓實驗實作&平方立方律及動物飛行與否的規律", url: "https://youtu.be/4FMf-c8xIJg?si=aRCKqYsmPTNzGvuW" },
        { title: "科學是一個整體嗎？談數據分析 & 原住民族音樂中的物理─藏在風笛中的物理", url: "https://youtu.be/B9-KHHFbC1g?si=kVn7epCBbCe1RMSS" }
      ]
    },
    'en': {
      'Physics Pedagogy': [
        { title: "The Significance and Importance of Science Education & Alignment with Curriculum Learning Performance", url: "https://youtu.be/tkMNUhW7gTQ?si=F3JniEVQ0jXTP9na" },
        { title: "Mechanics & Dynamics: Exploration of Independence of Motion (Part 1)", url: "https://youtu.be/8CQyVP_1K5s?si=1z-MIEefVz8w5bHO" },
        { title: "Independence of Motion (Part 2), The Necessity of Vectors in Physics (Part 1), Nature of Friction (Part 1)", url: "https://youtu.be/dX2EO6d_ibo?si=78c8TXhh7QXyFIn7" },
        { title: "Independence of Motion (Part 3), The Necessity of Vectors in Physics (Part 2), Nature of Friction (Part 2) & Curriculum Design", url: "https://youtu.be/bdyLPfTn_GU?si=QBL5VeOQR-8k1F0k" },
        { title: "Equivalence Principle, Coriolis Force, and Inquiry into the Three Primary Colors of Light", url: "https://youtu.be/IS1RdeSqqdY?si=Xy0fWjq3O9OsP-rA" },
        { title: "Discovery of Dark Matter, How to Turn Around in Outer Space? Activity Inquiry, Thermal Equilibrium Problems", url: "https://youtu.be/iJRnQ1j1ShE?si=l-j2a0vxtusW8U4s" },
        { title: "Inquiry-based Teaching Practice: Dark Matter Example; Work, Kinetic Energy, Teaching Sequence; Definition & Significance of Potential Energy (Part 1)", url: "https://youtu.be/28dZRVf70cw?si=rSzclWKUFWFt8leT" },
        { title: "Concept of Mechanical Energy Conservation, Discussion on Inquiry-based Teaching Techniques; Significance of Simple Harmonic Motion Unit and How to Teach It (Introduction)", url: "https://youtu.be/OSnnvrukei4?si=xpFNm5Spzqc2l8Yy" },
        { title: "Curriculum and Experimental Design for Simple Harmonic Motion; Light Diffusion Experiment and Everyday Applications", url: "https://youtu.be/rbfJ0lF3O5k?si=jgLpbntjWoT5SxUm" },
        { title: "Introduction to Steps of Inquiry-based Teaching Method, Introduction & Discussion on Core Scientific Competencies: Exam Question Examples", url: "https://youtu.be/0K70SSHD_D0?si=RfgO3VMpD_hJiHdL" },
        { title: "Reflection, Refraction, and Diffraction of Light: Teaching Content We Often Overlook", url: "https://youtu.be/gY61E5uqK8o?si=GPmjB8CXiw0PfzNt" },
        { title: "Maxwell's Equations Taught in Middle School? Atomic Structure, Blackbody Radiation, Hydrogen Atom Spectrum", url: "https://youtu.be/f6x3fk98s5c?si=U4-Ub8XX5iDv6h7Z" }
      ],
      'Inquiry and Practice in Natural Sciences': [
        { title: "Course Overview and Methodology, Job Advertisement Reading and Insights, Extra Sharing", url: "https://youtu.be/AVuyRHsPCKE?si=WgBwTQA7tClSpBkt" },
        { title: "Variable Exploration of Movement Between Two Points, Monte Carlo & Buffon's Needle Experiments for Pi", url: "https://youtu.be/5ydxjwpUrYM?si=0kjiXeTCD5vdN6nm" },
        { title: "Wrap-up of Monte Carlo Pi Experiment, Fermi Problem: Estimation of Car Ownership Among Male University Students in Taipei", url: "https://youtu.be/76RJByPk0Jo?si=XNB0xktwb9xSjMxm" },
        { title: "Estimating Explosion Energy from Magazine Photos, Dimensional Analysis Steps and Practice, Three Primary Colors Spectrum Measurement Experiment", url: "https://youtu.be/0OTPfdsTnfM?si=xZyEB-VhZGB0DXql" },
        { title: "Is Science Truth or Belief? Discussion on IMRAD Paper Structure and Writing Techniques", url: "https://youtu.be/qbls4lJxim4?si=Hum6SzzBDNdhZ9ue" },
        { title: "Fractal Chapter 1: Introduction to Fractals & Dimension Calculation, Discussion on Drone Flight Principles", url: "https://youtu.be/l-TSkdtpmdY?si=0AM0lRNKTNKFeC42" },
        { title: "Fractal Chapter 2: Complete Tutorial on Fractal Experiment: Procedure, Dimension of Outcomes, and AI-assisted Estimation", url: "https://youtu.be/WnvlWVIdsUQ?si=MhNMqaZQIVI28LJI" },
        { title: "Fractal Chapter 3: Fractal Experiment & Discussion on Piston Fire Starter Principles", url: "https://youtu.be/-dx_iBLXC-I?si=_gtTPclfqC_IHhdM" },
        { title: "Fractal Final Chapter: Everyday Applications of Fractals, Characteristic Wavelengths in Telescopes and Microwaves, Which of Three Candles Extinguishes First?", url: "https://youtu.be/P1r3B-mM1JU?si=rSIkHL6xykdITT3O" },
        { title: "Is Musical Scale Human Intuition or Natural Law? Sound Spectrum Experiment and the Missing Fundamental Phenomenon", url: "https://youtu.be/Hech-uQg3Gw?si=cMHMiTllzW3VwKWX" },
        { title: "Is Doraemon's Magnifying Ray Realistic? Paper Dragonfly Experiment, Square-Cube Law, and Patterns of Animal Flight", url: "https://youtu.be/4FMf-c8xIJg?si=aRCKqYsmPTNzGvuW" },
        { title: "Is Science a Unified Whole? Data Analysis & Physics in Indigenous Music: Physics Hidden in Bagpipes", url: "https://youtu.be/B9-KHHFbC1g?si=kVn7epCBbCe1RMSS" }
      ]
    }
  };

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

  function openModal(name) {
    nameEl.textContent = name;
    if (nameMobileEl) nameMobileEl.textContent = name;

    const lang = document.documentElement.lang === 'en' ? 'en' : 'zh';
    const links = COURSE_DATA[lang] && COURSE_DATA[lang][name];

    if (links && links.length > 0) {
      infoEl.innerHTML = '<ul style="list-style: none; padding: 0; margin: 1.5rem 0; text-align: left;">' +
        links.map(link => `
          <li style="margin: 1rem 0; font-size: 16px; line-height: 1.5;">
            <a href="${link.url}" target="_blank" style="color: var(--primary-color, #007bff); text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
              🎬 ${link.title}
            </a>
          </li>
        `).join('') +
        '</ul>';
    } else {
      const placeholderText = lang === 'en'
        ? 'Course details coming soon!'
        : '課程詳細資訊規劃中，敬請期待！';
      infoEl.innerHTML = `<p style="text-align: center; margin: 2rem 0; font-size: 16px;">${placeholderText}</p>`;
    }

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
    const name = card.dataset.name || card.querySelector('strong')?.textContent || '';
    card.addEventListener('click', e => {
      e.preventDefault();
      openModal(name);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(name);
      }
    });
  });
})();
