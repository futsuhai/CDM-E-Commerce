import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardAdminComponent } from '../../layout/product-card-admin/product-card-admin.component';
import { IBasketProduct } from 'src/app/models/basketProduct.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { PluralizePipe } from 'src/app/pipes/pluralize/pluralize.pipe';
import { IAccount } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { IOrder, OrderStatus } from 'src/app/models/order.model';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, ProductCardAdminComponent, PluralizePipe],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  public products!: IBasketProduct[];
  public sumPrice: number = 0;
  public finalPrice: number = 0;
  public productsCount: number = 0;
  public bonus: number = 0;
  public discount: number = 0;
  public currentAccount?: IAccount;

  constructor(private authState: AuthState, private accountService: AccountService, private alertService: AlertService) {
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


  public handleAllCheckboxChange(): void {
    if (this.currentAccount && this.currentAccount.accountDataModel) {
      this.currentAccount.accountDataModel.basket.forEach(product => {
        product.isChecked = true;
        if (this.currentAccount) {
          this.accountService.update(this.currentAccount).subscribe({
            next: (account) => {
              this.authState.setCurrentUser(account);
            }
          });
        }
      });
    }
  }

  public deleteFromBasket(): void {
    if (this.currentAccount && this.currentAccount.accountDataModel) {
      const updatedBasket = this.currentAccount.accountDataModel.basket.filter(product => !product.isChecked);
      this.currentAccount.accountDataModel.basket = updatedBasket;
      this.accountService.update(this.currentAccount).subscribe({
        next: (account) => {
          this.authState.setCurrentUser(account);
          this.calculateParams();
        }
      });
    }
  }

  public createOrder(): void {
    if(this.checkRequiredData()){
      if (this.currentAccount && this.currentAccount.accountDataModel) {
        const orderProducts = this.currentAccount.accountDataModel.basket.filter(product => product.isChecked);
        const orderPrice = orderProducts.reduce((total, product) => {
          return total + product.finalPrice;
        }, 0);
        if (orderProducts.length > 0) {
          const newOrder: IOrder = {
            orderProducts: orderProducts,
            orderPrice: orderPrice,
            orderStatus: OrderStatus.progress,
            orderDate: new Date()
          };
          this.currentAccount.accountDataModel.orders.push(newOrder)
          this.accountService.update(this.currentAccount).subscribe({
            next: (account) => {
              this.authState.setCurrentUser(account);
            }
          });
          this.deleteFromBasket();
          this.alertService.openSnackBar("Заказ успешно оформлен", 5000, "valid");
          return;
        }
        this.alertService.openSnackBar("Ошибка! Товары не выбраны!", 5000, "invalid");
        return;
      }
    }
    this.alertService.openSnackBar("Ошибка! Чтобы сделать заказ заполните адрес доставки и номер телефона в профиле!", 10000, "invalid");
  }

  public checkRequiredData(): boolean {
    if (
      this.authState.currentAccount.value?.phone !== '' &&
      this.authState.currentAccount.value?.adress?.city !== '' &&
      this.authState.currentAccount.value?.adress?.street !== '' &&
      this.authState.currentAccount.value?.adress?.house !== '') {
      return true
    }
    return false;
  }
}