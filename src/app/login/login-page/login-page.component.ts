import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, DialogComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  email!: string;
  password!: string;
  showRegisterForm = false;

  registerForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    confirm: new FormControl('',[Validators.required, Validators.minLength(8)])
  });
  
  users = [
    {name: 'Mariana', email: 'mariana@labmedical.com', password: '123'},
  ] 
  
  constructor(private router: Router, private loginService: LoginService, private titleService: Title) { }

  @ViewChild(DialogComponent) dialog!: DialogComponent;


  ngOnInit() {
    this.titleService.setTitle('LABMedical - Login');

    document.body.classList.add('login-page');

      const savedUsers = localStorage.getItem('savedUsers');
    if(savedUsers) {
      this.users = JSON.parse(savedUsers);
    } else {
      localStorage.setItem('savedUsers',JSON.stringify(this.users));
    }
  }  

  ngOnDestroy() {
    document.body.classList.remove('login-page');
  }

  register() {
    if(this.registerForm.value.password !== this.registerForm.value.confirm) {
      this.dialog.openDialog('As senhas precisam ser idênticas.') 
    } else if(!this.registerForm.valid) {
      this.dialog.openDialog('Preencha todos os campos corretamente.') 
      } else {
        const savedUsers = localStorage.getItem('savedUsers');
        if(savedUsers) {
          this.users = JSON.parse(savedUsers);
      }

      const newUser = {
        name: this.registerForm.value.name || '',
        email: this.registerForm.value.email || '',
        password: this.registerForm.value.password || '',
      }

      this.users.push(newUser);

      localStorage.setItem('savedUsers', JSON.stringify(this.users));
      this.dialog.openDialog('Registro efetuado com sucesso! Você já pode efetuar login.'); 
      this.registerForm.reset();
      this.toggleRegisterForm();
    }
  }  
  
  loginButtonClick() {
    this.loginService.logon(this.email, this.password);
  }

  onForgotPassword() {
    this.dialog.openDialog('Esta funcionalidade está temporariamente indisponível.', false); 
  }

  toggleRegisterForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }

}