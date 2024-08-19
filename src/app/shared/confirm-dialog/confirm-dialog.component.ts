import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  displayStatusConfirm: string = 'none';
  messageConfirm: string = '';

  @Output() confirm = new EventEmitter<boolean>();

  openDialog(messageConfirm: string) {
    this.messageConfirm = messageConfirm;
    this.displayStatusConfirm = 'block';
  }

  closeDialog() {
    this.displayStatusConfirm = 'none';
  }

  onConfirm() {
    this.confirm.emit(true);
    this.closeDialog();
  }

  onCancel() {
    this.confirm.emit(false);
    this.closeDialog();
  }
}