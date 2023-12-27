import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailRewiewsComponent } from './product-detail-rewievs.component';

describe('ProductDetailRewiewsComponent', () => {
  let component: ProductDetailRewiewsComponent;
  let fixture: ComponentFixture<ProductDetailRewiewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailRewiewsComponent]
    });
    fixture = TestBed.createComponent(ProductDetailRewiewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
