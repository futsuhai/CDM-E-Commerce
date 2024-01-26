import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { RatingComponent } from '../rating/rating.component';
import { PluralizePipe } from 'src/app/pipes/pluralize/pluralize.pipe';
import { IBasketProduct } from 'src/app/models/basketProduct.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';

@Component({
  selector: 'app-product-detail-card',
  standalone: true,
  imports: [CommonModule, RatingComponent, PluralizePipe],
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.scss'],
  host: {
    class: 'product-detail-card'
  }
})
export class ProductDetailCardComponent implements OnDestroy, OnChanges, OnInit {

  @Input() product$!: Observable<IProduct | null>;
  product!: IProduct | null;
  public isLiked!: boolean;
  public bonus: number = 0;
  public activeImage: string | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private authState: AuthState) { }

  public ngOnChanges(): void {
    this.product$.subscribe(data => {
      if (data) {
        this.product = data;
        this.activeImage = data?.productMain64Image;
        this.bonus = (data?.commonPrice / 10)
      }
    });
  }

  public ngOnInit(): void {
    this.authState.currentAccount.subscribe({
      next: (account) => {
        if (account && account.accountDataModel) {
          this.isLiked = account.accountDataModel?.liked.some((likedProduct) => likedProduct.id === this.product?.id);
        }
      }
    });
  }

  public likeProduct(): void {
    if (this.product) {
      this.isLiked = this.authState.likeProduct(this.isLiked, this.product);
    }
  }

  public addToBasket(): void {
    if (this.product) {
      const productBasket: IBasketProduct = {
        product: this.product,
        count: 1,
        finalPrice: this.product.commonPrice,
        isChecked: false
      }
      this.authState.addToBasket(productBasket);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
