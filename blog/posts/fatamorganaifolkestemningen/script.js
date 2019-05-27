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
    noneuimmigration:{
      title:"Syn på indvandring fra lande udenfor EU",
      question:"Fortæl hvorvidt følgende sætning vækker en positive eller negativ følelse hos dig: Immigration af folk fra udenfor EU",
      data: {
        answers:["Meget positiv","Rimelig positiv", "Rimelig negative", "Meget negative", "Ved ikke"],
        years_a:["08-11-2014","16-05-2015","07-11-2015","21-05-2016","03-11-2016","20-05-2017","05-11-2017","17-03-2018","08-11-2018"],
        response_a:[
          [7.37, 34.86,	32.37, 19.42, 5.98],
          [4.31, 29.41,	38.63, 17.94, 9.71],
          [4.50, 24.90,	35.80, 25.90, 8.90],
          [2.78, 27.01,	38.03, 24.73, 7.45],
          [5.67, 24.78,	40.10, 23.08, 6.37],
          [4.72, 25.59,	39.17, 22.83, 7.68],
          [4.20, 25.80,	38.50, 23.60, 7.90],
          [4.83, 29.56,	38.13, 19.61, 7.88],
          [4.12, 25.61,	37.68, 24.14, 8.44]
        ],
        years_b:["2014","2015","2016","2017","2018"],
        response_b:[[7.370517928, 34.86055777, 32.37051793, 19.42231076, 5.976095618],
                    [4.406862745, 27.15588235, 37.21372549, 21.92058824, 9.302941176],
                    [4.226089019, 25.89352147, 39.06663307, 23.90574437, 6.908012075],
                    [4.462204724, 25.69527559, 38.83661417, 23.21732283, 7.788582677],
                    [4.474637068, 27.58499833, 37.90604137, 21.87361317, 8.160710056]],
      }
    },
    mostimportantissue:{
      title:"Det to vigtigste problemer DK står overfor",
      quetsion:"Hvad mener du er de to vigtigste problemer, som Danmark står overfor?",
      data: {
        years:["09-05-2005","11-10-2005","06-09-2006","10-04-2007","22-09-2007","25-03-2008",
               "06-10-2008","12-06-2009","23-10-2009","05-05-2010","12-05-2012","03-11-2012",
               "10-05-2013","02-11-2013","15-03-2014","31-05-2014","08-11-2014","28-02-2015",
               "16-05-2015","07-11-2015","21-05-2016","03-11-2016","20-05-2017","05-11-2017",
               "17-03-2018","08-11-2018"],
        response:[30.79,27.08,28.58,21.38,22.12,18.35,17.2,9.88,15.48,9.54,9.23,9.47,10.31,17.08,20.83,
                  20.24,34.2,31.69,35.44,60.06,57.11,41.24,37.63,32.05,34.32,29.98]
      }
    }
  }
}
