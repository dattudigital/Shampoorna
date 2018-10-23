import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentRaisingComponent } from './indent-raising.component';

describe('IndentRaisingComponent', () => {
  let component: IndentRaisingComponent;
  let fixture: ComponentFixture<IndentRaisingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentRaisingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentRaisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
