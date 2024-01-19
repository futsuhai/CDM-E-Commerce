import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { ProductListComponent } from '../product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { ITag } from 'src/app/models/tag.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-layout',
  standalone: true,
  imports: [ProductListComponent, CommonModule, RouterLink],
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.scss'],
  host: {
    class: 'list-layout'
  }
})
export class ListLayoutComponent {

  @Input() tag!: ITag;
  @Input() products!: IProduct[] | null;

}
