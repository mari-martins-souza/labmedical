import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  displayStatus: string = 'none';
  message: string = '';

  constructor() { }

  openDialog(message: string) {
    this.message = message;
    this.displayStatus = 'block';
  }

  closeDialog() {
    this.displayStatus = 'none';
  }

}
