import { Component, OnInit  } from '@angular/core';
import { LevelsManagerService } from '../../../services/levels-manager.service';
 import { DbLayerAdderService } from '../../../services/db-layer-adder.service';
import { MapService } from '../../../services/map.service';

@Component({
  selector: 'app-box-layer-list',
  templateUrl: './box-layer-list.component.html',
  styleUrls: ['./box-layer-list.component.css']
})
export class BoxLayerListComponent implements OnInit {
  levels:string[];
  current:string;
  constructor(private _levelsManager: LevelsManagerService,private _mapService:MapService) { 
     
    this.levels=this. getAllLevels();
  
  }

  ngOnInit() {
    this._levelsManager.Level$.subscribe((lvl:string)=>{
      this.current=lvl;
     })
  }

  getAllLevels(){
    return this._levelsManager.getAllLevels() //.getAllLevelNames() 
  }

   
  changeLevel(level:string){
   // console.log(this.current)
   this._mapService.changeQuaryStatus(false);
    this._levelsManager.currentLevel= level;
   }
   getName(lvl:string){
    return this._levelsManager.getLevelName(lvl);
   }

}
