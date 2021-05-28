import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitch(): void {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      console.log('isLoginMode', this.isLoginMode);
      authObs = this.authService.login(email, password);
    } else {
      console.log('isLoginMode', this.isLoginMode);
      authObs = this.authService.signup(email, password);

      // this.authService.signup(email, password).subscribe(
      //   resData => {
      //     this.isLoading = false;
      //     console.log(resData);
      //   },
      //   errorMessage => {
      //     console.log('errorMessage', errorMessage);
      //     this.error = errorMessage;
      //     this.isLoading = false;
      //   }
      // );

      // authObs = this.authService.signup(email, password);
      /// ummmm   Type '{}' is missing the following properties from
      // type 'AuthResponseData': kind, idToken, email, refreshToken,
      // and 2 more.
    }

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        console.log(resData);
      },
      errorMessage => {
        this.error = errorMessage;
        console.log('errorMessage', errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
