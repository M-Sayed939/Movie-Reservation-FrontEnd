import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Auth} from '../../services/auth';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  loginForm= this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
                           });
  errorMessage: string | null = null;

  // constructor(private fb: FormBuilder, private authService: Auth) {
  //   this.loginForm = this.fb.group({
  //     username: ['admin', [Validators.required]],
  //     password: ['adminpassword', [Validators.required]]
  //   });
  // }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err: any) => { // Added 'any' type to fix implicit 'any' error
          this.errorMessage = 'Login failed. Please check your username and password.';
          console.error(err);
        }
      });
    }
  }

}
