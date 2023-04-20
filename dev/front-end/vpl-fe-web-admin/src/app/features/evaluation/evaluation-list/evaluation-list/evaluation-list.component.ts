import { Component } from '@angular/core';
import { Evaluation } from '../../models/evaluation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { RemoveResult } from 'src/app/shared/models/remove-result';
import { EvaluationService } from '../../evaluation.service';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.scss']
})
export class EvaluationListComponent {
  evaluations: Evaluation[] = [];
  evaluationsDataSource!: MatTableDataSource<Evaluation>;
  columns: string[] = ['year', 'vehicleName', 'value', 'actions'];
  isLoading: boolean = true;

  constructor(
    private _service: EvaluationService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.isLoading = true;

    this._service.list().subscribe({
      next: (evaluations: Evaluation[]) => {
        console.log(evaluations);
        
        this.evaluations = evaluations;

        this.evaluationsDataSource = new MatTableDataSource(evaluations);

        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;

        this._snackBar.open(err, 'Ok');
      }
    });
  }

  remove(evaluation: Evaluation): void {
    evaluation.isRemoving = true;

    this._service.remove(evaluation.id).subscribe({
      next: (result: RemoveResult) => {
        if (result.success) {
          this.evaluations = this.evaluations.filter(x => x.id != evaluation.id);
          this.evaluationsDataSource = new MatTableDataSource(this.evaluations);

          this._snackBar.open('Removido com sucesso', 'Ok');
        }
        else
          this._snackBar.open(result.message!, 'Ok');


        evaluation.isRemoving = false;
      },
      error: (err: any) => {
        evaluation.isRemoving = false;

        this._snackBar.open(err, 'Ok');
      }
    });
  }
}
