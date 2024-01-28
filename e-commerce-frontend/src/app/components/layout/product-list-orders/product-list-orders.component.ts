import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { IBasketProduct } from 'src/app/models/basketProduct.model';

@Component({
  selector: 'app-product-list-orders',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list-orders.component.html',
  styleUrls: ['./product-list-orders.component.scss']
})
export class ProductListOrdersComponent {

  @Input() products!: IBasketProduct[];
  
}
