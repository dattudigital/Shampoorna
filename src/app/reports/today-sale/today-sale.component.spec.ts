import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaySaleComponent } from './today-sale.component';

describe('TodaySaleComponent', () => {
  let component: TodaySaleComponent;
  let fixture: ComponentFixture<TodaySaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaySaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
