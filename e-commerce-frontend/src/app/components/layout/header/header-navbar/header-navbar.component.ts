import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss'],
  host: {
    class: 'header-navbar'
  }
})
export class HeaderNavbarComponent {

  public currentRout: string = '';

  constructor(private router: Router) { }

  isRouteActive(rout: string): boolean {
    this.currentRout = this.router.url;
    return this.currentRout === rout ? true : false;
  }
}
