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
  },
  eurobarometer:{
    title:"Syn på indvandring fra lande udenfor EU",
    question:"Fortæl hvorvidt følgende sætning vækker en positive eller negativ følelse hos dig: Immigration af folk fra udenfor EU",
    data: {
      answers:["Meget positiv","Rimelig positiv", "Rimelig negative", "Meget negative", "Ved ikke"],
      years:["2014", "2015a", "2015b","2016a","2016b","2017a","2017b","2018a","2018b"],
      response:[
        [7.37,	34.86,	32.37,	19.42,	5.98],
        [4.31,	29.41,	38.63,	17.94,	9.71],
        [4.50,	24.90,	35.80,	25.90,	8.90],
        [2.78,	27.01,	38.03,	24.73,	7.45],
        [5.67,	24.78,	40.10,	23.08,	6.37],
        [4.72,	25.59,	39.17,	22.83,	7.68],
        [4.20,	25.80,	38.50,	23.60,	7.90],
        [4.83,	29.56,	38.13,	19.61,	7.88],
        [4.12,	25.61,	37.68,	24.14,	8.44]
      ]
    }
  }
}
