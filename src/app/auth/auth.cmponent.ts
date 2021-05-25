import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
// export class AuthComponent extends OnInit {
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitch(): void {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm): void {
    // console.log(form.value);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      console.log('isLoginMode', this.isLoginMode);
    } else {
      this.authService.signup(email, password)
        .subscribe(resData => {
          this.isLoading = false;
          console.log(resData);
        },
        error => {
          console.log(error);
          this.error = 'an error occured';
          this.isLoading = false;
        }
      );
    }
    form.reset();
  }
  // ngOnInit() {}
}
