import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapService } from '../services/map.service';
import { UrlGenerateService } from '../services/url-generate.service';
import { WfsfetchService } from '../services/wfsfetch.service';
import {LevelsManagerService} from '../services/levels-manager.service';
import {MAP_CONFIG,MAP_DI_CONFIG} from '../map.config';
import { SliderComponent } from './slider/slider.component';
import { BoxLayerListComponent } from './slider/box-layer-list/box-layer-list.component';
import { DbLayerAdderService } from '../services/db-layer-adder.service';
import { MapEventsService } from '../services/map-events.service';
import { BoxInfoboxComponent } from './slider/box-infobox/box-infobox.component';
import { BoxFieldswitchComponent } from './slider/box-fieldswitch/box-fieldswitch.component';
import { FieldManagerService } from '../services/field-manager.service';
 import { REF, REF_CONFIG } from '../references';
import { ColorCreateService } from '../services/color-create.service';
import { D3BarChartComponent } from './slider/box-infobox/d3-bar-chart/d3-bar-chart.component';
import { LevelChangerComponent } from './slider/level-changer/level-changer.component';

@NgModule({
  declarations: [AppComponent, MapComponent, SliderComponent, BoxLayerListComponent, BoxInfoboxComponent, BoxFieldswitchComponent, D3BarChartComponent, LevelChangerComponent],
  imports: [CommonModule, BrowserModule,HttpClientModule,BrowserAnimationsModule,MaterializeModule
  ,FormsModule],
  exports: [],
  providers: [MapService,
    UrlGenerateService,
    WfsfetchService ,
    { provide: MAP_CONFIG, useValue:  MAP_DI_CONFIG },
    LevelsManagerService,
    DbLayerAdderService,
    MapEventsService ,
    FieldManagerService 
    ,{ provide: REF, useValue:  REF_CONFIG },
    ColorCreateService

],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
