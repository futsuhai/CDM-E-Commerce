import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { IAccount } from 'src/app/models/account.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { HeaderDesktopComponent } from './header-desktop/header-desktop.component';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderDesktopComponent, HeaderNavbarComponent, CommonModule, RouterLink, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'header'
  },
})
export class HeaderComponent implements OnInit {

  @Output() public toggledMenu = new EventEmitter<void>();
  public currentAccount: Observable<IAccount | null>;
  public searchInput: FormControl = new FormControl('');
  public filteredProducts!: Observable<IProduct[]>;
  
  constructor(private authState: AuthState, private router: Router, private productService: ProductService) {
    this.currentAccount = this.authState.currentAccount;
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

  public toggleMenu(): void {
    this.toggledMenu.emit();
  }

  public resetSearchInput(): void {
    this.searchInput.setValue('');
  }
}
