import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterComponent } from '../../layout/search-filter/search-filter.component';
import { IProduct } from 'src/app/models/product.model';
import { ProductCardComponent } from '../../layout/product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, SearchFilterComponent, ProductCardComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public products!: IProduct[];
  public searchTitle: string = "";
  public searchCategory: string = "";
  public searchTag: string = "";

  constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['search']){
        this.searchTitle = params['search'];
      }
      if(params['category']){
        this.searchCategory = params['category'];
      }
      if(params['tag']){
        this.searchTag = params['tag'];
      }
    });
  }

  public onProductsChanged(filteredProducts: IProduct[]): void {
    this.products = filteredProducts;
  }
}
