import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { ProductListComponent } from '../product-list/product-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-layout',
  standalone: true,
  imports: [ProductListComponent, CommonModule],
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.scss'],
  host: {
    class: 'list-layout'
  }
})
export class ListLayoutComponent {

  @Input() category!: string;
  @Input() products!: IProduct[] | null;
}
