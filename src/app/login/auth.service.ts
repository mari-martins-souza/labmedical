import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from './jwt-payload.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string): void {
    sessionStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getDecodedToken() {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      return jwtDecode<CustomJwtPayload>(token);
    }
    return null;
  }

  getUserNameFromToken(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.name : null;
  }

  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.scope : null;
  }
  
}
