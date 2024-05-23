import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-proveedores',
  templateUrl: './crear-proveedores.component.html',
  styleUrl: './crear-proveedores.component.css'
})
export class CrearProveedoresComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      telefono: [ '', Validators.required],
      sitioWeb: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
    });
  }

  guardar() {
    if (this.form.valid) {
      // Lógica para guardar el usuario
      console.log(this.form.value);
    }
  }
}
