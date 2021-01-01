import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  SimpleDialogComponent,
  SimpleDialogData,
} from 'src/app/shared/components/simple-dialog/simple-dialog.component';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent implements OnInit {
  public lodash = _;
  public loading: boolean;
  public defaultImage: string = '/assets/no-image.jpg';

  private recipe$: Observable<Recipe>;
  public recipe: Recipe;

  constructor(
    private _route: ActivatedRoute,
    private _service: RecipesService,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.recipe$ = this._service.getOne(params.get('id'));
      this.recipe$.subscribe(
        (result) => {
          this.loading = false;
          this.recipe = result;
        },
        (error) => {
          let dialog = this.openDialog({
            title: 'Oups ...',
            message:
              'Une erreur est survenue pendant le chargement de la recette.',
            cancelButton: 'Retour',
            cancelButtonIcon: 'undo',
          });
          dialog.afterClosed().subscribe((r) => {
            this._router.navigate(['recipes/list']);
          });
        }
      );
    });
  }

  openDialog(data: SimpleDialogData): MatDialogRef<SimpleDialogComponent, any> {
    return this._dialog.open(SimpleDialogComponent, {
      data: data,
    });
  }
}
