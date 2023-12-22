import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product$!: Observable<IProduct>;
  private subscription: Subscription;
  id: string | undefined;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    ) {
      this.subscription = route.params.subscribe(params => this.id = params["id"]);
      console.log(this.id);
     }

  public ngOnInit(): void {
    const productId: string = this.route.snapshot.params['id'];
    console.log(productId);
    console.log(this.route.fragment);
    this.product$ = this.productService.getProductById(productId);
    // this.productService.getProductById(productId).subscribe(data => console.log(data))
  }
}
