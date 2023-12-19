import { Component, Input } from '@angular/core';
import { IAccount } from 'src/app/models/account.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';

@Component({
  selector: 'app-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
  host: {
    class: 'header-desktop'
  }, 
})
export class HeaderDesktopComponent {

  @Input() account: IAccount | null = null;

  constructor(private authState: AuthState) { }

  public logout(): void {
    this.authState.logout();
  }
}
