import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { RemoveResult } from 'src/app/shared/models/remove-result';
import { VehicleType } from '../enums/vehicle-type';
import { ModelService } from '../model.service';
import { Model } from '../models/model';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent {

  models: Model[] = [];
  modelsDataSource!: MatTableDataSource<Model>;
  columns: string[] = ['name', 'brandName', 'type', 'actions'];

  isLoading: boolean = true;

  constructor(
    private _service: ModelService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.isLoading = true;

    this._service.list().subscribe({
      next: (models: Model[]) => {
        this.models = models;

        this.modelsDataSource = new MatTableDataSource(models);

        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;

        this._snackBar.open(err, 'Ok');
      }
    });
  }

  remove(model: Model): void {
    model.isRemoving = true;

    this._service.remove(model.id).subscribe({
      next: (result: RemoveResult) => {
        if (result.success) {
          this.models = this.models.filter(x => x.id != model.id);
          this.modelsDataSource = new MatTableDataSource(this.models);

          this._snackBar.open('Removido com sucesso', 'Ok');
        }
        else
          this._snackBar.open(result.message!, 'Ok');


        model.isRemoving = false;
      },
      error: (err: any) => {
        model.isRemoving = false;

        this._snackBar.open(err, 'Ok');
      }
    });
  }

  getVehicleTypeDescription(type: VehicleType): string {
    return this._service.getVehicleTypeDescription(type);
  }
}
