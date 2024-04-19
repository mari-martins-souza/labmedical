import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true
})
export class AgePipe implements PipeTransform {

  transform(birthdate: string): number {
    const [day, month, year] = birthdate.split('-').map(Number);
    const birthdateAsDate = new Date(year, month - 1, day);
    const ageDifMs = Date.now() - birthdateAsDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}