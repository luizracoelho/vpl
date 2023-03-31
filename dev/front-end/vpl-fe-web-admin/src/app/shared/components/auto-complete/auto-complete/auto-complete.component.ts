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
  @Input() options!: string[];
  @Input() errorMessage?: string;
  @Input() appearenceStyle = 'outline';

  filteredOptions!: Observable<string[]>;
  myControl: FormControl = new FormControl('', Validators.required);

  ngOnInit() {
    this.myControl = this.myControlParameter as FormControl;

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
