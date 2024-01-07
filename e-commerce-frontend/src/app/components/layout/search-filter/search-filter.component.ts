import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, MatSliderModule],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  host: {
    class: 'search-filter'
  }
})
export class SearchFilterComponent {
  public categories: string[] = [
    'Молоко, сыр, яйцо',
    'Хлеб',
    'Фрукты и овощи',
    'Замороженные продукты',
    'Напитки',
    'Кондитерские изделия',
    'Чай, кофе',
    'Бакалея',
    'Здоровое питание',
    'Зоотовары',
    'Детское питание',
    'Мясо, птица, колбаса',
    'Непродовольственные товары'
  ]
}
