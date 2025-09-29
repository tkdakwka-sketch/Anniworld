// 페이지가 로드될 때 페이드 인
window.addEventListener('load', () => {
  const fadeArea = document.querySelector('.fade-area');
  if (fadeArea) {
    fadeArea.classList.add('fade-in');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.transition-link');
  const fadeArea = document.querySelector('.fade-area');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      if (fadeArea) {
        fadeArea.classList.remove('fade-in');
        fadeArea.classList.add('fade-out');
      }
      setTimeout(() => {
        window.location.href = this.href;
      }, 500);
    });
  });
});

/*// 슬라이더 효과
window.addEventListener('load', () => {
  const fadeArea = document.querySelector('.slide-area');
  if (fadeArea) {
    fadeArea.classList.add('slide-in');
  }  
});

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.transition-link');
  const fadeArea = document.querySelector('.slide-area');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      if (fadeArea) {
        fadeArea.classList.remove('slide-in');
        fadeArea.classList.add('slide-out');
      }
      setTimeout(() => {
        window.location.href = this.href;
      }, 800); // 슬라이드 전환 시간과 일치
    });
  });
});*/


// 모든 페이지에서 공통으로 실행되는 스크립트
window.addEventListener('DOMContentLoaded', () => {
  console.log('✅ 페이지 로드 완료');

  // 예: 메뉴 버튼 토글
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
});