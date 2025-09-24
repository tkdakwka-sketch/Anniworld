$(document).ready(function() {
$('#fullpage').fullpage({
autoScrolling: true,
navigation: true,
scrollingSpeed: 700,
anchors: ['work1', 'work2', 'work3'],
menu: '#menu',
afterRender: function () {
  console.log('✅ fullPage 초기화 완료');
}
});
});