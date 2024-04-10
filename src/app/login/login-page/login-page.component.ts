import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  email!: string;
  password!: string;
  
  users = [
    {email: 'mariana@labmedical.com', password: '123'},
    {email: 'diego@labmedical.com', password: '123'}
  ]
    
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    localStorage.setItem('savedUsers',JSON.stringify(this.users));
  }

  loginButtonClick() {
    this.loginService.logon(this.email, this.password);
  }

}