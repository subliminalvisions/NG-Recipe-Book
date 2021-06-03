import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipes' },
  // lazy loading recipes
  // { path: 'recipes', loadChildren: './recipes/recipes.module.ts#RecipesModule'  }
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
