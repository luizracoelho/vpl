import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandFormComponent } from './features/brand/brand-form/brand-form.component';
import { BrandListComponent } from './features/brand/brand-list/brand-list.component';
import { HomeComponent } from './features/home/home.component';
import { ModelFormComponent } from './features/model/model-form/model-form.component';
import { ModelListComponent } from './features/model/model-list/model-list.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { VehicleFormComponent } from './features/vehicles/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './features/vehicles/vehicle-list/vehicle-list.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AppGuard } from './app-guard';
import { ReferenceYearComponent } from './features/referenceYear/reference-year-list/reference-year.component';
import { ReferenceYearFormComponent } from './features/referenceYear/reference-year-form/reference-year-form.component';

const routes: Routes = [
  { path: 'login', component: LoginLayoutComponent },
  {
    path: '', canActivate: [AppGuard], canActivateChild: [AppGuard], component: DefaultLayoutComponent, children: [
      { path: '', component: HomeComponent },

      // Brands
      { path: 'brands', component: BrandListComponent },
      { path: 'brands/form', component: BrandFormComponent },
      { path: 'brands/form/:id', component: BrandFormComponent },

      // Models
      { path: 'models', component: ModelListComponent },
      { path: 'models/form', component: ModelFormComponent },
      { path: 'models/form/:id', component: ModelFormComponent },

      // Vehicles
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'vehicles/form', component: VehicleFormComponent },
      { path: 'vehicles/form/:id', component: VehicleFormComponent },

      // Reference Year
      {path: 'referenceYear', component: ReferenceYearComponent},
      {path: 'referenceYear/form', component: ReferenceYearFormComponent},
      {path: 'referenceYear/form/:id', component: ReferenceYearFormComponent},


      { path: '**', component: NotFoundComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
