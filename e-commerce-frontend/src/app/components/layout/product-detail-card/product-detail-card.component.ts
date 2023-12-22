import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail-card',
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.scss'],
  host: {
    class: 'product-detail-card'
  }
})
export class ProductDetailCardComponent  {

  @Input() product!: IProduct | null;

}
