import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionScheduleComponent } from './function-schedule.component';

describe('FunctionScheduleComponent', () => {
  let component: FunctionScheduleComponent;
  let fixture: ComponentFixture<FunctionScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionScheduleComponent]
    });
    fixture = TestBed.createComponent(FunctionScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
