import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    imports: [
        MatTableModule,
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [
        MatTableModule,
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule
    ],
})
export class MaterialModule { }