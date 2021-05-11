import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, FormArray, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
    // this.shoppingForm = new FormGroup({
    //   'itemName': new FormControl(null, [Validators.required]),
    //   'quantity': new FormControl(null, [Validators.required])
    // });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onRemoveItem(form: NgForm) {
    // const index = array.indexOf(5);
    // if (index > -1) {
    //   array.splice(index, 1);
    // }
    const value = form.value;
    // const name = this.shoppingForm.value.itemName;
    // const amount = this.shoppingForm.value.quantity;
    const newIngredient = new Ingredient( value.name, value.amount);
    this.slService.removeIngredient(this.editedItemIndex, newIngredient);
    form.reset();

  }

  onReset(form: NgForm) {
    form.reset();
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    // const name = this.shoppingForm.value.itemName;
    // const amount = this.shoppingForm.value.quantity;
    const newIngredient = new Ingredient( value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
  }

}
