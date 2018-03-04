import { TestBed, inject } from '@angular/core/testing';

import { ColorCreateService } from './color-create.service';

describe('ColorCreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorCreateService]
    });
  });

  it('should be created', inject([ColorCreateService], (service: ColorCreateService) => {
    expect(service).toBeTruthy();
  }));
});
