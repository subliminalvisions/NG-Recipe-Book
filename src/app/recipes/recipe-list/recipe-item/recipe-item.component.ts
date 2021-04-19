import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  // @Input() childItem: { name: string; description: string; imagePath: string; };
  // @EventEmitter()cData: Recipe<EventEmitter>();
  // @Output() recipeData = new EventEmitter<Recipe>();
  @Output() recipeSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected() {
    console.log(this.recipe);
    // this.recipeData.emit(this.recipe);
    this.recipeSelected.emit();
  }

}
