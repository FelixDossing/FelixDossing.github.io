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

var parties = ['soc','rad','kon','sf','lib','df','ven','enh','alt']
var party_colors = ['#F04D46','#D4007F','#003E2C','#BF0418','#121D37','#E7D01E','#005392','#C21B3E','#00FF00']
var w = $('#graph_container').width();
var h = w*0.5;
var radius = 3;
var padding = 25;
var opacity = 0.3;
var stroke = 3;
var run = 15;
var keep_frac = 1/5;

var showing = [];

var svg = d3.select('#graph_container')
            .append('svg')
            .attr('id', 'graph')
            .attr('width','100%')
            .attr('height',h)


d3.csv('https://raw.githubusercontent.com/erikgahner/polls/master/polls.csv', function(data) {
  return {
    id: +data.id,
    party_a: +data.party_a,
    party_b: +data.party_b,
    party_c: +data.party_c,
    party_f: +data.party_f,
    party_i: +data.party_i,
    party_o: +data.party_o,
    party_v: +data.party_v,
    party_oe: +data.party_oe,
    party_aa: +data.party_aa,
  };
}).then(function(data) {

  for (i = 0; i<data.length; i++) {
    if (i >= run) {
      var a = 0;
      var b = 0;
      var c = 0;
      var f = 0;
      var l = 0;
      var o = 0;
      var v = 0;
      var oe = 0;
      var aa = 0;

      for (j = 0; j < run; j++) {
        a += data[i-j].party_a;
        b += data[i-j].party_b;
        c += data[i-j].party_c;
        f += data[i-j].party_f;
        l += data[i-j].party_i;
        o += data[i-j].party_o;
        v += data[i-j].party_v;
        oe += data[i-j].party_oe;
        aa += data[i-j].party_aa;
      }
      data[i].run_a = a/run;
      data[i].run_b = b/run;
      data[i].run_c = c/run;
      data[i].run_f = f/run;
      data[i].run_i = l/run;
      data[i].run_o = o/run;
      data[i].run_v = v/run;
      data[i].run_oe = oe/run;
      data[i].run_aa = aa/run;
    } else {
      data[i].run_a = data[i].party_a;
      data[i].run_b = data[i].party_b;
      data[i].run_c = data[i].party_c;
      data[i].run_f = data[i].party_f;
      data[i].run_i = data[i].party_i;
      data[i].run_o = data[i].party_o;
      data[i].run_v = data[i].party_v;
      data[i].run_oe = data[i].party_oe;
      data[i].run_aa = data[i].party_aa;
    }
  }

  length = data.length;
  for (i=data.length-1; i>=0; i-=1) {
    if (i % (1/keep_frac) != 0) {
      data.splice(i,1);
    }
  }

  var xScale = d3.scaleLinear()
                .domain([d3.max(data, function(d) { return d.id; }), 0])
                .range([w-padding, padding]);
  var xAxis = d3.axisBottom()
                .scale(xScale);
  svg.append("g")
          .attr('transform', 'translate(0,'+(h-padding)+')')
          .attr('id', 'xAxis')
          .call(xAxis);

  var yScale = d3.scaleLinear()
                 .domain([d3.max(data, function(d) { return d.party_a+10 }),0])
                 .range([0, h-padding]);
  var yAxis = d3.axisLeft()
                .scale(yScale);

  svg.append('g').append('g').attr('transform', 'translate('+padding+',0)')
                 .attr('id', 'yAxis')
                 .call(yAxis);


   d3.selectAll('.logo')
     .on('click', function() {
       var button_pushed = d3.select(this).attr('id');
       var fill;

       if (showing.indexOf(button_pushed) == -1) {
            showing.push(button_pushed);
       } else {
            showing.splice(showing.indexOf(button_pushed),1);
       }
       var max = 0;
       for (i=0; i<showing.length;i++) {
         if (showing[i] == 'soc') {
           var x = d3.max(data, function(d) { return d.party_a });
           if (x >= max) {
             max = x;
           }
         }
         if (showing[i] == 'rad') {
           var x = d3.max(data, function(d) { return d.party_b });
           if (x >= max) {
             max = x;
           }
         }
         if (showing[i] == 'kon') {
           var x = d3.max(data, function(d) { return d.party_c });
           if (x >= max) {
             max = x;
           }
         }
         if (showing[i] == 'sf') {
           var x = d3.max(data, function(d) { return d.party_f });
           if (x >= max) {
             max = x;
           }
         }
         if (showing[i] == 'lib') {
           var x = d3.max(data, function(d) { return d.party_i });
           if (x >= max) {
             max = x;
           }
         }
         if (showing[i] == 'df') {
           var x = d3.max(data, function(d) { return d.party_o });
           if (x >= max) {
             max = x;
           }
         }
         if (showing[i] == 'ven') {
           var x = d3.max(data, function(d) { return d.party_v });
           if (x >= max) {
             max = x;
           }
         }
         if (showing[i] == 'enh') {
           var x = d3.max(data, function(d) { return d.party_oe });
           if (x >= max) {
             max = x;
           }
         }
         if (showing[i] == 'alt') {
           var x = d3.max(data, function(d) { return d.party_aa });
           if (x >= max) {
             max = x;
           }
         }
       }
       max = Math.ceil(max / 5) * 5;
       yScale.domain([max+4,0])
       svg.select('#yAxis')
          .transition()
          .call(yAxis;

      for (i=0; i<parties.length; i++) {
        if (showing.indexOf(parties[i]) == -1) {
          $('#'+parties[i]).css('font-weight','normal');
          svg.selectAll('.'+parties[i])
             .remove();
        } else if (button_pushed == parties[i]) {
          var fill = party_colors[i];
          var line = d3.line()
                       .x(function(d) { return xScale(d.id); })
                       .y(function(d) {
                          if (button_pushed == 'soc') {
                            return yScale(d.run_a);
                          } else if (button_pushed == 'rad') {
                            return yScale(d.run_b);
                          } else if (button_pushed == 'kon') {
                            return yScale(d.run_c);
                          } else if (button_pushed == 'sf') {
                            return yScale(d.run_f);
                          } else if (button_pushed == 'lib') {
                            return yScale(d.run_i);
                          } else if (button_pushed == 'df') {
                            return yScale(d.run_o);
                          } else if (button_pushed == 'ven') {
                            return yScale(d.run_v);
                          } else if (button_pushed == 'enh') {
                            return yScale(d.run_oe);
                          } else if (button_pushed == 'alt') {
                            return yScale(d.run_aa);
                          }
                        });
          var run_line = svg.append("path")
                            .datum(data)
                            .attr("fill", "none")
                            .attr('class', button_pushed+' '+button_pushed+'_line')
                            .attr("stroke", fill)
                            .attr("stroke-linejoin", "round")
                            .attr("stroke-linecap", "round")
                            .attr("stroke-width", stroke)
                            .attr("d", line);

        } else {
          var new_line = d3.line()
                       .x(function(d) { return xScale(d.id); })
                       .y(function(d) {
                          if (parties[i] == 'soc') {
                            return yScale(d.run_a);
                          } else if (parties[i] == 'rad') {
                            return yScale(d.run_b);
                          } else if (parties[i] == 'kon') {
                            return yScale(d.run_c);
                          } else if (parties[i] == 'sf') {
                            return yScale(d.run_f);
                          } else if (parties[i] == 'lib') {
                            return yScale(d.run_i);
                          } else if (parties[i] == 'df') {
                            return yScale(d.run_o);
                          } else if (parties[i] == 'ven') {
                            return yScale(d.run_v);
                          } else if (parties[i] == 'enh') {
                            return yScale(d.run_oe);
                          } else if (parties[i] == 'alt') {
                            return yScale(d.run_aa);
                          }
                        });
          svg.selectAll('.'+parties[i]+'_line')
             .transition()
             .attr('d',new_line);
        }
      }


       //   var point = svg.selectAll('circle .nodes')
       //                  .data(data)
       //                  .enter()
       //                  .append('svg:circle')
       //                  .attr('class', button_pushed)
       //                  .attr('cx', function(d) {
       //                    return xScale(d.id);
       //                  })
       //                  .attr('cy', function(d) {
       //                    if (button_pushed == 'soc') {
       //                      return yScale(d.party_a);
       //                    } else if (button_pushed == 'rad') {
       //                      return yScale(d.party_b);
       //                    } else if (button_pushed == 'kon') {
       //                      return yScale(d.party_c);
       //                    } else if (button_pushed == 'sf') {
       //                      return yScale(d.party_f);
       //                    } else if (button_pushed == 'lib') {
       //                      return yScale(d.party_i);
       //                    } else if (button_pushed == 'df') {
       //                      return yScale(d.party_o);
       //                    } else if (button_pushed == 'ven') {
       //                      return yScale(d.party_v);
       //                    } else if (button_pushed == 'enh') {
       //                      return yScale(d.party_oe);
       //                    } else if (button_pushed == 'alt') {
       //                      return yScale(d.party_aa);
       //                    }
       //                  })
       //                  .attr('r', radius)
       //                  .attr('fill',fill)
       //                  .attr('opacity',opacity);
       //
     });

   function point_hover(d) {
     svg.selectAll('circle')
        .on('mouseover', function(d) {
          d3.selectAll( '.'+d3.select(this).attr('class') ).attr('opacity','1');
        })
        .on('mouseout', function(d) {
          d3.selectAll( '.'+d3.select(this).attr('class') ).attr('opacity',opacity);
        });
   }
});
