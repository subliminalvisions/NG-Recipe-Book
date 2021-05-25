import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
// export class AuthComponent extends OnInit {
export class AuthComponent {
  isLoginMode = true;

  onSwitch(): void {
    this.isLoginMode = !this.isLoginMode;
  }
  // ngOnInit() {}
}
