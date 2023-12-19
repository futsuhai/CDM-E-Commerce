import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  host: {
    class: 'product-list'
  }
})
export class ProductListComponent {

  @Input() products!: IProduct[] | null;

}
