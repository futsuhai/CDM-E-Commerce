import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { ImageService } from 'src/app/services/image/image.service';
import { MatSelectModule } from '@angular/material/select';
import { ICategory, appCategories } from 'src/app/models/category.model';
import { ITag, appTags } from 'src/app/models/tag.model';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  host: {
    class: 'product-dialog'
  }
})
export class ProductDialogComponent {

  public currentProduct?: IProduct;
  public currentImage: string = '';
  public productForm!: FormGroup;
  public categories: ICategory[] = appCategories;
  public tags: ITag[] = appTags;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { product?: IProduct },
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private productService: ProductService,
    private alertService: AlertService,
    private imageService: ImageService) {
    this.currentProduct = data.product;
    if (this.currentProduct && this.currentProduct.productMain64Image) {
      this.currentImage = this.currentProduct.productMain64Image;
      this.productForm = this.initProductForm();
    } else {
      this.productForm = this.initEmptyProductForm();
    }
  }

  private initEmptyProductForm(): FormGroup {
    return new FormGroup({
      productArticul: new FormControl('', [Validators.required]),
      productCountry: new FormControl('', [Validators.required]),
      productBrand: new FormControl('', [Validators.required]),
      productTitle: new FormControl('', [Validators.required]),
      productCategory: new FormControl('', [Validators.required]),
      productCommonPrice: new FormControl('', [Validators.required]),
      productCardPrice: new FormControl('', [Validators.required]),
      productWeight: new FormControl('', [Validators.required]),
      productTag: new FormControl('', [Validators.required]),
      productDiscount: new FormControl('', [Validators.required]),
    })
  }

  private initProductForm(): FormGroup {
    return new FormGroup({
      productArticul: new FormControl(this.currentProduct?.articul, [Validators.required]),
      productCountry: new FormControl(this.currentProduct?.country, [Validators.required]),
      productBrand: new FormControl(this.currentProduct?.brand, [Validators.required]),
      productTitle: new FormControl(this.currentProduct?.title, [Validators.required]),
      productCategory: new FormControl(this.currentProduct?.productCategory, [Validators.required]),
      productCommonPrice: new FormControl(this.currentProduct?.commonPrice, [Validators.required]),
      productCardPrice: new FormControl(this.currentProduct?.cardPrice, [Validators.required]),
      productWeight: new FormControl(this.currentProduct?.weight, [Validators.required]),
      productTag: new FormControl(this.currentProduct?.productTag, [Validators.required]),
      productDiscount: new FormControl(this.currentProduct?.discount, [Validators.required]),
    })
  }

  public submitAddProductForm(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const product: IProduct = {
        articul: formValue.productArticul,
        country: formValue.productCountry,
        brand: formValue.productBrand,
        title: formValue.productTitle,
        productCategory: formValue.productCategory,
        commonPrice: formValue.productCommonPrice,
        cardPrice: formValue.productCardPrice,
        weight: formValue.productWeight,
        productTag: formValue.productTag,
        discount: formValue.productDiscount,
        rating: 0,
        rewievs: [],
        productMain64Image: this.currentImage
      }
      this.productService.addProduct(product).subscribe({
        next: () => {
          this.alertService.openSnackBar("Данные успешно сохранены", 2000, "valid");
          this.productForm.reset();
          this.dialogRef.close();
        },
        error: () => {
          this.alertService.openSnackBar("Ошибка при сохранении данных", 2000, "invalid");
        }
      });
    }
  }

  public submitEditProductForm(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const product: IProduct = {
        id: this.currentProduct?.id,
        articul: formValue.productArticul,
        country: formValue.productCountry,
        brand: formValue.productBrand,
        title: formValue.productTitle,
        productCategory: formValue.productCategory,
        commonPrice: formValue.productCommonPrice,
        cardPrice: formValue.productCardPrice,
        weight: formValue.productWeight,
        productTag: formValue.productTag,
        discount: formValue.productDiscount,
        rating: this.currentProduct?.rating,
        rewievs: this.currentProduct?.rewievs,
        productMain64Image: this.currentImage
      }
      this.productService.editProduct(product).subscribe({
        next: () => {
          this.alertService.openSnackBar("Данные успешно сохранены", 2000, "valid");
          this.productForm.reset();
          this.dialogRef.close();
        },
        error: () => {
          this.alertService.openSnackBar("Ошибка при сохранении данных", 2000, "invalid");
        }
      });
    }
  }

  public uploadImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.imageService.convertFileToBase64(file).pipe(take(1)).subscribe({
        next: (base64String) => {
          this.currentImage = base64String;
          this.alertService.openSnackBar("Файл успешно загружен", 2000, "valid");
        },
        error: () => {
          this.alertService.openSnackBar("Ошибка при загрузке файла", 2000, "invalid");
        }
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close()
  }

  public get productArticul(): AbstractControl | null {
    return this.productForm.get("productArticul");
  }

  public get productCountry(): AbstractControl | null {
    return this.productForm.get("productCountry");
  }

  public get productBrand(): AbstractControl | null {
    return this.productForm.get("productBrand");
  }

  public get productTitle(): AbstractControl | null {
    return this.productForm.get("productTitle");
  }

  public get productCategory(): AbstractControl | null {
    return this.productForm.get("productCategory");
  }

  public get productCommonPrice(): AbstractControl | null {
    return this.productForm.get("productCommonPrice");
  }

  public get productCardPrice(): AbstractControl | null {
    return this.productForm.get("productCardPrice");
  }
  public get productWeight(): AbstractControl | null {
    return this.productForm.get("productWeight");
  }

  public get productTag(): AbstractControl | null {
    return this.productForm.get("productTag");
  }

  public get productDiscount(): AbstractControl | null {
    return this.productForm.get("productDiscount");
  }
}
