import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Step } from 'src/app/shared/models/step.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from 'src/app/shared/components/simple-dialog/simple-dialog.component';
import * as _ from 'lodash';
import { QuantityUnit } from 'src/app/shared/models/quantityunit.model';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss'],
})
export class RecipesEditComponent implements OnInit {
  public image: string | ArrayBuffer = '';
  public imageFile: File;
  public defaultImage: string = '/assets/no-image.jpg';

  public recipe: Recipe;
  public form: FormGroup;

  public showSpin: boolean;
  public editMode: boolean;
  public editId: string;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private _recipesService: RecipesService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.editMode = false;
    this.showSpin = false;
    // init the recipe
    this.recipe = new Recipe();
    this.recipe.ingredients.push(new Ingredient());
    this.recipe.steps.push(new Step(1, ''));
  }

  ngOnInit(): void {
    this.resetForm();

    // gather recipe if needed, and init angular form
    let id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = id;
      this.editMode = true;
      // we are in edit mode, not create
      this._recipesService.getOne(id).subscribe(
        (res) => {
          this.defaultImage = res.imagePath ?? this.defaultImage;
          this.resetForm(res);
        },
        (err) => {
          this._dialog
            .open(SimpleDialogComponent, {
              data: {
                title: 'Recette introuvable',
                message: "La recette que vous tentez de modifier n'existe pas.",
                closeButton: 'Retour',
                closeButtonIcon: 'undo',
              },
            })
            .afterClosed()
            .subscribe(() => {
              this._router.navigate(['recipes/list']);
            });
        }
      );
    }

    // gather all quantity units
    this._recipesService.getAllQuantityUnits().subscribe((res) => {
      this.quantityUnits = res;
    });

    // gather all available tags
    this._recipesService.getAllTags().subscribe((res) => {
      this.allTags = res;
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => {
          return tag ? this._filter(tag) : this.allTags.slice();
        })
      );
    });
  }

  resetForm(recipe: Partial<Recipe> = {}): void {
    this.recipe = new Recipe(recipe);
    this.recipe.steps = _.orderBy(this.recipe.steps, 'position');
    this.form = this._formBuilder.group({
      title: [this.recipe.title, Validators.required],
      description: [this.recipe.description, Validators.required],
      cookingTime: [this.recipe.cookingTime, Validators.required],
      bakingTime: [this.recipe.bakingTime],
      tags: [this.recipe.tags],
      ingredients: [this.recipe.ingredients, Validators.minLength(1)],
      steps: [this.recipe.steps, Validators.minLength(1)],
    });
    // we have to manually set the FormControl for tags because :
    // tags are not coming from an input but from a string[] filled by an input
    // if one day we need to validate tags, this class need transformation again https://www.dev6.com/angular/angular-material-chips-with-reactive-forms-and-custom-validation/
    this.tagCtrl.setValue(this.recipe.tags);
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this._snackBar.open('Des champs ne sont pas correct', 'Fermer', {
        duration: 5_000,
      });
      return;
    }
    // we send the recipe
    let newRecipe: Recipe = {
      id: '',
      ownerId: '',
      imagePath: '',
      dateCreation: new Date(),
      title: this.form.value['title'],
      description: this.form.value['description'],
      cookingTime: this.form.value['cookingTime'],
      bakingTime: this.form.value['bakingTime'],
      tags: this.form.value['tags'],
      ingredients: this.form.value['ingredients'],
      steps: this.form.value['steps'],
    };
    this.showSpin = true;
    let postRecipe = this.editMode
      ? this._recipesService.editOne(this.editId, newRecipe)
      : this._recipesService.createOne(newRecipe);
    // we post the recipe
    postRecipe.subscribe(
      (res) => {
        // once the recipe is posted, we need to upload the image, if needed
        if (this.imageFile) {
          this._recipesService
            .sendImage(this.imageFile, res.id)
            .subscribe((r) => this.afterRecipeSent(res.id));
        } else {
          this.afterRecipeSent(res.id);
        }
      },
      (err) => {
        this._snackBar.open(
          'Une erreur est survenue. Réessayez svp.',
          'Fermer',
          {
            duration: 8_000,
          }
        );
        this.showSpin = false;
      }
    );
  }

  afterRecipeSent(recipeId: string): void {
    // we reset form and various variables
    this.form.reset();
    this.image = '';
    this.imageFile = undefined;
    this.recipe = new Recipe();
    this.quantityUnits = [];
    this.showSpin = false;
    // we navigate to list
    this._router.navigate(['recipes/view/' + recipeId]).then(() => {
      this._snackBar.open(
        this.editMode
          ? 'Recette modifiée avec succès'
          : 'Recette ajoutée avec succès',
        'Fermer',
        {
          duration: 5_000,
        }
      );
    });
  }

  onImageAdded(event): void {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      if (
        this.imageFile.type != 'image/jpeg' &&
        this.imageFile.type != 'image/png'
      ) {
        this._snackBar.open("Mauvais format d'image !", 'Fermer', {
          duration: 5_000,
        });
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.image = event.target.result;
      };
    }
  }

  //#region Tags chips

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;

  public allTags: string[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.recipe.tags.push(value.trim().toLowerCase());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.recipe.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.recipe.tags.findIndex((t) => t == tag);

    if (index >= 0) {
      this.recipe.tags.splice(index, 1);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter((tag) => tag.includes(filterValue));
  }

  //#endregion

  //#region Ingredients

  quantityUnits: QuantityUnit[] = [];

  add_ingredient() {
    this.recipe.ingredients.push(new Ingredient());
  }

  delete_ingredient(index: number) {
    this._dialog
      .open(SimpleDialogComponent, {
        data: {
          title: 'Confirmation',
          message: "Souhaitez-vous supprimer l'ingrédient ?",
          validateButton: 'Confirmer',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.recipe.ingredients.splice(index, 1);
        }
      });
  }

  //#endregion

  //#region Steps

  drop_step(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.recipe.steps, event.previousIndex, event.currentIndex);
    // we have to rebuild all step numbers
    this.recipe.steps.forEach((step, index) => {
      step.position = index + 1;
    });
  }

  add_step(nextIndex: number) {
    this.recipe.steps.push(new Step(nextIndex + 1, ''));
  }

  delete_step(index: number) {
    this._dialog
      .open(SimpleDialogComponent, {
        data: {
          title: 'Confirmation',
          message: "Souhaitez-vous supprimer l'étape ?",
          validateButton: 'Confirmer',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.recipe.steps.splice(index, 1);
        }
      });
  }

  //#endregion

  computeTotalTime(time1: string, time2: string): string {
    var hour1 = parseInt(time1.split(':')[0]) || 0;
    var hour2 = parseInt(time2.split(':')[0]) || 0;
    var minute1 = parseInt(time1.split(':')[1]) || 0;
    var minute2 = parseInt(time2.split(':')[1]) || 0;

    return `${hour1 + hour2}h ${minute1 + minute2}min`;
  }
}
