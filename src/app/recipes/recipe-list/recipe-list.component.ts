import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  myProps = { waitFor: true, message: 'foo' };

  recipes: Recipe[] = [
    new Recipe('A First Recipe', 'Good Recipe Info', 'https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/30/32/45/tKqC3hipQA2MRyTEsneh_oven-bbq-ribs-02757.jpg'),
    new Recipe('Second Recipe', 'Bad Recipe - don\'t do it', 'https://live.staticflickr.com/2673/4043259082_4dc86d5d3c_b.jpg'),
    new Recipe('Weird Recipe', 'Just Weird, idk just think about it it', 'https://cdn.pixabay.com/photo/2018/01/29/00/26/joker-3114977__340.jpg') 
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
