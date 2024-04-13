import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransformService {

  constructor() { }

  formatCpf(cpf: any): any {
    return cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9, 11);
  }

  formatDate(dateAny: any): any {
    const date = new Date(dateAny);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // meses começam do 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  formatPhone(phone: any): any {
    return '(' + phone.substring(0, 2) + ') ' + phone.substring(2, 3) + ' ' + phone.substring(3, 7) + '-' + phone.substring(7, 11);
  }

}
