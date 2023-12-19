import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/models/account.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'header'
  },
})
export class HeaderComponent {

  public currentAccount$: Observable<IAccount | null>;
  
  constructor(private authState: AuthState) {
    this.currentAccount$ = this.authState.currentAccount;
   }
}
