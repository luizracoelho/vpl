import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferenceYear } from '../models/reference-year';
import { ReferenceYearService } from '../reference-year.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reference-year-form',
  templateUrl: './reference-year-form.component.html',
  styleUrls: ['./reference-year-form.component.scss']
})
export class ReferenceYearFormComponent {
  form!: FormGroup;
  isLoading: boolean = true;
  id!: number;
  options = [{ id: 1, description: 'Fipe' },
  { id: 2, description: 'Molicar' }]

  selectedOption: any;

  constructor(private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _route: ActivatedRoute,
    private _referenceYearService: ReferenceYearService) { }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];

    this.createForm();
    this.find();
  }

  createForm(): void {
    this.form = this._formBuilder.group({
      id: [0],
      year: [null, Validators.required],
      priceReference: [null, Validators.required]
    });
  }

  save(): void {
    let referenceYear: ReferenceYear = this.form.value;

    let req = this.id > 0 ? this._referenceYearService.update(this.id, referenceYear) : this._referenceYearService.save(referenceYear)

    req.subscribe({
      next: (referenceYear: ReferenceYear) => {
        this._snackBar.open("Salvo com sucesso !");
        this.isLoading = false;

        this._location.back();
      },

      error: () => {
        this._snackBar.open("Erro ao salvar ano de referência.");
        this.isLoading = false;
      }
    })
  }

  find() {
    if (!this.id) return;

    this._referenceYearService.find(this.id).subscribe({
      next: (referenceYear: ReferenceYear) => {
        this.form.patchValue(referenceYear);

        // Preenche o formControl com o objeto presente na lista de opções do auto complete.
        this.selectedOption = this.options.find(x => x.id === referenceYear.priceReference);
      }
    });
  }

  remove() {
    this.isLoading = true;

    this._referenceYearService.delete(this.id).subscribe({
      next: () => {
        this._snackBar.open("Removido com sucesso.");
        this.isLoading = false;

        this._location.back();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
