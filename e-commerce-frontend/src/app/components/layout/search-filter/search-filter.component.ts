import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFilterProperties } from 'src/app/models/filterProperties.model';
import { ICategory, appCategories } from 'src/app/models/category.model';
import { ITag, appTags } from 'src/app/models/tag.model';
import { ProductService } from 'src/app/services/product/product.service';
import { take } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, MatSliderModule, MatChipsModule, ReactiveFormsModule, FormsModule],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  host: {
    class: 'search-filter'
  }
})
export class SearchFilterComponent implements OnChanges {

  @Input() searchCategory: string = "";
  @Input() searchTag: string = "";
  @Input() searchTitle: string = "";
  @Output() filteredProducts: EventEmitter<IProduct[]> = new EventEmitter<IProduct[]>();

  public categories: ICategory[] = appCategories;
  public tags: ITag[] = appTags;

  public showFilterForm = false;
  public filterForm!: FormGroup;
  public filterTags: string[] = [];
  public filterCategories: string[] = [];

  constructor(private productService: ProductService) {
    this.filterForm = this.initFilterForm();
  }

  public ngOnChanges(): void {
    if(this.searchCategory !== "") {
      this.filterCategories.push(this.searchCategory);
    }
    if(this.searchTag !== "") {
      this.filterTags.push(this.searchTag);
    }
    this.filterForm = this.initFilterForm();
    this.sumbitFilterForm();
  }

  public initFilterForm(): FormGroup {
    return new FormGroup({
      filterTitle: new FormControl(this.searchTitle),
      filterPriceSlider: new FormGroup({
        sliderStartValue: new FormControl(1, [Validators.min(1)]),
        sliderEndValue: new FormControl(300, [Validators.max(300)])
      }),
    })
  }

  public sumbitFilterForm(): void {
    if (this.filterForm.valid) {
      const formValue = this.filterForm.value;
      const filterProps: IFilterProperties = {
        title: formValue.filterTitle,
        minPrice: formValue.filterPriceSlider.sliderStartValue,
        maxPrice: formValue.filterPriceSlider.sliderEndValue,
        tags: this.filterTags,
        categories: this.filterCategories
      }
      this.productService.search(filterProps).pipe(take(1)).subscribe({
        next: (products) => {
          this.filteredProducts.emit(products);
        },
        error: () => {
          console.log("Error");
        }
      })
    }
  }

  public showSettings(): void {
    const filterForm = document.querySelector(".filter-form") as HTMLElement;
    filterForm.style.display = this.showFilterForm ? "block" : "none";
    this.showFilterForm = !this.showFilterForm;
  }

  public selectItem(item: ITag | ICategory, list: string[]) {
    const index = list.indexOf(item.value);
    if (index !== -1) {
      list.splice(index, 1);
    } else {
      list.push(item.value);
    }
  }

  public isItemSelected(item: ITag | ICategory, list: string[]): boolean {
    return list.includes(item.value);
  }
  
}
