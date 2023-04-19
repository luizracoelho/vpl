import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReferenceYear } from '../models/reference-year';
import { ReferenceYearService } from '../reference-year.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reference-year',
  templateUrl: './reference-year.component.html',
  styleUrls: ['./reference-year.component.scss']
})
export class ReferenceYearComponent {

  isLoading = true;
  referencesDataSource!: MatTableDataSource<ReferenceYear>;
  columns: string[] = ['year','type','actions'];

  typesPriceReference = [{id: 1, description: 'FIPE'},
                         {id: 2, description: 'MOLICAR'}];

  constructor(private _referenceYearService: ReferenceYearService,
              private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this._referenceYearService.list().subscribe({
      next: (references: ReferenceYear[]) => {
        this.referencesDataSource = new MatTableDataSource(references);
        this.isLoading = false;
      }
    })
  }

  delete(id: number){
    this.isLoading = true;

    this._referenceYearService.delete(id).subscribe({
      next: () => {
        this._snackBar.open("Removido com sucesso.");

        this.list();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  displayDescription(id: number): string {
    return this.typesPriceReference.find(x =>  x.id == id)?.description ?? '';
  }
}
