import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RecipesService } from 'src/app/core/services/recipes.service';

@Component({
    selector: 'app-list-receipes',
    templateUrl: './receipes-list.component.html',
    styleUrls: ['./receipes-list.component.scss']
})
export class ReceipesListComponent implements OnInit, OnChanges {

    @Input()
    public recipes: Recipe[];
    public showedRecipes: Recipe[];

    public searchText: string;
    public selectedTags: string[] = [];

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    tagCtrl = new FormControl();
    filteredTags: Observable<string[]>;

    allTags: string[] = [];

    @ViewChild('tagInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor(private recipeService: RecipesService) {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['recipes']) {
            this.showedRecipes = this.recipes;
        }
    }

    ngOnInit(): void {
        this.recipeService.getAllTags().subscribe(res => {
            this.allTags = res.map(t => t.name);
            this.filteredTags = this.tagCtrl.valueChanges.pipe(
                startWith(null),
                map((tagName: string | null) => {
                    console.log('map=' + tagName);
                    return tagName ? this._filter(tagName) : this.allTags.slice();
                })
            );
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

    remove(tag: string): void {
        const index = this.selectedTags.indexOf(tag);

        if (index >= 0) {
            this.selectedTags.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        console.log('selected=' + event.option.viewValue);
        this.selectedTags.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.tagCtrl.setValue(null);
      }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allTags.filter(tag => tag.includes(filterValue));
      }

}