import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  host: {
    class: 'banner'
  }
})
export class BannerComponent {

}
