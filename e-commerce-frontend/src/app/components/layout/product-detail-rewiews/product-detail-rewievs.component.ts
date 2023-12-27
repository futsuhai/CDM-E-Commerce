import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail-rewievs',
  templateUrl: './product-detail-rewievs.component.html',
  styleUrls: ['./product-detail-rewievs.component.scss'],
  host: {
    class: 'product-detail-rewievs'
  }
})
export class ProductDetailRewievsComponent {

  @Input() product!: IProduct | null;

  public getCountByRating(rating: number): number {
    if (this.product) {
      return this.product?.rewievs.filter(review => review.rating === rating).length;
    } else {
      return 0;
    }
  }

  public hasReviews(): boolean {
    return !!this.product && !!this.product.rewievs && this.product.rewievs.length > 0;
  }
}
