import { TestBed } from '@angular/core/testing';

import { SidebarToogleService } from './sidebar-toogle.service';

describe('SidebarToogleService', () => {
  let service: SidebarToogleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarToogleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
