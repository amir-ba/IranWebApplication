import { Component, OnInit, Output } from '@angular/core';
import { MapService } from '../../services/map.service';
import { WfsfetchService } from '../../services/wfsfetch.service';
import OlMap from 'ol/map';
import OlXYZ from 'ol/source/xyz';
import OlTileLayer from 'ol/layer/tile';
import OlView from 'ol/view';
import { LevelsManagerService } from '../../services/levels-manager.service';
import { DbLayerAdderService } from '../../services/db-layer-adder.service';
import { MapEventsService } from '../../services/map-events.service';
import { FieldManagerService } from '../../services/field-manager.service';
import { UrlGenerateService } from '../../services/url-generate.service';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import vector from 'ol/layer/vector';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  mapClass: any;
  urlLink: string;
  cql: string;
  useQuery: boolean;
  public vectorBlob: vector;

  constructor(private _mapService: MapService, private _WfsfetchService: WfsfetchService, private _levelManager: LevelsManagerService, private _layerAdder: DbLayerAdderService, private _mapEvents: MapEventsService, private _fieldManager: FieldManagerService, private _URLGenerate: UrlGenerateService) { }

  ngOnInit() {
    this.map = this._mapService.createMap();
    console.log(this._mapService.map)
    this.addBaseLayers();
  //   this._layerAdder
 this.dbLayerAdd();
    this.addEvents();
    //  this.showMapForCurrentField()
    // console.log(    this._fieldManager.getAllFieldNames()  )
  }

  dbLayerAdd() {
    this._fieldManager.Field$
      .switchMap(field => {
        if (field) console.log(field)// this._fieldManager.currentfield=field
        console.log('11111111field',field)
      //  return this._levelManager.Level$ 
        //.distinctUntilChanged() 

      //  return  this._mapService.name$  // .distinctUntilChanged()  // 
         return this._mapService.useQuery$  .distinctUntilChanged()
      }) 
      .switchMap(isQuarible => {
        
        return  this._mapService.name$.distinctUntilChanged()
      })
      .switchMap((selected: any) => {
        console.log('2222222222select', selected)
        //    if (selected) selected.setStyle(this._mapEvents.selectionStyle)//(this._mapService.getstyle);
        //&& this.useQuery
        if(!selected) this._mapService.changeQuaryStatus(false);
         this._URLGenerate.cqlFilter = (this._mapService.queryStatus && selected && selected != null) ? `ostan='${(selected as any).getProperties()['ostan']}'` : '';
        return this._levelManager.Level$ .distinctUntilChanged()
      }) 
      .switchMap((lvl: string) => {
        console.log('3333333333333level',lvl)

        if (lvl) this._URLGenerate.urlMaker(this._levelManager.currentLevel, this._URLGenerate.cqlFilter);
        return this._URLGenerate._URL$.distinctUntilChanged() 
      })
      .switchMap((_url: string) => {
        console.log('4444444444url',_url)
        if (_url && !this._mapService.checkLayerExist(this._levelManager.currentLevel, this._URLGenerate.cqlFilter)) {
          this._mapService.otherLayersOff(this._levelManager.currentLevel, this._URLGenerate.cqlFilter);
          console.log('repeat');
          return this._WfsfetchService.getMapLayer(this._URLGenerate.URL)
        }
        else {
          console.log("EXISTED")
          this._mapService.otherLayersOff(this._levelManager.currentLevel, this._URLGenerate.cqlFilter);
          //    this._mapService.LayerAdder(this.vectorBlob, this._levelManager.currentLevel,  this._URLGenerate.cqlFilter)
          return new EmptyObservable();//Observable.empty<Response>();

        }
      })
      .subscribe(data => {
        console.log('5555555555reciveurl')
        if (data) this._mapService.CreateLayerFromJson(data, this._levelManager.currentLevel)

      }, (err: any) => console.error(err)

      )
  }
    createMap(): OlMap {
    return this._mapService.createMap();
  }
  addBaseLayers(): void {
    this._mapService._conf.layers.map((layer: any) => this._mapService.LayerAdder(layer.layerData, layer.layerName));
  }
  addEvents() {
    const interaction = this._mapEvents.selectInteractionCreater();
    this.map.addInteraction(interaction);
    interaction.on('select', (pixel: any) => this.displayAttributes(pixel))
  }
  displayAttributes(pixel: any) {
    const feature = pixel.selected[0];

    if (feature) {
      //  feature.setStyle(this._mapEvents.selectionStyle);
      this.map.getView().fit(pixel.selected[0].getGeometry().getExtent(), {
        duration: 600
      });
      const fields = Object.keys(feature.getProperties());
      this._mapService.selectedLayer = feature;
    } else {
      this._mapService.selectedLayer = null;
    }
  }

}


