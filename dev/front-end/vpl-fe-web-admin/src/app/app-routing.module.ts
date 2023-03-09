import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandFormComponent } from './features/brand/brand-form/brand-form.component';
import { BrandListComponent } from './features/brand/brand-list/brand-list.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  // Brands
  { path: 'brands', component: BrandListComponent },
  { path: 'brands/form', component: BrandFormComponent },
  { path: 'brands/form/:id', component: BrandFormComponent },

  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
