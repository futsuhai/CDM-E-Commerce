import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  host: {
    class: 'catalog'
  },
})
export class CatalogComponent {
}
