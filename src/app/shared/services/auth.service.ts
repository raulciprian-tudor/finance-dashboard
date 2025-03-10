import { Injectable } from '@angular/core';
import {
  catchError,
  delay,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { firebaseAuth, googleProvider } from '../../firebase/firebase.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private setPersistence(): Observable<void> {
    return from(setPersistence(firebaseAuth, browserSessionPersistence));
  }

  login(email: string, password: string): Observable<boolean> {
    return this.setPersistence().pipe(
      switchMap((): Observable<boolean> => {
        return from(
          signInWithEmailAndPassword(firebaseAuth, email, password)
        ).pipe(
          delay(500),
          tap((): void => {
            sessionStorage.setItem('authenticated', 'true');
          }),
          catchError((): Observable<boolean> => {
            sessionStorage.removeItem('authenticated');
            return of(false);
          }),
          map((): boolean => true)
        );
      })
    );
  }

  loginWithGoogle(): Observable<boolean> {
    return this.setPersistence().pipe(
      switchMap((): Observable<boolean> => {
        return from(signInWithPopup(firebaseAuth, googleProvider)).pipe(
          delay(500),
          tap((): void => {
            sessionStorage.setItem('authenticated', 'true');
          }),
          catchError((): Observable<boolean> => {
            sessionStorage.removeItem('authenticated');
            return of(false);
          }),
          map((): boolean => true)
        );
      })
    );
  }

  register(email: string, password: string): Observable<boolean> {
    return of(true).pipe(
      delay(500),
      tap((success: boolean): void => {
        if (success) {
          createUserWithEmailAndPassword(firebaseAuth, email, password);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return (
      typeof window !== 'undefined' &&
      sessionStorage.getItem('authenticated') === 'true'
    );
  }
}
