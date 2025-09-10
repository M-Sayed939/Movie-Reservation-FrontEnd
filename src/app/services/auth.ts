import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private backendUrl = 'https://localhost.8081/api/auth';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/login`, loginData).pipe(
      tap(response => {
        if( response && response.accessToken ) {
          localStorage.setItem('auth_token', response.accessToken);
          this.router.navigate(['/']);
        }
      })
    );
  }

  logout(): void{
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

}
