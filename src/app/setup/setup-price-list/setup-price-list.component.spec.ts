import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPriceListComponent } from './setup-price-list.component';

describe('SetupPriceListComponent', () => {
  let component: SetupPriceListComponent;
  let fixture: ComponentFixture<SetupPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupPriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
