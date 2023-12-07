import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  host: {
    class: 'product-card'
  }
})
export class ProductCardComponent {

  @Input() product!: IProduct;
}