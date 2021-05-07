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
    console.log(this.route.snapshot.queryParams);
    // this.paramsSubscirption = this.route.snapshot.params

    this.paramsSubscirption = this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipebyID(this.id);
        // if (params['id']) { }
        // else { this.server = this.serversService.getServer(1); }
        // this.serverName = this.server.name;
        // this.serverStatus = this.server.status;
      }
    );
    // const id = +this.route.snapshot.paramMap.get('slug');
    console.log(this.recipe);
  }
  addToShopping(): void {
    console.log('ingreds', this.recipe.ingredients);
    this.recipeService.addIngredientsToShopList(this.recipe.ingredients);
  }
  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

}
