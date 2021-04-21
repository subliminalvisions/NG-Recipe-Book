import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  childIngred: Ingredient;
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 11)
  ];

  constructor() { }

  ngOnInit(): void {
  }
  // see tpt: <app-shopping-list-edit>
  onPushIngred(data: Ingredient){
    this.ingredients.push(data);
    console.log(data);
  }

}
