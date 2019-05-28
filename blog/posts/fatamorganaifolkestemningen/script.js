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
    question:"Hvor stor tillid har du til folketinget?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Ingen tillid",1,2,3,4,5,6,7,8,9,"Komplet tillid"],
    response: [[2.26,	1.75,	2.22,	1.19,	2.44,	2.32,	3.5],
               [0.98,	1.44,	1.22,	1.12,	1.39,	1.48,	2.42],
               [3.64,	2.88,	2.71,	2.75,	3.44,	4.23,	6.15],
               [5.07,	5.58,	5.68,	6.07,	8.54,	6.74,	9.07],
               [6.3,	8.1,	5.57,	6.26,	10.02, 8.5, 7.93],
               [21.28,	18.5,	17.93,	18.18, 19.45, 17.14, 14.3],
               [11.88,	12.71,	10.86, 11, 13.6,	13.87, 12.93],
               [19.15,	18.07,	20.71, 18.01, 17.16, 19.72, 15.49],
               [18.87, 18.5,	21.14,	21.39,	15.04,	14.22,	17.51],
               [5.69,	7.29,	7.99,	8.51,	5.8,	7.51,	6.7],
               [4.89,	5.18,	3.96,	5.51,	3.13,	4.27,	4]],
     grouped_response:[[2.07,	1.98,	3.5],[1.21,	1.33,	2.42],[3.07,	3.47,	6.15],[5.44,	7.11,	9.07],
                       [6.65,	8.26,	7.93],[19.23,	18.25,	14.3],[11.81,	12.82,	12.93],[19.31,	18.29,	15.49],
                       [19.50,	16.88,	17.51],[6.99,	7.27,	6.7],[4.67,	4.30,	4]]
  },
  {
    title:"Tillid til poltikere",
    question:"Hvor stor tillid har du til politikere?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Ingen tillid",1,2,3,4,5,6,7,8,9,"Komplet tillid"],
    response: [[2.79,	1.69,	2.66,	2.14,	3.62,	2.35,	4.8],
               [1.68,	1.72,	1.18,	1.93,	2.47,	2.12,	2.77],
               [5.18,	4.19,	3.8,	4.14,	5.12,	6.82,	8.87],
               [6.72,	6.76,	8.21,	7.08,	10.11,	11.44,	10.97],
               [8.05,	11.67,	8.48,	9.17,	14.35,	10.8,	14.4],
               [25.12,	23.4,	22.09,	24.38,	23.05,	22.22,	17.71],
               [15.92,	16.55,	18.64,	15.75,	16.81,	18.6,	14.12],
               [20.43,	19.21,	20.53,	20.7,	16.4,	14.82,	16.17],
               [11.22,	10.46,	10.56,	11.15,	6.11,	7.81,	7.94],
               [1.7,	3.18,	3.12,	2.26,	1.51,	2.2,	1.26],
               [8.21,	10.5,	11.3,	9.22,	6.5,	9.23,	10.01]],
     grouped_response:[[0.48,	0.73,	1.13],[0.56,	0.68,	0.75],[1.09,	1.63,	2.75],[2.64,	3.31,	3.41],[3.19,	4.51,	5.33],[9.63,	9.48,	10.61],
     [8.68,	9.38,	8.72],[18.12,	17.83,	15.79],[28.82,	27.67,	25.9],[16.75,	16.41,	15.6],[10.00,	8.31,	10.01]]
  },
  {
    title:"EU er gået for langt",
    question:"Integrationen af lande i EU er gået for langt?",
    years: [2002,2004,2006,2008,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Gået for langt",1,2,3,4,5,6,7,8,9,"Bør gå længere"],
    response: [[5.31,	4.55,	4.16,	3.72,	5.91],
    [2.39,	2.93,	2.41,	3.1,	3.62],
[5.47,	6.15,	6.91,	6.53,	8.03],
[7.87,	7.58,	7.21,	8.82,	10.34],
[8.3,	6.88,	8.07,	8.13,	8.49],
[21.02,	19.12,	20.39,	18.8,	18.47],
[8.6,	7.93,	9.62,	10.12,	9.24],
[11.87,	14.83,	12.56,	14.47,	11.76],
[13.95,	16.67,	15.02,	14.26,	13.42],
[4.93,	5.89,	6.18,	4.63,	4.84],
[10.3,	7.47,	7.48,	7.43,	5.87]
],
     grouped_response:[[4.93,	3.94,	5.91],[2.66,	2.755,	3.62],[5.81,	6.72,	8.03],
                       [7.725,	8.015,	10.34],[7.59,	8.1,	8.49],[20.07,	19.595,	18.47],
                       [8.265,	9.87,	9.24],[13.35,	13.515,	11.76],[15.31,	14.64,	13.42],
                       [5.41,	5.405,	4.84],[8.885,	7.455,	5.87]]
  },
  {
    title:"Immigration fra lande med samme etnicitet",
    question:"Hvor mange tilflyttere bør Danmark tillade fra andre lande med samme etnicitet?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Mange","En del","Få","Ingen"],
    response: [[19.93,	24.08,	27.77,	26.07,	25.85,	22.43,	24.71],
               [54.02,	53.04,	56.28,	53.97,	57.2,	58.35,	56.67],
               [24.92,	20.61,	13.27,	17.51,	15.77,	17.47,	16.22],
               [1.13,	2.27,	2.69,	2.45,	1.18,	1.76,	2.41]],
     grouped_response:[[23.92,	24.783,	24.71],[54.44,	56.50,	56.67],[19.6,	16.91,	16.22],[2.03,	1.79,	2.41]]
  },
  {
    title:"Immigration fra lande med anden etnicitet",
    question:"Hvor mange tilflyttere bør Danmark tillade fra andre lande med anden etnicitet?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Mange","En del","Få","Ingen"],
    response: [[10.38,	10.58,	10.78,	12.94,	14.75,	14.28,	13.65],[37.19,	34.01,	41.26,	41.71,	45.55,	44.83,	45.14],[44.86,	44.66,	40.03,	38,	34.51,	35.02,	35.03],[7.57,	10.75,	7.93,	7.34,	5.18, 5.88, 6.18]],
    grouped_response:[[10.58,	13.99,	13.65],[37.48,	44.03,	45.14],[43.18,	35.84,	35.03],[8.75,	6.13,	6.18]]
  },
  {
    title:"Immigration dårligt/god for økonomien",
    question:"?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Dårlig",1,2,3,4,5,6,7,8,9,"God"],
    response: [[5.62,	5.99,	3.4,	2.91,	3.03,	4.32,	5.43],
[4.15,	4.87,	2.53,	2.74,	2.83,	4.28,	3.89],
[8.77,	7.33,	6.37,	7.02,	5.99,	7.07,	8.49],
[11.98,	10.76,	9.16,	10.96,	10.43,	10.27,	11.98],
[11.2,	12.26,	9.31,	9.89,	10.92,	10.67,	9],
[24.04,	29.35,	26.2,	26.04,	27.04,	24.88,	27.41],
[7.75,	7.21,	10.43,	8.6,	11.13,	9.7,	9.22],
[12.16,	10.91,	14.99,	13.87,	14.6,	13.32,	11.78],
[9,	7.85,	11.99,	12.51,	9.9,	10.41,	9.23],
[3.1,	1.45,	3.74,	3.69,	2.44,	2.95,	2.18],
[2.25,	2.03,	1.89,	1.77,	1.69,	2.12,	1.38]
],
    grouped_response:[[5.00,	3.42,	5.43],
[3.85,	3.28,	3.89],
[7.49,	6.69,	8.49],
[10.63,	10.55,	11.98],
[10.92,	10.49,	9],
[26.53,	25.98,	27.41],
[8.46,	9.81,	9.22],
[12.68,	13.93,	11.78],
[9.61,	10.94,	9.23],
[2.763,	3.02,	2.18],
[2.05,	1.86,	1.38]
]
  },
  {
    title:"Immigration underminerer den danske kultur",
    question:"?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Underminerer",1,2,3,4,5,6,7,8,9,"Gavner"],
    response: [[5.62,	5.99,	3.4,	2.91,	3.03,	4.32,	5.43],
[4.15,	4.87,	2.53,	2.74,	2.83,	4.28,	3.89],
[8.77,	7.33,	6.37,	7.02,	5.99,	7.07,	8.49],
[11.98,	10.76,	9.16,	10.96,	10.43,	10.27,	11.98],
[11.2,	12.26,	9.31,	9.89,	10.92,	10.67,	9],
[24.04,	29.35,	26.2,	26.04, 27.04,	24.88,	27.41],
[7.75,	7.21,	10.43,	8.6,	11.13,	9.7,	9.22],
[12.16,	10.91,	14.99,	13.87,	14.6,	13.32,	11.78],
[9,	7.85,	11.99,	12.51,	9.9,	10.41,	9.23],
[3.1,	1.45,	3.74,	3.69,	2.44,	2.95,	2.18],
[2.25,	2.03,	1.89,	1.77,	1.69,	2.12,	1.38]
],
    grouped_response:[[5.00,	3.42,	5.43],
[3.85,	3.28,	3.89],
[7.49,	6.69,	8.49],
[10.63,	10.55,	11.98],
[10.92,	10.49,	9],
[26.53,	25.98,	27.41],
[8.463,	9.81,	9.22],
[12.68,	13.93,	11.78],
[9.61,	10.94,	9.23],
[2.76,	3.02,	2.18],
[2.05,	1.86,	1.38]
]
  },
  {
    title:"Immigration gør Danmark til et værre/bedre sted",
    question:"?",
    years: [2002,2004,2006,2008,2010,2012,2014],
    grouped_years:["2002-2006","2008-2012","2014"],
    answers: ["Underminerer",1,2,3,4,5,6,7,8,9,"Gavner"],
    response: [[3.18,	3.17,	2.58,	1.8,	1.67,	2.06,	2.16],
[1.87,	2.36,	1.88,	2.72,	1.42,	1.64,	2.13],
[4.31,	4.77,	4.1,	4.82,	3.75,	3.73,	5.5],
[6.88,	8.77,	6.9,	7.44,	7.2,	6.18,	7.45],
[8.54,	9.35,	6.52,	8.71,	7.55,	6.26,	8.42],
[33.2,	30.96,	29.21,	28.49,	28.41,	27.06,	28.58],
[10.11,	8.11,	11.27,	10.22,	11.02,	9.2,	10.19],
[14.24,	12.12,	16.39,	13.91,	14.97,	16.26,	14.64],
[11.65,	13.78,	12.47,	13.31,	16.7,	15.96,	14.38],
[3.27,	3.34,	4.53,	5.6,	4.03,	6.33,	3.68],
[2.74,	3.29,	4.15,	2.99,	3.29,	5.31,	2.87]
],
    grouped_response:[[2.97,	1.84,	2.16]
[2.03,	1.92,	2.13],
[4.39,	4.1,	5.5],
[7.51,	6.94,	7.45],
[8.13,	7.50,	8.42],
[31.12,	27.98,	28.58],
[9.83,	10.14,	10.19],
[14.25,	15.04,	14.64],
[12.63,	15.32,	14.38],
[3.71,	5.32,	3.68],
[3.39,	3.86,	2.87]
]
  },
]

let ess_twoyear = [
  {
    title:"Immigration fører til mere kriminalitet",
    question:"",
    years:[2002,2014],
    asnwers:["Mere",1,2,3,4,5,6,7,8,9,"Mindre"],
    response:[[12.09,	7.91],
  [7.4,	6.26],
  [16.27,	14.51],
  [19.72,	17.77],
  [14.87,	15.06],
  [20.86,	26.6],
  [3.37,	3.15],
  [2.24,	3.84],
  [2.41,	3.59],
  [0.54,	0.96],
  [0.24,	0.37]
  ]
},
{
  title:"Det er en kvalifikation som tilflytter at man er hvid",
  question:"",
  years:[2002,2014],
  asnwers:["Ekstremt uvæsentligt",1,2,3,4,5,6,7,8,9,"Ekstremt væsentligt"],
  response:[[52.51,	60.5],
[10.46,	7.27],
[9.49,	8.71],
[5.16,	5.73],
[3.2,	3.06],
[8.66,	7.13],
[2.83,	1.94],
[2.44,	1.86],
[3.03,	2.37],
[0.64,	0.62],
[1.59,	0.82]
]
},
{
  title:"Det er en kvalifikation som tilflytter at man er kristen",
  question:"",
  years:[2002,2014],
  asnwers:["Ekstremt uvæsentligt",1,2,3,4,5,6,7,8,9,"Ekstremt væsentligt"],
  response:[[29.72,	39.63],
[8.2,	7.84],
[9.6,	10.56],
[8.1,	8.26],
[4.48,	4.07],
[14.05,	10.73],
[4.47,	4.38],
[5.77,	5.14],
[9.34,	5.18],
[3.01,	2.32],
[3.26,	1.89]
]
},
{
  title:"Modstand mod anden etnicitet i familien",
  question:"Jeg ville have noget imod, hvis ...",
  years:[2002,2014],
  asnwers:["Intet imod",1,2,3,4,5,6,7,8,9,"Meget imod"],
  response:[[32.63,	41.92],
[7.68,	10.56],
[8.66,	9.16],
[5.92,	6.05],
[4.31,	3.75],
[9.65,	9.61],
[2.7,	3.73],
[4.85,	3.16],
[8.69,	5.27],
[5.14,	2.26],
[9.76,	4.52]
]
},
]

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
            backgroundColor:"red",
            borderColor:"red",
        },
        {
          label: [electionstudy.muslims.data.answers[1]],
          data:electionstudy.muslims.data.response[1],
          borderWidth: 1,
          fill:false,
          backgroundColor:"blue",
          borderColor:"blue"
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
