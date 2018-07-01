import { TestBed, inject } from '@angular/core/testing';

import { ResourceInformationService } from './resource-information.service';

describe('ResourceInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceInformationService]
    });
  });

  it('should be created', inject([ResourceInformationService], (service: ResourceInformationService) => {
    expect(service).toBeTruthy();
  }));
});
