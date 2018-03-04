/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { InjectionToken } from '@angular/core';

import Vector from 'ol/source/vector';
import f from 'ol/format/filter';
import XML from 'ol/format/xml'
import VectorLayer from 'ol/layer/vector';
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';


//var filter1 = f.read(x);
//console.log(filter1)
export const MAP_CONFIG = new InjectionToken<any>('map.config');

export const MAP_DI_CONFIG: any = {

    map: {
        target: 'map',
        center: [0, 0],
        zoom: 3
    }
    , layers: [{
        layerName: 'base layer',

        layerData: new TileLayer({
            source: new XYZ({
                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        })
    }

    ]
    ,
    databaseAddress: 'http://localhost:8010/geoserver/iran/ows',
    url:
        'http://localhost:8010/geoserver/iran/ows?service=WFS&version=1.1.0&request=GetFeature&outputFormat=application%2Fjson&srsName=EPSG:3857'
    , levels: {
        existingLevels: { 'ostans': 'استان', 'shahrestans': 'شهرستان', 'dehestans': 'دهستان', 'manategh': 'منطقه', 'navahi': 'ناحیه', 'mahalat': 'محله', 'blocks': 'بلوک' }
        //['ostans', 'shahrestans', 'dehestans', 'manategh', 'navahi', 'mahalat', 'block']
        , startPoint: 'ostans'
    }

}


// ,  filter:  filter.and(
//     //   filter.intersects('the_geom', polygon, 'EPSG:4326'),
//        filter.equalTo('gid', '1')

//  //          filter.like('name', 'Mississippi*'),
//  //         filter.equalTo('waterway', 'riverbank')
//     )

/// sql view : viewParams:"label:'كردستان'"

// filter wfs : 
    //   ,  filter:                    f.intersects('geom', [1, 2, 3, 4])

                 //   f.equalTo('ostan','تهران')
