import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOrderDeliverTime, OrderDeliverTime, appDeliverTimes } from 'src/app/models/order.model';
import { PhoneNumberDirective } from 'src/app/directives/phone.directive';

@Component({
  selector: 'app-deliver-basket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PhoneNumberDirective],
  templateUrl: './deliver-basket.component.html',
  styleUrls: ['./deliver-basket.component.scss'],
  host: {
    class: 'deliver-basket'
  }
})
export class DeliverBasketComponent {

  public deliverForm!: FormGroup;
  public deliverTimes: IOrderDeliverTime[] = appDeliverTimes;
  public selectedDeliverTime: OrderDeliverTime = OrderDeliverTime.morning;

  constructor() {
    this.deliverForm = this.initDeliverForm();
  }

  public initDeliverForm(): FormGroup {
    return new FormGroup({
      deliverCity: new FormControl<string | null>("", [Validators.required]),
      deliverStreet: new FormControl<string | null>("", [Validators.required]),
      deliverHouse: new FormControl<string | null>("", [Validators.required]),
      deliverFlat: new FormControl<string | null>("", [Validators.required]),
      deliverDate: new FormControl<string | null>("", [Validators.required]),
      deliverPhone: new FormControl<string | null>("", [Validators.required]),
      deliverTime: new FormControl<OrderDeliverTime | null>(OrderDeliverTime.morning, [Validators.required]),
    })
  }

  public selectDeliverTime(value: OrderDeliverTime) {
    this.selectedDeliverTime = value;
    this.deliverForm.get('deliverTime')?.setValue(this.selectedDeliverTime);
  }

  public get deliverCity(): AbstractControl | null {
    return this.deliverForm.get("deliverCity");
  }

  public get deliverStreet(): AbstractControl | null {
    return this.deliverForm.get("deliverStreet");
  }

  public get deliverHouse(): AbstractControl | null {
    return this.deliverForm.get("deliverHouse");
  }

  public get deliverFlat(): AbstractControl | null {
    return this.deliverForm.get("deliverFlat");
  }

  public get deliverDate(): AbstractControl | null {
    return this.deliverForm.get("deliverDate");
  }

  public get deliverPhone(): AbstractControl | null {
    return this.deliverForm.get("deliverPhone");
  }

  public get deliverTime(): AbstractControl | null {
    return this.deliverForm.get("deliverTime");
  }
}
