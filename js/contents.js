const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const trackTitle = document.getElementById('trackTitle');
const progressBar = document.getElementById('progressBar');

let currentAudioSrc = null;

const swiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: false
    },  
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  slideToClickedSlide: true,
  loop: true,
  on: {
    
    // ✅ 첫 진입 시: 트랙 정보만 세팅, 재생은 안 함
    init: function () {
      this.slideToLoop(5, 0); // 초기 진입 시 2번 슬라이드로 이동

      const activeSlide = this.slides[this.activeIndex];
      const audioSrc = activeSlide.getAttribute('data-audio');
      const title = activeSlide.querySelector('img')?.alt || 'Unknown Track';

      currentAudioSrc = audioSrc;
      trackTitle.textContent = title;

      const resolvedSrc = new URL(currentAudioSrc, window.location.href).href;
      audio.src = resolvedSrc;
      audio.load();

      playPauseBtn.textContent = '▶'; // 처음엔 항상 정지 상태
    },
 
    // ✅ 이후 슬라이드 변경 시: 자동 재생
    slideChange: function () {
      const activeSlide = this.slides[this.activeIndex];
      const audioSrc = activeSlide.getAttribute('data-audio');
      const title = activeSlide.querySelector('img')?.alt || 'Unknown Track';

      currentAudioSrc = audioSrc;
      trackTitle.textContent = title;

      const resolvedSrc = new URL(currentAudioSrc, window.location.href).href;
      if (audio.src !== resolvedSrc) {
        audio.src = resolvedSrc;
        audio.load();
      }

      audio.play().then(() => {
        playPauseBtn.textContent = '❚❚';
      }).catch(err => {
        console.log('자동 재생 실패:', err);
        playPauseBtn.textContent = '▶';
      });
    },
    slideChangeTransitionEnd: function () {
      document.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.classList.remove('inner');
      });
      const centerSlide = document.querySelector('.swiper-slide-active');
      if (centerSlide) centerSlide.classList.add('inner');
    },
  }
});

playPauseBtn.addEventListener('click', () => {
  if (!currentAudioSrc) return;

  const resolvedSrc = new URL(currentAudioSrc, window.location.href).href;

  if (audio.src !== resolvedSrc) {
    audio.src = resolvedSrc;
    audio.load();
  }

  if (audio.paused) {
    audio.play().then(() => {
      playPauseBtn.textContent = '❚❚';
    }).catch(err => {
      console.log('Play failed:', err);
    });
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶';
  }
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  }
});

progressBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});

// ✅ 노래가 끝나면 다음 슬라이드로 자동 이동
audio.addEventListener('ended', () => {
  swiper.slideNext(); // 다음 슬라이드로 이동
});

