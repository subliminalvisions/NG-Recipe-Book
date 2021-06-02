import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipes' },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  // every module works on its own in angular
})
export class AppRoutingModule { }
