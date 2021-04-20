import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  // add EventEmitter
  @Output() outputIngred:EventEmitter<any> = new EventEmitter<Ingredient>();
  // @Output() emitCount:EventEmitter<any> = new EventEmitter<number>();
  // Reference firstNameInput variable inside Component
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  // @ViewChild('amountInput') amountInput: ElementRef;
  newIngrid: Ingredient;

  constructor() { }

  ngOnInit(): void {
  }

  onPushIngredFromList() {

    const name = this.nameInput.nativeElement.value;
    const amount = this.amountInput.nativeElement.value;
    console.log(name);
    console.log(amount);

    this.newIngrid = {name: name, amount: amount};
    // this.newIngrid.name = name;
    // this.newIngrid.amount = amount;
    // this.newIngrid.name = 'test 11';
    // this.newIngrid.amount =  3;
    // // name: string, public amount

    // console.log(this.newIngrid);
    
    this.outputIngred.emit(this.newIngrid); 
    // console.log(this.outputIngred);

  }

}
