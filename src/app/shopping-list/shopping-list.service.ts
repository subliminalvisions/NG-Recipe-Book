// import { Injectable } from '@angular/core';\
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
// @Injectable()
export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 11)
      ];
    addIngredient(ingredient: Ingredient) {
        console.log('add ing')
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
    addMultiples(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
    getIngredients() {
        // reminder: slice returns a copy (non-mutating)
        return this.ingredients.slice();
    }

}
