import { Component } from '@angular/core';

@Component({
  selector: 'app-special',
  standalone: true,
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss'],
  host: {
    class: 'special'
  }
})
export class SpecialComponent {

}
