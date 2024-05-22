import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableAuditoriasItem {
  id: number;
  evento: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableAuditoriasItem[] = [
  {id: 1, evento: 'Conferencia de Tecnología', descripcion: 'Evento anual sobre avances tecnológicos', fechaInicio: '2024-06-01', fechaFin: '2024-06-03', estado: 'Activo'},
  {id: 2, evento: 'Feria de Empleo', descripcion: 'Encuentro entre empresas y potenciales empleados', fechaInicio: '2024-07-15', fechaFin: '2024-07-16', estado: 'Activo'},
  {id: 3, evento: 'Taller de Marketing Digital', descripcion: 'Capacitación sobre estrategias de marketing en línea', fechaInicio: '2024-05-21', fechaFin: '2024-05-22', estado: 'Inactivo'},
  {id: 4, evento: 'Exposición de Arte Moderno', descripcion: 'Muestra de obras de arte contemporáneo', fechaInicio: '2024-08-10', fechaFin: '2024-08-12', estado: 'Activo'},
  {id: 5, evento: 'Seminario de Educación', descripcion: 'Debates y charlas sobre métodos educativos', fechaInicio: '2024-09-05', fechaFin: '2024-09-06', estado: 'Activo'},
  {id: 6, evento: 'Feria de Ciencias', descripcion: 'Exposición de proyectos científicos escolares', fechaInicio: '2024-10-01', fechaFin: '2024-10-02', estado: 'Activo'},
  {id: 7, evento: 'Congreso de Medicina', descripcion: 'Actualización en prácticas y tecnologías médicas', fechaInicio: '2024-11-11', fechaFin: '2024-11-13', estado: 'Activo'},
  {id: 8, evento: 'Festival de Cine', descripcion: 'Proyección de películas independientes', fechaInicio: '2024-12-01', fechaFin: '2024-12-05', estado: 'Activo'},
  {id: 9, evento: 'Simposio de Ingeniería', descripcion: 'Reunión de ingenieros para compartir conocimientos', fechaInicio: '2024-03-15', fechaFin: '2024-03-17', estado: 'Inactivo'},
  {id: 10, evento: 'Concurso de Innovación', descripcion: 'Competencia de ideas innovadoras', fechaInicio: '2024-04-10', fechaFin: '2024-04-11', estado: 'Activo'},
  {id: 11, evento: 'Festival de Música', descripcion: 'Conciertos de bandas emergentes', fechaInicio: '2024-06-20', fechaFin: '2024-06-22', estado: 'Activo'},
  {id: 12, evento: 'Jornada de Salud', descripcion: 'Actividades de promoción de la salud', fechaInicio: '2024-07-01', fechaFin: '2024-07-02', estado: 'Inactivo'},
  {id: 13, evento: 'Exposición Fotográfica', descripcion: 'Muestra de trabajos fotográficos', fechaInicio: '2024-08-15', fechaFin: '2024-08-17', estado: 'Activo'},
  {id: 14, evento: 'Encuentro de Escritores', descripcion: 'Reunión de autores y lectores', fechaInicio: '2024-09-20', fechaFin: '2024-09-21', estado: 'Activo'},
  {id: 15, evento: 'Competencia de Robótica', descripcion: 'Concurso de robots autónomos', fechaInicio: '2024-10-05', fechaFin: '2024-10-06', estado: 'Inactivo'},
  {id: 16, evento: 'Feria de Tecnología', descripcion: 'Presentación de productos tecnológicos', fechaInicio: '2024-11-01', fechaFin: '2024-11-03', estado: 'Activo'},
  {id: 17, evento: 'Conferencia de Economía', descripcion: 'Debate sobre tendencias económicas', fechaInicio: '2024-12-10', fechaFin: '2024-12-12', estado: 'Activo'},
  {id: 18, evento: 'Taller de Fotografía', descripcion: 'Curso práctico de fotografía', fechaInicio: '2024-01-15', fechaFin: '2024-01-16', estado: 'Inactivo'},
  {id: 19, evento: 'Simposio de Psicología', descripcion: 'Discusión sobre avances en psicología', fechaInicio: '2024-02-20', fechaFin: '2024-02-22', estado: 'Activo'},
  {id: 20, evento: 'Conferencia de Derechos Humanos', descripcion: 'Charla sobre derechos y libertades', fechaInicio: '2024-03-05', fechaFin: '2024-03-07', estado: 'Activo'},
];

/**
 * Data source for the TableAuditorias view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableAuditoriasDataSource extends DataSource<TableAuditoriasItem> {
  data: TableAuditoriasItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  filter: string = '';

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableAuditoriasItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableAuditoriasItem[]): TableAuditoriasItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableAuditoriasItem[]): TableAuditoriasItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'evento': return compare(a.evento, b.evento, isAsc);
        case 'descripcion': return compare(a.descripcion, b.descripcion, isAsc);
        case 'fechaInicio': return compare(a.fechaInicio, b.fechaInicio, isAsc);
        case 'fechaFin': return compare(a.fechaFin, b.fechaFin, isAsc);
        case 'estado': return compare(a.estado, b.estado, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

  private getFilteredData(data: TableAuditoriasItem[]): TableAuditoriasItem[] {
    if (!this.filter) {
      return data;
    }

    return data.filter(item => {
      const searchStr = Object.values(item).join(' ').toLowerCase();
      return searchStr.includes(this.filter.toLowerCase());
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
