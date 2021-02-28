import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { head } from 'lodash';
import { Invitation } from 'src/app/shared/models/admin/invitation.model';
import { QuantityUnit } from 'src/app/shared/models/quantityunit.model';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class AdminRecipesService {
  private api: string;
  private controller: string = 'admin/recipes';

  constructor(private http: HttpClient) {
    this.api = `${environment.api.scheme}://${environment.api.hostname}:${environment.api.port}/${environment.api.prefix}/${this.controller}`;
  }

  getQuantityUnits() {
    return this.http.get<QuantityUnit[]>(this.api + '/quantity-units', {
      headers: headers,
    });
  }

  createQuantityUnit(qtyUnit: QuantityUnit) {
    return this.http.post<QuantityUnit>(
      this.api + '/quantity-units',
      JSON.stringify(qtyUnit),
      { headers: headers }
    );
  }

  updateQuantityUnit(id: string, qtyUnit: QuantityUnit) {
    return this.http.put<QuantityUnit>(
      this.api + `/quantity-units/${id}`,
      JSON.stringify(qtyUnit),
      { headers: headers }
    );
  }

  removeQuantityUnit(id: string) {
    return this.http.delete<string>(this.api + `/quantity-units/${id}`, {
      headers: headers,
    });
  }
}
