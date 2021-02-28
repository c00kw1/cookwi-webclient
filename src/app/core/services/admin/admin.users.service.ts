import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invitation } from 'src/app/shared/models/admin/invitation.model';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  private api: string;
  private controller: string = 'admin/users';

  constructor(private http: HttpClient) {
    this.api = `${environment.api.scheme}://${environment.api.hostname}:${environment.api.port}/${environment.api.prefix}/${this.controller}`;
  }

  generateInvitation() {
    return this.http.get<Invitation>(this.api + '/invitations/create', {
      headers: headers,
    });
  }
}
