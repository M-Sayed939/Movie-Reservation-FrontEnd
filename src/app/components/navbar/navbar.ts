import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Auth} from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  authService = inject(Auth);
  router = inject(Router);
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
