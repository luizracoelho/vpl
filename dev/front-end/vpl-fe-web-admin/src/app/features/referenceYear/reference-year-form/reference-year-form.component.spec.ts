import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceYearFormComponent } from './reference-year-form.component';

describe('ReferenceYearFormComponent', () => {
  let component: ReferenceYearFormComponent;
  let fixture: ComponentFixture<ReferenceYearFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceYearFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceYearFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
