import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable,  } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject } from "rxjs";

import { FirebaseDbInfo } from 'src/environments/firebase-db-info';
import { User } from './user.model';
import { registerLocaleData } from "@angular/common";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  // user = new Subject<User>();
  // token: string = null;
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  // BehaviorSubject provides immediate access
  // to the last emitted value even if the user had not previously subscribed


  constructor(
    private http: HttpClient,
    private router: Router,
    private firebase: FirebaseDbInfo
    ) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    // removing ": Observable<AuthResponseData>" as a return type
    // on this method resolved my error in auth.component.ts
    return this.http
    .post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
      + this.firebase.key,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthenitaction(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
    .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
      + this.firebase.key,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError),
      tap(resData => {
        this.handleAuthenitaction(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    // localStorage.clear(); // dont clear all data in ther
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    // for when token expires
    // console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    // retrive data from localstorag with synchronous function
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate) // js will convert
    );
    if (loadedUser.token) {
      const expirationDuration = new Date(
        userData._tokenExpirationDate).getTime()
        - new Date().getTime();

      this.autoLogout(expirationDuration);
      this.user.next(loadedUser);
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'an unknown error occured';
    if (!errorRes.error || !errorRes.error) {
        return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthenitaction(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
    ) {
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
  }

}
