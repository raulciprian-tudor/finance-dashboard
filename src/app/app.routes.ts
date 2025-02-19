import { Route } from '@angular/router';

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
    canActivate: [],
  },
  {
    path: '**',
    redirectTo: ROUTER_TOKENS.LOGIN,
    pathMatch: 'full',
  },
];
