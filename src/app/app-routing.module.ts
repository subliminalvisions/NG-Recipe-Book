import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { NoRecipeSelectedComponent } from './recipes/no-recipe-selected/no-recipe-selected.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipes' },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'recipes', component: RecipesComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'no-recipe' },
      { path: 'no-recipe', component: NoRecipeSelectedComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
