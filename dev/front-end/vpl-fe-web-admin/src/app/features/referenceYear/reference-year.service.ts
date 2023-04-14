import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../vehicles/models/vehicle';
import { ReferenceYear } from './models/reference-year';
import { HttpClient } from '@angular/common/http';
import { CreateReferenceYear } from './models/create-reference-year';

@Injectable({
  providedIn: 'root'
})
export class ReferenceYearService {

  constructor(private _http: HttpClient) { }

  list(): Observable<ReferenceYear[]> {
    return this._http.get<ReferenceYear[]>(`${environment.api}/prices/referenceYears`);
  }

  find(id: number): Observable<ReferenceYear> {
    return this._http.get<ReferenceYear>(`${environment.api}/prices/referenceYears/${id}`);
  }

  save(referenceYear: CreateReferenceYear): Observable<ReferenceYear> {
    return this._http.post<ReferenceYear>(`${environment.api}/prices/referenceYears`, referenceYear);
  }

  update(id: number, referenceYear: CreateReferenceYear): Observable<ReferenceYear> {
    return this._http.put<ReferenceYear>(`${environment.api}/prices/referenceYears/${id}`, referenceYear);
  }

  delete(id: number): Observable<ReferenceYear> {
    return this._http.delete<ReferenceYear>(`${environment.api}/prices/referenceYears/${id}`);
  }

}
