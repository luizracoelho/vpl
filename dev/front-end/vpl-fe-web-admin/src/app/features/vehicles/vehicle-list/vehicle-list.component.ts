import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleService } from '../vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehicle } from '../models/vehicle';
import { RemoveResult } from 'src/app/shared/models/remove-result';
import { VehicleType } from '../../model/enums/vehicle-type';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {

  vehicles: Vehicle[] = [];
  vehiclesDataSource!: MatTableDataSource<Vehicle>;
  columns: string[] = ['name', 'actions'];

  isLoading: boolean = true;

  constructor(
    private _service: VehicleService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.isLoading = true;

    this._service.list().subscribe({
      next: (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;

        this.vehiclesDataSource = new MatTableDataSource(vehicles);

        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;

        this._snackBar.open(err, 'Ok');
      }
    });
  }

  remove(vehicle: Vehicle): void {
    vehicle.isRemoving = true;

    this._service.remove(vehicle.id).subscribe({
      next: (result: RemoveResult) => {
        if (result.success) {
          this.vehicles = this.vehicles.filter(x => x.id != vehicle.id);
          this.vehiclesDataSource = new MatTableDataSource(this.vehicles);

          this._snackBar.open('Removido com sucesso', 'Ok');
        }
        else
          this._snackBar.open(result.message!, 'Ok');


        vehicle.isRemoving = false;
      },
      error: (err: any) => {
        vehicle.isRemoving = false;

        this._snackBar.open(err, 'Ok');
      }
    });
  }

  getVehicleTypeDescription(type: VehicleType): string {
    return this._service.getVehicleTypeDescription(type);
  }
}
