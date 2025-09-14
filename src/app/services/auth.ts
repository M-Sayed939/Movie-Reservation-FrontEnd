import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken{
  sub: string;
  roles: string[];
  exp: number;
  iat: number;

}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private backendUrl = 'http://localhost.8081/api/auth';
  private http = inject(HttpClient);
  private router = inject(Router);
  currentUser = signal<string | null>(this.getUserFromToken());
  isAuthenticated = signal<boolean>(this.hasToken());

  constructor() {
    this.currentUser.set(this.getUserFromToken());
  }

  login(loginData: any): Observable<any> {
    console.log('Attempting login with data:', loginData);
    console.log('Attempting to log in at: ',`http://localhost:8081/api/auth/login`)
    return this.http.post(`http://localhost:8081/api/auth/login`, loginData).pipe(
      tap((response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('auth_token', response.accessToken);
          this.currentUser.set(this.getUserFromToken());
          this.router.navigate(['/']);
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
    this.router.navigate(['/login']);
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
  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        return decodedToken.roles && decodedToken.roles.length > 0 ? decodedToken.roles[0] : null;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  private getUserFromToken():string|null {
    const token = this.getToken();
    if(token){
      try{
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('auth_token');
          return null;

        }
        return decoded.sub;
      }catch (e) {
        console.error('Invalid Token', e);
        localStorage.removeItem('auth_token');
        return null;

      }
    }
    return null;
  }
}
