import Swal from 'sweetalert2';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrearPersonalComponent } from '../../ventanas/crear-personal/crear-personal.component';
import { CrearUserpComponent } from '../../ventanas/crear-userp/crear-userp.component';

interface Empleado {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  dni: string;
  cargo: string;
  bloqueado?: boolean;
}

@Component({
  selector: 'app-table-empleados',
  templateUrl: './table-empleados.component.html',
  styleUrls: ['./table-empleados.component.css']
})
export class TableEmpleadosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  filterValue: string = '';
  displayedColumns = ['id', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'telefono','dni', 'cargo', 'acciones'];
  dataSource: MatTableDataSource<Empleado>;

  constructor(public dialog: MatDialog) {
    // Inicializar la fuente de datos
    const initialData: Empleado[] = [
      { id: 1, nombre: 'Juan', apellidoPaterno: 'Perez', apellidoMaterno: 'Gomez',telefono: '123456789', dni: '12345678', cargo: 'Gerente' },
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

  crearUsuario(element: Empleado) {
    // Aquí puedes implementar la lógica para crear un usuario
    const dialogRef = this.dialog.open(CrearUserpComponent, {
      width: '500px',
      data: { nombre: element.nombre, dni: element.dni }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
    });
  }

  eliminar(element: Empleado): void {
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
    const dialogRef = this.dialog.open(CrearPersonalComponent, {
      width: '500px', // Ajusta el ancho según tus necesidades
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
      // Aquí puedes manejar los datos ingresados por el usuario, si es necesario
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
        case 'apellidoPaterno': return compare(a.apellidoPaterno, b.apellidoPaterno, isAsc);
        case 'apellidoMaterno': return compare(a.apellidoMaterno, b.apellidoMaterno, isAsc);
        case 'telefono': return compare(a.telefono, b.telefono, isAsc);
        case 'dni': return compare(a.dni, b.dni, isAsc);
        case 'cargo': return compare(a.cargo, b.cargo, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
