import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { Tag } from 'src/app/shared/models/tag.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TagsService } from 'src/app/core/services/tags.service';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Step } from 'src/app/shared/models/step.model';

@Component({
    selector: 'app-recipes-create',
    templateUrl: './recipes-create.component.html',
    styleUrls: ['./recipes-create.component.scss']
})
export class RecipesCreateComponent implements OnInit {

    public imagePath: string = "";
    public defaultImage: string = "../../../../../assets/no-image-found.png";

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    tagCtrl = new FormControl();
    filteredTags: Observable<Tag[]>;

    public selectedTags: Tag[] = [];
    public allTags: Tag[] = [];

    public recipe: Recipe;
    public form: FormGroup;

    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor(
        private recipesService: RecipesService,
        private tagsService: TagsService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.recipe = new Recipe();
        this.recipe.tags = this.selectedTags;
    }

    ngOnInit(): void {
        this.tagsService.getAllTags().subscribe(res => {
            this.allTags = res;
            this.filteredTags = this.tagCtrl.valueChanges.pipe(
                startWith(null),
                map((tag: string | null) => {
                    return tag ? this._filter(tag) : this.allTags.slice();
                })
            );
        });

        // form group construction
        this.form = this.formBuilder.group(this.recipe);
        // we have to manually set the FormControl for tags because :
        // tags are not coming from an input but from a string[] filled by an input
        // if one day we need to validate tags, this class need transformation again https://www.dev6.com/angular/angular-material-chips-with-reactive-forms-and-custom-validation/
        this.form.controls['tags'].setValue(this.selectedTags);
    }

    onSubmit(newRecipe: Recipe) {
        // we send the recipe
        newRecipe.steps = this.steps;
        this.recipesService.createOne(newRecipe).subscribe(res => {
            this.form.reset();
            this.selectedTags = [];
            this.steps = [];
            this.snackBar.open("Recipe created :-)", "Fermer", { duration: 3000 });
        });
    }

    //#region Tags chips

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our tag
        if ((value || '').trim()) {
            this.selectedTags.push(new Tag(value.trim().toLowerCase()));
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.selectedTags.push(new Tag(event.option.viewValue));
        this.tagInput.nativeElement.value = '';
        this.tagCtrl.setValue(null);
    }

    remove(tag: Tag): void {
        const index = this.selectedTags.findIndex(t => t.name == tag.name);

        if (index >= 0) {
            this.selectedTags.splice(index, 1);
        }
    }

    private _filter(value: string): Tag[] {
        const filterValue = value.toLowerCase();
        return this.allTags.filter(tag => tag.name.includes(filterValue));
    }

    //#endregion

    //#region DragAndDrop

    steps: Step[] = [];

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
        // we have to rebuild all step numbers
        this.steps.forEach((step, index) => {
            step.stepNumber = index + 1;
        });
    }

    addStep(nextIndex: number) {
        this.steps.push(new Step(nextIndex + 1, ""));
    }

    //#endregion
}
