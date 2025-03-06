import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTER_TOKENS } from '../../app.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivate(): boolean | UrlTree {
    return this.authService.isAuthenticated()
      ? true
      : this.router.parseUrl(ROUTER_TOKENS.LOGIN);
  }
}
