import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxFieldswitchComponent } from './box-fieldswitch.component';

describe('BoxFieldswitchComponent', () => {
  let component: BoxFieldswitchComponent;
  let fixture: ComponentFixture<BoxFieldswitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxFieldswitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxFieldswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
