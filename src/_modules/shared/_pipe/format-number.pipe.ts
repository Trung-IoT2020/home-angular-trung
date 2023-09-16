import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatNumberPipe' })
export class FormatNumberPipe implements PipeTransform {
  transform(value: Number, withComma = false): String {
    if (withComma) {
      return value.toString().replace('.', ',');
    }
    return Number(value)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
}
