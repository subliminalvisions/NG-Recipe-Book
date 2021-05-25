import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { FirebaseDbInfo } from 'src/environments/firebase-db-info';

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Post } from './post.model';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, Observable, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
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

  fetchRecipes(): Observable<Recipe[]> {

    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    // not working yet
    return this.fetchPosts();

  }

  // (method) DataStorageService.fetchPosts(): Observable<Recipe[]>
  fetchPosts(): Observable<Recipe[]> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
      // .get(
      .get<{ [key: string]: Recipe }>(
        this.firebase.dbUrl,
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello There '}),
          params: searchParams,
          responseType: 'json' // text|blob|json
        }
      )
      .pipe(
        // You could either define each property explicitly, like
            // title: string;
            // content: string;
            // id?: string;
        // or allow an arbitrary number of key/value pairs
        // by using the [key: string] notation
        map((responseData: {[key: string]: Recipe} ) => {
            const recipesArray: Recipe[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                recipesArray.push({ ...responseData[key], name: key}); // ??
              }
            }
            console.log(recipesArray);
            return recipesArray;
          }),
          catchError(errorRes => {
            // send to analytics server ?? possibly?
            console.log(errorRes);
            return throwError(errorRes);
          })
      );
    //     .subscribe(posts => {
    //       // ...
    //       // this.isFetching = false;
    //       console.log('posts', posts);
    //       // this.loadedPosts = posts;
    // })
  }

}

