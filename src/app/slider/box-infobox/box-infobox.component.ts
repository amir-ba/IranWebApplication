import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../services/map.service';
import 'rxjs/add/operator/takeWhile';
import { FieldManagerService } from '../../../services/field-manager.service';

@Component({
  selector: 'app-box-infobox',
  templateUrl: './box-infobox.component.html',
  styleUrls: ['./box-infobox.component.css']
})
export class BoxInfoboxComponent implements OnInit {
  
  private alive: boolean = true;
  private data: {};

  private currentField:string;
  constructor(private _mapService:MapService, private _fieldManager: FieldManagerService) { 

    _mapService.name$.takeWhile(() => this.alive).share().subscribe(
      data=> {
           this.data =(data )? (data as any).getProperties():null;
  });
  _fieldManager.Field$.share().subscribe(field=> this.currentField = field);
  }
  ngOnInit() {
  //   this.data= this._mapService.selectedLayer ; 
     this.currentField=this._fieldManager.currentfield
  }
  fieldNamer(field:string){
    return this._fieldManager.getFieldName(field)
  }
  getunit(field:string){
     return this._fieldManager.getUnit(field)
  }

}
