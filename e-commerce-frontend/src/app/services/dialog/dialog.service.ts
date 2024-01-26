import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/layout/dialog/dialog.component';
import { ProductService } from '../product/product.service';
import { IProduct } from 'src/app/models/product.model';
import { ProductDialogComponent } from 'src/app/components/layout/product-dialog/product-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog, private productService: ProductService) {}

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string, productId: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { productId }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.productService.getProducts().subscribe(products => {
        this.productService.productsSubject.next(products);
      });
    });
  }

  public openProductFormDialog(enterAnimationDuration: string, exitAnimationDuration: string, product?: IProduct): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { product }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.productService.getProducts().subscribe(products => {
        this.productService.productsSubject.next(products);
      });
    });
  }
}
