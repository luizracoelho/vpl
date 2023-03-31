import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  form!: FormGroup;
  myControl = new FormControl('', Validators.required)
  
  constructor(private _formBuilder: FormBuilder){}

  ngOnInit() { 
    this.form = this._formBuilder.group({
      teste: new FormControl('', Validators.required)
    });
  }

  showForm(): void{
    console.log(this.form)
  }
}
