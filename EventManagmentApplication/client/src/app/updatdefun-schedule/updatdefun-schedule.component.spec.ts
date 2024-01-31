import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatdefunScheduleComponent } from './updatdefun-schedule.component';

describe('UpdatdefunScheduleComponent', () => {
  let component: UpdatdefunScheduleComponent;
  let fixture: ComponentFixture<UpdatdefunScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatdefunScheduleComponent]
    });
    fixture = TestBed.createComponent(UpdatdefunScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
