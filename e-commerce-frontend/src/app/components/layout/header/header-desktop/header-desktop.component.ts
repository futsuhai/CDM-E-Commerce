import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IAccount } from 'src/app/models/account.model';

@Component({
  selector: 'app-header-desktop',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
  host: {
    class: 'header-desktop'
  },
})
export class HeaderDesktopComponent {

  @Input() account: IAccount | null = null;
  @Output() public toggledMenu = new EventEmitter<void>();
  public searchValue: string = '';
  private hoverTimer: any;

  constructor(private router: Router) { }

  public startHoverTimer(): void {
    this.hoverTimer = setTimeout(() => {
      this.toggledMenu.emit();
    }, 700);
  }

  public clearHoverTimer(): void {
    clearTimeout(this.hoverTimer);
  }

  public navigateToCatalog() {
    this.router.navigate(['/search'], { queryParams: { search: this.searchValue } });
    this.searchValue = '';
  }
}
