$('#fullpage').fullpage({
  navigation: true,
  slidesNavigation: true,
  controlArrows: false,
  scrollHorizontally: false, // 직접 구현할 거니까 false
  afterSlideLoad: function(section, origin, destination, direction){
    // 슬라이드 도착 시 처리 가능
  }
});

$('.fp-section').each(function(){
  const $section = $(this);
  if ($section.find('.fp-slide').length > 0) {
    $section.on('wheel', function(e){
      const delta = e.originalEvent.deltaY;
      const activeSlide = $section.find('.fp-slide.active');
      const totalSlides = $section.find('.fp-slide').length;
      const currentIndex = activeSlide.index();

      if (delta > 0) { // 휠 아래로
        if (currentIndex < totalSlides - 1) {
          $.fn.fullpage.moveSlideRight();
        } else {
          $.fn.fullpage.moveSectionDown(); // 마지막 슬라이드면 다음 섹션으로
        }
      } else { // 휠 위로
        if (currentIndex > 0) {
          $.fn.fullpage.moveSlideLeft();
        } else {
          $.fn.fullpage.moveSectionUp(); // 첫 슬라이드면 이전 섹션으로
        }
      }
    });
  }
});