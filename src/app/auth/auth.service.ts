import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { Observable,  } from 'rxjs';
import { catchError } from "rxjs/operators";
import { throwError, Subject } from "rxjs";

import { FirebaseDbInfo } from 'src/environments/firebase-db-info';
// import { User } from './user.model';

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

  constructor(
    private http: HttpClient,
    private firebase: FirebaseDbInfo
    ) {}

  signup(email: string, password: string) {
    // return this.http.get<Recipe[]>(this.firebase.dbUrl)
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
    .pipe(catchError(errorRes => {
      let errorMessage = 'an unknown error occured';
      if (!errorRes.error || !errorRes.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists';
        }
      return throwError(errorMessage);
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
      + this.firebase.key,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }

}
