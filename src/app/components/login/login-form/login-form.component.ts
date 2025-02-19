import { Component, inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ROUTER_TOKENS } from '../../../app.routes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  email = '';
  password = '';
  errorMessage = '';

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  login(): void {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate([ROUTER_TOKENS.DASHBOARD]);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
