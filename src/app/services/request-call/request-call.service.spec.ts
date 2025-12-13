import { TestBed } from '@angular/core/testing';

import { RequestCallService } from './request-call.service';

describe('RequestCallService', () => {
  let service: RequestCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
