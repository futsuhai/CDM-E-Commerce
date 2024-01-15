import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICategory, appCategories } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  host: {
    class: 'catalog'
  },
})
export class CategoriesComponent {

  public categories: ICategory[] = appCategories;

}
