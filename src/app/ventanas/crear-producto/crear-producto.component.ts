import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {

  form: FormGroup;
  imagenUrl: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [ '', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      foto: ['', Validators.required]
    });


  }

  // Método para manejar el cambio de la imagen seleccionada
  onFileChange(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
  
    if (file) {
      reader.onload = () => {
        this.imagenUrl = reader.result;
        console.log(this.form.controls['foto'].value); // Verifiquemos la URL de la imagen en la consola
      };
  
      reader.readAsDataURL(file);
    }
  }
  guardar() {
    if (this.form.valid) {
      // Lógica para guardar el usuario
      console.log(this.form.value);
    }
  }
}
