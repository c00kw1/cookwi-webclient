import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { Tag } from 'src/app/shared/models/tag.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagsService } from 'src/app/core/services/tags.service';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Step } from 'src/app/shared/models/step.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recipes-create',
    templateUrl: './recipes-create.component.html',
    styleUrls: ['./recipes-create.component.scss']
})
export class RecipesCreateComponent implements OnInit {
    
    public image: string | ArrayBuffer = "";
    public imageFile: File;
    public defaultImage: string = "/assets/no-image.jpg";
    
    public recipe: Recipe;
    public form: FormGroup;
    
    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    
    constructor(private _recipesService: RecipesService,
        private _tagsService: TagsService,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _router: Router
        )
    {
        this.recipe = new Recipe();
        this.recipe.tags = this.selectedTags;
        this.ingredients.push(new Ingredient());
        this.steps.push(new Step(1, ""))
    }
        
    ngOnInit(): void {
        this._tagsService.getAllTags().subscribe(res => {
            this.allTags = res;
            this.filteredTags = this.tagCtrl.valueChanges.pipe(
                startWith(null),
                map((tag: string | null) => {
                    return tag ? this._filter(tag) : this.allTags.slice();
                })
                );
            });
            
        this._recipesService.getAllQuantityUnits().subscribe(res => {
            this.quantityUnits = res;
        });
        
        // form group construction
        this.form = this._formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            cookingTime: ['00:00', Validators.required],
            bakingTime: ['00:00'],
            tags: [this.selectedTags],
            ingredients: [this.ingredients, Validators.minLength(1)],
            steps: [this.steps, Validators.minLength(1)],
        });
        // we have to manually set the FormControl for tags because :
        // tags are not coming from an input but from a string[] filled by an input
        // if one day we need to validate tags, this class need transformation again https://www.dev6.com/angular/angular-material-chips-with-reactive-forms-and-custom-validation/
        this.tagCtrl.setValue(this.selectedTags);
    }
        
    onSubmit(): void {
        if (!this.form.valid) {
            this._snackBar.open("Des champs ne sont pas correct", "Fermer", { duration: 5_000 });
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
            steps: this.form.value['steps']
        };
        this._recipesService.createOne(newRecipe).subscribe(res => {
            this._recipesService.sendImage(this.imageFile, res.id).subscribe(res => {
                this.form.reset();
                this.image = "";
                this.imageFile = undefined;
                this.selectedTags = [];
                this.ingredients = [];
                this.quantityUnits = [];
                this.steps = [];
                this._router.navigate(["recipes/list"]).then(() => {
                    this._snackBar.open("Recette ajoutée !", "Fermer", { duration: 5_000 });
                });
            });
        });
    }
        
    onImageAdded(event): void {
        if (event.target.files && event.target.files[0]) {
            this.imageFile = event.target.files[0];
            if (this.imageFile.type != 'image/jpeg' && this.imageFile.type != 'image/png') {
                this._snackBar.open("Mauvais format d'image !", "Fermer", { duration: 5_000 });
                return;
            }
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event) => {
                this.image = event.target.result;
            }
        }
    }
        
    //#region Tags chips
    
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    tagCtrl = new FormControl();
    filteredTags: Observable<Tag[]>;
    
    public selectedTags: Tag[] = [];
    public allTags: Tag[] = [];
    
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
    
    //#region Ingredients
    
    quantityUnits: string[] = [];
    ingredients: Ingredient[] = [];
    
    add_ingredient() {
        this.ingredients.push(new Ingredient());
    }
    
    delete_ingredient(index: number) {
        this.ingredients.splice(index, 1);
    }
    
    //#endregion
    
    //#region Steps
    
    steps: Step[] = [];
    
    drop_step(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
        // we have to rebuild all step numbers
        this.steps.forEach((step, index) => {
            step.stepNumber = index + 1;
        });
    }
    
    add_step(nextIndex: number) {
        this.steps.push(new Step(nextIndex + 1, ""));
    }
    
    delete_step(index: number) {
        this.steps.splice(index, 1);
    }
    
    //#endregion
    
    computeTotalTime(time1: string, time2: string): string {
        var hour1 = parseInt(time1.split(':')[0]) || 0;
        var hour2 = parseInt(time2.split(':')[0]) || 0;
        var minute1 = parseInt(time1.split(':')[1]) || 0;
        var minute2 = parseInt(time2.split(':')[1]) || 0;
        
        return `${hour1+hour2}h ${minute1+minute2}min`;
    }
}
        