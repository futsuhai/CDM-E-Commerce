import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsViewBasketComponent } from './products-view-basket.component';

describe('ProductsViewBasketComponent', () => {
  let component: ProductsViewBasketComponent;
  let fixture: ComponentFixture<ProductsViewBasketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductsViewBasketComponent]
    });
    fixture = TestBed.createComponent(ProductsViewBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
