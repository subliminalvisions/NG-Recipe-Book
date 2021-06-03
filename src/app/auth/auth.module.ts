import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core.module';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';

// import { AuthInterceptorService } from './auth-interceptor.service'; // ??

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    SharedModule,
    CoreModule,
    FormsModule,
    RouterModule.forChild([{ path: 'auth', component: AuthComponent }])
    // AuthInterceptorService
    // can't decouple from CoreMod
  ],

  // imports: [,
  exports: [RouterModule]
})
export class AuthModule {

}
