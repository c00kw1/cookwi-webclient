import { Tag } from './tag.model';
import { Step } from './step.model';

export class Recipe {
    public id: string;
    public ownerUid: string;
    public title: string;
    public dateCreation: Date;
    public description: string;
    public imagePath: string;
    public tags: Tag[];
    public steps: Step[];

    constructor() {
        this.title = "";
        this.description = "";
        this.imagePath = "";
        this.tags = [];
        this.steps = [];
    }
}