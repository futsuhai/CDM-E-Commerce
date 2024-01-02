import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { RatingComponent } from '../rating/rating.component';
import { PluralizePipe } from 'src/app/pipes/pluralize/pluralize.pipe';
import { RublesPipe } from 'src/app/pipes/rubles/rubles.pipe';

@Component({
  selector: 'app-product-detail-card',
  standalone: true,
  imports: [CommonModule, RatingComponent, PluralizePipe, RublesPipe],
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.scss'],
  host: {
    class: 'product-detail-card'
  }
})
export class ProductDetailCardComponent implements OnDestroy, OnChanges {

  @Input() product$!: Observable<IProduct | null>;
  product!: IProduct | null;
  public bonus: number = 0;
  public activeImage: string | undefined;
  private destroy$: Subject<void> = new Subject<void>();
  
  public ngOnChanges(): void {
    this.product$.subscribe(data => {
      if (data) {
        this.product = data;
        this.activeImage = data?.productMain64Image;
        this.bonus = (data?.commonPrice / 10)
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setActiveImage(image: string) {
    this.activeImage = image;
  }
}
