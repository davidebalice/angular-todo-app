import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(
    value: number,
    currencyCode: string = 'EUR',
    locale: string = 'it-IT'
  ): string {
    const formattedValue = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    if (formattedValue.startsWith('€')) {
      return formattedValue.replace('€', '€ ');
    }

    return `€ ${formattedValue.replace('€', '')}`;
  }
}
