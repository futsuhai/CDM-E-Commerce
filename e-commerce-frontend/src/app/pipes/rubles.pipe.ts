import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rubles'
})
export class RublesPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (!value) {
      return "0 ₽";
    } else {
      return value.toFixed(2) + ' ₽';
    }
  }
}