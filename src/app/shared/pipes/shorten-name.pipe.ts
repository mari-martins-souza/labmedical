import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenName',
  standalone: true
})
export class ShortenNamePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    const names = value.split(' ');
    if (names.length < 2) return value;
    return `${names[0]} ${names[names.length - 1]}`;
  }
}