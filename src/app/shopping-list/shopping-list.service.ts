// import { Injectable } from '@angular/core';\
// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
// @Injectable()
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 11)
      ];
    addIngredient(ingredient: Ingredient): void {
        console.log('add ing');
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addMultiples(ingredients: Ingredient[]): void {
        // for (let ingredient of ingredients) {
        //   this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    getIngredients(): Ingredient[] {
        // (reminder: slice is non-mutating)
        return this.ingredients.slice();
    }

}
