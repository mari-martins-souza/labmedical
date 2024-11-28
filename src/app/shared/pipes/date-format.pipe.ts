import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    return moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');

  // transform(value: string, format: string = "DD-MM-YYYY"): string {
  //   return moment(value, 'MM-DD-YYYY').format(format);
  //   }

  }
}
