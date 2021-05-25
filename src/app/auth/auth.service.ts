import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { FirebaseDbInfo } from 'src/environments/firebase-db-info';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private http: HttpClient,
    private firebase: FirebaseDbInfo
    ) {}

  signup(email: string, password: string): Observable<object> {
    // return this.http.get<Recipe[]>(this.firebase.dbUrl)

    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
      + this.firebase.key,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }

}
