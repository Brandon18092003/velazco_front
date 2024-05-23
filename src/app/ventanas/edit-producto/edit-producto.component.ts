import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent {
  form: FormGroup;
  imagenUrl: any;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA)public data: any) {
    this.form = this.fb.group({
      nombre: {value: data.nombre, disabled: false},
      descripcion: {value: data.descripcion, disabled: false},
      categoria: {value: data.categoria, disabled: false},
      precio: {value: data.precio, disabled: false},
      stock: {value: data.stock, disabled: false},
      foto: {value: data.imagenUrl, disabled: false}
    });

  }

  // Método para manejar el cambio de la imagen seleccionada
  onFileChange(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
  
    if (file) {
      reader.onload = () => {
        this.imagenUrl = reader.result;
        console.log(this.imagenUrl); // Verifiquemos la URL de la imagen en la consola
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
