import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupVehicleComponent } from './setup-vehicle.component';

describe('SetupVehicleComponent', () => {
  let component: SetupVehicleComponent;
  let fixture: ComponentFixture<SetupVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
