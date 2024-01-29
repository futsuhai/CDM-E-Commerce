import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchFilterComponent } from '../../layout/search-filter/search-filter.component';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductCardAdminComponent } from '../../layout/product-card-admin/product-card-admin.component';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import {MatTabsModule} from '@angular/material/tabs';
import { IOrder, IOrderDeliverTime, OrderDeliverTime, appDeliverTimes } from 'src/app/models/order.model';
import { OrderCardAdminComponent } from '../../layout/order-card-admin/order-card-admin.component';
import { OrderService } from 'src/app/services/order/order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchFilterComponent, ProductCardAdminComponent, MatTabsModule, OrderCardAdminComponent, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public products!: IProduct[];
  public orders!: IOrder[];
  public filteredOrders: IOrder[] = [];
  public deliverTimes: IOrderDeliverTime[] = appDeliverTimes;
  public selectedDeliverTime: OrderDeliverTime = OrderDeliverTime.morning;
  public deliverDate: string = new Date().toISOString().split('T')[0];

  constructor(private productService: ProductService, public dialogService: DialogService, private orderService: OrderService) {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.productService.productsSubject.next(products);
      }
    });
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      }
    });
  }

  public ngOnInit(): void {
    this.productService.productsSubject.subscribe({
      next: (products) => {
        this.products = products;
      }
    });
    this.updateOrders();
  }

  public onProductsChanged(filteredProducts: IProduct[]): void {
    this.products = filteredProducts;
    this.updateOrders();
  }

  public selectDeliverTime(value: OrderDeliverTime) {
    this.selectedDeliverTime = value;
    this.updateOrders();
  }

  public updateOrders() {
    const currentDate = new Date(this.deliverDate);
    const todayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const todayEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);
    this.filteredOrders = [...this.orders];
    this.filteredOrders = this.filteredOrders.filter(order => {
      const orderDate = new Date(order.orderInfo.orderDate);
      return orderDate >= todayStart && orderDate < todayEnd && order.orderInfo.orderTime === this.selectedDeliverTime;
    });
  }
  
}
