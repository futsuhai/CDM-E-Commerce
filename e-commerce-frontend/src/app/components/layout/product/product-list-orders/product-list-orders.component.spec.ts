import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListOrdersComponent } from './product-list-orders.component';

describe('ProductListOrdersComponent', () => {
  let component: ProductListOrdersComponent;
  let fixture: ComponentFixture<ProductListOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductListOrdersComponent]
    });
    fixture = TestBed.createComponent(ProductListOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
