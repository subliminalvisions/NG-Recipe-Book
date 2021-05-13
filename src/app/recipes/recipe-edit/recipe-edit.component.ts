import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  ingredientList: [];
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }
  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipebyID(this.id);
      console.log(recipe);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
        // array.forEach(element => {
        // });
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'description': new FormControl(recipeDescription , [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'ingredients': recipeIngredients
    });
    // how to link up form with Recipe in Edit Mode???
  }
  onAddIngredient(): void {
    const ingredient = new Ingredient('', 1);
    const control = new FormGroup({
      name: new FormControl(ingredient.name),
      amount: new FormControl(ingredient.amount)
    });
    (this.recipeForm.get('ingredients') as FormArray).push(control);
  }
  onSubmitRecipe(): void {
    console.log(this.recipeForm);
    console.log(this.recipeForm.value.recipeName);
    // this.recipe = {
    //   name: this.recipeForm.value.recipeName,
    //   description: this.recipeForm.value.recipeName,
    //   ingredients: this.recipeForm.value.ingredients,
    //   imagePath: 'https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/30/32/45/tKqC3hipQA2MRyTEsneh_oven-bbq-ribs-02757.jpg',
    // };
    // this.recipeService.addRecipe(this.recipe);
  }
  get controls(): any { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
