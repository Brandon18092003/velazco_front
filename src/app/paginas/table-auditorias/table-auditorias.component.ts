import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrearUsuarioComponent } from '../../ventanas/crear-usuario/crear-usuario.component';

interface Auditoria {
  id: number;
  evento: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  bloqueado?: boolean;
}

@Component({
  selector: 'app-table-auditorias',
  templateUrl: './table-auditorias.component.html',
  styleUrls: ['./table-auditorias.component.css']
})
export class TableAuditoriasComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  filterValue: string = '';
  displayedColumns = ['id', 'evento', 'descripcion', 'fechaInicio', 'fechaFin', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Auditoria>;

  constructor(public dialog: MatDialog) {
    const initialData: Auditoria[] = [
      { id: 1, evento: 'Evento A', descripcion: 'Descripción del evento A', fechaInicio: '2024-05-20', fechaFin: '2024-05-21', estado: 'Activo' },
      // Agrega más filas de datos aquí según sea necesario
    ];
    this.dataSource = new MatTableDataSource(initialData);
  }

  ngOnInit(): void {}

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
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
    });
  }

  editar(element: Auditoria) {
    // Implementa la lógica para editar una auditoría
  }

  observacion(element: Auditoria) {
    // Implementa la lógica para observación de una auditoría
  }

  eliminar(element: Auditoria) {
    element.bloqueado = true;
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
        case 'evento': return compare(a.evento, b.evento, isAsc);
        case 'descripcion': return compare(a.descripcion, b.descripcion, isAsc);
        case 'fechaInicio': return compare(a.fechaInicio, b.fechaInicio, isAsc);
        case 'fechaFin': return compare(a.fechaFin, b.fechaFin, isAsc);
        case 'estado': return compare(a.estado, b.estado, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}