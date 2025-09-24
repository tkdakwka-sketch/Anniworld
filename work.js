function initWorkPage() {
  if (typeof $ !== 'undefined' && typeof $.fn.fullpage !== 'undefined') {
    // fullPage 완전 destroy
    if ($('html').hasClass('fp-enabled') && $.fn.fullpage.destroy) {
      $.fn.fullpage.destroy('all');
      $('html').removeClass('fp-enabled');
      $('#fullpage').removeClass('fp-enabled fp-viewing-work1 fp-viewing-work2 fp-viewing-work3');
      $('#fullpage').off();
      $('#fullpage').html('');
    }

   // 이미지 로딩 후 fullPage 초기화
    const images = $('#fullpage img');
    let loaded = 0;

    if (images.length === 0) {
      startFullPage();
    } else {
      images.each(function () {
        if (this.complete) {
          loaded++;
        } else {
          $(this).on('load', () => {
            loaded++;
            if (loaded === images.length) {
              startFullPage();
            }
          });
        }
      });

      if (loaded === images.length) {
        startFullPage();
      }
    }

    function startFullPage() {
      if ($('#fullpage .section').length === 0) return;
      if ($('html').hasClass('fp-enabled')) return;

      $('#fullpage').fullpage({
        autoScrolling: true,
        navigation: true,
        scrollingSpeed: 700,
        anchors: ['work1', 'work2', 'work3'],
        paddingTop: '0px',
        menu: '#menu',
        afterRender: function () {
          console.log('✅ fullPage 초기화 완료');
        }
      });
    }
  } else {
    console.warn('❌ fullPage.js 또는 jQuery가 로드되지 않았습니다.');
  }
}