import { Injectable } from '@angular/core';
import { catchError, delay, from, map, Observable, of, tap } from 'rxjs';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { firebaseAuth, googleProvider } from '../../firebase/firebase.config';
import firebase from 'firebase/compat';
import OAuthCredential = firebase.auth.OAuthCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;

  login(email: string, password: string): Observable<boolean> {
    return from(signInWithEmailAndPassword(firebaseAuth, email, password)).pipe(
      delay(500),
      tap((): void => {
        this.authenticated = true;
      }),
      catchError((): Observable<boolean> => {
        this.authenticated = false;
        return of(false);
      }),
      map((): boolean => true)
    );
  }

  loginWithGoogle(): Observable<boolean> {
    return from(signInWithPopup(firebaseAuth, googleProvider)).pipe(
      delay(500),
      tap((result): void => {
        const credential: OAuthCredential | null =
          GoogleAuthProvider.credentialFromResult(result);

        this.authenticated = true;
      }),
      catchError((): Observable<boolean> => {
        this.authenticated = false;
        return of(false);
      }),
      map((): boolean => true)
    );
  }

  // loginWithFacebook(): Observable<boolean> {
  //   return from(signInWithPopup(firebaseAuth, facebookProvider)).pipe(
  //     delay(500),
  //     tap((result): void => {
  //       const credential: OAuthCredential | null =
  //         FacebookAuthProvider.credentialFromResult(result);
  //
  //       this.authenticated = true;
  //     }),
  //     catchError((error): Observable<boolean> => {
  //       this.authenticated = false;
  //       const errorCode = error.code;
  //       console.log(errorCode);
  //       alert(errorCode);
  //       return of(false);
  //     }),
  //     map((): boolean => true)
  //   );
  // }
  //
  // loginWithApple(): Observable<boolean> {
  //   return from(signInWithPopup(firebaseAuth, appleProvider)).pipe(
  //     delay(500),
  //     tap((result): void => {
  //       const credential: OAuthCredential | null =
  //         OAuthProvider.credentialFromResult(result);
  //       this.authenticated = true;
  //     }),
  //     catchError((): Observable<boolean> => {
  //       this.authenticated = false;
  //       return of(false);
  //     }),
  //     map((): boolean => true)
  //   );
  // }

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
    return this.authenticated;
  }

  logout(): void {
    this.authenticated = false;
  }
}
