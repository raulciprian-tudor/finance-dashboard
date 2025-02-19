import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;

  login(email: string, password: string): boolean {
    if (email === 'john.doe@gmail.com' && password === 'password') {
      this.authenticated = true;
      return true;
    }

    return false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  logout(): void {
    this.authenticated = false;
  }
}
