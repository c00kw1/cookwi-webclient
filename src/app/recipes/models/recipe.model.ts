import { Ingredient } from './ingredient.model';

export class Recipe {
    public Id: string;
    public OwnerId: string;
    public Name: string;
    public Ingredients: Ingredient[];
}
