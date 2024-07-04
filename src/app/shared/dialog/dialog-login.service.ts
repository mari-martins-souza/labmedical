import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogLoginService {

  constructor() { }

  private showDialogSource = new Subject<string>();
  private hideDialogSource = new Subject<void>();

  showDialog$ = this.showDialogSource.asObservable();
  hideDialog$ = this.hideDialogSource.asObservable();

  showDialog(message: string) {
    this.showDialogSource.next(message);
  }

  hideDialog() {
    this.hideDialogSource.next();
  }
}
