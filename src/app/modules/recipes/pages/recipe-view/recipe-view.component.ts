import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
    
    public title: string;
    private _recipeId: string;

    public recipe: Recipe;
    
    constructor(private _route: ActivatedRoute,
        private _service: RecipesService,
        private _router: Router) { }
    
    ngOnInit(): void {
        this.title = "Gratin de courgette";
        this._route.paramMap.subscribe(params => {
            this._recipeId = params.get("id");
            this._service.getOne(this._recipeId).subscribe(result => {
                this.recipe = result;
            }, error => {
                // TODO : go to previous route + error message to indicate that we did not find the recipe
            });
        });
    }
    
}
