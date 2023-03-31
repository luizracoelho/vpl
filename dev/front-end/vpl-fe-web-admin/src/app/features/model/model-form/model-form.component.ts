import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin, map, Observable, startWith } from 'rxjs';
import { BrandService } from '../../brand/brand.service';
import { Brand } from '../../brand/models/brand';
import { VehicleType } from '../enums/vehicle-type';
import { ModelService } from '../model.service';
import { Model } from '../models/model';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss']
})
export class ModelFormComponent {

  id?: number;

  form!: FormGroup;
  brands: Brand[] = [];
  types: { value: number, text: string }[] = [];

  isLoading: boolean = true;

  myControl = new FormControl<string | Brand>('');
  filteredOptions!: Observable<Brand[] | undefined>;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: ModelService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    private _brandService: BrandService,
  ) { }

  displayFn(brand: Brand): string {
    return brand && brand.name ? brand.name : '';
  }

  private _filter(name: string): Brand[] {
    const filterValue = name.toLowerCase();

    return this.brands.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (typeof value === 'string') {
          this.form.controls['brandId'].setValue(null);
          return value ? this._filter(value as string) : this.brands.slice();
        } else {
          this.form.controls['brandId'].setValue(value!.id);
          return;
        }
      }),
    );

    this.id = this._route.snapshot.params['id'];

    this.createFrom();

    this.listTypes();

    let reqs = forkJoin({
      brands: this._brandService.list(),
    });

    if (this.id) {
      reqs = forkJoin({
        brands: this._brandService.list(),
        model: this._service.find(this.id)
      });
    }

    reqs.subscribe({
      next: ({ brands, model }: any) => {
        this.brands = brands;

        if (model) {
          const brand = this.brands.find(x => x.id == model.brandId);

          setTimeout(() => {
            this.myControl.setValue(brand!);

            this.form.patchValue(model);
          });
        }

        this.isLoading = false;
      },
      error: (err: any) => {
        this._router.navigate(['/models']);
      }
    });
  }

  createFrom(): void {
    this.form = this._formBuilder.group({
      id: [0],
      brandId: [null, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      productionStart: [null, Validators.required]
    });
  }

  listTypes(): void {
    this.types.push({ value: VehicleType.Car, text: this._service.getVehicleTypeDescription(VehicleType.Car) });
    this.types.push({ value: VehicleType.Moto, text: this._service.getVehicleTypeDescription(VehicleType.Moto) });
    this.types.push({ value: VehicleType.Bus, text: this._service.getVehicleTypeDescription(VehicleType.Bus) });
    this.types.push({ value: VehicleType.Truck, text: this._service.getVehicleTypeDescription(VehicleType.Truck) });
    this.types.push({ value: VehicleType.Van, text: this._service.getVehicleTypeDescription(VehicleType.Van) });
  }

  save(): void {
    if (this.canSubmit()) {
      this.isLoading = true;

      let model: Model = this.form.value;

      let req = !this.id ? this._service.create(model) : this._service.update(this.id, model);

      req.subscribe({
        next: _ => {
          this._router.navigate(['/models']);

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
