import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleBulkComponent } from './add-vehicle-bulk.component';

describe('AddVehicleBulkComponent', () => {
  let component: AddVehicleBulkComponent;
  let fixture: ComponentFixture<AddVehicleBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVehicleBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehicleBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
