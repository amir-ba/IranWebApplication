import { TestBed, inject } from '@angular/core/testing';

import { FieldManagerService } from './field-manager.service';

describe('FieldManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldManagerService]
    });
  });

  it('should be created', inject([FieldManagerService], (service: FieldManagerService) => {
    expect(service).toBeTruthy();
  }));
});
