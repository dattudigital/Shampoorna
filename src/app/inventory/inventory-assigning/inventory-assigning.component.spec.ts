import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAssigningComponent } from './inventory-assigning.component';

describe('InventoryAssigningComponent', () => {
  let component: InventoryAssigningComponent;
  let fixture: ComponentFixture<InventoryAssigningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryAssigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryAssigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
