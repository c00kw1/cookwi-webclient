import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private api: string;
  private controller: string = 'users';

  constructor(private http: HttpClient) {
    this.api = `${environment.api.scheme}://${environment.api.hostname}:${environment.api.port}/${environment.api.prefix}/${this.controller}`;
  }

  registerUser(id: string, user: User): Observable<User> {
    return this.http.post<User>(
      this.api + '/register/' + id,
      JSON.stringify(user),
      { headers: headers }
    );
  }
}
