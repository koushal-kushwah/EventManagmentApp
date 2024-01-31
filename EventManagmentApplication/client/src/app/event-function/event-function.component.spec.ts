import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFunctionComponent } from './event-function.component';

describe('EventFunctionComponent', () => {
  let component: EventFunctionComponent;
  let fixture: ComponentFixture<EventFunctionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventFunctionComponent]
    });
    fixture = TestBed.createComponent(EventFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
