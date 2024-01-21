import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/models/account.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';

@Component({
  selector: 'app-header-desktop',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
  host: {
    class: 'header-desktop'
  },
})
export class HeaderDesktopComponent {

  @Output() public toggledMenu = new EventEmitter<void>();
  
  public searchInput: FormControl = new FormControl('');
  public currentAccount: Observable<IAccount | null>;
  public currentAvatar: Observable<string | null>;
  private hoverTimer: any;

  constructor(private router: Router, private authState: AuthState) {
    this.currentAccount = this.authState.currentAccount;
    this.currentAvatar = this.authState.currentAvatar;
    console.log(this.currentAvatar);
  }

  public startHoverTimer(): void {
    this.hoverTimer = setTimeout(() => {
      this.toggledMenu.emit();
    }, 700);
  }

  public resetSearchInput(): void {
    this.searchInput.setValue('');
  }

  public clearHoverTimer(): void {
    clearTimeout(this.hoverTimer);
  }
}
