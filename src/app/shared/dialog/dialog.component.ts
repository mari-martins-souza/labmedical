import { CommonModule } from '@angular/common';
import { Component, Output, Input, EventEmitter } from '@angular/core';

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

  @Input() emitCloseEvent: boolean = true;
  @Output() dialogClosed = new EventEmitter<void>();

  constructor() { }

  openDialog(message: string, emitCloseEvent: boolean = true) {
    this.message = message;
    this.displayStatus = 'block';
    this.emitCloseEvent = emitCloseEvent;
  }

  closeDialog() {
    this.displayStatus = 'none';
    if (this.emitCloseEvent) {
      this.dialogClosed.emit();
    }
  }

}
