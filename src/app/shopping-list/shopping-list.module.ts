import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { SharedModule } from '../shared/shared.module';

const routes = [
  // { path: 'shopping-list', component: ShoppingListComponent },
  { path: '', component: ShoppingListComponent },
];
@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    // you only have access to what you import
  ],
  exports: [RouterModule]
})
export class ShoppingListModule {}
