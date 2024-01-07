import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CatalogMenuComponent } from './components/layout/catalog-menu/catalog-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, CatalogMenuComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'root'
  }
})
export class AppComponent {

  public isMenuHidden: boolean = true;

  public toggleMenu(): void {
    this.isMenuHidden = !this.isMenuHidden;
  }
}
