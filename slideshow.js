(() => {
  let slideIndex = 1;
  let slideTimeout;

  function resolveImagePath(item) {
    const src = typeof item === 'string' ? item : item?.src;
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/') || src.startsWith('index/')) {
      return src;
    }
    return `index/${src}`;
  }

  async function loadImages() {
    try {
      const response = await fetch('index/images.json');
      if (!response.ok) {
        throw new Error(`Failed to load index/images.json: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(resolveImagePath).filter(Boolean);
      }
      return [];
    } catch (err) {
      console.warn('Could not load index/images.json.', err);
      return null;
    }
  }

  async function initSlideshow() {
    const container = document.getElementById('slideshow-container');
    if (!container) return;

    const images = await loadImages();
    const isEn = document.documentElement.lang === 'en';

    if (images === null || images.length === 0) {
      const warningText = isEn
        ? 'Unable to load slideshow images. Please check index/images.json.'
        : '無法載入輪播圖片，請檢查 index/images.json 設定。';
      container.innerHTML = `<p style="text-align: center; padding: 2rem; color: #888; font-size: 15px;">⚠️ ${warningText}</p>`;
      return;
    }

    container.innerHTML = '';

    images.forEach((src, idx) => {
      const slide = document.createElement('div');
      slide.className = `slide${idx === 0 ? ' active' : ''}`;
      
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Slideshow photo ${idx + 1}`;
      
      slide.appendChild(img);
      container.appendChild(slide);
    });

    if (images.length > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'slideshow-prev';
      prevBtn.innerHTML = '&#10094;';
      prevBtn.setAttribute('aria-label', 'Previous Slide');
      prevBtn.onclick = () => moveSlide(-1);
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'slideshow-next';
      nextBtn.innerHTML = '&#10095;';
      nextBtn.setAttribute('aria-label', 'Next Slide');
      nextBtn.onclick = () => moveSlide(1);

      container.appendChild(prevBtn);
      container.appendChild(nextBtn);

      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'slideshow-dots';
      
      images.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = `dot${idx === 0 ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${idx + 1}`);
        dot.onclick = () => currentSlide(idx);
        dotsContainer.appendChild(dot);
      });

      container.appendChild(dotsContainer);

      slideTimeout = setTimeout(showSlides, 5000);
    }
  }

  function showSlides() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    slides[slideIndex - 1].classList.add('active');
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].classList.add('active');
    }

    slideTimeout = setTimeout(showSlides, 5000);
  }

  function moveSlide(n) {
    clearTimeout(slideTimeout);
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;
    
    slides[slideIndex - 1].classList.remove('active');
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].classList.remove('active');
    }

    slideIndex += n;
    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slideIndex < 1) { slideIndex = slides.length; }

    slides[slideIndex - 1].classList.add('active');
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].classList.add('active');
    }

    slideTimeout = setTimeout(showSlides, 5000);
  }

  function currentSlide(n) {
    clearTimeout(slideTimeout);
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;
    
    slides[slideIndex - 1].classList.remove('active');
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].classList.remove('active');
    }

    slideIndex = n + 1;

    slides[slideIndex - 1].classList.add('active');
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].classList.add('active');
    }

    slideTimeout = setTimeout(showSlides, 5000);
  }

  async function loadNews() {
    const newsList = document.getElementById('news-list');
    if (!newsList) return;

    try {
      const response = await fetch('index/news.json');
      if (!response.ok) throw new Error(`Failed to load index/news.json: ${response.status}`);
      const newsData = await response.json();
      const isEn = document.documentElement.lang === 'en';

      if (Array.isArray(newsData) && newsData.length > 0) {
        newsList.innerHTML = '';
        newsData.forEach(item => {
          const date = isEn ? (item.date_en || item.date_zh || '') : (item.date_zh || item.date_en || '');
          const text = isEn ? (item.text_en || item.text_zh || '') : (item.text_zh || item.text_en || '');
          const li = document.createElement('li');
          li.textContent = `${date}：${text}`;
          newsList.appendChild(li);
        });
      }
    } catch (err) {
      console.warn('Could not load index/news.json.', err);
    }
  }

  // Bind functions to window so click events on generated buttons work correctly
  window.moveSlide = moveSlide;
  window.currentSlide = currentSlide;

  function initPage() {
    initSlideshow();
    loadNews();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
  } else {
    initPage();
  }
})();
