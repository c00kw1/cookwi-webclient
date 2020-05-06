import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { Tag } from 'src/app/shared/models/tag.model';

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
    filteredTags: Observable<string[]>;

    public selectedTags: string[] = [];
    public allTags: string[] = [];

    public recipe: Recipe;
    public createForm: FormGroup;

    @ViewChild('tagInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor(
        private recipeService: RecipesService,
        private formBuilder: FormBuilder
    ) {
        this.recipe = new Recipe();
    }

    ngOnInit(): void {
        this.recipeService.getAllTags().subscribe(res => {
            this.allTags = res.map(t => t.name);
            this.filteredTags = this.tagCtrl.valueChanges.pipe(
                startWith(null),
                map((tagName: string | null) => {
                    return tagName ? this._filter(tagName) : this.allTags.slice();
                })
            );
        });
        // form construction
        this.createForm = this.formBuilder.group(this.recipe);
    }

    onSubmit(newRecipe: Recipe) {
        // we get the tags from input and we push them into the new recipe
        newRecipe.tags = [];
        this.selectedTags.forEach(name => newRecipe.tags.push(new Tag(name)));
        // we send the recipe
        this.recipeService.createOne(newRecipe).subscribe(res => {
            this.createForm.reset();
            console.log('Created : ', res);
        });
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.selectedTags.push(value.trim().toLowerCase());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.selectedTags.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.tagCtrl.setValue(null);
    }

    remove(tag: string): void {
        const index = this.selectedTags.indexOf(tag);

        if (index >= 0) {
            this.selectedTags.splice(index, 1);
        }
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allTags.filter(tag => tag.includes(filterValue));
    }

}
