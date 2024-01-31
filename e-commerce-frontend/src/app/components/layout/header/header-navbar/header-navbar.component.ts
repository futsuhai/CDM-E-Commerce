import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/models/account.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss'],
  host: {
    class: 'header-navbar'
  }
})
export class HeaderNavbarComponent {

  public currentAccount: Observable<IAccount | null>;
  public currentRout: string = '';

  constructor(private router: Router, private authState: AuthState) {
    // Будь аккуратнее с кодом в конструкторе, лучше переноси в ngOnInit.
    // в констркуторе инпуты еще не инициализированы и это может привести к проблемам
    this.currentAccount = this.authState.currentAccount;
  }

  public isRouteActive(rout: string): boolean {
    this.currentRout = this.router.url;
    return this.currentRout === rout ? true : false;
  }
}
