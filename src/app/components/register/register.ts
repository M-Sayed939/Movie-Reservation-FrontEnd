import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Auth} from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true
})
export class Register {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: [''],
      lastName: [''],
      phoneNumber: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.errorMessage = null;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        // On successful registration, redirect to the login page with a success message
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        console.error(err);
      }
    });
  }

}
