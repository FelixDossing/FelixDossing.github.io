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

let electionstudy = {
  muslims:{
    title:"Muslimsk indvandring udgør trussel for DK",
    question:"De muslimske lande udgør på længere sigt en farlig trussel mod Danmarks sikkerhed",
    data:{ answers:["Enig", "Uenig"], years:[1990,1994,1998,2001,2005,2007], response:[[68,51,43,43,45,48],[22,40,40,42,38,32]] }
  },
  sovereignty:{
    title:"Indvandring udgør trussel mod national egenart",
    question:"Indvandring udgør en alvorlig trussel mod vores nationale egenart",
    data:{ answers:["Enig", "Uenig"], years:[1988,1990,1994,1998,2001,2005,2007,2011,2015], response:[[48,47,48,45,45,45,46,53,44],[48,43,47,42,40,41,34,31,41]] }
  },
}
let eurobarometer = {
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
      response_b:[[7.37, 34.86, 32.37, 19.42, 5.97],
                  [4.40, 27.15588235, 37.21, 21.92, 9.30],
                  [4.22, 25.89352147, 39.06, 23.90, 6.90],
                  [4.46, 25.69527559, 38.83, 23.21, 7.78],
                  [4.47, 27.58499833, 37.90, 21.87, 8.16]],
    }
  },
  mostimportantissue:{
    title:"Immigration blandt DKs to vigtigste problemer",
    quetsion:"Hvad mener du er de to vigtigste problemer, som Danmark står overfor?",
    data: {
      years:[2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
      response:[28.935,28.58,21.75,17.77,12.68,9.54,null,9.35,13.695,25.09,42.39,49.17,34.84,32.15]
    }
  }
}
let refugees = {
  title:"Antal asylansøgere (bruttoansøgertallet)",
  data:{
    years:[2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
    amount:[2281,1960,2246,2409,3855,5115,3806,6184,7557,14792,21315,6266,3500,3559]
  }
}
let ess = [
  {
    title:"Tillid til folketinget",
    name:"parlament",
    question:"Hvor stor tillid har du til folketinget?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: [0,1,2,3,4,5,6,7,8,9,10],
    response: [[2.26,0.98,3.64,5.07,6.3,21.28,11.88,19.15,18.87,5.69,4.89,],[1.75,1.44,2.88,5.58,8.1,18.5,12.71,18.07,18.5,7.29,5.18,],
    [2.22,1.22,2.71,5.68,5.57,17.93,10.86,20.71,21.14,7.99,3.96,],[1.19,1.12,2.75,6.07,6.26,18.18,11,18.01,21.39,8.51,5.51,],[2.44,1.39,3.44,8.54,10.02,19.45,13.6,17.16,15.04,5.8,3.13],
    [2.32,1.48,4.23,6.74,8.5,17.14,13.87,19.72,14.22,7.51,4.27,],[3.5,2.42,6.15,9.07,7.93,14.3,12.93,15.49,17.51,6.7]],
     grouped_response:[[2.07,1.21,3.07,5.44,6.65,19.23,11.81,19.31,19.50,6.99,4.67,],[1.98,1.33,3.47,7.11,8.26,18.25,12.82,18.29,16.88,7.27,4.30],
     [3.5,2.42,6.15,9.07,7.93,14.3,12.93,15.49,17.51,6.7,4]]
  },
  {
    title:"Tillid til poltikere",
    question:"Hvor stor tillid har du til politikere?",
    name:'politicicans',
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: [0,1,2,3,4,5,6,7,8,9,10],
    response: [[2.79,1.68,5.18,6.72,8.05,25.12,15.92,20.43,11.22,1.7,1.19,],[1.69,1.72,4.19,6.76,11.67,23.4,16.55,19.21,10.46,3.18,1.17],[2.66,1.18,3.8,8.21,8.48,22.09,18.64,20.53,10.56,3.12,0.73],
    [2.14,1.93,4.14,7.08,9.17,24.38,15.75,20.7,11.15,2.26,1.29],[3.62,2.47,5.12,10.11,14.35,23.05,16.81,16.4,6.11,1.51,0.46],[2.35,2.12,6.82,11.44,10.8,22.22,18.6,14.82,7.81,2.2,0.82],
    [4.8,2.77,8.87,10.97,14.4,17.71,14.12,16.17,7.94,1.26,0.99]],
     grouped_response:[[2.38,1.52,4.39,7.23,9.4,23.53,17.03,20.05,10.74,2.66,1.03],[2.70,2.17,5.36,9.54,11.44,23.21,17.05,17.30,8.35,1.99,0.85],[4.8,2.77,8.87,10.97,14.4,17.71,14.12,16.17,7.94,1.26,0.99]]
  },
  {
    title:"Tilfredshed med det danske demokrati",
    name:"eu",
    question:"?",
    years: [2002,2004,2006,2008,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: [0,1,2,3,4,5,6,7,8,9,0],
    response: [[0.39,0.57,1.16,2.09,4.34,10.31,8.39,18.38,30.74,15.42,8.21],[0.38,0.62,1.01,3.17,2.28,10.56,9.31,18.32,27.98,15.86,10.5],[0.68,0.5,1.12,2.66,2.95,8.03,8.36,17.68,27.74,18.97,11.3],
  [1.01,0.55,1.64,2.77,3.89,8.73,9.55,16.69,26.97,18.96,9.22],
  [0.58,0.87,2.03,4.46,5.84,10.6,9.62,19.16,26,14.34,6.5],
  [0.62,0.64,1.23,2.71,3.82,9.12,8.97,17.64,30.05,15.95,9.23],
  [1.13,0.75,2.75,3.41,5.33,10.61,8.72,15.79,25.9,15.6,10.01]],
    grouped_response:[[0.483333333,0.563333333,1.096666667,2.64,3.19,9.633333333,8.686666667,18.12666667,28.82,16.75,10.00333333],
  [0.736666667,0.686666667,1.633333333,3.313333333,4.516666667,9.483333333,9.38,17.83,27.67333333,16.41666667,8.316666667],
  [1.13,0.75,2.75,3.41,5.33,10.61,8.72,15.79,25.9,15.6,10.01]]
  },
  {
    title:"EU er gået for langt",
    name:"eu",
    question:"Er integrationen/samarbejdet i EU gået for vidt eller bør det fortsætte?",
    years: [2002,2004,2006,2008,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Gået for vidt",1,2,3,4,5,6,7,8,9,"Bør forsætte"],
    response: [
  [5.31,2.39,5.47,7.87,8.3,21.02,8.6,11.87,13.95,4.93,10.3],
  [4.55,2.93,6.15,7.58,6.88,19.12,7.93,14.83,16.67,5.89,7.47],
  [4.16,2.41,6.91,7.21,8.07,20.39,9.62,12.56,15.02,6.18,7.48],
  [3.72,3.1,6.53,8.82,8.13,18.8,10.12,14.47,14.26,4.63,7.43],
  [5.91,3.62,8.03,10.34,8.49,18.47,9.24,11.76,13.42,4.84,5.87]],
     grouped_response:[[4.93,2.66,5.81,7.725,7.59,20.07,8.265,13.35,15.31,5.41,8.885],
  [3.94,2.755,6.72,8.015,8.1,19.595,9.87,13.515,14.64,5.405,7.455],
  [5.91,3.62,8.03,10.34,8.49,18.47,9.24,11.76,13.42,4.84,5.87]]
  },
  {
    title:"Immigration fra lande med samme etnicitet",
    name:"sameethnicity",
    question:"I hvilket omfang synes du, at Danmark bør tillade mennesker, der tilhører samme race ller entiske gruppe som de fleste danskere, at flytte hertil?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Mange","En del","Få","Ingen"],
    response: [[19.93,54.02,24.92,1.13],
  [24.08,53.04,20.61,2.27],
  [27.77,56.28,13.27,2.69],
  [26.07,53.97,17.51,2.45],
  [25.85,57.2,15.77,1.18],
  [22.43,58.35,17.47,1.76],
  [24.71,56.67,16.22,2.41]],
     grouped_response:[[23.92,54.44,19.6,2.03],
  [24.78,56.50,16.91,1.79],
  [24.71,56.67,16.22,2.41]]
  },
  {
    title:"Immigration fra lande med anden etnicitet",
    name:"otherethnicity",
    question:"I hvilket omfang synes du, at Danmark bør tillade mennesker, der tilhører en anden race ller entiske gruppe end de fleste danskere, at flytte hertil?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Mange","En del","Få","Ingen"],
    response: [[10.38,37.19,44.86,7.57],
  [10.58,34.01,44.66,10.75],
  [10.78,41.26,40.03,7.93],
  [12.94,41.71,38,7.34],
  [14.75,45.55,34.51,5.18],
  [14.28,44.83,35.02,5.88],
  [13.65,45.14,35.03,6.18]],
    grouped_response:[[10.58,37.48666667,43.18333333,8.75],
  [13.99,44.03,35.84333333,6.133333333],
  [13.65,45.14,35.03,6.18]]
  },
  {
    title:"Immigration dårlig/god for økonomien",
    name:"economy",
    question:"Mener du, at det generelt er godt eller dårligt for Danmarks økonomi, at mennesker fra andre lande flytter hertil?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Dårlig",1,2,3,4,5,6,7,8,9,"God"],
    response: [[5.62,4.15,8.77,11.98,11.2,24.04,7.75,12.16,9,3.1,2.25],
  [5.99,4.87,7.33,10.76,12.26,29.35,7.21,10.91,7.85,1.45,2.03],
  [3.4,2.53,6.37,9.16,9.31,26.2,10.43,14.99,11.99,3.74,1.89],
  [2.91,2.74,7.02,10.96,9.89,26.04,8.6,13.87,12.51,3.69,1.77],
  [3.03,2.83,5.99,10.43,10.92,27.04,11.13,14.6,9.9,2.44,1.69],
  [4.32,4.28,7.07,10.27,10.67,24.88,9.7,13.32,10.41,2.95,2.12],
  [5.43,3.89,8.49,11.98,9,27.41,9.22,11.78,9.23,2.18,1.38]],
    grouped_response:[
  [5.00,3.85,7.49,10.63,10.92,26.53,8.46,12.68,9.61,2.76,2.05],
  [3.42,3.28,6.69,10.55,10.49,25.98,9.81,13.93,10.94,3.02,1.86],
  [5.43,3.89,8.49,11.98,9,27.41,9.22,11.78,9.23,2.18,1.38]
]
  },
  {
    title:"Immigration undergraver den danske kultur",
    name:"culture",
    question:"Mener du, at Danmarks kultur generelt undergraves eller beriges af, at mennesker fra andre lande flytter hertil?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Underminerer",1,2,3,4,5,6,7,8,9,"Gavner"],
    response: [
  [2.68,1.96,5.42,7.91,6.54,25.69,8.03,14.44,16.9,5.12,5.31],
  [3.61,2.09,5.75,7.4,8.43,22.5,9.34,13.41,16.16,4.76,6.55],
  [2.53,1.9,4.54,7.58,7.55,21.6,9.79,14.96,15.93,6.65,6.97],
  [2.76,2.46,4.7,6.92,9.22,19.29,9.06,16.62,17.21,5.91,5.85],
  [1.69,1.41,3.36,8.52,8.2,21.3,10.82,16.03,17.29,5.44,5.95],
  [2.21,2.38,4.09,5.84,9.05,17.67,8.81,16.85,17.29,6.98,8.82],
  [2.97,3.13,6.1,9.81,7.45,19.67,9.4,15.12,15.87,4.67,5.81]
],
    grouped_response:[
  [2.94,1.98,5.23,7.63,7.50,23.26,9.05,14.27,16.33,5.51,6.27],
  [2.22,2.08,4.05,7.093,8.82,19.42,9.56,16.5,17.26,6.11,6.87],
  [2.97,3.13,6.1,9.81,7.45,19.67,9.4,15.12,15.87,4.67,5.81]]
  },
  {
    title:"Immigration gør Danmark til et dårligere/bedre sted",
    name:"betterplace",
    question:"Bliver Danmark et bedre eller dårligere sted at bo af, at mennesker fra andre lande flytter hertil?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Dårligere",1,2,3,4,5,6,7,8,9,"Bedre"],
    response: [
  [3.18,1.87,4.31,6.88,8.54,33.2,10.11,14.24,11.65,3.27,2.74],
  [3.17,2.36,4.77,8.77,9.35,30.96,8.11,12.12,13.78,3.34,3.29],
  [2.58,1.88,4.1,6.9,6.52,29.21,11.27,16.39,12.47,4.53,4.15],
  [1.8,2.72,4.82,7.44,8.71,28.49,10.22,13.91,13.31,5.6,2.99],
  [1.67,1.42,3.75,7.2,7.55,28.41,11.02,14.97,16.7,4.03,3.29],
  [2.06,1.64,3.73,6.18,6.26,27.06,9.2,16.26,15.96,6.33,5.31],
  [2.16,2.13,5.5,7.45,8.42,28.58,10.19,14.64,14.38,3.68,2.87]
],
    grouped_response:[
  [2.97,2.03,4.39,7.51,8.13,31.12,9.83,14.25,12.63,3.71,3.39],
  [1.84,1.92,4.1,6.94,7.50,27.98,10.14,15.04,15.32,5.32,3.86],
  [2.16,2.13,5.5,7.45,8.42,28.58,10.19,14.64,14.38,3.68,2.87]
]
  },
]

let ess_twoyear = [
  {
    title:"Immigration fører til mere kriminalitet",
    name:"kriminalitet",
    question:"Bliver Danmarks kriminalitet større eller mindre af, at mennesker fra andrea lande flytter hertil?",
    years:[2002,2014],
    answers:["Større",1,2,3,4,5,6,7,8,9,"Mindre"],
    response:[
  [12.09,7.4,16.27,19.72,14.87,20.86,3.37,2.24,2.41,0.54,0.24],
  [7.91,6.26,14.51,17.77,15.06,26.6,3.15,3.84,3.59,0.96,0.37]]
},
{
  title:"Det er en kvalifikation som tilflytter at man er hvid",
  name:"hvid",
  question:"Hvor væsentligt mener du, at det er at være hvid, når det skal afgøres, om en person, der er født, opvokset og bosat i et andet land, skal kunne flytte til Danmark?",
  years:[2002,2014],
  answers:["Max uvæsentligt",1,2,3,4,5,6,7,8,9,"Max væsentligt"],
  response:[
  [52.51,10.46,9.49,5.16,3.2,8.66,2.83,2.44,3.03,0.64,1.59],
  [60.5,7.27,8.71,5.73,3.06,7.13,1.94,1.86,2.37,0.62,0.82]]
},
{
  title:"Det er en kvalifikation som tilflytter at man er kristen",
  name:"kristen",
  question:"Hvor væsentligt mener du, at det er at være kristen, når det skal afgøres, om en person, der er født, opvokset og bosat i et andet land, skal kunne flytte til Danmark?",
  years:[2002,2014],
  answers:["Max uvæsentligt",1,2,3,4,5,6,7,8,9,"Max væsentligt"],
  response:[
  [29.72,8.2,9.6,8.1,4.48,14.05,4.47,5.77,9.34,3.01,3.26],
  [39.63,7.84,10.56,8.26,4.07,10.73,4.38,5.14,5.18,2.32,1.89]]
},
{
  title:"Modstand mod anden etnicitet i familien",
  name:"familien",
  question:"Hvis du tænker på de mennesker, der er flyttet til Danmark fra et andet land, og som tilhører en anden race eller etnisk gruppe end de fleste danskere - hvad ville du så sige til, at en sådan person giftede sig med en i din nærmeste familie?",
  years:[2002,2014],
  answers:["Intet imod",1,2,3,4,5,6,7,8,9,"Meget imod"],
  response:[
  [32.63,7.68,8.66,5.92,4.31,9.65,2.7,4.85,8.69,5.14,9.76],
  [41.92,10.56,9.16,6.05,3.75,9.61,3.73,3.16,5.27,2.26,4.52]]
},
]

let bar_colors = ['#ffded1','#F8B195','#F67280','#C06c84','#6c5b7b','#355c7d','#364063']

////*** Add to ess_select
ess.forEach((question,index) => {
  document.getElementById('ess_select').innerHTML += ('<option value="'+index+'">'+question.title+'</option>');
})
ess_twoyear.forEach((question,index) => {
  document.getElementById('twoyear_select').innerHTML += ('<option value="'+index+'">'+question.title+'</option>');
})

document.getElementById('ess_select').value = ess.map(e=>e.name).indexOf('otherethnicity');
document.getElementById('twoyear_select').value = ess_twoyear.map(e=>e.name).indexOf('hvid');

function yearView() {
  if (document.getElementsByClassName('grouped')[0].checked) {
    document.getElementById('myChart2').style.display = 'initial';
    document.getElementById('myChart2_bar').style.display = 'none';
  } else {
    document.getElementById('myChart2').style.display = 'none';
    document.getElementById('myChart2_bar').style.display = 'initial';
  }
}

let bardata = []
ess[4].years.forEach((year, index) => {
  bardata.push({
    label:year,
    data:ess[4].response[index],
    borderColor:bar_colors[index],
    backgroundColor:bar_colors[index]
  })
});

function changeTwoYear() {
  let value = document.getElementById('twoyear_select').value;
  let data = ess[value];

  esstwoyear.data.labels = ess_twoyear[value].answers;
  esstwoyear.data.datasets = [
    {
    label:ess_twoyear[value].years[0],
    data:ess_twoyear[value].response[0],
    borderColor:"rgba(3,206,164)",
    backgroundColor:"rgba(3,206,164,0.1)"
  },
  {
  label:ess_twoyear[value].years[1],
  data:ess_twoyear[value].response[1],
  borderColor:"rgba(251,77,61)",
  backgroundColor:"rgba(251,77,61,0.1)"
},
  ]
  esstwoyear.update();
}

function viewSelect(event) {
  let value = document.getElementById('ess_select').value;
  let data = ess[value];

  /// Grouped years
  myChart2.data.labels = ess[value].answers;
  myChart2.data.datasets = [
    {
      label:ess[value].grouped_years[0],
      data:ess[value].grouped_response[0],
      borderColor:'rgba(52,89,149)',
      backgroundColor:'rgba(52,89,149,0.1)'
    },
    {
      label:ess[value].grouped_years[1],
      data:ess[value].grouped_response[1],
      borderColor:'rgba(3,206,164)',
      backgroundColor:'rgba(3,206,164,0.1)'
    },
    {
      label:ess[value].grouped_years[2],
      data:ess[value].grouped_response[2],
      borderColor:'rgba(251,77,61)',
      backgroundColor:'rgba(251,77,61,0.1)'
    },
  ];
  myChart2.update();

  bardata = [];

  ess[value].years.forEach((year, index) => {
    bardata.push({
      label:year,
      data:ess[value].response[index],
      borderColor:bar_colors[index],
      backgroundColor:bar_colors[index]
    })
  });

  myChart2_bar.data.labels = ess[value].answers;
  myChart2_bar.data.datasets = bardata;
  myChart2_bar.update();
}

var canvasx = document.getElementById('myChart2').getContext('2d');
let myChart2 = new Chart(canvasx, {
  type: 'line',
  data: {
    labels:ess[ess.map(e=>e.name).indexOf('otherethnicity')].answers,
    datasets : [
      {
        label:ess[ess.map(e=>e.name).indexOf('otherethnicity')].grouped_years[0],
        data:ess[ess.map(e=>e.name).indexOf('otherethnicity')].grouped_response[0],
        borderColor:'rgba(52,89,149)',
        backgroundColor:'rgba(52,89,149,0.1)'
      },
      {
        label:ess[ess.map(e=>e.name).indexOf('otherethnicity')].grouped_years[1],
        data:ess[ess.map(e=>e.name).indexOf('otherethnicity')].grouped_response[1],
        borderColor:'rgba(3,206,164)',
        backgroundColor:'rgba(3,206,164,0.1)'
      },
      {
        label:ess[ess.map(e=>e.name).indexOf('otherethnicity')].grouped_years[2],
        data:ess[ess.map(e=>e.name).indexOf('otherethnicity')].grouped_response[2],
        borderColor:'rgba(251,77,61)',
        backgroundColor:'rgba(251,77,61,0.1)'
      },
    ]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  // max:100,
              }
          }]
      }
  }
});

var canvasxbar = document.getElementById('myChart2_bar').getContext('2d');
let myChart2_bar = new Chart(canvasxbar, {
  type: 'bar',
  data: {
    labels:ess[ess.map(e=>e.name).indexOf('otherethnicity')].answers,
    datasets : bardata
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  // max:100,
              }
          }]
      }
  }
});

let esstwoyearcan = document.getElementById('esstwoyear').getContext('2d');
let esstwoyear = new Chart(esstwoyearcan, {
  type:'line',
  data:{
    labels:ess_twoyear[ess_twoyear.map(e=>e.name).indexOf('hvid')].answers,
    datasets:[
      {
      label:ess_twoyear[ess_twoyear.map(e=>e.name).indexOf('hvid')].years[0],
      data:ess_twoyear[ess_twoyear.map(e=>e.name).indexOf('hvid')].response[0],
      borderColor:"rgba(3,206,164)",
      backgroundColor:"rgba(3,206,164,0.1)"
    },
    {
    label:ess_twoyear[ess_twoyear.map(e=>e.name).indexOf('hvid')].years[1],
    data:ess_twoyear[ess_twoyear.map(e=>e.name).indexOf('hvid')].response[1],
    borderColor:"rgba(251,77,61)",
    backgroundColor:"rgba(251,77,61,0.1)"
  },
  ]
  }
})

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels:electionstudy.muslims.data.years,
        datasets: [
          {
            label: [electionstudy.muslims.data.answers[0]],
            data:electionstudy.muslims.data.response[0],
            borderWidth: 1,
            fill:false,
            borderColor:"rgba(237,206,89)",
            backgroundColor:"rgba(237,206,89,0.1)",
        },
        {
          label: [electionstudy.muslims.data.answers[1]],
          data:electionstudy.muslims.data.response[1],
          borderWidth: 1,
          fill:false,
          borderColorColor:"rgba(251,77,61)",
          backgroundColor:"rgba(251,77,61,0.1)",
      },
      ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max:100,
                }
            }]
        }
    }
});

let canvas = document.getElementById('myChart3').getContext('2d');
var myChart3 = new Chart(canvas, {
  type: 'bar',
  data: {
    labels: eurobarometer.mostimportantissue.data.years,
    datasets: [{
      type: 'bar',
      label: refugees.title,
      yAxisID: "y-axis-0",
      backgroundColor: "rgba(217,83,79,0.75)",
      data: refugees.data.amount,
    },
    {
      type: 'line',
      label: eurobarometer.mostimportantissue.title,
      yAxisID: "y-axis-1",
      backgroundColor: "rgba(51,51,51,0.5)",
      data: eurobarometer.mostimportantissue.data.response
    },
  ]
  },
  options: {
    tooltips: {
      mode: 'label'
    },
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true,
        position: "left",
        id: "y-axis-0",
        gridLines:{display:false},
      }, {
        stacked: false,
        position: "right",
        id: "y-axis-1",
        gridLines:{display:false},
        ticks:{
          min:0,
          max:100,
        }
      }]
    }
  }
});
