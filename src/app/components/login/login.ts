import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Auth} from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: Auth) {
    this.loginForm = this.fb.group({
      username: ['admin', [Validators.required]],
      password: ['adminpassword', [Validators.required]]
    });
  }
  onSubmit(): void {
    if(this.loginForm.valid){
      this.errorMessage = null;
      this.authService.login(this.loginForm.value).subscribe({
        error: (err:any) => {
          this.errorMessage = err.error?.message || 'Login failed. Please try again.';
          console.error('Login error:', err);
        }
      });
    }
  }

}
