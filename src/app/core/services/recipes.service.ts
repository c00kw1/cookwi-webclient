import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RecipesService {

    private api: string;
    private controller: string = "Recipes";

    constructor(private http: HttpClient) {
        this.api = `${environment.backend.scheme}://${environment.backend.hostname}:${environment.backend.port}/${this.controller}`;
    }

    getAll(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.api);
    }
}
