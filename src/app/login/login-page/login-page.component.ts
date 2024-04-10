import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  email!: string;
  password!: string;

  registerForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    confirm: new FormControl('',[Validators.required, Validators.minLength(8)])
  });
  
  users = [
    {name: 'Mariana', email: 'mariana@labmedical.com', password: '123'},
  ] 
    
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    localStorage.setItem('savedUsers',JSON.stringify(this.users));
  }

  register() {
    if(this.registerForm.value.password !== this.registerForm.value.confirm) {
      window.alert('As senhas precisam ser idênticas.') 
    } else if(!this.registerForm.valid) {
      window.alert('Preencha todos os campos corretamente.') 
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
      window.alert('Registro efetuado com sucesso. Você já pode efetuar login.')
    }
  }  
  
  loginButtonClick() {
    this.loginService.logon(this.email, this.password);
  }

}