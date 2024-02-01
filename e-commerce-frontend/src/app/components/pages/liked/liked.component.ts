import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductCardComponent } from '../../layout/product/product-card/product-card.component';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { EmptyComponent } from '../../layout/empty/empty.component';
import { ProductListLikedComponent } from '../../layout/product/product-list-liked/product-list-liked.component';

@Component({
  selector: 'app-liked',
  standalone: true,
  imports: [CommonModule, MatGridListModule, ProductCardComponent, EmptyComponent, ProductListLikedComponent],
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss']
})
export class LikedComponent implements OnInit {

  public products!: IProduct[];

  constructor(private authState: AuthState) { }

  public ngOnInit(): void {
    this.authState.currentAccount.subscribe({
      next: (account) => {
        if (account && account.accountDataModel?.liked) {
          this.products = account.accountDataModel?.liked;
        }
      }
    })
  }
}
