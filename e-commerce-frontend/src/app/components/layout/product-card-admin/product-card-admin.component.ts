import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from 'src/app/models/product.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { AccountService } from 'src/app/services/account/account.service';
import { IAccount } from 'src/app/models/account.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-card-admin.component.html',
  styleUrls: ['./product-card-admin.component.scss'],
  host: {
    class: 'product-card-admin'
  }
})
export class ProductCardAdminComponent implements OnInit {

  @Input() product!: IProduct;
  @Input() count: number = 0;
  @Input() finalPrice: number = 0;
  @Input() isChecked: boolean = false;
  public cardType: boolean = false;
  public currentAccount?: IAccount;

  constructor(
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private authState: AuthState,
    private accountService: AccountService) {
    this.route.url.subscribe(urlSegments => {
      this.cardType = urlSegments.some(segment => segment.path === 'basket');
    });
    this.authState.currentAccount.subscribe({
      next: (account) => {
        if (account) {
          this.currentAccount = account;
        }
      }
    });
  }

  public ngOnInit(): void {
    this.calculateFinalPrice();
  }

  public incrementCount(): void {
    this.count++;
    this.calculateFinalPrice();
    if (this.currentAccount && this.currentAccount.accountDataModel) {
      const productBasket = this.currentAccount.accountDataModel.basket.find(item => item.product.id === this.product.id);
      if (productBasket) {
        productBasket.count = this.count;
        this.accountService.update(this.currentAccount).subscribe({
          next: (account) => {
            this.authState.setCurrentUser(account);
          }
        });
      }
    }
  }

  public decrementCount(): void {
    if (this.count > 1) {
      this.count--;
      this.calculateFinalPrice();
      if (this.currentAccount && this.currentAccount.accountDataModel) {
        const productBasket = this.currentAccount.accountDataModel.basket.find(item => item.product.id === this.product.id);
        if (productBasket) {
          productBasket.count = this.count;
          this.accountService.update(this.currentAccount).subscribe({
            next: (account) => {
              this.authState.setCurrentUser(account);
            }
          });
        }
      }
    }
  }

  public calculateFinalPrice(): void {
    this.finalPrice = this.count ? this.count * this.product.commonPrice : 0;
  }

  public toggleCheckbox(): void {
    if (this.currentAccount && this.currentAccount.accountDataModel) {
      const productBasket = this.currentAccount.accountDataModel.basket.find(item => item.product.id === this.product.id);
      if(productBasket) {
        productBasket.isChecked = !productBasket.isChecked;
        this.accountService.update(this.currentAccount).subscribe({
          next: (account) => {
            this.authState.setCurrentUser(account);
          }
        });
      }
    }
  }
}
