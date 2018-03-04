import { TestBed, inject } from '@angular/core/testing';

import { DbLayerAdderService } from './db-layer-adder.service';

describe('DbLayerAdderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbLayerAdderService]
    });
  });

  it('should be created', inject([DbLayerAdderService], (service: DbLayerAdderService) => {
    expect(service).toBeTruthy();
  }));
});
