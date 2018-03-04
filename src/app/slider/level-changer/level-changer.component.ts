import { Component, OnInit } from '@angular/core';
  import { LevelsManagerService } from '../../../services/levels-manager.service';
import { MapService } from '../../../services/map.service';
 
@Component({
  selector: 'app-level-changer',
  templateUrl: './level-changer.component.html',
  styleUrls: ['./level-changer.component.css']
})
export class LevelChangerComponent implements OnInit {
  
  public levelDeepable:boolean;
  public isSelected:boolean;
  constructor(private _levelManager: LevelsManagerService,private _mapService: MapService) {
      this._levelManager.Level$.share().subscribe((lvl:string)=>this.levelDeepable=this._levelManager.isDeepable() );
      this._mapService.name$.share().subscribe((selected:string)=>this.isSelected=(selected)?true:false)
   }

  ngOnInit() {

  }
  leveldown(){
    this._mapService. changeQuaryStatus(true) ;
  this._levelManager.levelDown()
  }
}
