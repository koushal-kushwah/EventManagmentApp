import { TestBed } from '@angular/core/testing';

import { FunctionScheduleService } from './function-schedule.service';

describe('FunctionScheduleService', () => {
  let service: FunctionScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
