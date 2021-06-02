import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

const routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
];
@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule
    // you only have access to what you import
  ],
  exports: [RouterModule]
})
export class ShoppingListModule {}
