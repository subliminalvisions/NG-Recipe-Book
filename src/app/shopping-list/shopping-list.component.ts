import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  // childIngred: Ingredient;
  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService) { }
  // constructor() { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }
  // see tpt: <app-shopping-list-edit>
  // onPushIngred(data: Ingredient){
  //   this.ingredients.push(data);
  //   console.log(data);
  // }


}
