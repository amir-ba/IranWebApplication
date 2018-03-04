import { Injectable,Inject } from '@angular/core';
import { MAP_CONFIG } from '../map.config';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UrlGenerateService {
 // _URL:String = require('../map.config').default.url
 _baseURL:string;
 private urlSource: BehaviorSubject<string>;
 _URL$:any;
 //_URL:string;
 private cqleSource = new BehaviorSubject<string>('');
 cql$ = this.cqleSource.asObservable();
  constructor(@Inject(MAP_CONFIG) private config: any) { 
    this._baseURL= this.config.url;
    this.urlSource=new BehaviorSubject<string>(this._baseURL);
    this._URL$= this.urlSource.asObservable();
  //subscribe to level =>select=>url
  //subscribe to level
  //.switchMap(selected=>{ if (selected) return this.cqlFilter()}).subscribe(level=>{})
  //  this._baseURL = baseURL;
//    this.URL = this._baseURL;
 

  }
 
  get URL() {
//console.log(this.urlSource.value)
  return this.urlSource.value// return (this._URL)
}
set URL(url:string){
  this.urlSource.next(url);

}
// cqlFilter(filter:string) {

//  return(filter!='')? "&CQL_FILTER=" + encodeURI(filter):'';
//  //   this._baseURL = this._baseURL.concat("&CQL_FILTER=" + encodeURI(filter));
// }

set cqlFilter(filter:string) {
  this.cqleSource.next(filter);

  // this._selected=feature
}

get cqlFilter(){
  return this.cqleSource.value
}

layers(layers:string) {
  return "&typeName=" + layers;
 //   this._baseURL = this._baseURL.concat("&typeName=" + layers);
}

urlMaker=(layers:string,filter:string='')=>{
  this.cqlFilter=filter;
  const query:string= ( this.cqlFilter!='')? "&CQL_FILTER=" + encodeURI( this.cqlFilter):'';
  const typeName= "&typeName=" + layers;
  this.URL=this._baseURL.concat(typeName+query);
  //return   this.URL
}




}
