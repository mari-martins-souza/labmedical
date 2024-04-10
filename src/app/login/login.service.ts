import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogged: boolean = false;
  email!: string;
  password!: string;

  constructor(private router: Router) { }

  getUsers() {
    const savedUsers = localStorage.getItem('savedUsers');
    return savedUsers !== null ? JSON.parse(savedUsers) : [];
  }

  authUser (email: string, password: string) {
    const users = this.getUsers();
    return users.some((user: { email: string; password: string; }) => user.email === email && user.password === password);
  }

  logon(email: string, password: string) {
    if (this.authUser(email, password)) {
      localStorage.setItem('loggedUser', email);
      localStorage.setItem('isLogged', 'true');
      this.router.navigate(['/home']);
      this.isLogged = true;
    } else {
      window.alert('Senha ou email inválidos.')
    }

  }

}