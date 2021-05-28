import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { FirebaseDbInfo } from 'src/environments/firebase-db-info';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
// import { Injectable } from '@angular/core';
// import { Post } from './post.model';
// import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
// import { map, catchError, tap } from 'rxjs/operators';
// import { Subject, Observable, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private firebase: FirebaseDbInfo
    ) {}

  // storeRecipes(recipes: Recipe[]) {
  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();

    this.http.put(
      this.firebase.dbUrl,
      recipes
    )
    .subscribe(resp => {
      console.log(resp);
      }
    );
  }

  fetchRecipes() {
  // fetchRecipes(): void {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      // firbase wants token as query param
      return this.http.get<Recipe[]>(
        this.firebase.dbUrl,
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
    }),
    map(
      recipes => {
        return recipes.map(recipe => {
          // ensure that ingredients is at least always set to something
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
    // .subscribe(user => {
    // });
    // this "take" operatior will only grab the latest user and then unsubscribes

    // .pipe(

    // );
    // .subscribe(recipes => {
    //   console.log(recipes);
    //   this.recipeService.setRecipes(recipes);
    // });
  }

  // (method) DataStorageService.fetchPosts(): Observable<Recipe[]>
  // fetchPosts(): Observable<Recipe[]> {
  //   let searchParams = new HttpParams();
  //   searchParams = searchParams.append('print', 'pretty');
  //   searchParams = searchParams.append('custom', 'key');

  //   return this.http
  //     // .get(
  //     .get<{ [key: string]: Recipe }>(
  //       this.firebase.dbUrl,
  //       {
  //         headers: new HttpHeaders({ 'Custom-Header': 'Hello There '}),
  //         params: searchParams,
  //         responseType: 'json' // text|blob|json
  //       }
  //     )
  //     .pipe(
  //       // You could either define each property explicitly, like
  //           // title: string;
  //           // content: string;
  //           // id?: string;
  //       // or allow an arbitrary number of key/value pairs
  //       // by using the [key: string] notation
  //       map((responseData: {[key: string]: Recipe} ) => {
  //           const recipesArray: Recipe[] = [];
  //           for (const key in responseData) {
  //             if (responseData.hasOwnProperty(key)) {
  //               recipesArray.push({ ...responseData[key], name: key}); // ??
  //             }
  //           }
  //           console.log(recipesArray);
  //           return recipesArray;
  //         }),
  //         catchError(errorRes => {
  //           // send to analytics server ?? possibly?
  //           console.log(errorRes);
  //           return throwError(errorRes);
  //         })
  //     );
    //     .subscribe(posts => {
    //       // ...
    //       // this.isFetching = false;
    //       console.log('posts', posts);
    //       // this.loadedPosts = posts;
    // })
  // }

}

