import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize',
  standalone: true,
})

export class PluralizePipe implements PipeTransform {
  transform(count: number | undefined, singular: string, plural: string = `${singular}а`, pluralGenitive: string = `${singular}ов`): string {
    if (!count) {
      return '0 ' + pluralGenitive;
    }
    if (count % 10 === 1 && count % 100 !== 11) {
      return `${count} ${singular}`;
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
      return `${count} ${plural}`;
    } else {
      return `${count} ${pluralGenitive}`;
    }
  }
}
