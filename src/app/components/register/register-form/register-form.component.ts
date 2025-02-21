import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register-form',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);

  registerForm: FormGroup;
  registerError: string | null = null;

  constructor() {
    this.registerForm = this.fb.group({
      firstName: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      lastName: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
          ),
        ],
        updateOn: 'change',
      }),
    });
  }

  ngOnInit(): void {
    this.registerForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((): void => {
        if (this.registerError) {
          this.registerError = null;
        }
      });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      this.authService.register(email, password).subscribe({
        next: (success: boolean): void => {
          if (success) {
            console.log('User registered successfully');
          } else {
            console.error('Error registering user');
          }
        },
        error: (error: any): void => {
          console.error('Error registering user: ', error);
          this.registerError = error.message;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
      return;
    }
  }
}
