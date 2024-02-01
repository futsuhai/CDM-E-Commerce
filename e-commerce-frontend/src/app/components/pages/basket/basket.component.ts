import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { IBasketProduct } from 'src/app/models/basketProduct.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { PluralizePipe } from 'src/app/pipes/pluralize/pluralize.pipe';
import { IAccount } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { IOrder, OrderStatus } from 'src/app/models/order.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { OrderService } from 'src/app/services/order/order.service';
import { EMPTY, switchMap } from 'rxjs';
import { ProductsViewBasketComponent } from '../../layout/product/products-view-basket/products-view-basket.component';
import { DeliverBasketComponent } from '../../layout/deliver-basket/deliver-basket.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, PluralizePipe, ProductsViewBasketComponent, DeliverBasketComponent],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  @ViewChild(ProductsViewBasketComponent) productsViewBasket!: ProductsViewBasketComponent;
  @ViewChild(DeliverBasketComponent) deliverBasketComponent!: DeliverBasketComponent;

  @Output() recalculateParams: EventEmitter<void> = new EventEmitter<void>();

  public products!: IBasketProduct[];
  public sumPrice: number = 0;
  public finalPrice: number = 0;
  public productsCount: number = 0;
  public bonus: number = 0;
  public discount: number = 0;
  public deliver: boolean = false;
  public currentAccount?: IAccount;

  constructor(private authState: AuthState, private accountService: AccountService, private alertService: AlertService, private orderService: OrderService) {
    this.authState.currentAccount.subscribe({
      next: (account) => {
        if (account && account.accountDataModel?.liked) {
          this.currentAccount = account;
          this.products = account.accountDataModel?.basket;
          this.calculateParams();
        }
      }
    });
  }

  public calculateParams(): void {
    const checkedProducts = this.products.filter(product => product.isChecked);
    this.sumPrice = checkedProducts.reduce((total, product) => total + (product.finalPrice * product.count), 0);
    this.finalPrice = checkedProducts.reduce((total, product) => total + ((product.finalPrice * product.count) - (product.product.commonPrice * (product.product.discount / 100))), 0);
    this.discount = this.finalPrice - this.sumPrice;
    this.bonus = this.finalPrice * 0.1;
    this.productsCount = checkedProducts.length;
  }

  public switchContent(): void {
    if (this.currentAccount && this.currentAccount.accountDataModel) {
      if (this.currentAccount.accountDataModel.basket.filter(product => product.isChecked).length > 0) {
        this.deliver = !this.deliver;
        return;
      }
      this.alertService.openSnackBar("Ошибка! Товары не выбраны!", 5000, "invalid");
    }
  }

  public createOrder(): void {
    this.deliverBasketComponent.deliverForm.markAllAsTouched();
    if (this.deliverBasketComponent.deliverForm.valid) {
      if (this.currentAccount && this.currentAccount.accountDataModel) {
        const orderProducts = this.currentAccount.accountDataModel.basket.filter(product => product.isChecked);
        const orderPrice = orderProducts.reduce((total, product) => {
          return total + product.finalPrice;
        }, 0);
        if (orderProducts.length > 0) {
          const formValue = this.deliverBasketComponent.deliverForm.value
          const newOrder: IOrder = {
            orderProducts: orderProducts,
            orderPrice: orderPrice,
            orderStatus: OrderStatus.progress,
            orderInfo: {
              orderCity: formValue.deliverCity,
              orderStreet: formValue.deliverStreet,
              orderHouse: formValue.deliverHouse,
              orderFlat: formValue.deliverFlat,
              orderDate: formValue.deliverDate,
              orderPhone: formValue.deliverPhone,
              orderTime: formValue.deliverTime,
            }
          };
          this.orderService.addOrder(newOrder).pipe(
            switchMap((order) => {
              if (order.id && this.currentAccount) {
                this.currentAccount?.accountDataModel?.orders.push(order.id);
                return this.accountService.update(this.currentAccount);
              } else {
                return EMPTY;
              }
            })
          ).subscribe({
            next: (account) => {
              this.authState.setCurrentUser(account);
            },
          });
          this.deleteFromBasket();
          this.deliver = !this.deliver;
          this.alertService.openSnackBar("Заказ успешно оформлен", 5000, "valid");
          return;
        }
        this.alertService.openSnackBar("Ошибка! Товары не выбраны!", 5000, "invalid");
        return;
      }
    } else {
      console.log("Not valid")
    }
  }

  public deleteFromBasket(): void {
    if (this.currentAccount && this.currentAccount.accountDataModel) {
      const updatedBasket = this.currentAccount.accountDataModel.basket.filter(product => !product.isChecked);
      this.currentAccount.accountDataModel.basket = updatedBasket;
      this.accountService.update(this.currentAccount).subscribe({
        next: (account) => {
          this.authState.setCurrentUser(account);
          this.calculateParams()
        }
      });
    }
  }
}