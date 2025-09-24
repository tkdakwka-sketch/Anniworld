(function() {
  const slides = document.querySelector('.slides');
  if (!slides) {
    console.warn('슬라이더 요소를 찾을 수 없습니다.');
    return;
  }

  const slideImages = document.querySelectorAll('.slides img');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pauseBtn = document.getElementById('pauseBtn');

  let index = 0;
  let isPaused = false;
  const total = slideImages.length;

  // 클론 추가 (무한 루프용)
  const firstClone = slideImages[0].cloneNode(true);
  slides.appendChild(firstClone);

  // 슬라이드 너비 계산
  function getSlideWidth() {
    return slideImages[0].offsetWidth || slideImages[0].getBoundingClientRect().width;
  }

  // 슬라이드 이동
  function moveToSlide(i) {
    const slideWidth = getSlideWidth();
    slides.style.transition = "transform 0.5s ease";
    slides.style.transform = `translateX(-${i * slideWidth}px)`;
  }

  // 다음 슬라이드
  function showNext() {
    index++;
    moveToSlide(index);

    if (index === total) {
      setTimeout(() => {
        slides.style.transition = "none";
        slides.style.transform = `translateX(0px)`;
        index = 0;
      }, 500);
    }
  }

  // 이전 슬라이드
  function showPrev() {
    if (index === 0) return;
    index--;
    moveToSlide(index);
  }

  // 자동 슬라이드 루프
  let autoSlide = setInterval(showNext, 3000);

  // 일시정지/재생 버튼
  pauseBtn.addEventListener('click', () => {
    if (isPaused) {
      autoSlide = setInterval(showNext, 3000);
      pauseBtn.textContent = '❚❚';
    } else {
      clearInterval(autoSlide);
      pauseBtn.textContent = '▶';
    }
    isPaused = !isPaused;
  });

  // 버튼 이벤트
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);
})();