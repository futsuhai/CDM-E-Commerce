import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchFilterComponent } from '../../layout/search-filter/search-filter.component';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductCardAdminComponent } from '../../layout/product-card-admin/product-card-admin.component';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchFilterComponent, ProductCardAdminComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public products!: IProduct[];

  constructor(private productService: ProductService, public dialogService: DialogService) {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.productService.productsSubject.next(products);
      }
    })
  }

  public ngOnInit(): void {
    this.productService.productsSubject.subscribe({
      next: (products) => {
        this.products = products;
      }
    })
  }

  public onProductsChanged(filteredProducts: IProduct[]): void {
    this.products = filteredProducts;
  }
}
