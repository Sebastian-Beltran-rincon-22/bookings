import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesNotFoundComponent } from './pages-not-found.component';

describe('PagesNotFoundComponent', () => {
  let component: PagesNotFoundComponent;
  let fixture: ComponentFixture<PagesNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesNotFoundComponent]
    });
    fixture = TestBed.createComponent(PagesNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
