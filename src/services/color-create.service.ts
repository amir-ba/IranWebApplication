import { Injectable, Inject } from '@angular/core';
import { REF } from '.././references';
@Injectable()
export class ColorCreateService {
  public colorRange: Array<string>;
  public numberDomian: Array<number>;
  constructor(@Inject(REF) private _ref: any) {


  }

  createColor(field: string) {

    const colorArray: Array<string> = ['#a1d99b', '#fef0d9', '#fdd49e', '#fdbb84', '#fc8d59', '#e34a33', '#b30000'];
    const numberArray: Array<number> = [1, 2, 3];
    var range: Array<string> = colorArray.slice();
    const initialdomain = this.getColorThresholds(field);
    var okDirection = this.getOkdirectionField(field);
    var cutoff = this.getCutoff(field);
    var domainElements = this.setCutoffInDomain(okDirection, initialdomain, cutoff);
    const domain = domainElements as any;
    var cutoffPosition = domainElements.indexOf(cutoff)
    if (okDirection === '+') {
      console.log(range, 909, cutoffPosition)
      range.forEach(function (item, index) {
        if (index >= cutoffPosition) range[index] = range[range.length - 1];
        range = range.slice().reverse();
      })

    } else {
      //console.log(range)
      range.forEach(function (item, index: number) {
        if (index <= cutoffPosition) range[index] = range[0]
      })
    }
    this.numberDomian = domain;
    this.colorRange = range;
    //  / console.log(domain, range)
    //  console.log(1010101010,this.colorCreater2(2,range,domain))
    // const color = d3['scaleThreshold']()
    //   .domain(domain)
    //   .range(range as any);
    // return color
  }
  getColorThresholds(field: string) {
    return this._ref['StateLayerBreaksList'][field]
  }
  getOkdirectionField(field: string) {
    return (this._ref['okdirection'][field]) ? this._ref['okdirection'][field] : "+";
  }
  getCutoff = (field: string) => {
    var cutoff;

    if (field[0] == 'T' || field[0] == 'W') {
      cutoff = 2 // this.calculateMean(field);
      return cutoff
    } else {
      cutoff = parseFloat(this._ref.cutoff.value[field])
      return (cutoff) ? cutoff : this.getFieldExtent(field).MEAN;

    }

  }


  getFieldExtent(field: string) {
    var min,
      max;
    max = this._ref['stats'][field].MAX;
    min = (this._ref['stats'][field] && this._ref['stats'][field].hasOwnProperty('MIN')) ? this._ref['stats'][field].MIN : 0;

    return {
      'MAX': max,
      'RANGE': this._ref.stats[field].RANGE,
      'MEAN': this._ref.stats[field].MEAN,
      'MIN': min
    }
  }

  setCutoffInDomain(okDirection: string, domain: any, cutoff: string) {
    var newDomain = domain.slice();

    if (okDirection === '+') {
      // console.log(domain)

      newDomain.forEach(function (item: string, i: number) {
        if (newDomain.indexOf(cutoff) == -1 && item > cutoff) {
          //	 = cutoff;
          console.log(44)
          if (domain[i + 1] && domain[i + 1] < cutoff)
            domain.splice(i, 0, cutoff)
          //	domain.splice(i, 1)

          return false
        } else if (domain.length - 1 <= i) {
          //console.log(45)
          domain.splice(domain[domain.length - 1], 0, cutoff)

        }

      })
    } else {
      //	 console.log(domain)


      newDomain.forEach(function (item: string, i: number) {
        if (newDomain.indexOf(cutoff) == -1 && item > cutoff) {
          //	console.log(domain[i], i,domain[i+1])
          if (domain[i + 1] && domain[i + 1] > cutoff) {
            newDomain.splice(i, 0, cutoff);
          }
          return false
        } else if (domain.length - 1 <= i) {
          //	newDomain.splice(0, 0, cutoff)
        }
      })

      //   cutoffPosition = newDomain.indexOf(cutoff)


    }
    return newDomain//  [newDomain, cutoffPosition]
  }

  // calculateMean=(field:string)=> {

  // 	var paths = (d3.selectAll(".map-svg #" + level).nodes()[0].childNodes);

  // 	var data = []
  // 	paths.forEach(function (d) {
  // 		data.push(d.__data__.properties)
  // 	});
  // 	var sum = 0;

  // 	data.map(function (dd) {

  // 		sum += dd[field];
  // 	});
  // 	var average = sum / data.length;
  // 	//console.log(average)
  // 	return average

  // }
  colorCreater2(value: number, colorArray: Array<string> = this.colorRange, rangeArray: Array<number> = this.numberDomian) {

    const nullValue: number = -99999;
    let color: string;
    if (value === nullValue) {
      color = '#fff'
    } else {
      rangeArray.map((el: number, i: number) => {

        if (value <= rangeArray[0]) {
          color = colorArray[0];
        }
        else if (value > el && value <= rangeArray[i + 1]) {
          color = colorArray[i+1];
        }
        else if (value >= rangeArray[rangeArray.length - 1]) {
          color = colorArray[rangeArray.length - 1];
        }
      })
    }
    return color;
 
  }
extendTupels(domain:any){
const tuples:any=domain.map((el:number,i:number)=>{
 if(i==0) return [undefined,el]
if(i>0 && i<domain.length-1) return [domain[i-1],el]
//if(i==(domain.length-1)) return [el,undefined]
})
console.log(tuples)
return tuples;
}

invertExtend=(color:string)=>{
  const colorPosition:number=this.colorRange.indexOf(color)
  if(colorPosition==0) return [undefined,this.numberDomian[0]]

  else if(colorPosition>0 && colorPosition<this.numberDomian.length-1) return [this.numberDomian[colorPosition-1],this.numberDomian[colorPosition]]
 else if(colorPosition==(this.numberDomian.length-1)) return [this.numberDomian[this.numberDomian.length-1],undefined]

}

}

