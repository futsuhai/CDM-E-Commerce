import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListLikedComponent } from './product-list-liked.component';

describe('ProductListLikedComponent', () => {
  let component: ProductListLikedComponent;
  let fixture: ComponentFixture<ProductListLikedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductListLikedComponent]
    });
    fixture = TestBed.createComponent(ProductListLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
