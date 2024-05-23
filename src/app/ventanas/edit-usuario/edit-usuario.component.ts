import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})
export class EditUsuarioComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA)public data: any) {
    this.form = this.fb.group({
      nombre: {value: data.nombre, disabled: true},
      correo: {value: data.correo, disabled: true},
      rol: ['', Validators.required],
    });
  }

  guardar() {
    if (this.form.valid) {
      // Lógica para guardar el usuario
      console.log(this.form.value);
    }
  }
}
