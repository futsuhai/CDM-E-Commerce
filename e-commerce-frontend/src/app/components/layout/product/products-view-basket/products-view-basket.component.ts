import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBasketProduct } from 'src/app/models/basketProduct.model';
import { ProductCardAdminComponent } from '../product-card-admin/product-card-admin.component';
import { IAccount } from 'src/app/models/account.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { AccountService } from 'src/app/services/account/account.service';
import { EmptyComponent } from '../../empty/empty.component';

@Component({
  selector: 'app-products-view-basket',
  standalone: true,
  imports: [CommonModule, ProductCardAdminComponent, EmptyComponent],
  templateUrl: './products-view-basket.component.html',
  styleUrls: ['./products-view-basket.component.scss'],
  host: {
    class: 'products-view-basket'
  }
})
export class ProductsViewBasketComponent {

  @Output() deleteSelectedProducts: EventEmitter<void> = new EventEmitter<void>();
  @Input() products!: IBasketProduct[];
  @Input() currentAccount?: IAccount;

  constructor(private authState: AuthState, private accountService: AccountService) { }

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
    this.deleteSelectedProducts.emit();
  }
}
