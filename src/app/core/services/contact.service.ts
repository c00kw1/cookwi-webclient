import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/shared/models/contact.model';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private api: string;
  private controller: string = 'contact';

  constructor(private http: HttpClient) {
    this.api = `${environment.api.scheme}://${environment.api.hostname}:${environment.api.port}/${environment.api.prefix}/${this.controller}`;
  }

  postMessage(message: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.api, JSON.stringify(message), {
      headers: headers,
    });
  }
}
