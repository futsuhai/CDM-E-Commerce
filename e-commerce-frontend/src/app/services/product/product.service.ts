import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { IFilterProperties } from 'src/app/models/filterProperties.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  get api(): string {
    return `/api/products`;
  }

  public productsSubject = new BehaviorSubject<IProduct[]>([]);

  constructor(private restService: RestService) { }

  public getProducts(): Observable<IProduct[]> {
    const endpoint: string = `${this.api}/GetProducts`;
    return this.restService.restGET<IProduct[]>(endpoint).pipe(
      catchError((error: unknown) => {
        console.log('An error occurred while fetching products:', error);
        return [];
      }),
      tap((products: IProduct[]) => {
        this.productsSubject.next(products);
      })
    );
  }

  public GetProductsByCategory(productCategory: string): Observable<IProduct[]> {
    const endpoint: string = `${this.api}/GetProductsByCategory/${productCategory}`;
    return this.restService.restGET<IProduct[]>(endpoint).pipe(
      catchError((error: unknown) => {
        console.log('An error occurred while fetching products:', error);
        return [];
      })
    );
  }

  public getProductById(productId: string): Observable<IProduct> {
    const endpoint: string = `${this.api}/GetProduct/${productId}`;
    return this.restService.restGET<IProduct>(endpoint).pipe(
      catchError((error: unknown) => {
        console.log("An error occurred while fetching product with ID ${productId}:", error)
        return throwError(error);
      })
    )
  }

  public search(filterProps: IFilterProperties): Observable<IProduct[]> {
    const endpoint: string = `${this.api}/Search`;
    return this.restService.restPUT<IProduct[]>(endpoint, filterProps).pipe(
      catchError((error: unknown) => {
        console.log('An error occurred while fetching products:', error);
        return [];
      })
    )
  }

  public deleteProduct(productId: string): Observable<void> {
    const endpoint: string = `${this.api}/DeleteProduct/${productId}`;
    return this.restService.restDELETE<void>(endpoint).pipe(
      catchError((error: unknown) => {
        console.log(`An error occurred while deleting product with ID ${productId}:`, error);
        return throwError(error);
      })
    );
  }

  public addProduct(product: IProduct): Observable<void> {
    const endpoint: string = `${this.api}/AddProduct`;
    return this.restService.restPOST<void>(endpoint, product).pipe(
      catchError((error: unknown) => {
        console.log(`An error occurred while creating product` , error);
        return throwError(error);
      })
    );
  }

  public editProduct(product: IProduct): Observable<void> {
    const endpoint: string = `${this.api}/EditProduct`;
    return this.restService.restPUT<void>(endpoint, product).pipe(
      catchError((error: unknown) => {
        console.log(`An error occurred while editing product` , error);
        return throwError(error);
      })
    );
  }

  public filterSearchProducts(value: string, products: IProduct[]): IProduct[] {
    const filterValue = value.toLowerCase();
    return products.filter(product => product.title.toLowerCase().includes(filterValue));
  }
}
