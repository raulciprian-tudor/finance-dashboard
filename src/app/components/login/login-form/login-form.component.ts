import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ROUTER_TOKENS } from '../../../app.routes';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  loginForm: FormGroup;
  loginError: string | null = null;

  constructor() {
    this.loginForm = this.fb.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
    });
  }

  ngOnInit(): void {
    this.loginForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((): void => {
        if (this.loginError) {
          this.loginError = null;
        }
      });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (res: boolean): void => {
          if (res) {
            this.router.navigate([ROUTER_TOKENS.DASHBOARD]).then((): void => {
              console.log('Navigated to dashboard');
            });
          } else {
            this.loginError = 'Login failed. Please try again.';
          }
        },
        error: (): void => {
          this.loginError = 'Login failed. Please try again.';
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      return;
    }
  }

  googleLogin(): void {
    this.authService.loginWithGoogle().subscribe({
      next: (res: boolean): void => {
        if (res) {
          this.router.navigate([ROUTER_TOKENS.DASHBOARD]).then((): void => {
            console.log('Navigated to dashboard');
          });
        } else {
          this.loginError = 'Login failed. Please try again.';
        }
      },
      error: (): void => {
        this.loginError = 'Login failed. Please try again.';
      },
    });
  }
}
