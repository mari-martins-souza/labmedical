import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-save-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-dialog.component.html',
  styleUrl: './save-dialog.component.scss'
})
export class SaveDialogComponent {
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
