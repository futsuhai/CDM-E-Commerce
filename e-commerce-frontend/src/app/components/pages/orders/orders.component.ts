import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { IOrder, IOrderDeliverTime, IOrderStatus, OrderDeliverTime, OrderStatus, appDeliverTimes, appOrderStatuses } from 'src/app/models/order.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { ProductListOrdersComponent } from '../../layout/product-list-orders/product-list-orders.component';
import { OrderService } from 'src/app/services/order/order.service';
import { EmptyComponent } from '../../layout/empty/empty.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ProductListOrdersComponent, EmptyComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnDestroy {

  public orders?: IOrder[];
  public orderStatuses: IOrderStatus[] = appOrderStatuses;
  public deliverTimes: IOrderDeliverTime[] = appDeliverTimes;

  constructor(private authState: AuthState, private orderService: OrderService) {
    if(this.authState.currentAccount.value?.id) {
      this.orderService.GetOrdersWithId(this.authState.currentAccount.value?.id).subscribe({
        next: (orders) => {
          this.orders = orders.slice().reverse();
        }
      })
    }
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

  public getDeliverTimeText(orderTime: OrderDeliverTime): string {
    const deliverTime = this.deliverTimes.find(time => time.value === orderTime);
    return deliverTime ? deliverTime.key : '';
  }

  public ngOnDestroy(): void {
    console.log()
  }
}
