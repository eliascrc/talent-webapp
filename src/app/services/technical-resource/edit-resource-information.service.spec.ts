import { TestBed, inject } from '@angular/core/testing';

import { EditResourceInformationService } from './edit-resource-information.service';

describe('EditResourceInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditResourceInformationService]
    });
  });

  it('should be created', inject([EditResourceInformationService], (service: EditResourceInformationService) => {
    expect(service).toBeTruthy();
  }));
});
