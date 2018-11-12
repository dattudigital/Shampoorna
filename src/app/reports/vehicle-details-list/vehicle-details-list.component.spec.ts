import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsListComponent } from './vehicle-details-list.component';

describe('VehicleDetailsListComponent', () => {
  let component: VehicleDetailsListComponent;
  let fixture: ComponentFixture<VehicleDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
