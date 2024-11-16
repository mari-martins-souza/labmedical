import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true
})
export class AgePipe implements PipeTransform {

  transform(birthdate: string | Date): number {
    let birthdateAsDate: Date;
  
    if (typeof birthdate === 'string') {
      birthdateAsDate = new Date(birthdate);
    } else {
      birthdateAsDate = birthdate;
    }
  
    const ageDifMs = Date.now() - birthdateAsDate.getTime();
  
    const ageDate = new Date(ageDifMs);
  
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
}