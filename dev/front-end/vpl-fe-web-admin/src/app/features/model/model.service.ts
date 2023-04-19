import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RemoveResult } from 'src/app/shared/models/remove-result';
import { environment } from 'src/environments/environment';
import { VehicleType } from './enums/vehicle-type';
import { CreateModel } from './models/create-model';
import { Model } from './models/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(
    private _http: HttpClient
  ) { }

  list(): Observable<Model[]> {
    return this._http.get<Model[]>(`${environment.api}/vehicles/models`);
  }

  listByBrandId(brandId: number): Observable<Model[]> {
    return this._http.get<Model[]>(`${environment.api}/vehicles/models/brand/${brandId}`);
  }

  find(id: number): Observable<Model> {
    return this._http.get<Model>(`${environment.api}/vehicles/models/${id}`);
  }

  create(model: CreateModel): Observable<Model> {
    return this._http.post<Model>(`${environment.api}/vehicles/models`, model);
  }

  update(id: number, model: CreateModel): Observable<Model> {
    return this._http.put<Model>(`${environment.api}/vehicles/models/${id}`, model);
  }

  endProduction(id: number, productionEnd: Date): Observable<boolean> {
    let params = new HttpParams().append('productionEnd', productionEnd.toJSON());

    return this._http.patch<boolean>(`${environment.api}/vehicles/models/${id}/endProduction`, {}, { params });
  }

  remove(id: number): Observable<RemoveResult> {
    return this._http.delete<RemoveResult>(`${environment.api}/vehicles/models/${id}`);
  }

  getVehicleTypeDescription(type: VehicleType): string {
    switch (type) {
      case VehicleType.Car:
        return 'Carro';
      case VehicleType.Moto:
        return 'Motocicleta';
      case VehicleType.Bus:
        return 'Ônibus';
      case VehicleType.Truck:
        return 'Caminhão';
      case VehicleType.Van:
        return 'Van';
      default:
        return '';
    }
  }

}
