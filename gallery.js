// 모달 요소 가져오기
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");

// 카테고리별 이미지 배열
const categoryImages = {
  all: [],
  realistic: [],
  anime: [],
  illustration: [],
  td: [],
  adult: []
};

// realistic
for (let i = 1; i <= 28; i++) {
  const path = `gallery/realistic/re${i}.png`;
  categoryImages.realistic.push(path);
  categoryImages.all.push(path);
}

// anime
for (let i = 1; i <= 27; i++) {
  const path = `gallery/anime/an${i}.png`;
  categoryImages.anime.push(path);
  categoryImages.all.push(path);
}

// illustration
for (let i = 1; i <= 4; i++) {
  const path = `gallery/illustration/il${i}.png`;
  categoryImages.illustration.push(path);
  categoryImages.all.push(path);
}

// td
for (let i = 1; i <= 14; i++) {
  const path = `gallery/td/td${i}.png`;
  categoryImages.td.push(path);
  categoryImages.all.push(path);
}

// adult
for (let i = 1; i <= 8; i++) {
  const path = `gallery/adult/ad${i}.png`;
  categoryImages.adult.push(path);
  categoryImages.all.push(path);
}

// 현재 카테고리 상태
let currentCategory = 'all';
let imagesPerPage = 81;
let currentPage = 1;

// 이미지 섞기
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function renderGalleryByCategory() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  let images = categoryImages[currentCategory];
  if (currentCategory === 'all') {
    images = shuffle([...images]);
  }

  const start = (currentPage - 1) * imagesPerPage;
  const end = start + imagesPerPage;
  const currentImages = images.slice(start, Math.min(end, images.length));

  const directions = ['slideFromLeft', 'slideFromRight', 'slideFromTop', 'slideFromBottom'];
  const colors = ['#24070eff', '#131313ff', '#15061bff', '#1e272cff', '#250a0aff',
                  '#0d201cff', '#1f1b1bff', '#151a1aff', '#131325ff', '#1c1c1c'];

currentImages.forEach(src => {
  const container = document.createElement('div');
  container.className = 'thumbnail-container';

  const bgLayer = document.createElement('div');
  bgLayer.className = 'bg-layer';
  bgLayer.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  const img = document.createElement('img');
  img.src = src;
  img.alt = 'preview';
  img.className = 'thumbnail';

  const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  const randomDelay = (Math.random() * 0.6).toFixed(2); // 0.00 ~ 1.00초 사이 랜덤
  img.style.animation = `${randomDirection} 0.5s ease ${randomDelay}s forwards`;

  // ★ 애니메이션 종료 후 인라인 스타일 초기화 및 transition 재설정
img.addEventListener('animationend', function() {
  this.style.animation = '';
  this.style.opacity = '1';
  this.style.transition = 'transform 0.6s ease, filter 0.6s ease';
  // opacity와 transform은 건드리지 마세요!
});

// ★ 애니메이션 종료 후 인라인 스타일 초기화 및 transition 재설정
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });

  container.appendChild(bgLayer);
  container.appendChild(img);
  gallery.appendChild(container);
});

  const pageNumber = document.getElementById('page-number');
  if (pageNumber) {
    pageNumber.textContent = currentPage;
  }
}


// 모달 닫기
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// 메뉴 클릭 이벤트 (한 번에 처리)
document.querySelectorAll('#gallery-menu li, #btn-all').forEach(item => {
  item.addEventListener('click', () => {
    const category = item.getAttribute('data-category') || 'all';
    currentCategory = category;
    currentPage = 1;
    renderGalleryByCategory();
  });
});

// 페이지네이션 버튼 렌더링
document.querySelectorAll('#gallery-menu li, #btn-all').forEach(item => {
  item.addEventListener('click', () => {
    // 모든 li에서 active 제거
    document.querySelectorAll('#gallery-menu li, #btn-all').forEach(li => li.classList.remove('active'));
    // 클릭한 li에 active 추가
    item.classList.add('active');
        // 스크롤 맨 위로 이동
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 또는 'auto'로 즉시 이동
    });
  });
});


// 스크롤 버튼
const scrollBtn = document.querySelector('.scroll-top-btn');
scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 초기 렌더링
renderGalleryByCategory();