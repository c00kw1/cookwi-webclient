import { Step } from './step.model';
import { Ingredient } from './ingredient.model';

export class Recipe {
  public id: string;
  public ownerId: string;
  public dateCreation: Date;
  public title: string;
  public description: string;
  public cookingTime: string;
  public bakingTime: string;
  public imagePath: string;
  public tags: string[];
  public steps: Step[];
  public ingredients: Ingredient[];

  constructor(data: Partial<Recipe> = {}) {
    this.title = '';
    this.description = '';
    this.cookingTime = '00:00';
    this.bakingTime = '00:00';
    this.imagePath = '';
    this.tags = [];
    this.ingredients = [];
    this.steps = [];
    Object.assign(this, data);
  }
}
