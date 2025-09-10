import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
// import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private backendUrl = 'https://localhost.8081/api/auth';
  isAuthenticated = signal<boolean>(this.hasToken());

  constructor(private http: HttpClient) {
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, loginData).pipe(
      tap((response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('auth_token', response.accessToken);
          this.isAuthenticated.set(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // isLoggedIn(): boolean {
  //   return this.getToken() !== null;
  // }

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: { sub: string } = jwtDecode(token);
        return decodedToken.sub;

      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
}
