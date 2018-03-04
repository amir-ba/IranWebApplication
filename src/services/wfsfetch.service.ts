import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable()
export class WfsfetchService  {

  constructor(private _http:HttpClient) { }
  
  getMapLayer(url: string) {
    return this._http.get(url)      .map((res:Response) => res);


  }


}
