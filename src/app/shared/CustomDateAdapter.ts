import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  } 
}