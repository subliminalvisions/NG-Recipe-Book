import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe; 

  constructor(private slService: ShoppingListService,
    private recipeService: RecipeService
    ) { }

  ngOnInit(): void {
    console.log(this.recipe);
  }
  addToShopping() {
    console.log('ingreds', this.recipe.ingredients);
    this.recipeService.addIngredientsToShopList(this.recipe.ingredients);
  }

}
