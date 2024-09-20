import { Component, OnInit } from '@angular/core';
import { DialogComponent } from "../shared/dialog/dialog.component";
import { ConfirmDialogComponent } from "../shared/confirm-dialog/confirm-dialog.component";
import { ToolbarComponent } from "../shared/toolbar/toolbar.component";
import { SidebarMenuComponent } from "../shared/sidebar-menu/sidebar-menu.component";
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [DialogComponent, ConfirmDialogComponent, ToolbarComponent, SidebarMenuComponent, ReactiveFormsModule, MatError, CommonModule, NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent implements OnInit {
  isEditing: boolean = false;
  saveDisabled: boolean = false;
  showMessage = false;

  constructor(private fb: FormBuilder, private titleService: Title) { }

  registerForm = this.fb.group({
    roleName: ['', Validators.required],
    name: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    birthdate: ['', Validators.required],
    cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    confirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
  });
  
  ngOnInit() {
    this.titleService.setTitle('Registro de Usuário');
  }

  
  saveEditExam() {
  }

  saveExamRegister() {
  } 

  editExam() {
  }

  deleteExam() {
  }

}
