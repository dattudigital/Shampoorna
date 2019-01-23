import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceNamesComponent } from './finance-names.component';

describe('FinanceNamesComponent', () => {
  let component: FinanceNamesComponent;
  let fixture: ComponentFixture<FinanceNamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceNamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
