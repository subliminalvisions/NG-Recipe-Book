import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
              private router: Router,
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
  initForm(): void {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipebyID(this.id);
      console.log(recipe);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount,
                [Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(recipeImagePath, [Validators.required]),
      description: new FormControl(recipeDescription , [Validators.required]),
      ingredients: recipeIngredients
    });
  }
  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  cancelEditing(): void {
    // this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route});
  }
//   deleteRecipe(index: number): void {
    // put this in recipe service
//     this.recipes.splice(index, 1);
//     this.recipesChanged.next(this.recipes.slice());
// }
  onDeleteIngredient(index: number): void {
    // console.log(i);
    // ????
    this.recipeForm.value['ingredients'].splice(index, 1);
    const ingredients = (this.recipeForm.get('ingredients') as FormArray);
    // ingredients = (this.recipeForm.get('ingredients') as FormArray);
    // (this.recipeForm.get('ingredients').controls);
    console.log(ingredients.controls);
// ÷    (this.recipeForm.value)
// ingredient.controls.splice(i, 1);
  }

  onSubmitRecipe(): void {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value.recipeName,
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.imagePath,
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      console.log(this.recipeForm.value);
      // console.log(this.recipeForm.value.recipeName);
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.cancelEditing();
    // this.recipe = {
    //   name: this.recipeForm.value.recipeName,
    //   description: this.recipeForm.value.recipeName,
    //   ingredients: this.recipeForm.value.ingredients,
    //   imagePath: this.recipeForm.value.imagePath,
    // };
  }
  get controls(): any { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
    // (this.recipeForm.get('ingredients') as FormArray)
  }
}
