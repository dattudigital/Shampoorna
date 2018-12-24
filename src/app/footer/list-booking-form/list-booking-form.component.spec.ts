import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingFormComponent } from './list-booking-form.component';

describe('ListBookingFormComponent', () => {
  let component: ListBookingFormComponent;
  let fixture: ComponentFixture<ListBookingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBookingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
