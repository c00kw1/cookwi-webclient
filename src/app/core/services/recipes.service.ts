import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag } from 'src/app/shared/models/tag.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    responseType: 'json' as const
};

@Injectable({
    providedIn: 'root'
})
export class RecipesService {

    private api: string;
    private controller: string = "recipes";

    constructor(private http: HttpClient) {
        this.api = `${environment.backend.scheme}://${environment.backend.hostname}:${environment.backend.port}/${environment.backend.prefix}/${this.controller}`;
    }

    getAll(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.api, httpOptions);
    }

    createOne(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(this.api, JSON.stringify(recipe), httpOptions);
    }

    //#region Tags

    getAllTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(this.api + '/tags');
    }

    //#endregion
}
