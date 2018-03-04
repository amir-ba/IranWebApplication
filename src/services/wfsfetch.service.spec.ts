import { TestBed, inject } from '@angular/core/testing';

import { WfsfetchService } from './wfsfetch.service';

describe('WfsfetchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WfsfetchService]
    });
  });

  it('should be created', inject([WfsfetchService], (service: WfsfetchService) => {
    expect(service).toBeTruthy();
  }));
});
