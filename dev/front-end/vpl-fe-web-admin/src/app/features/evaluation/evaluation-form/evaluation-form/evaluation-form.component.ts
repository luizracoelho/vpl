import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluationService } from '../../evaluation.service';
import { Evaluation } from '../../models/evaluation';
import { Vehicle } from 'src/app/features/vehicles/models/vehicle';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { VehicleService } from 'src/app/features/vehicles/vehicle.service';
import { ReferenceYearService } from 'src/app/features/referenceYear/reference-year.service';
import { ReferenceYear } from 'src/app/features/referenceYear/models/reference-year';
import { EvaluationHubService } from '../../evaluation-hub.service';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.scss']
})
export class EvaluationFormComponent {
  currencyOptions = {
    prefix: 'R$ ',
    thousands: '.',
    precision: 2,
    decimal: ','
  };

  id?: number;
  form!: FormGroup;
  isLoading: boolean = true;
  vehicles: Vehicle[] = [];
  referenceYears: ReferenceYear[] = [];
  types: { value: number, text: string }[] = [];
  selectedVehicle?: Vehicle;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: EvaluationService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    private _vehicleService: VehicleService,
    private _referenceYearService: ReferenceYearService,
    private _evaluationHubService: EvaluationHubService
  ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];

    this.createFrom();

    let reqs = forkJoin({
      vehicles: this._vehicleService.list(),
      referenceYears: this._referenceYearService.list(),
    });

    if (this.id) {
      reqs = forkJoin({
        vehicles: this._vehicleService.list(),
        referenceYears: this._referenceYearService.list(),

        evaluation: this._service.find(this.id)
      });
    }

    reqs.subscribe({
      next: ({ vehicles, referenceYears, evaluation }: any) => {
        this.vehicles = vehicles;
        this.referenceYears = referenceYears;

        if (evaluation) {
          this.form.patchValue(evaluation);

          this.selectedVehicle = this.vehicles.find(x => x.id == evaluation.vehicleId);
        }

        this.isLoading = false;
      },
      error: (err: any) => {
        this._router.navigate(['/evaluations']);
      }
    });
  }

  createFrom(): void {
    this.form = this._formBuilder.group({
      id: [0],
      year: ['', Validators.required],
      value: ['', Validators.required],
      vehicleId: [null, Validators.required],
      referenceYearId: ['', Validators.required]
    });
  }

  find(): void {
    if (this.id) {
      this._service.find(this.id).subscribe({
        next: (evaluation: Evaluation) => {
          this.form.patchValue(evaluation);
          this.selectedVehicle = this.vehicles.find(x => x.id == evaluation.vehicleId);

          this.isLoading = false;
        },
        error: (err: any) => {
          this.isLoading = false;
          this._snackBar.open(err, 'Ok');

          this._router.navigate(['/evaluations']);
        }
      })
    }
    else {
      this.isLoading = false;
    }
  }

  save(): void {
    if (this.canSubmit()) {

      let evaluation: Evaluation = this.form.value;

      let req = !this.id ? this._service.create(evaluation) : this._service.update(this.id, evaluation);

      req.subscribe({
        next: _ => {
          this.isLoading = false;

          this._router.navigate(['/evaluations']);

          this._snackBar.open('Avaliação salva com sucesso!', 'Ok');

          // Notificação SignalR
          if (!this.id)
          this._evaluationHubService.sendCreated(`Avaliação do veículo ${evaluation.vehicleId}, para o ano ${evaluation.year} no valor de ${evaluation.value.toFixed(2)} foi inserida.`);
          else
          this._evaluationHubService.sendUpdated(`Avaliação do veículo ${evaluation.vehicleId}, para o ano ${evaluation.year} no valor de ${evaluation.value.toFixed(2)} foi alterada.`);
        },
        error: (err: any) => {
          this._snackBar.open(err, 'Ok');

          this.isLoading = false;
        }
      });
    }
  }

  canSubmit(): boolean {
    return !this.isLoading && this.form.valid;
  }
}
