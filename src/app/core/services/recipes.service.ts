import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({
    'Content-Type': 'application/json'
});

@Injectable({
    providedIn: 'root'
})
export class RecipesService {

    private api: string;
    private controller: string = "recipes";

    constructor(private http: HttpClient) {
        this.api = `${environment.api.scheme}://${environment.api.hostname}:${environment.api.port}/${environment.api.prefix}/${this.controller}`;
    }

    getAll(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.api, { headers: headers });
    }

    getOne(id: string): Observable<Recipe> {
        return this.http.get<Recipe>(this.api + `/${id}`, { headers: headers });
    }

    createOne(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(this.api, JSON.stringify(recipe), { headers: headers });
    }

    sendImage(image: File, recipeId: string): Observable<void> {
        let uploadData = new FormData();
        uploadData.append('file', image, image.name);
        return this.http.post<void>(this.api + "/" + recipeId + "/image", uploadData);
    }

    getAllQuantityUnits(): Observable<string[]> {
        return this.http.get<string[]>(this.api + "/quantity-units", { headers: headers });
    }
}
