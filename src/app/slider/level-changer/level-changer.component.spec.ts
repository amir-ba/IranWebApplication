import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelChangerComponent } from './level-changer.component';

describe('LevelChangerComponent', () => {
  let component: LevelChangerComponent;
  let fixture: ComponentFixture<LevelChangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelChangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
