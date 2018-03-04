import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxLayerListComponent } from './box-layer-list.component';

describe('BoxLayerListComponent', () => {
  let component: BoxLayerListComponent;
  let fixture: ComponentFixture<BoxLayerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxLayerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxLayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
