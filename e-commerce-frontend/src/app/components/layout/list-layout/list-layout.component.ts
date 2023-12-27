import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-list-layout',
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
