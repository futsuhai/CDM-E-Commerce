import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterComponent } from '../../layout/search-filter/search-filter.component';
import { ProductListComponent } from '../../layout/product-list/product-list.component';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, SearchFilterComponent, ProductListComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public products!: IProduct[];

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    })
  }
}
