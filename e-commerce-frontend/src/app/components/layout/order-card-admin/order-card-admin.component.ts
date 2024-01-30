import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IOrder, IOrderStatus, OrderStatus, appOrderStatuses } from 'src/app/models/order.model';
import { FormsModule } from '@angular/forms';
import { OrderService } from 'src/app/services/order/order.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-order-card-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-card-admin.component.html',
  styleUrls: ['./order-card-admin.component.scss'],
  host: {
    class: 'order-card-admin'
  }
})
export class OrderCardAdminComponent {

  @Input() order!: IOrder;
  public orderStatuses: IOrderStatus[] = appOrderStatuses;

  constructor(private orderService: OrderService, private alertService: AlertService) { }

  public getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.progress:
        return 'side__select-status_progress';
      case OrderStatus.complete:
        return 'side__select-status_complete';
      case OrderStatus.canceled:
        return 'side__select-status_canceled';
      default:
        return '';
    }
  }

  public onStatusChanged(order: IOrder): void {
    this.orderService.editStatus(order).subscribe({
      next: (updatedOrder) => {
        order = updatedOrder;
        this.alertService.openSnackBar("Статус заказа успешно изменен", 5000, "valid");
      }
    });
  }
}
