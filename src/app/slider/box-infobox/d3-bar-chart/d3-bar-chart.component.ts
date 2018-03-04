import { Component, OnInit, ElementRef } from '@angular/core';
 import * as d3 from 'd3';
 import { ColorCreateService } from '../../../../services/color-create.service';
import { FieldManagerService } from '../../../../services/field-manager.service';
import { MapService } from '../../../../services/map.service';

@Component({
  selector: 'app-d3-bar-chart',
  templateUrl: './d3-bar-chart.component.html',
  styleUrls: ['./d3-bar-chart.component.css']
})
export class D3BarChartComponent implements OnInit {
  public parentNativeElement: any;

  constructor(private element: ElementRef, private _colorManager: ColorCreateService, private _fieldManager: FieldManagerService, private _mapService: MapService) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this._mapService.name$.share().subscribe(select=> {
     
      if(select) {
        let data:Array<number>=[this._colorManager.getCutoff(this._fieldManager.currentfield),(select as any).getProperties()[this._fieldManager.currentfield]]
        this.drawSingleBarChart(data,this._fieldManager.currentfield)
      
      }}
  )
  }

  drawSingleBarChart=(bardata:any, field:string) =>{
    var width = 300//$('#module-container').width()
    var domain = this.createDomain(field);
    var xscale = d3.scaleLinear()
      .domain(domain).range([0, width - 70]);
     if (d3.select(this.parentNativeElement).select('svg').size() == 0) {
      const mainContaine: any = d3.select(this.parentNativeElement).select('#container-barchart');
      const container: any  =mainContaine.append('svg')
        .attr('height', 80)
        .attr('width', width - 40)

      var svgDefs = container.append('defs');
      var mainGradient = svgDefs.append('linearGradient')
        .attr('id', 'mainGradient');
      var direction = this._colorManager.getOkdirectionField(field);
      this.createGradient(mainGradient, field, direction, width - 70)

      var rects = ["unfunctional", "functional"]
      if (direction == "-") {
        rects = rects.slice().reverse();
        mainGradient.attr('gradientTransform', 'translate(1) scale(-1)');

      }
      var chart = (container).append('g').attr('id', 'bars');//'#container-barchart svg'
      console.log(chart)//this.parentNativeElement)

       chart
        .append('rect')
        .attr('height', 30).classed('filledbar-' + rects[0], true)
        .attr('width', 0)
        //.style('fill',true)
        .attr('y', 0)
        .attr('x', (d:any)=> d as any )
        .attr('fill','#a1d99b')
      chart
        .append('rect')
        .attr('height', 30)
        .classed('filledbar-' + rects[1], true)
        .attr('width', 0)
        .attr('y', 0)
        .attr('x', 0)
        .attr('fill','url(#mainGradient)')

      var startline = chart.append("g").attr('id', "pointer-start-chart")
      startline.append("line")
        .attr("id", "start-line")
        .style("stroke", "rgba(0, 0, 0, 0.7)")
        .attr("y1", -1)
        .attr("y2", 36)
        .attr("stroke-width", 2)
      startline.append("text").attr("y", 35)
        .attr("dy", ".01em")
        .attr("x", "12")
        .attr("font-size", ".7rem")
        .style("text-anchor", "middle")
      var endline = chart.append("g").attr('id', "pointer-end-chart")
      endline.append("line")
        .attr("id", "end-line")
        .style("stroke", "rgba(0, 0, 0, 0.7)")
        .attr("y1", -1)
        .attr("y2", 36)
        .attr("stroke-width", 2)
      endline.append("text").attr("y", 38)
        .attr("dy", ".01em")
        .attr("x", "-18")
        .attr("font-size", ".7rem")
        .style("text-anchor", "middle")
      var cutoffline = chart.append("g").attr('id', "pointer-cutoff-chart")
      cutoffline.append("line")
        .attr("id", "cutoff-line1")
        .style("stroke", "#009688")
        .attr("y1", 0)
        .attr("y2", 30)
        .attr("stroke-width", 4)
      cutoffline.append("line")
        .attr("id", "cutoff-line")
        .style("stroke", "rgba(0, 150, 136,0.2)")
        .attr("y1", -5)
        .attr("y2", 35)
        .attr("stroke-width", 8)
      cutoffline.append("line")
        .attr("id", "cutoff-line2")
        .style("stroke", "rgb(0, 0, 0)")
        .attr("y1", -6)
        .attr("y2", -15)
        .attr("stroke-width", 1)
      var focused = chart.append("g").attr('id', "pointer-chart")

      var triangle = d3.symbol()
        .type(d3.symbolTriangle)
        .size(40);
      focused.append("path")
        .attr("d", triangle)
        .attr("fill", "rgba(0, 0, 0,0.7)")
        .attr("transform", function (d:any) {
          return "  rotate(180) translate(0,6)";
        })

      cutoffline.append("text").attr("y", -18)
        .attr("dy", ".01em")
        .attr("font-size", ".8rem")
        .style("font-weight", "bold")
        .style("text-anchor", "middle")

      focused.append("line")
        .attr("id", "value-line")
        .style("stroke", "rgba(0, 0, 0, 0.7)")
        .attr("stroke-width", 4)
        .attr("fill-opacity", 0.5)

        .attr("y1", 0)
        .attr("y2", 32)
      var legend = chart.append("g").attr('id', "barchart-legend")
      legend.append('rect')
        .attr('height', 10).classed('barchart-legend-' + "functional", true)
        .attr('width', 10)
        .attr("fill", "#a1d99b")
        .attr('y', '50')
        .attr('x', '0')
      legend.append("text").attr("y", 55).attr("x", 20)
        .attr("dy", ".01em")
        .attr("font-size", ".6rem")
        .text("کارآمد")

      legend.append('rect')
        .attr('height', 10).classed('barchart-legend-' + "nonfunctional", true)
        .attr('width', 10)
        .attr("fill", "rgb(179,0,0)")
        .attr('y', '50')
        .attr('x', '60')
      legend.append("text").attr("y", 55).attr("x", 75)
        .attr("dy", ".01em")
        .attr("font-size", ".6rem")
        .text("ناکارامد")
    }

    var data = [[domain[0], bardata[0]], [bardata[0], domain[1]]]

    var transit = d3.select('#container-barchart svg').selectAll("rect")
      .data(data)
      .transition("barchart-draw")
      .duration(800)
      .ease(d3.easeExp)
      .attr('x', function (d, i) {
        return xscale(d[0])
      })
      .attr("width", function (d, i) {
        return xscale(d[1]) - xscale(d[0])
      })

    var charts = d3.select('#container-barchart svg g');
    charts.selectAll("#value-line").data([bardata[1]])
      .transition("pointer-change")
      .ease(d3.easeBounce)
      .duration(1200)

    d3.select("#pointer-cutoff-chart").data([bardata[0]])
      .transition()
      .duration(1000)

      .attr("transform", function (d) {
        return " translate("
          + xscale(
            d)
          + ","
          + 0
          + ")";
      })

    d3.select("#pointer-chart").data([bardata[1]])
      .transition("pointer-onchange")
      .ease(d3.easeSin)
      .duration(1000)
      .attr("transform", function (d) {
        return " translate("
          + xscale(
            d)
          + ","
          + 0
          + ")";
      })
    d3.select("#pointer-start-chart").data([domain[0]])
      .transition()
      .duration(1000)
      .attr("transform", function (d) {
        return " translate("
          + xscale(
            d)
          + ","
          + 0
          + ")";
      })
    d3.select("#pointer-end-chart").data([domain[1]])
      .transition()
      .duration(1000)
      .attr("transform", function (d) {
        return " translate("
          + xscale(
            d)
          + ","
          + 0
          + ")";
      })
    d3.select("#pointer-cutoff-chart text").data([bardata[0]])
      .transition()
      .duration(1000)
      .text((d) => this._colorManager.getCutoff(field).toFixed(2));
    d3.select("#pointer-start-chart text").data([domain[0]])
      .transition()
      .duration(1000)
      .text(function (d) {
        return domain[0].toFixed(1)
      })
    d3.select("#pointer-end-chart text").data([domain[1]])
      .transition()
      .duration(1000)
      .text(function (d) {
        return domain[1].toFixed(1)
      })

  }

  createDomain=(field: string)=> {
    var cutoff = parseFloat(this._colorManager.getCutoff(field).toFixed(6));
    var extents = this._colorManager.getFieldExtent(field);
    var direction = this._colorManager.getOkdirectionField(field);
    if (direction == "+") {
      var range = (cutoff > parseFloat(extents.MAX.toFixed(6))) ? [parseFloat(extents.MIN.toFixed(6)), cutoff] : [parseFloat(extents.MIN.toFixed(6)), parseFloat(extents.MAX.toFixed(6))];
      return range

    } else {
      var range = (cutoff < parseFloat(extents.MIN.toFixed(6))) ? [parseFloat(extents.MIN.toFixed(6)), cutoff] : [parseFloat(extents.MIN.toFixed(6)), parseFloat(extents.MAX.toFixed(6))]
      return range
    }

  }
  createGradient=(mainGradient:any, field: string, direction: string, width: number)=> {

    // Create the stops of the main gradient. Each stop will be assigned
    // a class to style the stop using CSS.
    var color = ''//new CreateColor("base-block", field);
    var rangeValues = this._colorManager.colorRange;

    var domain = this.createDomain(field);
    var xscale = d3.scaleLinear()
      .domain(domain).range([0, width]);

    var gradientRange = rangeValues.filter(function (element) {
      return element != '#a1d99b'
    });
    gradientRange.reverse().forEach( (colorElement: any, i: number)=> {
       var colorDomain = this._colorManager.invertExtend(colorElement).map(function (dd: any) {

        if (typeof dd == 'number') {
          return xscale(Number(dd.toFixed(6)))
        } //xscale(dd)
        else {
          return xscale(dd)
        }
      });

      if (isNaN(colorDomain[0]))
        colorDomain[0] = xscale(domain[0])
      if (isNaN(colorDomain[1]))
        colorDomain[1] = xscale(domain[1])

      var cutoff = xscale(this._colorManager.getCutoff(field));
      if (direction == '+') {
        var endLength = - (((colorDomain[0] - cutoff) / (cutoff)) * 100);
        var startLength = - ((((colorDomain[0] - cutoff) / (cutoff)) * 100) + ((colorDomain[1] - colorDomain[0]) / (cutoff)) * 100)
        mainGradient.attr('gradientTransform', 'translate(1) scale(-1)');

      } else {

        var endLength = 100 - (((colorDomain[0] - cutoff) / (240 - cutoff)) * 100);
        var startLength = 100 - ((((colorDomain[0] - cutoff) / (240 - cutoff)) * 100) + ((colorDomain[1] - colorDomain[0]) / (240 - cutoff)) * 100)

      }
       mainGradient.append('stop')
        //	.attr('class', 'stop-right'+i) (i)/gradientRange.length)*100
        .attr('offset', startLength + '%')
        .attr('stop-color', (colorElement));

      mainGradient.append('stop')
        //.attr('class', 'stop-right'+i)
        .attr('offset', endLength + '%')
        .attr('stop-color', (colorElement));

    })

  }

}

