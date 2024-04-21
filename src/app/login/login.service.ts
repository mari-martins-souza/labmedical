import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  email!: string;
  password!: string;
  isLogged: boolean = false;

  constructor(private router: Router) { }

  getUsers() {
    const savedUsers = localStorage.getItem('savedUsers');
    return savedUsers !== null ? JSON.parse(savedUsers) : [];
  }

  authUser (email: string, password: string) {
    const users = this.getUsers();
    const user = users.find((user: { email: string; password: string; }) => user.email === email && user.password === password);
    return user ? user : null;
  }

  logon(email: string, password: string) {
    const user = this.authUser(email, password);
    if (user) {
      localStorage.setItem('loggedUser', user.name);
      localStorage.setItem('isLogged', 'true');
      this.router.navigate(['/home']);
    } else {
      window.alert('Senha ou email inválidos.')
    }

  }

}