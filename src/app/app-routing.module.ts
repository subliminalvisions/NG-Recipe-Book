import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipes' },
  // lazy loading auth, shopList & recipes
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
    .then(
      m => m.AuthModule
    )
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module')
    .then(
      m => m.ShoppingListModule
    )
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module')
    .then(
      m => m.RecipesModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  // every module works on its own in angular
})
export class AppRoutingModule { }
