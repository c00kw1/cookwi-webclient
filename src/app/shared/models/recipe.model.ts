import { Tag } from './tag.model';
import { Step } from './step.model';
import { Ingredient } from './ingredient.model';

export class Recipe {
    public id: string;
    public ownerId: string;
    public title: string;
    public dateCreation: Date;
    public description: string;
    public imagePath: string;
    public tags: Tag[];
    public ingredients: Ingredient[];
    public steps: Step[];

    constructor() {
        this.title = "";
        this.description = "";
        this.imagePath = "";
        this.tags = [];
        this.ingredients = [];
        this.steps = [];
    }
}