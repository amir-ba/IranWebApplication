import { Component, OnInit } from '@angular/core';
import {  trigger,  state,  style,  animate,  transition} from '@angular/animations';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations:[
    trigger('heroState', [
      state('inactive', style({
        right:0
       })),
      state('active',   style({
        right:"300px"
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]) 
    ,   trigger('sliderState', [
      state('inactive', style({
        width:0
       })),
      state('active',   style({
        width:"300px"
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]) 
  ]
})
export class SliderComponent implements OnInit {
  public state = 'active';
  
   constructor() { }

  ngOnInit() {
  }
  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
   

}
