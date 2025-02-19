import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';

@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent, NgOptimizedImage],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
