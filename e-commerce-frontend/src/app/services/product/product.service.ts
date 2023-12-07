import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Observable, catchError } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  get api(): string {
    return `/api/products`;
  }

  constructor(private restService: RestService) { }

  public getProducts(): Observable<IProduct[]> {
    const endpoint: string = `${this.api}/GetProducts`;
    return this.restService.restGET<IProduct[]>(endpoint).pipe(
      catchError((error: unknown) => {
        console.log('An error occurred while fetching products:', error);
        return [];
      })
    );
  }
}
