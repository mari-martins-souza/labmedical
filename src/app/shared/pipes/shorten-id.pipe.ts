import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenId',
  standalone: true
})
export class ShortenIdPipe implements PipeTransform {

  transform(value: string, limit = 8): string {
    if (!value) return '';
    
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }

}
