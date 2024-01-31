import { TestBed } from '@angular/core/testing';

import { EventFunctionService } from './event-function.service';

describe('EventFunctionService', () => {
  let service: EventFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
