import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverBasketComponent } from './deliver-basket.component';

describe('DeliverBasketComponent', () => {
  let component: DeliverBasketComponent;
  let fixture: ComponentFixture<DeliverBasketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeliverBasketComponent]
    });
    fixture = TestBed.createComponent(DeliverBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
