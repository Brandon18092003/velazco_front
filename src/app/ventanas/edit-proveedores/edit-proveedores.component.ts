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

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      nombre: {value: data.nombre, disabled: false},
      telefono: {value: data.telefono, disabled: false},
      sitioWeb: {value: data.sitioWeb, disabled: false},
      correo: {value: data.correo, disabled: false},
      direccion: {value: data.direccion, disabled: false}
    });
  }

  guardar() {
    if (this.form.valid) {
      // Lógica para guardar el usuario
      console.log(this.form.value);
    }
  }
}
