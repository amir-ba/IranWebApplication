import { Injectable, Inject } from '@angular/core';
import { REF } from '.././references';
import { BehaviorSubject } from 'rxjs';
import { ColorCreateService } from './color-create.service';

@Injectable()
export class FieldManagerService {
  public startingPoint: string;
  //public _currentField: string;
  private FieldSource = new BehaviorSubject<string>("wintensity");
  Field$ = this.FieldSource.asObservable();
  //public colorFunction:Function;
  constructor(@Inject(REF) private _ref: any, private _colorManager: ColorCreateService) {     this.startingPoint = "wintensity";
    //this.currentfield = this.startingPoint;
    this.Field$.share().subscribe(field =>this._colorManager.createColor(field));
  }

  get currentfield() {
    return this.FieldSource.value;
  }

  set currentfield(field: string) {
    // const newField: string = field.split(' ')
    // .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
    // .join(' ');
    this.FieldSource.next(field);

   }
  getAllfields(): string[] {

    return Object.keys(this._ref.Names['indexes'])
  }
  getStartPoint(): string {
    return this.startingPoint;
  }
  getFieldName(field: string) {

    const newField: string = field
    // field.split(' ')
    // .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
    // .join(' ');
     let name: string;
    switch (newField[0]) {
      case 'D' :
      case 'd':
        name = this._ref.Names['dimentions'].newField
        break;
      case 't' :
      case 'w':
        name = this._ref.Names['themes'][newField]
        break;
      case 'I' :
      case 'i':
        name = this._ref.Names['indicator'].newField
        break;
        case 'V' :
        case 'v':
         name=this._ref.Names['indexes'][newField];
        break;
    }
    return name;
  }
  getAllFieldNames() {
    return Object.keys(this._ref.Names['indexes']).map(key => this._ref.Names['indexes'][key]);
  }
  findFieldTheme(field: string) {
    field = field.substring(0, 4)
    return (this._ref.Keys[field]).substring(3, 6)
  }
  findFieldDimention(field: string) {
    field = field.substring(0, 4)
    return (this._ref.Keys[field]).substring(0, 3)
  }
  findFieldIndicator(field: string) {
    field = field.substring(0, 4)
    return (this._ref.Keys[field]).substring(6, 9)
  }
  getCategoryElements(category: string) {
    var categoryFuncitons = {
      'dimentions': "d",
      'indicators': "i",
      'themes': "w"
    }
    return Object.keys(this._ref.indexes).filter(element => element[0] == categoryFuncitons[category]);
  }
  findFieldsCategory(item: string) {

    const field = (this._ref.Keys[item.substring(0, 4)]);
    //console.log(item.substring(0,4),field)

    return {
      themes: this._ref.Names.themesId[field.substring(3, 6)],
      dimentions: field.substring(0, 3),
      indicators: field.substring(6, 9)
    }
  }
  existingLayers(){
    return false
  }
  getUnit(field:string){
    return this._ref['unit'][field]
  }
  
}
