import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  host: {
    class: 'empty'
  }
})
export class EmptyComponent {

  @Input() title: string = 'Здесь пока пусто';

}
