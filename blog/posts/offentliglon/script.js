var winHeight, docHeight, top, max;

$(document).ready(function() {
  winHeight = $(window).height();
  docHeight = $(document).height();
});

$(document).on('scroll',function() {
  max = docHeight - winHeight;
  progress = 100 - ((max - $(window).scrollTop())*100/max)

  $('#scroll_progress').css('width', 100-progress+'%')
                      .css('left', (progress/2)+'%');


});
