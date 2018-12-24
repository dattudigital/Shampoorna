import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryReversalComponent } from './inventory-reversal.component';

describe('InventoryReversalComponent', () => {
  let component: InventoryReversalComponent;
  let fixture: ComponentFixture<InventoryReversalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryReversalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryReversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
