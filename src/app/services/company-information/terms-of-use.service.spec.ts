import { TestBed, inject } from '@angular/core/testing';

import { TermsOfUseService } from './terms-of-use.service';

describe('TermsOfUseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TermsOfUseService]
    });
  });

  it('should be created', inject([TermsOfUseService], (service: TermsOfUseService) => {
    expect(service).toBeTruthy();
  }));
});
