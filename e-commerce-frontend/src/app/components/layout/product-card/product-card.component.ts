import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { RatingComponent } from '../rating/rating.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { IAccount } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { IBasketProduct } from 'src/app/models/basketProduct.model';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RatingComponent, CommonModule, RouterModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  host: {
    class: 'product-card'
  }
})
export class ProductCardComponent implements OnInit {

  @Input() product!: IProduct;
  public isLiked!: boolean;
  public currentAccount?: IAccount;

  constructor(private authState: AuthState, private accountService: AccountService, private alertService: AlertService) {
    this.authState.currentAccount.subscribe({
      next: (account) => {
        if (account) {
          this.currentAccount = account;
        }
      }
    });
  }

  public ngOnInit(): void {
    if (this.currentAccount && this.currentAccount.accountDataModel) {
      this.isLiked = this.currentAccount.accountDataModel.liked.some((likedProduct) => likedProduct.id === this.product.id);
    }
  }

  public likeProduct(): void {
    if (this.currentAccount && this.currentAccount.accountDataModel) {
      if (!this.isLiked) {
        this.currentAccount?.accountDataModel?.liked.push(this.product);
      } else {
        this.currentAccount.accountDataModel.liked = this.currentAccount.accountDataModel.liked.filter(
          (likedProduct) => likedProduct.id !== this.product.id);
      }
      this.accountService.update(this.currentAccount).subscribe({
        next: (account) => {
          this.authState.setCurrentUser(account);
          this.isLiked = !this.isLiked;
        }
      });
    }
  }

  public addToBasket(): void {
    if (this.currentAccount && this.currentAccount.accountDataModel) {
      const productBasket: IBasketProduct = {
        product: this.product,
        count: 1,
        finalPrice: this.product.commonPrice,
        isChecked: false
      }
      this.currentAccount?.accountDataModel?.basket.push(productBasket);
      this.accountService.update(this.currentAccount).subscribe({
        next: (account) => {
          this.authState.setCurrentUser(account);
          this.alertService.openSnackBar("Товар добавлен в корзину", 2000, "valid");
        }
      });
    }
  }
}

