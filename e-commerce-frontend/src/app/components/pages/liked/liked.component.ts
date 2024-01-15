import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductCardComponent } from '../../layout/product-card/product-card.component';

@Component({
  selector: 'app-liked',
  standalone: true,
  imports: [CommonModule, MatGridListModule, ProductCardComponent],
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss']
})
export class LikedComponent implements OnInit {
  
  public products!: IProduct[];

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    })
  }
}
