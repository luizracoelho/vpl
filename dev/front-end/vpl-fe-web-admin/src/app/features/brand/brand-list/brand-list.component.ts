import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Brand } from '../models/brand';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {

  brands: Brand[] = [];

  constructor(
    private _service: BrandService
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this._service.list().subscribe({
      next: (brands: Brand[]) => {
        this.brands = brands;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }
}
