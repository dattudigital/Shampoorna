import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSaleComponent } from './total-sale.component';

describe('TotalSaleComponent', () => {
  let component: TotalSaleComponent;
  let fixture: ComponentFixture<TotalSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
