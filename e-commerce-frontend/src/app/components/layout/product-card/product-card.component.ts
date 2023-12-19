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

  public isLikedHover: boolean = false;
  @Input() product!: IProduct;

  public handleMouse(): void {
    this.isLikedHover = !this.isLikedHover;
  }
}
