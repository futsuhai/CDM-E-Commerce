import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneNumber]',
  standalone: true
})
export class PhoneNumberDirective {

  constructor(private el: ElementRef) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @HostListener('input', ['$event']) onInput(event: any) {
    const inputValue: string = event.target.value.replace(/\D/g, '');
    if (inputValue.length <= 10) {
      event.target.value = this.formatPhoneNumber(inputValue);
    }
  }

  private formatPhoneNumber(value: string): string {
    let formattedValue = '+7';
    if (value.length >= 1) {
      formattedValue += ` (${value.slice(1, 4)}`;
    }
    if (value.length >= 4) {
      formattedValue += `) ${value.slice(4, 7)}`;
    }
    if (value.length >= 7) {
      formattedValue += `-${value.slice(7, 9)}`;
    }
    if (value.length >= 9) {
      formattedValue += `-${value.slice(9)}`;
    }
    return formattedValue;
  }
}
