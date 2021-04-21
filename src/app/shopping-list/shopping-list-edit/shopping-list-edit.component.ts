import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('nameInput', {static:false}) nameInput: ElementRef;
  @ViewChild('amountInput', {static:false}) amountInput: ElementRef;
  @Output() outputIngred = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onPushIngredFromList() {
    const name = this.nameInput.nativeElement.value;
    const amount = this.amountInput.nativeElement.value;
    const newIngredient = new Ingredient(
      name, 
      amount);
    // this.newIngrid = {name: name, amount: amount};
    this.outputIngred.emit(newIngredient); 
  }

}
