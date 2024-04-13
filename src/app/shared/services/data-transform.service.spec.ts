import { TestBed } from '@angular/core/testing';

import { DataTransformService } from '../shared/services/data-transform.service';

describe('DataTransformService', () => {
  let service: DataTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
