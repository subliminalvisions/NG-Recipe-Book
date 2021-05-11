import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  ingredientList: [];
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      'recipeName': new FormControl(null, [Validators.required]),
      'recipeDescription': new FormControl(null, [Validators.required]),
      'ingredients': new FormArray([])
    });
    // how to link up form with Recipe???
  }
  onAddIngredient() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.recipeForm.get('ingredients')).push(control);
  }
  onSubmitRecipe() {
    console.log(this.recipeForm);
    console.log(this.recipeForm.value.recipeName);
    this.recipe = {
      name: this.recipeForm.value.recipeName,
      description: this.recipeForm.value.recipeName,
      ingredients: this.recipeForm.value.ingredients,
      imagePath: 'https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/30/32/45/tKqC3hipQA2MRyTEsneh_oven-bbq-ribs-02757.jpg',
    };
    this.recipeService.addRecipe(this.recipe);

    // new Recipe(1, 'A First Recipe',
    // 'Good Recipe Info',
    // 'https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/30/32/45/tKqC3hipQA2MRyTEsneh_oven-bbq-ribs-02757.jpg',
    // [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('Bread', 1)
    // ]),


    // this.recipe.name = this.recipeForm.value.recipeName;
    // this.recipe.name = ;
    // this.recipe.description = this.recipeForm.value.recipeDescription;
    // this.recipe.ingredients = this.recipeForm.value.ingredients;
  }

}
