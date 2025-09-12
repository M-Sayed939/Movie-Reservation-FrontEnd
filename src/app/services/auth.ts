import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
// import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private backendUrl = 'http://localhost.8081/api/auth';
  private http = inject(HttpClient);
  currentUser = signal<string | null>(this.getUserFromToken());
  isAuthenticated = signal<boolean>(this.hasToken());

  // constructor(private http: HttpClient) {
  // }

  login(loginData: any): Observable<any> {
    return this.http.post(`http://localhost:8081/api/auth/login`, loginData).pipe(
      tap((response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('auth_token', response.accessToken);
          this.currentUser.set(this.getUserFromToken());
        }
      })
    );
  }
  register(userDetails: any): Observable<any> {
    return this.http.post(`http://localhost:8081/api/auth/signup`, userDetails);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.currentUser.set(null);
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

  private getUserFromToken():any|null {
    const token = localStorage.getItem('auth_token');
    if(token){
      try{
        return jwtDecode(token);
      }catch (e) {
        console.error('Invalid Token', e);
        localStorage.removeItem('auth_token');
        return null;

      }
    }
    return null;
  }
}
