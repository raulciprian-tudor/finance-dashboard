import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/firebase.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;

  login(email: string, password: string): Observable<boolean> {
    return of(email === 'john.doe@gmail.com' && password === 'password').pipe(
      // modificherei il delay, da 1000 magari a 500, testa un attimo e vedi come cambia
      delay(1000),
      tap((success: boolean): void => {
        if (success) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
      })
    );
  }

  register(email: string, password: string): Observable<boolean> {
    return of(true).pipe(
      // modificherei il delay, da 1000 magari a 500, testa un attimo e vedi come cambia
      delay(1000),
      tap((success: boolean): void => {
        if (success) {
          createUserWithEmailAndPassword(firebaseAuth, email, password);
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
