import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountOtpNoComponent } from './discount-otp-no.component';

describe('DiscountOtpNoComponent', () => {
  let component: DiscountOtpNoComponent;
  let fixture: ComponentFixture<DiscountOtpNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountOtpNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountOtpNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
