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


/// Graph stuff

data = {
  electionstudy: {
    muslims:{
      title:"Muslimsk indvandring udgør trussel for DK",
      question:"De muslimske lande udgør på længere sigt en farlig trussel mod Danmarks sikkerhed",
      data:{ answers:["Enig", "Uenig"], years:[1990,1994,1998,2001,2005,2007], response[[68,51,43,43,45,48],[22,40,40,42,38,32]] }
    },
    sovereignty:{
      title:"Indvandring udgør trussel mod national egenart",
      question:"Indvandring udgør en alvorlig trussel mod vores nationale egenart",
      data:{ answers:["Enig", "Uenig"], years:[1988,1990,1994,1998,2001,2005,2007,2011,2015], response[[48,47,48,45,45,45,46,53,44],[48,43,47,42,40,41,34,31,41]] }
    },
  }
}
