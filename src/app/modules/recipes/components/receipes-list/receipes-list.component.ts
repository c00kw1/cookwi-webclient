import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-list-receipes',
    templateUrl: './receipes-list.component.html',
    styleUrls: ['./receipes-list.component.scss']
})
export class ReceipesListComponent implements OnInit {

    @Input()
    public recipes: Recipe[];

    public tags: Tag[] = [
        { name: "Dinner" },
        { name: "Light" }
    ];

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor() { }

    ngOnInit(): void {
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.tags.push({ name: value.trim() });
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(tag: Tag): void {
        const index = this.tags.indexOf(tag);

        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    }

}
export interface Tag {
    name: string;
}