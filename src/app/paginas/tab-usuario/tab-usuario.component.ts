import Swal from 'sweetalert2';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrearUsuarioComponent } from '../../ventanas/crear-usuario/crear-usuario.component';
import { EditUsuarioComponent } from '../../ventanas/edit-usuario/edit-usuario.component';

interface Usuario {
  id: number;
  rol: string;
  usuario: string;
  Nombre: string;
  Apellido: string;
  Correo: string;
  bloqueado?: boolean;
}

@Component({
  selector: 'app-tab-usuario',
  templateUrl: './tab-usuario.component.html',
  styleUrls: ['./tab-usuario.component.css']
})
export class TabUsuarioComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  filterValue: string = '';
  displayedColumns = ['id', 'rol', 'usuario', 'Nombre', 'Apellido', 'Correo', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;

  // Definición de propiedades para la paginación
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(public dialog: MatDialog) {
    // Inicializar la fuente de datos
    const initialData: Usuario[] = [
      { id: 1, rol: 'Admin', usuario: 'admin1', Nombre: 'John', Apellido: 'Doe', Correo: 'john.doe@example.com' },
    { id: 2, rol: 'User', usuario: 'user2', Nombre: 'Jane', Apellido: 'Smith', Correo: 'jane.smith@example.com' },
    { id: 3, rol: 'User', usuario: 'user3', Nombre: 'Michael', Apellido: 'Johnson', Correo: 'michael.johnson@example.com' },
    { id: 4, rol: 'Admin', usuario: 'admin2', Nombre: 'Emily', Apellido: 'Davis', Correo: 'emily.davis@example.com' },
    { id: 5, rol: 'User', usuario: 'user4', Nombre: 'Robert', Apellido: 'Brown', Correo: 'robert.brown@example.com' },
    { id: 6, rol: 'User', usuario: 'user5', Nombre: 'Jessica', Apellido: 'Williams', Correo: 'jessica.williams@example.com' },
    { id: 7, rol: 'User', usuario: 'user6', Nombre: 'William', Apellido: 'Jones', Correo: 'william.jones@example.com' },
    { id: 8, rol: 'User', usuario: 'user7', Nombre: 'Olivia', Apellido: 'Garcia', Correo: 'olivia.garcia@example.com' },
    { id: 9, rol: 'User', usuario: 'user8', Nombre: 'David', Apellido: 'Martinez', Correo: 'david.martinez@example.com' },
    { id: 10, rol: 'Admin', usuario: 'admin3', Nombre: 'Sophia', Apellido: 'Hernandez', Correo: 'sophia.hernandez@example.com' },
    { id: 11, rol: 'User', usuario: 'user9', Nombre: 'James', Apellido: 'Lopez', Correo: 'james.lopez@example.com' },
    { id: 12, rol: 'User', usuario: 'user10', Nombre: 'Ava', Apellido: 'Gonzalez', Correo: 'ava.gonzalez@example.com' },
    { id: 13, rol: 'User', usuario: 'user11', Nombre: 'Alexander', Apellido: 'Wilson', Correo: 'alexander.wilson@example.com' },
    { id: 14, rol: 'User', usuario: 'user12', Nombre: 'Isabella', Apellido: 'Anderson', Correo: 'isabella.anderson@example.com' },
    { id: 15, rol: 'User', usuario: 'user13', Nombre: 'Benjamin', Apellido: 'Thomas', Correo: 'benjamin.thomas@example.com' },
    { id: 16, rol: 'User', usuario: 'user14', Nombre: 'Charlotte', Apellido: 'Taylor', Correo: 'charlotte.taylor@example.com' },
    { id: 17, rol: 'User', usuario: 'user15', Nombre: 'Lucas', Apellido: 'Moore', Correo: 'lucas.moore@example.com' },
    { id: 18, rol: 'User', usuario: 'user16', Nombre: 'Mia', Apellido: 'Jackson', Correo: 'mia.jackson@example.com' },
    { id: 19, rol: 'User', usuario: 'user17', Nombre: 'Henry', Apellido: 'Martin', Correo: 'henry.martin@example.com' },
    { id: 20, rol: 'Admin', usuario: 'admin4', Nombre: 'Amelia', Apellido: 'Lee', Correo: 'amelia.lee@example.com' },
      // Agrega más filas de datos aquí según sea necesario
    ];
    this.dataSource = new MatTableDataSource(initialData);
  }

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.dataSource.data.length / 10); // Cambia 10 al tamaño de página que prefieras
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
    const dialogRef = this.dialog.open(CrearUsuarioComponent, {
      width: '550px', // Ajusta el ancho según tus necesidades
      height: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
      // Aquí puedes manejar los datos ingresados por el usuario, si es necesario
    });
  }

  // Métodos para la paginación
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.goToPage(this.currentPage);
    }
  }

  editar(element: Usuario) {
    // Aquí puedes implementar la lógica para eliminar un producto
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      width: '500px',
      height: '350px',
      data: { nombre: element.Nombre, correo: element.Correo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
    });
  }

  eliminar(element: Usuario): void {
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

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.goToPage(this.currentPage);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    if (this.dataSource.paginator) {
      const startIndex = (this.currentPage - 1) * this.dataSource.paginator.pageSize;
      const endIndex = startIndex + this.dataSource.paginator.pageSize;
      this.dataSource.data = this.dataSource.data.slice(startIndex, endIndex);
    }
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
        case 'rol': return compare(a.rol, b.rol, isAsc);
        case 'usuario': return compare(a.usuario, b.usuario, isAsc);
        case 'Nombre': return compare(a.Nombre, b.Nombre, isAsc);
        case 'Apellido': return compare(a.Apellido, b.Apellido, isAsc);
        case 'Correo': return compare(a.Correo, b.Correo, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
