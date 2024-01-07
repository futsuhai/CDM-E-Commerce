import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { take } from 'rxjs';
import { IAccount } from 'src/app/models/account.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { BannerComponent } from '../../layout/banner/banner.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
    class: 'profile'
  }
})
export class ProfileComponent {

  public currentAccountMock!: IAccount;

  constructor(private authState: AuthState) { 
    this.authState.currentAccountMock.pipe(take(1)).subscribe(data => {
      this.currentAccountMock = data;
      console.log(this.currentAccountMock);
    });
  }
}
