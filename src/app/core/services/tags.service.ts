import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/shared/models/tag.model';

const headers = new HttpHeaders({
    'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class TagsService {

    private api: string;
    private controller: string = "tags";

    constructor(private http: HttpClient) {
        this.api = `${environment.api.scheme}://${environment.api.hostname}:${environment.api.port}/${environment.api.prefix}/${this.controller}`;
    }

  /**
     * @returns All the tags available
     */
    getAllTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(this.api, { headers: headers });
    }

    /**
     * @returns All the tags the current user has in his recipes
     */
    getMyTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(this.api + '/my', { headers: headers });
    }
}
