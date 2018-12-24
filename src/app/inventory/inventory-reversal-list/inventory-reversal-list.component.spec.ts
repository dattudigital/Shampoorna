import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryReversalListComponent } from './inventory-reversal-list.component';

describe('InventoryReversalListComponent', () => {
  let component: InventoryReversalListComponent;
  let fixture: ComponentFixture<InventoryReversalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryReversalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryReversalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
