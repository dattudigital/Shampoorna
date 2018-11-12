import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSaleListComponent } from './total-sale-list.component';

describe('TotalSaleListComponent', () => {
  let component: TotalSaleListComponent;
  let fixture: ComponentFixture<TotalSaleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalSaleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
