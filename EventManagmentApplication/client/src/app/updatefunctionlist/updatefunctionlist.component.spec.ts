import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefunctionlistComponent } from './updatefunctionlist.component';

describe('UpdatefunctionlistComponent', () => {
  let component: UpdatefunctionlistComponent;
  let fixture: ComponentFixture<UpdatefunctionlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatefunctionlistComponent]
    });
    fixture = TestBed.createComponent(UpdatefunctionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
