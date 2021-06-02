import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
// import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // DropdownDirective,
    AuthComponent,
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PLaceholderDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    CoreModule
  ],
  // providers: [
  //   // could move to a CORE module to keep this leaner

  // ],
  bootstrap: [AppComponent],
  // entryComponents: [AlertComponent]
  // not needed with ng-v9+
})
export class AppModule { }
