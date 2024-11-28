import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { AuthService } from '../auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthInterceptor } from '../auth.interceptor';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, DialogComponent, HttpClientModule],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  email: string = '';
  password: string = '';
  
  constructor(private router: Router, private titleService: Title, private authService: AuthService, ) { }

  @ViewChild(DialogComponent) dialog!: DialogComponent;

  ngOnInit() {
    this.titleService.setTitle('LABMedical - Login');

    document.body.classList.add('login-page');

  }  

  ngOnDestroy() {
    document.body.classList.remove('login-page');
  }

  onForgotPassword() {
    this.dialog.openDialog('Esta funcionalidade está temporariamente indisponível.', false); 
  }

  login(): void {
    this.authService.login({ email: this.email, password: this.password })
      .pipe(
        catchError(error => {
          this.dialog.openDialog('Senha ou email inválidos.');
          return throwError(error);
        })
      )
      .subscribe(response => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
      });
  }

}