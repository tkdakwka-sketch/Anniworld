(function () {
  const photoLayer = document.querySelector(".layer.photo");
  const bodyLayer  = document.querySelector(".layer.body");
  const caption    = document.querySelector(".caption");

  let ticking = false;

  // 진행도 헬퍼: 특정 구간(start~start+duration)에서 0~1로 변환
  function progressInRange(scrollY, start, duration) {
    const p = (scrollY - start) / duration;
    return Math.min(Math.max(p, 0), 1); // clamp 0~1
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const vh = window.innerHeight;
      const y  = window.scrollY;

      // 구간 설정:
      // - PHOTO: 1*vh ~ 2*vh
      // - BODY : 2*vh ~ 3*vh
      const photoP = progressInRange(y, 1 * vh, 1 * vh);
      const bodyP  = progressInRange(y, 2 * vh, 1 * vh);

      // 이미지 드러내기 (아래→위)
      const photoRevealTop = 100 - photoP * 100;
      const bodyRevealTop  = 100 - bodyP * 100;

      photoLayer.style.clipPath = `inset(${photoRevealTop}% 0 0 0)`;
      bodyLayer.style.clipPath  = `inset(${bodyRevealTop}% 0 0 0)`;

      // PHOTO 구간에서 캡션 처리
      if (photoP > 0 && bodyP === 0) {
        if (photoP <= 0.4) {
          // 0~0.6: 올라오면서 나타남
          const appearP = photoP / 0.4; // 0 → 1
          const translateY = 100 - appearP * 100; // 100% → 0%
          caption.style.transform = `translate(-50%, ${translateY}%)`;
          caption.style.opacity   = appearP * 0.6; // 0 → 0.6
        } else {
          // 0.5~1: 고정 상태
          caption.style.transform = `translate(-50%, 0%)`;
          caption.style.opacity   = 0.6;
        }
      }

      // BODY 구간에서 캡션 처리
      if (bodyP > 0) {
        const disappearP = bodyP / 0.5; // 0 → 1
        caption.style.transform = `translate(-50%, ${-disappearP *50}%)`;
        caption.style.opacity   = (1 - disappearP) * 0.6; // 0.6 → 0
      }

      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  // 초기 상태 반영
  onScroll();
})();