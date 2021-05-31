import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "../app-routing.module";

import { AddRecipeComponent } from "./add-recipe/add-recipe.component";
import { NoRecipeSelectedComponent } from "./no-recipe-selected/no-recipe-selected.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    AddRecipeComponent,
    NoRecipeSelectedComponent,
    RecipeEditComponent

  ],
  imports: [
    RouterModule,
    CommonModule,
    // BrowserModule,
    // HttpClientModule,
    ReactiveFormsModule,
    // FormsModule,
    AppRoutingModule
    // you only have access to what you import
  ],
  exports: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    AddRecipeComponent,
    NoRecipeSelectedComponent,
    RecipeEditComponent
  ]
})
export class RecipesModule {

}
