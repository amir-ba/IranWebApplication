import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxInfoboxComponent } from './box-infobox.component';

describe('BoxInfoboxComponent', () => {
  let component: BoxInfoboxComponent;
  let fixture: ComponentFixture<BoxInfoboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxInfoboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxInfoboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
