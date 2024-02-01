import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { IProduct, ProductTag } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductDetailCardComponent } from '../../layout/product/product-detail-card/product-detail-card.component';
import { ProductDetailRewievsComponent } from '../../layout/product/product-detail-rewiews/product-detail-rewievs.component';
import { ListLayoutComponent } from '../../layout/list-layout/list-layout.component';
import { ITag } from 'src/app/models/tag.model';

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
export class ProductDetailComponent implements OnInit, OnDestroy {

  public productByCategory$!: Observable<IProduct[] | null>;
  public product$!: Observable<IProduct | null>;
  public id: string = '';
  public productCategory: string = '';
  public same: ITag = {
    key: "Похожие товары",
    value: ProductTag.none
  }

  private routeSubscription: Subscription = new Subscription();
  private productSubscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => of(params.get("id"))),
      tap(data => this.id = data || '')
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

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }
}
