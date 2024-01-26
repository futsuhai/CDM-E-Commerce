import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-product-detail-rewievs',
  standalone: true,
  imports: [CommonModule, RatingComponent],
  templateUrl: './product-detail-rewievs.component.html',
  styleUrls: ['./product-detail-rewievs.component.scss'],
  host: {
    class: 'product-detail-rewievs'
  }
})
export class ProductDetailRewievsComponent {

  @Input() product!: IProduct | null;

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
}
