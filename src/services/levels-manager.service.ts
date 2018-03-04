import { Injectable, Inject } from '@angular/core';
import { MAP_CONFIG } from '../map.config';
import { BehaviorSubject } from 'rxjs';
 
@Injectable()
export class LevelsManagerService {
    allLevels: string[];
    startPoint: string;
    _currentLevel: string;
    levelsConfig: any;
    private LevelSource:BehaviorSubject<string>
     Level$: any  ;
    constructor(@Inject(MAP_CONFIG) private _config: any) {
        this.levelsConfig = this._config.levels;
        this.allLevels = this.getAllLevels();
        this.startPoint = this.getStartPoint();
     //   this.currentLevel = (this.startPoint);
        this.LevelSource= new BehaviorSubject<string>(this.startPoint);
        this.Level$ = this.LevelSource.asObservable();
    }

    get currentLevel() {
        return this.LevelSource.value
        //this._currentLevel
    }

    set currentLevel(lvl) {
        this.LevelSource.next(lvl);

      //  this._currentLevel = lvl; //getAllLevels.filter(level=> level==lvl);
    }
  
    levelUp() {
        const position = this.allLevels.indexOf(this.currentLevel);
        console.log(22222222222)
        if (position > 0) {
            this.currentLevel = this.allLevels[position - 1];
          //  return this.currentLevel
        } else {
            return false
        }
    }
    levelDown() {
        const position = this.allLevels.indexOf(this.currentLevel);
 
        if (position < this.allLevels.length - 1) {
            this.currentLevel = this.allLevels[position + 1];
      //      return this.currentLevel
        } else {
            return false
        }

    }
    getAllLevels() {
        return Object.keys(this.levelsConfig.existingLevels)
    }
    getStartPoint() {
        return this.levelsConfig.startPoint;
    }
    getLevelName(level: string) {
        return this.levelsConfig.existingLevels[level];
    }
    getAllLevelNames() {
        return this.allLevels.map((level: string) => this.getLevelName(level))
    }
    getNamesLevel(name: string) {
        console.log(name)
        return Object.keys(this.levelsConfig.existingLevels).find(key => this.levelsConfig.existingLevels[key] === name);

    }
    isDeepable(){
      return (this.allLevels.indexOf(this.currentLevel)<this.allLevels.length - 1)?true:false ;       }
}
