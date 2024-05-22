import Swal from 'sweetalert2';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditProveedoresComponent } from '../../ventanas/edit-proveedores/edit-proveedores.component';

interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  sitioWeb: string;
  correo: string;
  direccion: string;
  bloqueado?: boolean;
}

@Component({
  selector: 'app-table-proveedores',
  templateUrl: './table-proveedores.component.html',
  styleUrls: ['./table-proveedores.component.css']
})
export class TableProveedoresComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  filterValue: string = '';
  displayedColumns = ['id', 'nombre', 'telefono', 'sitioWeb', 'correo', 'direccion', 'acciones']; // Agregando 'acciones'
  dataSource: MatTableDataSource<Proveedor>;

  constructor(public dialog: MatDialog) {
    const initialData: Proveedor[] = [
      { id: 1, nombre: 'Proveedor A', telefono: '123456789', sitioWeb: 'www.proveedora.com', correo: 'proveedorA@correo.com', direccion: 'Calle 123' },
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

  crearElemento() {
    const dialogRef = this.dialog.open(EditProveedoresComponent, {
      width: '500px', // Ajusta el ancho según tus necesidades
      height:'520px',
      data: {nombre: '', telefono: '', sitioWeb: '', correo: '', direccion: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar los datos ingresados por el usuario para crear un nuevo producto
        this.dataSource.data.push(result);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  editar(element: Proveedor) {
    // Aquí puedes implementar la lógica para eliminar un producto
    const dialogRef = this.dialog.open(EditProveedoresComponent, {
      width: '500px',
      height: '520px',
      data: { nombre: element.nombre, telefono: element.telefono, sitioWeb: element.sitioWeb, correo: element.correo, direccion: element.direccion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
    });
  }

  eliminar(element: Proveedor): void {
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
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'telefono': return compare(a.telefono, b.telefono, isAsc);
        case 'sitioWeb': return compare(a.sitioWeb, b.sitioWeb, isAsc);
        case 'correo': return compare(a.correo, b.correo, isAsc);
        case 'direccion': return compare(a.direccion, b.direccion, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}