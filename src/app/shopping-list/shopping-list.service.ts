// import { Injectable } from '@angular/core';\
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

// @Injectable()
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 11)
      ];
    addIngredient(ingredient: Ingredient): void {
        console.log('add ing');
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    removeIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }

    addMultiples(ingredients: Ingredient[]): void {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    getIngredients(): Ingredient[] {
        // (reminder: slice is non-mutating)
        return this.ingredients.slice();
    }
    getIngredient(index: number) {
      return this.ingredients[index];
    }


}
