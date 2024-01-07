import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss'],
  host: {
    class: 'catalog-menu'
  }
})
export class CatalogMenuComponent {

}
