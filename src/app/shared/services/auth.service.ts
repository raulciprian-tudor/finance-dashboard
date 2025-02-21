import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;

  login(email: string, password: string): Observable<boolean> {
    return of(email === 'john.doe@gmail.com' && password === 'password').pipe(
      delay(1000),
      tap((success) => {
        if (success) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  logout(): void {
    this.authenticated = false;
  }
}
