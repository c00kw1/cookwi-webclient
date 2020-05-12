export class Ingredient {
    public name: string;
    public quantity: number;
    public unit: string;

    constructor(unit: string = "unité") {
        this.unit = unit;
    }
}