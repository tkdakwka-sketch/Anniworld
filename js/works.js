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

  let index = 1; // 첫 번째 실제 이미지에서 시작
  let isPaused = false;
  let isTransitioning = false;
  const total = slideImages.length;

  // 양쪽 끝에 클론 추가 (부드러운 무한 루프용)
  const lastClone = slideImages[total - 1].cloneNode(true);
  const firstClone = slideImages[0].cloneNode(true);
  
  slides.insertBefore(lastClone, slideImages[0]); // 마지막 이미지 클론을 맨 앞에
  slides.appendChild(firstClone); // 첫 번째 이미지 클론을 맨 뒤에

  // 슬라이드 너비 계산
  function getSlideWidth() {
    return slideImages[0].offsetWidth || slideImages[0].getBoundingClientRect().width;
  }

  // 초기 위치 설정 (첫 번째 실제 이미지 위치로)
  slides.style.transition = "none"; // 애니메이션 제거
  slides.style.transform = `translateX(-${index * getSlideWidth()}px)`;

  // 슬라이드 이동
  function moveToSlide(i, withTransition = true) {
    const slideWidth = getSlideWidth();
    if (withTransition) {
      slides.style.transition = "transform 0.4s ease";
    } else {
      slides.style.transition = "none";
    }
    slides.style.transform = `translateX(-${i * slideWidth}px)`;
  }

  // transitionend 이벤트 처리
  function handleTransitionEnd() {
    if (isTransitioning) {
      isTransitioning = false;
      
      if (index === total + 1) {
        // 마지막 클론에 있을 때 첫 번째 실제 이미지로 이동
        index = 1;
        moveToSlide(index, false);
      } else if (index === 0) {
        // 첫 번째 클론에 있을 때 마지막 실제 이미지로 이동
        index = total;
        moveToSlide(index, false);
      }
    }
  }

  slides.addEventListener('transitionend', handleTransitionEnd);

  // 다음 슬라이드 (이미지가 왼쪽에서 오른쪽으로 흐름)
  function showNext() {
    if (isTransitioning) return;
    isTransitioning = true;
    index--;
    moveToSlide(index);
  }

  // 이전 슬라이드 (이미지가 오른쪽에서 왼쪽으로 흐름)
  function showPrev() {
    if (isTransitioning) return;
    isTransitioning = true;
    index++;
    moveToSlide(index);
  }

  // 자동 슬라이드 루프 (이미지가 왼쪽에서 오른쪽으로 흐름)
  let autoSlide = setInterval(showNext, 5000);

  // 일시정지/재생 버튼
  pauseBtn.addEventListener('click', () => {
    if (isPaused) {
      autoSlide = setInterval(showNext, 5000);
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

  // 창 크기 변경시 위치 재조정
  window.addEventListener('resize', () => {
    moveToSlide(index, false);
  });

  // 마우스 호버시 자동재생 일시정지
  slides.addEventListener('mouseenter', () => {
    if (!isPaused) {
      clearInterval(autoSlide);
    }
  });

  slides.addEventListener('mouseleave', () => {
    if (!isPaused) {
      autoSlide = setInterval(showNext, 5000);
    }
  });
})();