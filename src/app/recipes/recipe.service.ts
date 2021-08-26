import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  //   private recipes: Recipe[] = [
  //     new Recipe(
  //       'Burger',
  //       'Watt A Burger!',
  //       'https://b.zmtcdn.com/data/pictures/chains/6/18273566/80b00bc9daa926cbbd9eff789af62525.jpg',
  //       [
  //         new Ingredient('Buns', 2),
  //         new Ingredient('Potato', 1),
  //         new Ingredient('Onions', 2),
  //       ]
  //     ),
  //     new Recipe(
  //       'Rajma Chawal',
  //       'Delightful Rajma Chawal served with Onions',
  //       'https://www.indianfoodforever.com/iffwd/wp-content/uploads/rajma-chawal.jpg',
  //       [new Ingredient('Rajma', 2), new Ingredient('Rice', 1)]
  //     ),
  //   ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
