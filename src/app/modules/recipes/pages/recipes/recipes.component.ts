import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

    public recipes: Recipe[];

    constructor(private service: RecipesService) { }

    ngOnInit(): void {
        this.service.getAll().subscribe(r => {
            this.recipes = r;
        });
    }

}
