import { Injectable, Inject, Injector } from '@angular/core';
import { MapService } from './map.service';
import { MAP_CONFIG } from '../map.config';
import Style from 'ol/style/style';
import IconStyle from 'ol/style/icon';
import Circle from 'ol/style/circle';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import Text from 'ol/style/text';
import interaction from 'ol/interaction'
import Select from 'ol/interaction/select'
import conditions from 'ol/events/condition'
import events from 'ol/events/';

@Injectable()
export class MapEventsService extends MapService {

    constructor(private injector: Injector) {
        super(injector);

    }
    selectInteractionCreater() {
        return new Select({
            condition: conditions.click
            // ,style: this.createStyle({
            //     fillColor: 'rgba(255, 255, 0,1)',
            //     strokeColor: '#f00',
            //     strokeWidth: 1,
            //     textColor: '#000',
            //     textStrokeColor: '#f00',
            //     textStrokeWidth: 3
            // })

        });
    }
    createStyle(styleObj: any) {
        return new Style({
            fill: new Fill({
                color: styleObj.fillColor //'rgba(255, 255, 0,1)'
            }),
            stroke: new Stroke({
                color: styleObj.strokeColor, // '#f00',
                width: styleObj.strokeWidth
            }),
            text: new Text({
                font: '12px Calibri,sans-serif',
                fill: new Fill({
                    color: styleObj.textColor //'#000'
                }),
                stroke: new Stroke({
                    color: styleObj.textStrokeColor, // '#f00',
                    width: styleObj.textStrokeWidth //3
                })
            })


        });
    }
    selectionStyle=()=>{
     return   this.createStyle({
           fillColor: 'rgba(255, 255, 255,0.1)',
            strokeColor: '#535353',
            strokeWidth: 1,
            // textColor: '#000',
            // textStrokeColor: '#f00',
            // textStrokeWidth: 3
        })
    }

}
