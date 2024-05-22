import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-proveedores',
  templateUrl: './edit-proveedores.component.html',
  styleUrl: './edit-proveedores.component.css'
})
export class EditProveedoresComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditProveedoresComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      nombre: [data ? data.nombre : '', Validators.required],
      telefono: [data ? data.telefono : '', Validators.required],
      sitioWeb: [data ? data.sitioWeb : '', Validators.required],
      correo: [data ? data.correo : '', [Validators.required, Validators.email]],
      direccion: [data ? data.direccion : '', Validators.required],
    });
  }

  guardar() {
    if (this.form.valid) {
      // Lógica para guardar el usuario
      console.log(this.form.value);
    }
  }
}
