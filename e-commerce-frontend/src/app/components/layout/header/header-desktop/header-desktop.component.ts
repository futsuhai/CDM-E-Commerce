import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IAccount } from 'src/app/models/account.model';

@Component({
  selector: 'app-header-desktop',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
  host: {
    class: 'header-desktop'
  }, 
})
export class HeaderDesktopComponent {

  @Input() account: IAccount | null = null;
  @Output() public toggledMenu = new EventEmitter<void>();
  private hoverTimer: any;

  public startHoverTimer(): void {
    this.hoverTimer = setTimeout(() => {
      this.toggledMenu.emit();
    }, 700);
  }

  public clearHoverTimer(): void {
    clearTimeout(this.hoverTimer);
  }
}
