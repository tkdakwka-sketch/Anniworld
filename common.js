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