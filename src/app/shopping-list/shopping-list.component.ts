import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, AfterViewInit {

  // Listen to Ingred from ViewChild
  // Push Ingred to onPushIngred()
  // @ViewChild('nameInput', {static: false}) childIngred: Ingredient;
  // @ViewChild('pRef', {static: false}) pRef: ElementRef;
  childIngred: Ingredient;
  
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 11)
  ];

  constructor() { }

  ngOnInit(): void {
    // console.log('Hello ', this.childIngred.name); 
  }
  // countChange(event) {
  //   this.childIngred = event;
  //   this.pushNum(this.myCount);
  // }
  ngAfterViewInit(): void {
    // console.log(this.pRef.nativeElement.innerHTML); 
    // this.pRef.nativeElement.innerHTML = "DOM updated successfully!!!"; 
  }

  onPushIngred(data: Ingredient){
    this.ingredients.push(data);
    console.log(data);
  }

}
