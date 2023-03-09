import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../brand.service';
import { Brand } from '../models/brand';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {

  id?: number;

  form!: FormGroup;

  isLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: BrandService,
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
      name: ['', Validators.required],
      logo: [null, Validators.required]
    });
  }

  find(): void {
    if (this.id) {
      this._service.find(this.id).subscribe({
        next: (brand: Brand) => {
          this.form.patchValue(brand);
        },
        error: (err: any) => {
          this._snackBar.open(err, 'Ok');

          this._router.navigate(['/brands']);
        }
      })
    }
  }

  save(): void {
    if (this.canSubmit()) {
      this.isLoading = true;

      let brand: Brand = this.form.value;

      let req = !this.id ? this._service.create(brand) : this._service.update(this.id, brand); 

      req.subscribe({
        next: _ => {
          this._router.navigate(['/brands']);

          this._snackBar.open('Marca salva com sucesso!', 'Ok');
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
