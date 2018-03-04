import { TestBed, inject } from '@angular/core/testing';

import { LevelsManagerService } from './levels-manager.service';

describe('LevelsManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LevelsManagerService]
    });
  });

  it('should be created', inject([LevelsManagerService], (service: LevelsManagerService) => {
    expect(service).toBeTruthy();
  }));
});
