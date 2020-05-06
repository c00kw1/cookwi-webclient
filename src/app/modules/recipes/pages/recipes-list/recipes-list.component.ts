import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
    selector: 'app-recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

    public recipes: Recipe[];

    constructor(private service: RecipesService) { }

    ngOnInit(): void {
        this.service.getAll().subscribe(r => {
            this.recipes = r;
        });
    }

}
