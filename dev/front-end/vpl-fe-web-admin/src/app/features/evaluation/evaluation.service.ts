import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RemoveResult } from 'src/app/shared/models/remove-result';
import { Evaluation } from './models/evaluation';
import { CreateEvaluation } from './models/create-evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private _http: HttpClient) { }

  list(): Observable<Evaluation[]> {
    return this._http.get<Evaluation[]>(`${environment.api}/prices/evaluations`);
  }

  find(id: number): Observable<Evaluation> {
    return this._http.get<Evaluation>(`${environment.api}/prices/evaluations/${id}`);
  }

  create(brand: CreateEvaluation): Observable<Evaluation> {
    return this._http.post<Evaluation>(`${environment.api}/prices/evaluations`, brand);
  }

  update(id: number, brand: CreateEvaluation): Observable<Evaluation> {
    return this._http.put<Evaluation>(`${environment.api}/prices/evaluations/${id}`, brand);
  }

  remove(id: number): Observable<RemoveResult> {
    return this._http.delete<RemoveResult>(`${environment.api}/prices/evaluations/${id}`);
  }
}
