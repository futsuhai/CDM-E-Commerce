import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { RatingComponent } from '../../rating/rating.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { IBasketProduct } from 'src/app/models/basketProduct.model';

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
  @Input() count!: number;
  public isLiked: boolean = false;
  public isOrder: boolean = false;

  constructor(private authState: AuthState, private route: ActivatedRoute) { 
    this.route.url.subscribe(urlSegments => {
      this.isOrder = urlSegments.some(segment => segment.path === 'orders');
    });
  }

  public ngOnInit(): void {
    this.authState.currentAccount.subscribe({
      next: (account) => {
        if (account && account.accountDataModel) {
          this.isLiked = account.accountDataModel?.liked.some((likedProduct) => likedProduct.id === this.product.id);
        }
      }
    });
  }

  public likeProduct(): void {
    this.isLiked = this.authState.likeProduct(this.isLiked, this.product)
  }

  public addToBasket(): void {
    const productBasket: IBasketProduct = {
      product: this.product,
      count: 1,
      finalPrice: this.product.commonPrice,
      isChecked: false
    }
    this.authState.addToBasket(productBasket);
  }
}

