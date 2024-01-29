import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCardAdminComponent } from './order-card-admin.component';

describe('OrderCardAdminComponent', () => {
  let component: OrderCardAdminComponent;
  let fixture: ComponentFixture<OrderCardAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OrderCardAdminComponent]
    });
    fixture = TestBed.createComponent(OrderCardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
