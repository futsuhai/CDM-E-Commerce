import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  host: {
    class: 'catalog'
  },
})
export class CatalogComponent {

}
