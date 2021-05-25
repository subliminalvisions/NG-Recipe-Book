import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    recipteSelected = new Subject<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A First Recipe',
        'Good Recipe Info',
        'https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/30/32/45/tKqC3hipQA2MRyTEsneh_oven-bbq-ribs-02757.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('Bread', 1)
        ]),
        new Recipe('Second Recipe',
        'Bad Recipe - don\'t do it',
        'https://live.staticflickr.com/2673/4043259082_4dc86d5d3c_b.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fies', 14)
        ]),
        new Recipe('A Weird Recipe',
        'Just Weird, idk just think about it it',
        'https://cdn.pixabay.com/photo/2018/01/29/00/26/joker-3114977__340.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('Buns', 4)
        ])
      ];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]): void {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }
    getRecipes(): Recipe[] {
        // reminder: slice returns a copy
        return this.recipes.slice();
    }
    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe): void {
        this.recipes[index] = (newRecipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    getRecipebyID(index: number): Recipe {
      return this.recipes[index];
    }
    // const recipeWithID = this.recipes.find(
    //   (s) => {
    //     return s.id === id;
    //   }
    // );
    // return recipeWithID;

    addIngredientsToShopList(ingredients: Ingredient[]): void {
        this.slService.addMultiples(ingredients);
    }

}
