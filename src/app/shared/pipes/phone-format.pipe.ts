import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {

  transform(phone: string): string {
    if (!phone) return '';

    const digits = phone.replace(/\D/g, '');

    if (digits.length === 11) {
      const ddd = digits.slice(0, 2);
      const firstDigit = digits.slice(2, 3);
      const part1 = digits.slice(3, 7);
      const part2 = digits.slice(7, 11);
      
      return `(${ddd}) ${firstDigit} ${part1}-${part2}`;
    } else {
      return phone;
    }
  }
}