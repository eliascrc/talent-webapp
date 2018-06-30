import { TestBed, inject } from '@angular/core/testing';

import { StepCommunicationService } from './step-communication.service';

describe('StepCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepCommunicationService]
    });
  });

  it('should be created', inject([StepCommunicationService], (service: StepCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
