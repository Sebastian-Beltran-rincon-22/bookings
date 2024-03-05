import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormbookingComponent } from './formbooking.component';

describe('FormbookingComponent', () => {
  let component: FormbookingComponent;
  let fixture: ComponentFixture<FormbookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormbookingComponent]
    });
    fixture = TestBed.createComponent(FormbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
