import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarToogleService {

  private _showSidebar: BehaviorSubject<boolean> = new BehaviorSubject(true);
  showSidebar = this._showSidebar.asObservable();

  toggleSidebar() {
    this._showSidebar.next(!this._showSidebar.value);
  }
}
