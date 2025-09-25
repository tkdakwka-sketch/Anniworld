// 각 섹션별 비디오 시간을 임시 저장할 객체 (세션 중에만 유지)
const videoTimeStorage = {};

$(document).ready(function() {
  $('#fullpage').fullpage({
    autoScrolling: true,
    navigation: true,
    scrollingSpeed: 700,
    anchors: ['work1', 'work2', 'work3'],
    menu: '#menu',
    
    afterRender: function () {
      console.log('✅ fullPage 초기화 완료');
      // 초기 로드 시 첫 번째 섹션의 비디오 재생 (처음부터)
      playVideoInCurrentSection(true); // true = 처음부터 재생
    },
    
    // 섹션 이동 후 실행되는 콜백
    afterLoad: function(origin, destination, direction) {
      console.log('섹션 이동 완료:', destination.anchor);
      // 현재 섹션의 비디오 재생 (저장된 시간부터)
      playVideoInCurrentSection(false); // false = 저장된 시간부터 재생
    },
    
    // 섹션 떠날 때 실행되는 콜백 (fullpage 내에서만)
    onLeave: function(origin, destination, direction) {
      // 이전 섹션의 비디오 시간 저장 후 일시정지
      saveVideoTimeInSection(origin.index);
    }
  });
  
  // 현재 활성 섹션의 비디오를 찾아서 재생하는 함수
  function playVideoInCurrentSection(fromBeginning = false) {
    const activeSection = $('.section.active');
    const sectionIndex = activeSection.index();
    const videos = activeSection.find('video');
    
    videos.each(function(videoIndex) {
      const video = this;
      const videoId = `section-${sectionIndex}-video-${videoIndex}`;
      
      // 비디오가 로드되었는지 확인
      if (video.readyState >= 2) {
        if (fromBeginning) {
          // 처음부터 재생
          video.currentTime = 0;
          console.log(`비디오 ${videoId} 처음부터 재생`);
        } else if (videoTimeStorage[videoId] !== undefined) {
          // 저장된 시간부터 재생
          video.currentTime = videoTimeStorage[videoId];
          console.log(`비디오 ${videoId} 저장된 시간부터 재생: ${videoTimeStorage[videoId]}초`);
        }
        
        video.play().catch(function(error) {
          console.log('비디오 재생 실패:', error);
        });
      } else {
        // 비디오가 아직 로드되지 않았다면 로드 완료를 기다림
        video.addEventListener('canplay', function() {
          if (fromBeginning) {
            video.currentTime = 0;
          } else if (videoTimeStorage[videoId] !== undefined) {
            video.currentTime = videoTimeStorage[videoId];
          }
          
          video.play().catch(function(error) {
            console.log('비디오 재생 실패:', error);
          });
        }, { once: true });
      }
    });
  }
  
  // 섹션을 떠날 때 비디오 시간만 저장하는 함수 (일시정지는 안함)
  function saveVideoTimeInSection(sectionIndex) {
    const section = $('.section').eq(sectionIndex);
    const videos = section.find('video');
    
    videos.each(function(videoIndex) {
      const video = this;
      const videoId = `section-${sectionIndex}-video-${videoIndex}`;
      
      // 현재 재생 시간 저장
      if (!video.paused && video.currentTime > 0) {
        videoTimeStorage[videoId] = video.currentTime;
        console.log(`비디오 ${videoId} 시간 저장: ${video.currentTime}초`);
      }
    });
  }
});

// 페이지 가시성 변경 감지 (다른 탭으로 갔다가 돌아올 때)
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    // 다른 탭에서 돌아올 때는 저장된 시간을 초기화하고 처음부터 재생
    console.log('다른 탭에서 돌아옴 - 비디오 시간 초기화');
    
    // 저장된 시간 모두 삭제
    Object.keys(videoTimeStorage).forEach(key => {
      delete videoTimeStorage[key];
    });
    
    // 현재 섹션의 비디오를 처음부터 재생
    setTimeout(function() {
      const activeSection = $('.section.active');
      const videos = activeSection.find('video');
      
      videos.each(function() {
        const video = this;
        video.currentTime = 0; // 처음부터
        
        if (video.paused) {
          video.play().catch(function(error) {
            console.log('비디오 재생 실패:', error);
          });
        }
      });
    }, 100);
  }
});