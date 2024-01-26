import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { IAccount } from 'src/app/models/account.model';
import { IProduct } from 'src/app/models/product.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { ProductService } from 'src/app/services/product/product.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-header-desktop',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
  host: {
    class: 'header-desktop'
  },
})
export class HeaderDesktopComponent implements OnInit {

  @Output() public toggledMenu = new EventEmitter<void>();

  public searchInput: FormControl = new FormControl('');
  public currentAccount: Observable<IAccount | null>;
  public currentAvatar: Observable<string | null>;
  private hoverTimer: any;
  public filteredProducts!: Observable<IProduct[]>;

  constructor(private router: Router, private authState: AuthState, private productService: ProductService) {
    this.currentAccount = this.authState.currentAccount;
    this.currentAvatar = this.authState.currentAvatar;
  }

  public ngOnInit(): void {
    this.productService.productsSubject.subscribe({
      next: (products) => {
        this.filteredProducts = this.searchInput.valueChanges.pipe(
          startWith(''),
          map(value => this.productService.filterSearchProducts(value, products))
        );
      }
    });
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
