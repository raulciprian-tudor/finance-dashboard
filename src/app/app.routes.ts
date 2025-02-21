import { Route } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

export enum ROUTER_TOKENS {
  DASHBOARD = 'dashboard',
  LOGIN = 'login',
  REGISTER = 'register',
}

export const appRoutes: Route[] = [
  {
    path: ROUTER_TOKENS.LOGIN,
    loadComponent: () =>
      import('./components/login/login.component').then(
        (x) => x.LoginComponent
      ),
  },
  {
    path: ROUTER_TOKENS.REGISTER,
    loadComponent: () =>
      import('./components/register/register.component').then(
        (x) => x.RegisterComponent
      ),
  },
  {
    path: ROUTER_TOKENS.DASHBOARD,
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (x) => x.DashboardComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: ROUTER_TOKENS.LOGIN,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: ROUTER_TOKENS.DASHBOARD,
  },
];
