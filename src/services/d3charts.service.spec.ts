import { TestBed, inject } from '@angular/core/testing';

import { D3chartsService } from './d3charts.service';

describe('D3chartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [D3chartsService]
    });
  });

  it('should be created', inject([D3chartsService], (service: D3chartsService) => {
    expect(service).toBeTruthy();
  }));
});
