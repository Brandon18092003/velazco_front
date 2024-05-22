import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-userp',
  templateUrl: './crear-userp.component.html',
  styleUrl: './crear-userp.component.css'
})
export class CrearUserpComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA)public data: any) {
    this.form = this.fb.group({
      nombre: { value: data.nombre, disabled: true},
      dni: { value: data.dni, disabled: true },
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
      confirmarContraseña: ['', Validators.required]
    });
  }

  guardar() {
    if (this.form.valid) {
      // Lógica para guardar el usuario
      console.log(this.form.value);
    }
  }
}
