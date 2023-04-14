import { TestBed } from '@angular/core/testing';

import { ReferenceYearService } from './reference-year.service';

describe('ReferenceYearService', () => {
  let service: ReferenceYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenceYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
