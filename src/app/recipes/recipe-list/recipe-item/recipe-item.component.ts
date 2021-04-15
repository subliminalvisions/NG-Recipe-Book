import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // @Input() props: { waitFor: boolean; message: string; };
  @Input() childItem: { name: string; description: string; imagePath: string; };
  // recipes
  // new Recipe('A First Recipe', 'Good Recipe Info', 'https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/30/32/45/tKqC3hipQA2MRyTEsneh_oven-bbq-ribs-02757.jpg'),
  // this.name = name;
  // this.description = desc;
  // this.imagePath = imagePath;
  
  constructor() { }

  ngOnInit(): void {
  }

}
