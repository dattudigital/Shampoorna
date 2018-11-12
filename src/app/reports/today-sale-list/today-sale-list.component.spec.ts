import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaySaleListComponent } from './today-sale-list.component';

describe('TodaySaleListComponent', () => {
  let component: TodaySaleListComponent;
  let fixture: ComponentFixture<TodaySaleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaySaleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaySaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
