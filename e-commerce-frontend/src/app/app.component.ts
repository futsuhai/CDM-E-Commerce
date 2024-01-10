import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CatalogMenuComponent } from './components/layout/catalog-menu/catalog-menu.component';
import { AuthService } from './services/auth/auth.service';
import { take } from 'rxjs';
import { AuthState } from './services/auth/auth-state.module';

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
export class AppComponent implements OnInit {

  public isMenuHidden: boolean = true;

  constructor(private authService: AuthService, private authState: AuthState) { }

  public ngOnInit(): void {
    const refreshToken = localStorage.getItem('refreshToken');
    if(refreshToken) {
      this.authService.refreshTokens(refreshToken).pipe(take(1)).subscribe(
        (account) => {
          this.authState.setCurrentUser(account);
        }
      );
    }
  }

  public toggleMenu(): void {
    this.isMenuHidden = !this.isMenuHidden;
  }
}
