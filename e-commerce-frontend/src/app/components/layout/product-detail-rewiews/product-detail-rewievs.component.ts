import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct, IRewiev } from 'src/app/models/product.model';
import { RatingComponent } from '../rating/rating.component';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { FormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-detail-rewievs',
  standalone: true,
  imports: [CommonModule, RatingComponent, FormsModule],
  templateUrl: './product-detail-rewievs.component.html',
  styleUrls: ['./product-detail-rewievs.component.scss'],
  host: {
    class: 'product-detail-rewievs'
  }
})
export class ProductDetailRewievsComponent {

  @Input() product!: IProduct | null;
  public accessed: boolean = false;
  public newReview!: IRewiev;

  constructor(private authState: AuthState, private productService: ProductService) {
    if (this.authState.currentAccount.value?.name) {
      this.newReview = {
        username: this.authState.currentAccount.value?.name,
        date: new Date(),
        rating: 0,
        description: ''
      };
    }
  }

  public getCountByRating(rating: number): number {
    if (this.product && this.product.rewievs) {
      return this.product?.rewievs.filter(review => review.rating === rating).length;
    } else {
      return 0;
    }
  }

  public hasReviews(): boolean {
    return !!this.product && !!this.product.rewievs && this.product.rewievs.length > 0;
  }

  public onRatingChange(newRating: number): void {
    this.newReview.rating = newRating;
  }

  public submitReview(): void {
    if (this.product?.id) {
      this.productService.addRewiev(this.product?.id, this.newReview).subscribe({
        next: (product) => {
          this.product = product;
        }
      })
    }
    this.newReview.description = '';
    this.onRatingChange(0);
  }
}
