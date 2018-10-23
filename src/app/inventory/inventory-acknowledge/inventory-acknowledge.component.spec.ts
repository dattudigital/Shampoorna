import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAcknowledgeComponent } from './inventory-acknowledge.component';

describe('InventoryAcknowledgeComponent', () => {
  let component: InventoryAcknowledgeComponent;
  let fixture: ComponentFixture<InventoryAcknowledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryAcknowledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryAcknowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
