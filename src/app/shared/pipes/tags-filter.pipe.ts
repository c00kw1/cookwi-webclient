import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Pipe({
    name: 'tagsFilter',
    pure: false
})
export class TagsFilterPipe implements PipeTransform {

    transform(items: Recipe[], tags: string[]): Recipe[] {
        if (!items || !tags || tags.length == 0) return items;

        return items.filter(it => { return tags.every(t => it.tags.map(e => e.name).includes(t)); });
    }

}
