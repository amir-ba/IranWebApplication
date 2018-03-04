import { Component, OnInit,  ElementRef, ViewChildren } from '@angular/core';
import { FieldManagerService } from '../../../services/field-manager.service';

@Component({
  selector: 'app-box-fieldswitch',
  templateUrl: './box-fieldswitch.component.html',
  styleUrls: ['./box-fieldswitch.component.css']
})
export class BoxFieldswitchComponent implements OnInit {

  public fields:string[];
  public AllThemes:any;
  public startPoint:string;
  public currentField:string;
  public layersFields:Array<string>;
  @ViewChildren('cbx') myDiv: ElementRef;
  public check:boolean= false;

  constructor(private _fieldManager: FieldManagerService) { 

 
  }

  ngOnInit() {
    this.fields= this._fieldManager.getAllfields();
    this.startPoint=this._fieldManager.getStartPoint()  as any;
    this.AllThemes=this._fieldManager.getCategoryElements('themes').filter(item=>item!= this.startPoint);
    this.currentField= this._fieldManager.currentfield;
   // layersFields
 //   console.log(this.AllThemes);
  }
  
  getThemeFields(theme:string){
    return this.fields.filter(field=>this._fieldManager.findFieldsCategory(field).themes==theme)
   

  }
  changeField(field:string,e:any){
    this._fieldManager.currentfield=field;

    this._fieldManager.Field$.share().subscribe( field2 =>  this.currentField=field2);
       (this.myDiv as any)  .toArray().map((el:any)=>{
          if(el.nativeElement.id !=e.target.labels[0].htmlFor) {el.nativeElement.checked = false}
          else{
            el.nativeElement.checked = true
          }
          });
  
     }
  fieldToName(field:string){
    return this._fieldManager.getFieldName(field)
  }
 
}
