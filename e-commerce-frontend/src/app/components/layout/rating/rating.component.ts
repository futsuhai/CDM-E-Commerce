import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  host: {
    class: 'rating'
  }
})
export class RatingComponent {

  private _rating: number = 0;
  public stars: boolean[] = [];
  private maxStars: number = 5;
  
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() readonly: boolean = true;
  @Input() get rating(): number {
    return this._rating;
  }

  set rating(value: number | undefined) {
    this._rating = value || 0;
    this.stars = Array(this.maxStars).fill(true, 0, this.rating)
  }

  public setRating(newRating: number): void {
    if (!this.readonly) {
      this.rating = newRating;
      this.ratingChange.emit(this.rating);
    }
  }

  public onStarClick(index: number): void {
    if (!this.readonly) {
      this.setRating(index + 1);
    }
  }
}
