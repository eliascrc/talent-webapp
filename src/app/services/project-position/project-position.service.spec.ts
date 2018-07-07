import { TestBed, inject } from '@angular/core/testing';

import { ProjectPositionService } from './project-position.service';

describe('ProjectPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectPositionService]
    });
  });

  it('should be created', inject([ProjectPositionService], (service: ProjectPositionService) => {
    expect(service).toBeTruthy();
  }));
});
