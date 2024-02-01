import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product/product.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  host: {
    class: 'dialog'
  }
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { productId: string },
  private dialogRef: MatDialogRef<DialogComponent>,
  private productService: ProductService,
  private alertService: AlertService) { }

  public deleteProduct(): void {
    this.productService.deleteProduct(this.data.productId).subscribe({
      next: () => {
        this.alertService.openSnackBar("Товар успешно удален", 2000, "valid");
      }
    })
    this.dialogRef.close()
  }

  public cancel(): void {
    this.dialogRef.close()
  }
}
