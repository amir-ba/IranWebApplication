import { TestBed, inject } from '@angular/core/testing';

import { UrlGenerateService } from './url-generate.service';

describe('UrlGenerateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlGenerateService]
    });
  });

  it('should be created', inject([UrlGenerateService], (service: UrlGenerateService) => {
    expect(service).toBeTruthy();
  }));
});
