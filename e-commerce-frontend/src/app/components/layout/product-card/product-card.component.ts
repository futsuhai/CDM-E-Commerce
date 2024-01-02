import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { RatingComponent } from '../rating/rating.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { RublesPipe } from 'src/app/pipes/rubles/rubles.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RatingComponent, RublesPipe, CommonModule, RouterModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  host: {
    class: 'product-card'
  }
})
export class ProductCardComponent {

  public isLikedHover: boolean = false;
  @Input() product!: IProduct;

  public handleMouse(): void {
    this.isLikedHover = !this.isLikedHover;
  }
}
