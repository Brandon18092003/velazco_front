import Swal from 'sweetalert2';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditProductoComponent } from '../../ventanas/edit-producto/edit-producto.component';

interface Producto {
  id: number;
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  bloqueado?: boolean;
}

@Component({
  selector: 'app-table-productos',
  templateUrl: './table-productos.component.html', // Ajusta la ruta según corresponda
  styleUrls: ['./table-productos.component.css'] // Ajusta la ruta según corresponda
})
export class TableProductosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  filterValue: string = '';
  displayedColumns = ['id', 'categoria', 'nombre', 'descripcion', 'precio', 'stock', 'acciones'];
  dataSource: MatTableDataSource<Producto>;

  constructor(public dialog: MatDialog) {
    // Inicializar la fuente de datos
    const initialData: Producto[] = [
      { id: 1, categoria: 'Electrónica', nombre: 'Smartphone', descripcion: 'Teléfono inteligente', precio: 500 , stock: 3, imagen: 'imagen12.png'},
      // Agrega más filas de datos aquí según sea necesario
    ];
    this.dataSource = new MatTableDataSource(initialData);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filterValue = inputElement.value.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(element: Producto) {
    // Aquí puedes implementar la lógica para eliminar un producto
    const dialogRef = this.dialog.open(EditProductoComponent, {
      width: '500px',
      height: '650px',
      data: { nombre: element.nombre, descripcion: element.descripcion, categoria: element.categoria,
        precio: element.precio, stock: element.stock, imagen: element.imagen
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
    });
  }

  eliminar(element: Producto): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF0000', // Rojo para el botón de confirmación
      cancelButtonColor: '#000000', // Negro para el botón de cancelar
      confirmButtonText: 'Sí, eliminar fila',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar la fila aquí
        // this.dataSource = this.dataSource.filter(item => item !== element);
        Swal.fire({
          title: 'Eliminado',
          text: 'La fila ha sido eliminada.',
          icon: 'success',
          confirmButtonColor: '#000000' // Negro para el botón OK de la alerta de eliminación
        });
        element.bloqueado = true;
      }
    });
  }

  crearElemento() {
    const dialogRef = this.dialog.open(EditProductoComponent, {
      width: '500px', // Ajusta el ancho según tus necesidades
      height:'650px',
      data: { nombre: '', descripcion: '', categoria: '', precio: null, stock: null, imagen: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar los datos ingresados por el usuario para crear un nuevo producto
        this.dataSource.data.push(result);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  sortData(sort: { active: string; direction: string }) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'categoria': return compare(a.categoria, b.categoria, isAsc);
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'descripcion': return compare(a.descripcion, b.descripcion, isAsc);
        case 'precio': return compare(a.precio, b.precio, isAsc);
        case 'stock':return compare(a.stock, b.stock, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}