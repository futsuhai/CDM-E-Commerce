import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rubles'
})
export class RublesPipe implements PipeTransform { // у ангуляра уже есть такой пайп https://angular.io/api/common/CurrencyPipe // там не тот значок валюты((

  transform(value: number | undefined): string {
    if (!value) {
      return "0 ₽";
    } else {
      return value.toFixed(2) + ' ₽';
    }
  }
}
