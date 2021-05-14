import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  paramsSubscirption: Subscription;
  id: number;

  constructor(
    private slService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.paramsSubscirption = this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipebyID(this.id);
      }
    );
  }
  deletItem(id: number): void {
    this.recipeService.deleteRecipe(id);
    this.router.navigate(['/recipes']);
  }

  addToShopping(): void {
    console.log('ingreds', this.recipe.ingredients);
    this.recipeService.addIngredientsToShopList(this.recipe.ingredients);
  }
  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
