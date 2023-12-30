import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductDetailCardComponent } from '../../layout/product-detail-card/product-detail-card.component';
import { ProductDetailRewievsComponent } from '../../layout/product-detail-rewiews/product-detail-rewievs.component';
import { ListLayoutComponent } from '../../layout/list-layout/list-layout.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductDetailCardComponent, ProductDetailRewievsComponent, ListLayoutComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  host: {
    class: 'product-detail'
  }
})
export class ProductDetailComponent implements OnInit {

  public productByCategory$!: Observable<IProduct[] | null>;
  public product$!: Observable<IProduct | null>;
  public id: string = '';
  public productCategory: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll("id")),
      tap(data => this.id = this.id + data)
    )
    .subscribe(() => {
      this.product$ = this.productService.getProductById(this.id).pipe(
        catchError(() => {
          this.router.navigate(['/**']);
          return of(null);
        }),
        tap(product => {
          this.productCategory = product?.productCategory || '';
          this.productByCategory$ = this.productService.GetProductsByCategory(this.productCategory);
        })
      );
    });
  }
}
