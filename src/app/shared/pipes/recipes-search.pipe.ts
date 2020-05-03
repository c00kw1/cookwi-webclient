import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Pipe({
    name: 'recipesSearch'
})
export class RecipesSearchPipe implements PipeTransform {

    transform(items: Recipe[], searchText: string): Recipe[] {
        if (!items || !searchText) return items;

        searchText = searchText.toLowerCase().trim();
        if (!searchText || searchText == '') return items;

        return items.filter(it => { return it.title.toLowerCase().includes(searchText); });
    }

}
