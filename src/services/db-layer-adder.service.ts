import { Injectable } from '@angular/core';
import { LevelsManagerService } from './levels-manager.service';
import { MapService } from './map.service';
import { UrlGenerateService } from './url-generate.service';
import { WfsfetchService } from './wfsfetch.service';

@Injectable()
export class DbLayerAdderService {
  public layerQuery:string;
  public filterQuery:string;
  constructor(private _mapService:MapService,private _WfsfetchService:WfsfetchService, private _urlGenerateService: UrlGenerateService) { 
  
  }
  createURLRequest=(layers:string,filter:string)=>{
    // this._urlGenerateService.cql$.subscribe(filter=> {
    //   if(filter)  this._urlGenerateService.urlMaker(layers,filter);
    // } );
    // this._mapService.name$.subscribe(selected=> {
    //   if(selected)  this._urlGenerateService.urlMaker(layers,filter);
    // } );
   this._urlGenerateService.urlMaker(layers,filter);
    return this._urlGenerateService.URL
  }
  // addLayerFromDb(url:string,layer:string){
  //   this._WfsfetchService.getMapLayer(url).subscribe(
  //     data => { 
  //       this._mapService.CreateLayerFromJson(data,layer);
  //      this._mapService.otherLayersOff(layer)},
  //     err => console.error(err)
  //    );
  // }
  createLayerFromURL(layers:string,filter:string=''){
    console.log(layers,filter,1111111)
    if( this._mapService.checkLayerExist(layers,filter)){
        this._mapService.otherLayersOff(layers)
    }else{
      const link= this.createURLRequest(layers,filter);
      console.log(layers,filter,link,1111111)

   //   this.addLayerFromDb(link,layers)
    }


  }

}
