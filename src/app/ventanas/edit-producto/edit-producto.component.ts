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

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditProductoComponent>, @Inject(MAT_DIALOG_DATA)public data: any) {
    this.form = this.fb.group({
      nombre: [data ? data.nombre : '', Validators.required],
      descripcion: [data ? data.descripcion : '', Validators.required],
      categoria: [data ? data.categoria : '', Validators.required],
      precio: [data ? data.precio : '', Validators.required],
      stock: [data ? data.stock : '', Validators.required],
      imagen: [data ? data.imagen : '', Validators.required]
    });

    // Inicializar la URL de la imagen con la imagen existente del producto
    this.imagenUrl = data.imagen;
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
