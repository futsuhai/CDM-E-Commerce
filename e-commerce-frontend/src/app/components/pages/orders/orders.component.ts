import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IOrder } from 'src/app/models/order.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  public orders?: IOrder[];

  constructor(private authState: AuthState) {
    this.authState.currentAccount.subscribe({
      next: (account) => {
        if (account && account.accountDataModel?.liked) {
          this.orders = account.accountDataModel.orders;
          console.log(this.orders);
        }
      }
    });
  }
}
