import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/models/account.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { HeaderDesktopComponent } from './header-desktop/header-desktop.component';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderDesktopComponent, HeaderNavbarComponent, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'header'
  },
})
export class HeaderComponent {

  @Output() public toggledMenu = new EventEmitter<void>();
  public currentAccount: Observable<IAccount | null>;
  
  constructor(private authState: AuthState,
    private router: Router) {
    this.currentAccount = this.authState.currentAccount;
   }

  public toggleMenu(): void {
    this.toggledMenu.emit();
  }

  public navigateToCatalog(searchValue: string) {
    this.router.navigate(['/search'], { queryParams: { search: searchValue } });
  }
}
