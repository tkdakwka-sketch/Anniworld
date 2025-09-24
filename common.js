// 기존 동적 리소스 제거
function clearDynamicResources() {
  document.querySelectorAll('link[data-dynamic], script[data-dynamic]').forEach(el => el.remove());
}

window.addEventListener('DOMContentLoaded', () => {
  const currentPath = location.pathname.split('/').pop(); 
  if (!currentPath || currentPath === 'index.html') {
    loadPage('main.html'); // 기본 페이지
  } else {
    loadPage(currentPath);
  }
});

function loadResources(pageName, callback) {
  const baseName = pageName.replace('.html', '');
  const cssList = [`${baseName}.css`];
  if (baseName === 'work') cssList.unshift('jquery.fullPage.css');

  let cssLoaded = 0;
  cssList.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute('data-dynamic', 'true');
    link.onload = () => {
      cssLoaded++;
      if (cssLoaded === cssList.length) {
        loadJSResources(baseName, callback);
      }
    };
    document.head.appendChild(link);
  });
}

function loadJSResources(baseName, callback) {
  if (baseName === 'work') {
    loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
      loadScript('jquery.fullPage.js', () => {
        loadScript('work.js', callback);
      });
    });
  } else {
    loadScript(`${baseName}.js`, callback);
  }
}

function loadScript(src, onload) {
  const script = document.createElement('script');
  script.src = src;
  script.async = false;
  script.setAttribute('data-dynamic', 'true');
  script.onload = onload;
  document.body.appendChild(script);
}

function loadPage(pageName) {
  clearDynamicResources();

  fetch(pageName)
    .then(res => {
      if (!res.ok) throw new Error(`페이지 로딩 실패: ${res.status}`);
      return res.text();
    })
    .then(html => {
      document.querySelector('#content-area').innerHTML = html;

      const footerLayer = document.querySelector('.footer-layer');
      if (footerLayer) {
        footerLayer.style.display = pageName === 'main.html' ? 'block' : 'none';
      }

      history.pushState(null, '', pageName);

      loadResources(pageName, () => {
        const baseName = pageName.replace('.html', '');
        if (baseName === 'work' && typeof initWorkPage === 'function') {
          initWorkPage();
        }
      });
    })
    .catch(err => {
      console.error('페이지 로딩 중 오류 발생:', err);
      document.querySelector('#content-area').innerHTML = `<p style="color:red;">${pageName} 로딩 실패</p>`;
    });
}

document.querySelector('nav').addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (link && link.getAttribute('href')) {
    e.preventDefault();
    const page = link.getAttribute('href');
    loadPage(page);
  }
});

window.addEventListener('popstate', () => {
  const page = location.pathname.split('/').pop() || 'main.html';
  loadPage(page);
});
