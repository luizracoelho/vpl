import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../../brand/brand.service';
import { Brand } from '../../brand/models/brand';
import { VehicleType } from '../../model/enums/vehicle-type';
import { Vehicle } from '../models/vehicle';
import { VehicleService } from '../vehicle.service';
import { CreateVehicle } from '../models/create-vehicle';
import { Model } from '../../model/models/model';
import { ModelService } from '../../model/model.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent {
  id?: number;

  form!: FormGroup;
  brands: Brand[] = [];
  models: Model[] = [];
  types: { value: number, text: string }[] = [];

  isLoading: boolean = true;

  myControlBrand = new FormControl<string | Brand>('');
  filteredOptionsBrand!: Observable<Brand[] | undefined>;
  myControlModel = new FormControl<string | Model>('');
  filteredOptionsModel!: Observable<Model[] | undefined>;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: VehicleService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    private _brandService: BrandService,
    private _modelService: ModelService,
  ) { }

  displayFnBrand(brand: Brand): string {
    return brand && brand.name ? brand.name : '';
  }

  displayFnModel(model: Model): string {
    return model && model.name ? model.name : '';
  }


  private _filterBrand(name: string): Brand[] {
    const filterValue = name.toLowerCase();

    return this.brands.filter(optionBrand => optionBrand.name.toLowerCase().includes(filterValue));
  }

  private _filterModel(name: string): Model[] {
    const filterValue = name.toLowerCase();

    return this.models.filter(optionModel => optionModel.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.filteredOptionsBrand = this.myControlBrand.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (typeof value === 'string') {
          this.form.controls['brandId'].setValue(null);
          return value ? this._filterBrand(value as string) : this.brands.slice();
        } else {
          this.form.controls['brandId'].setValue(value!.id);
          return;
        }
      }),
    );

    this.filteredOptionsModel = this.myControlModel.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (typeof value === 'string') {
          this.form.controls['modelId'].setValue(null);
          return value ? this._filterModel(value as string) : this.models.slice();
        } else {
          this.form.controls['modelId'].setValue(value!.id);
          return;
        }
      }),
    );

    this.id = this._route.snapshot.params['id'];

    this.createFrom();

    this.listTypes();

    let reqs = forkJoin({
      brands: this._brandService.list(),
      models: this._modelService.list(),

    });

    if (this.id) {
      reqs = forkJoin({
        brands: this._brandService.list(),
        models: this._modelService.list(),
        vehicle: this._service.find(this.id)
      });
    }

    reqs.subscribe({
      next: ({ brands, models, vehicle }: any) => {
        this.brands = brands;
        this.models = models;
        console.log(models);

        if (vehicle) {
          const brand = this.brands.find(x => x.id == vehicle.brandId);
          const model = this.models.find(x => x.id == vehicle.modelId);

          setTimeout(() => {
            this.myControlBrand.setValue(brand!);
            this.myControlModel.setValue(model!);

            this.form.patchValue(vehicle);
          });
        }

        this.isLoading = false;
      },
      error: (err: any) => {
        this._snackBar.open(err, 'Ok');

        this._router.navigate(['/vehicles']);
      }
    });
  }

  createFrom(): void {
    this.form = this._formBuilder.group({
      id: [0],
      brandId: [null, Validators.required],
      modelId: [null, Validators.required],
      name: ['', Validators.required],
      productionYear: ['', Validators.required],
      modelYear: ['', Validators.required],
      type: [null, Validators.required]
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

      let vehicle: CreateVehicle = this.form.value;

      let req = !this.id ? this._service.create(vehicle) : this._service.update(this.id, vehicle);

      req.subscribe({
        next: _ => {
          this._router.navigate(['/vehicles']);

          this._snackBar.open('Veículo salvo com sucesso!', 'Ok');
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

