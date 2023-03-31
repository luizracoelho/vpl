import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RemoveResult } from 'src/app/shared/models/remove-result';
import { environment } from 'src/environments/environment';
import { VehicleType } from '../model/enums/vehicle-type';
import { CreateVehicle } from './models/create-vehicle';
import { Vehicle } from './models/vehicle';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    private _http: HttpClient
  ) { }

  list(): Observable<Vehicle[]> {
    return this._http.get<Vehicle[]>(`${environment.api}/vehicles/vehicles`);
  }

  find(id: number): Observable<Vehicle> {
    return this._http.get<Vehicle>(`${environment.api}/vehicles/vehicles/${id}`);
  }

  create(vehicle: CreateVehicle): Observable<Vehicle> {
    return this._http.post<Vehicle>(`${environment.api}/vehicles/vehicles`, vehicle);
  }

  update(id: number, vehicle: CreateVehicle): Observable<Vehicle> {
    return this._http.put<Vehicle>(`${environment.api}/vehicles/vehicles/${id}`, vehicle);
  }

  endProduction(id: number, productionEnd: Date): Observable<boolean> {
    let params = new HttpParams().append('productionEnd', productionEnd.toJSON());

    return this._http.patch<boolean>(`${environment.api}/vehicles/vehicles/${id}/endProduction`, {}, { params });
  }

  remove(id: number): Observable<RemoveResult> {
    return this._http.delete<RemoveResult>(`${environment.api}/vehicles/vehicles/${id}`);
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
