import { CommonModule } from '@angular/common';
import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { DialogLoginService } from './dialog-login.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  displayStatus: string = 'none';
  message: string = '';

  ngOnInit() {
    this.dialogLoginService.showDialog$.subscribe(message => this.openDialog(message));
    this.dialogLoginService.hideDialog$.subscribe(() => this.closeDialog());
  }

  @Input() emitCloseEvent: boolean = true;
  @Output() dialogClosed = new EventEmitter<void>();

  constructor(private dialogLoginService: DialogLoginService) { }

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
