import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { IOrder, IOrderStatus, OrderStatus, appOrderStatuses } from 'src/app/models/order.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { ProductListOrdersComponent } from '../../layout/product-list-orders/product-list-orders.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ProductListOrdersComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnDestroy {

  public orders?: IOrder[];
  public orderStatuses: IOrderStatus[] = appOrderStatuses;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private authState: AuthState) {
    this.authState.currentAccount.pipe(takeUntil(this.destroy$)).subscribe({
      next: (account) => {
        if (account && account.accountDataModel?.liked) {
          this.orders = account.accountDataModel.orders.slice().reverse();
        }
      }
    });
  }

  public getOrderStatusText(status: string): string {
    const orderStatus = this.orderStatuses.find(s => s.value === status);
    return orderStatus ? orderStatus.key : '';
  }

  public getStatusClass(status: string): string {
    switch (status) {
      case OrderStatus.progress:
        return 'order-info__status_progress';
      case OrderStatus.complete:
        return 'order-info__status_complete';
      case OrderStatus.canceled:
        return 'order-info__status_canceled';
      default:
        return '';
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
