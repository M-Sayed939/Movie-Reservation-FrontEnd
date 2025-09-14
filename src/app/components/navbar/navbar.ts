import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Auth} from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: true
})
export class Navbar {
  authService = inject(Auth);

  currentUser = this.authService.currentUser;
  isAdmin(): boolean {
    return this.authService.getUserRole() === 'ADMIN';
  }
  logout(): void {
    this.authService.logout();
  }

}
