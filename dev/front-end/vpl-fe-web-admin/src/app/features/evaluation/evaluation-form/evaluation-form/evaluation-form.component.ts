import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluationService } from '../../evaluation.service';
import { Evaluation } from '../../models/evaluation';

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

  constructor(
    private _formBuilder: FormBuilder,
    private _service: EvaluationService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];

    this.createFrom();

    this.find();
  }

  createFrom(): void {
    this.form = this._formBuilder.group({
      id: [0],
      year: ['', Validators.required],
      value: ['', Validators.required],
      vehicleId: ['', Validators.required],
      referenceYearId: ['', Validators.required]
    });
  }

  find(): void {
    if (this.id) {
      this._service.find(this.id).subscribe({
        next: (evaluation: Evaluation) => {
          this.form.patchValue(evaluation);
          this.isLoading = false;
        },
        error: (err: any) => {
          this.isLoading = false;
          this._snackBar.open(err, 'Ok');

          this._router.navigate(['/evaluations']);
        }
      })
    }
    else{
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
