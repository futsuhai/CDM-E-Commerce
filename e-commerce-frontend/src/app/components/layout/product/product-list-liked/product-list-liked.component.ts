import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from 'src/app/models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list-liked',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list-liked.component.html',
  styleUrls: ['./product-list-liked.component.scss'],
  host: {
    class: 'product-list-liked'
  }
})
export class ProductListLikedComponent {

  @Input() products!: IProduct[];
}
