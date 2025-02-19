import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
