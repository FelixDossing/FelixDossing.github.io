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

///GRAPH

var w = $('#graph_container').width();
var h = w*0.5

var padding = 30;

var svg = d3.select('#graph_container')
            .append('svg')
            .attr('id', 'graph')
            .attr('width','100%')
            .attr('height',h)

var xScale = d3.scaleLinear()
               .range([0, w]);
var yScale = d3.scaleLinear()
               .range([h-padding*2, 0]);
var xAxis = d3.axisBottom()
              .scale(xScale)
              .ticks(5);
var yAxis = d3.axisLeft()
              .scale(yScale);

var pollData = [];

d3.csv('polls.csv', function(data) {
  console.log(data);
});

// d3.csv('https://raw.githubusercontent.com/erikgahner/polls/master/polls.csv', function(data) {
//   pollData.push( {
//     id: data.id,
//     party_a: data.party_a,
//   });
//
//   if (data.id == 1169) {
//     var xScale = d3.scaleLinear()
//                   .domain([0, d3.max(pollData, function(d) { return d.party_a; })])
//                   .range([h - padding, padding]);
//     var yScale = d3.scaleLinear()
//                   .domain([0, d3.max(pollData, function(d) { return d.id; })])
//                   .range([h - padding, padding]);
//     svg.append("g")
//             .attr('transform', 'translate('+padding+','+padding+')')
//             .attr('id', 'yAxis')
//             .call(yAxis);
//     svg.append("g")
//             .attr('transform', 'translate(0,'+padding+')')
//             .attr('id', 'xAxis')
//             .call(xAxis);
//
//   }
// });

//
// var yAxis = d3.axisLeft()
//                   .scale(yScale);
//
// graph.selectAll('circle .nodes')
//           .data(pollData)
//           .enter()
//           .append('svg:circle')
//           .attr('class','nodes')
//           .attr('cx', function(d, i) {
//             return xScale(d.id);
//           })
//           .attr('cy', function(d, i) {
//             return yScale(d.party_a);
//           })
//           .attr('r', '5px')
//           .attr('fill', 'black');
//
// graph.append("g")
//         .attr('transform', 'translate('+padding+',0)')
//         .attr('stroke', 'green')
//         .attr('id', 'yAxis')
//         .call(yAxis);
//
// $('.nodes').hover(function() {
//   $('.nodes').attr('fill','red');
// }, function() {
//   $('.nodes').attr('fill','black');
// });
//
// d3.select('#graph')
//   .on('click', function() {
//     var nodes = graph.selectAll('.nodes')
//                      .data(data2);
//     nodes.transition()
//          .duration(500)
//          .attr('cx', function(d) { return xScale(d[0]); })
//          .attr('cy', function(d) { return yScale(d[1]); })
//
// });
