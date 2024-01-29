import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { IOrder, OrderStatus } from 'src/app/models/order.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  get api(): string {
    return `/api/orders`;
  }

  constructor(private restService: RestService) { }

  public addOrder(order: IOrder): Observable<IOrder> {
    const endpoint: string = `${this.api}/AddOrder`;
    return this.restService.restPOST<IOrder>(endpoint, order).pipe(
      catchError((error: unknown) => {
        console.log(`An error occurred while creating order` , error);
        return throwError(error);
      })
    );
  }

  public getOrders(): Observable<IOrder[]> {
    const endpoint: string = `${this.api}/GetOrders`;
    return this.restService.restGET<IOrder[]>(endpoint).pipe(
      catchError((error: unknown) => {
        console.log(`An error occurred while fetching orders` , error);
        return throwError(error);
      })
    );
  }

  public GetOrdersWithId(accountId: string): Observable<IOrder[]> {
    const endpoint: string = `${this.api}/GetOrdersWithId/${accountId}`;
    return this.restService.restGET<IOrder[]>(endpoint).pipe(
      catchError((error: unknown) => {
        console.log(`An error occurred while fetching orders` , error);
        return throwError(error);
      })
    );
  }

  public editStatus(order: IOrder): Observable<IOrder> {
    const endpoint: string = `${this.api}/EditStatus`;
    return this.restService.restPUT<IOrder>(endpoint, order).pipe(
      catchError((error: unknown) => {
        console.log(`An error occurred while updating order` , error);
        return throwError(error);
      })
    );
  }
}
