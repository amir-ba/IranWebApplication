import { Injectable, Inject, Injector } from '@angular/core';
import { MAP_CONFIG } from '../map.config';
import { BehaviorSubject } from 'rxjs';
import { Observable } from "rxjs/Observable"

import 'ol/ol.css';
import OLMap from 'ol/map';
import View from 'ol/view';
import GeoJSON from 'ol/format/GeoJSON';
import loadingstrategy from 'ol/loadingstrategy';
import Vector from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';

import Style from 'ol/style/style';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import * as d3 from 'd3';
import { StyleFunction, style } from 'openlayers';
import { FieldManagerService } from './field-manager.service';
import { ColorCreateService } from './color-create.service';
import vector from 'ol/source/vector';
import { UrlGenerateService } from './url-generate.service';

@Injectable()
export class MapService {
  _map: OLMap;
  layer: any;
  _conf: any;
  _selected: any;
  private config: any;
  private nameSource = new BehaviorSubject<string>(null);
  name$ = this.nameSource.asObservable();
  private quariablesource = new BehaviorSubject<boolean>(false);
  useQuery$ = this.quariablesource.asObservable();
  private _URLGenerater: any
  //@Inject(MAP_CONFIG)
  constructor(private injectorObj: Injector) {

    this._conf = this.injectorObj.get(MAP_CONFIG);     //config;
    this._URLGenerater = this.injectorObj.get(UrlGenerateService)      //config;

  }

  get queryStatus() {
    return this.quariablesource.value

  }
  changeQuaryStatus(status: boolean) {
    this.quariablesource.next(status);
  }

  get map() {
    // this._map = this.createMap(); 
    return this._map
  }
  createMap() {

    this._map = new OLMap({
      target: this._conf.map.target,
      layers: [],//this._conf.layers,
      view: new View({
        center: this._conf.map.center,
        zoom: this._conf.map.zoom
      })
    })
    return this._map
  }
  LayerAdder(layer: any, name = "new layer", filter: string = this._URLGenerater.cqlFilter) {
     layer.set('name', name)
    layer.set('id', this.idSetter());
     layer.set('filter', filter);
    this._map.addLayer(layer);
  }


  idSetter() {
    return `L${this._map.getLayers().getArray().length}`
  }

  CreateLayerFromJson(json: any, layerName: string) {
    console.log(json)
    //  const json1 = json.json()
    const features = new GeoJSON().readFeatures(json);
    const vectorSource = new Vector();
    vectorSource.addFeatures(features);
    const vectorLayer = new VectorLayer({
      source: vectorSource
      //    , strategy:  loadingstrategy.bbox
      , style: this.getstyle as any
    });
    // return vectorLayer;
    this.LayerAdder(vectorLayer, layerName);
    this._map.getView().fit(vectorSource.getExtent());
  }
  layerVisibilityOff(name: string) {
    //   const id = $(el.target).attr('id');
    this._map.getLayers().getArray().filter(function (layer) {
      if (layer.getProperties().name === name) layer.setVisible(false);
    })
  }
  otherLayersOff(name: string, filter: string = '') {
    console.log(this._map.getLayers().getArray())
    this._map.getLayers().getArray().map(function (layer: any) {
      // console.log(7777, layer.getProperties().name, name, layer.getProperties().filter, filter)
      ;
      if(layer.type && layer.type == 'VECTOR'){
        console.log(layer.type)
      if ( layer.getProperties().name == name  && layer.getProperties().filter == filter ) {
        layer.setVisible(true)
      } else { layer.setVisible(false); }
    }else{
       layer.setVisible(true)


    }
    })

  }

  checkLayerExist(name: string, filter: string) {

    const existCheck: object[] = this._map.getLayers().getArray().filter(function (layer: any) {
      // console.log(33333333, layer.getProperties().name, layer.getProperties().filter)

      if (layer.getProperties().name === name
        && layer.getProperties().filter == filter
      ) return layer;
    });
    return (existCheck.length > 0) ? true : false;

  }
  set selectedLayer(feature: any) {
    this.nameSource.next(feature);

    // this._selected=feature
  }

  get selectedLayer() {
    return this.nameSource.value
  }

  styleGenerator(fillColor: number, strokeColor: string, width: number) {
    return new Style({
      stroke: new Stroke({
        color: strokeColor,
        width: width
      }),
      fill: new Fill({
        color: fillColor as any
      })
    })
  }

  getstyle = (feature: VectorLayer): Style => {
    const array: Array<number> = ['#a1d99b', '#fef0d9', '#fdd49e', '#fdbb84', '#fc8d59', '#e34a33', '#b30000'] as any
    let style: Style;
    let colorHex: string;
    const fieldManager = this.injectorObj.get(FieldManagerService)

    const color = this.injectorObj.get(ColorCreateService)
    const current = this.injectorObj.get(FieldManagerService)
    current.Field$.share().switchMap(
      field => {
        let x: number = feature.getProperties()[field];
        colorHex = color.colorCreater2(x) as string;
        return this.name$;
      }).subscribe((selected: any) => {
        if (selected && feature == selected) {
          style = this.styleGenerator('transparent' as any, 'black', 3);
        } else {
          style = this.styleGenerator(colorHex as any, 'gray', 0.3);
        }
        feature.setStyle(style);
      })
    return style;
  }
}
