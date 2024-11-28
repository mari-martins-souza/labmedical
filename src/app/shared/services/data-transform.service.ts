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
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = (date.getUTCDate()).toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

  transformDateForForm(dateStr: string): string {
    const dateParts = dateStr.split('-');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }


  formatPhone(phone: any): any {
    return '(' + phone.substring(0, 2) + ')' + phone.substring(2, 3) + phone.substring(3, 7) + '-' + phone.substring(7, 11);
  }

}
