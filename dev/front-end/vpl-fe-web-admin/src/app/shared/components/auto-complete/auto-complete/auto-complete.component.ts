import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent {
  @Input() myControlParameter!: AbstractControl | null;
  @Input() nameLabel?: string;
  @Input() options!: {id: number, description: string}[];
  @Input() errorMessage?: string;
  @Input() appearenceStyle = 'outline';

  filteredOptions!: Observable<{id: number, description: string}[]>;
  myControl: FormControl = new FormControl('', Validators.required);

  ngOnInit() {
    this.myControl = this.myControlParameter as FormControl;

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: any): {id: number, description: string}[] {
    let filterValue = '';

    if(typeof value != 'string'){
      filterValue = value.description.toLowerCase();
    }

    return this.options.filter(option => option.description.toLowerCase().includes(filterValue)); ;
  }

  displayFn(option: {id: number, description: string}): string {
    return option ? option.description : ''
  }
}
