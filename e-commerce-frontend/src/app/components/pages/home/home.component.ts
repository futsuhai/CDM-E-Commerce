import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { IProduct, ProductTag } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    class: 'home'
  }
})
export class HomeComponent implements OnInit, OnDestroy  {

  private destroy$: Subject<void> = new Subject<void>();
  public productsByTag: { [key in ProductTag]: IProduct[] } = {
    [ProductTag.none]: [],
    [ProductTag.news]: [],
    [ProductTag.sales]: []
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().pipe(
      map(products => {
        return products.reduce((acc, product) => {
          acc[product.productTag].push(product);
          return acc;
        }, this.productsByTag);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
