import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SimpleDialogComponent, SimpleDialogData } from 'src/app/shared/components/simple-dialog/simple-dialog.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
    
    public loading: boolean;
    public recipe$: Observable<Recipe>;
    
    constructor(private _route: ActivatedRoute,
        private _service: RecipesService,
        private _router: Router,
        private _dialog: MatDialog) { }
    
    ngOnInit(): void {
        this.loading = true;
        this._route.paramMap.subscribe(params => {
            this.recipe$ = this._service.getOne(params.get("id"));
            this.recipe$.subscribe(result => {
                this.loading = false;
            }, error => {
                this.loading = false;
                let dialog = this.openDialog({ title: "Erreur", message: "Une erreur est survenue pendant le chargement de la recette." });
                dialog.afterClosed().subscribe(r => {
                    this._router.navigate(['recipes/list']);
                });
            });
        });
    }

    openDialog(data: SimpleDialogData): MatDialogRef<SimpleDialogComponent, any> {
        return this._dialog.open(SimpleDialogComponent, {
            width: "400px",
            data: data
        });
    }
    
}
