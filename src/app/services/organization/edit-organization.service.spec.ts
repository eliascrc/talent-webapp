import { TestBed, inject } from '@angular/core/testing';

import { EditOrganizationService } from './edit-organization.service';

describe('EditOrganizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditOrganizationService]
    });
  });

  it('should be created', inject([EditOrganizationService], (service: EditOrganizationService) => {
    expect(service).toBeTruthy();
  }));
});
