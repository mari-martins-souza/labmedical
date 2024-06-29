import { TestBed } from '@angular/core/testing';

import { DialogLoginService } from './dialog-login.service';

describe('DialogLoginService', () => {
  let service: DialogLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
