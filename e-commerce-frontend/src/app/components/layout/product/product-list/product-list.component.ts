import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  host: {
    class: 'product-list'
  }
})
export class ProductListComponent {

  @Input() products!: IProduct[] | null;

}
