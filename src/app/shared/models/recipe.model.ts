import { Tag } from './tag.model';

export class Recipe {
    public id: string;
    public ownerUid: string;
    public title: string;
    public dateCreation: Date;
    public description: string;
    public imagePath: string;
    public tags: Tag[];

    constructor() {
        this.title = "";
        this.description = "";
        this.imagePath = "";
        this.tags = [];
    }
}