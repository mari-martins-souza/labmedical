import { Component, OnInit } from '@angular/core';
import { DialogComponent } from "../shared/dialog/dialog.component";
import { ConfirmDialogComponent } from "../shared/confirm-dialog/confirm-dialog.component";
import { ToolbarComponent } from "../shared/toolbar/toolbar.component";
import { SidebarMenuComponent } from "../shared/sidebar-menu/sidebar-menu.component";
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';
import { DataService } from '../shared/services/data.service';
import { User } from '../models/user.model';
import { passwordMatchValidator } from './password.validator';

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
  providers: [provideNgxMask(), DataService],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  isEditing: boolean = false;
  saveDisabled: boolean = false;
  showMessage = false;

  constructor(private fb: FormBuilder, private titleService: Title, private dataService: DataService) { this.registerForm = this.fb.group({
    roleName: ['', Validators.required],
    name: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    birthdate: ['', Validators.required],
    cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    confirm: ['', [Validators.required]],
  }, { validators: passwordMatchValidator() });
 }

  ngOnInit() {
    this.titleService.setTitle('Registro de Usuário');
  }

 registerUser() {
  if (this.registerForm.valid) {

    const cpf = this.registerForm.value.cpf.replace(/\D/g, '');
    const formattedCpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    const newUser: User = {
      roleName: this.registerForm.value.roleName,
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      birthdate: this.registerForm.value.birthdate,
      cpf: formattedCpf,
      password: this.registerForm.value.password,
    };

    this.dataService.saveUser(newUser).subscribe(
      (response) => {
        console.log('User saved successfully:', response);
        this.showMessage = true;
        this.registerForm.reset();

        setTimeout(() => {
          this.showMessage = false;
        }, 1000);
        
      },
      (error) => {
        console.error('Error saving user:', error);
      }
    );
  } else {
    console.log('Form is not valid');
  }
}
  

  saveEditExam() {
  }

  editExam() {
  }

  deleteExam() {
  }

}

