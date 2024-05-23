import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { InformacionComponent } from './paginas/informacion/informacion.component';
import { PruebaComponent } from './paginas/prueba/prueba.component';
import { IndexComponent } from './paginas/index/index.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavAdminComponent } from './paginas/nav-admin/nav-admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableEmpleadosComponent } from './paginas/table-empleados/table-empleados.component';
import { TableClientesComponent } from './paginas/table-clientes/table-clientes.component';
import { TableProductosComponent } from './paginas/table-productos/table-productos.component';
import { TableProveedoresComponent } from './paginas/table-proveedores/table-proveedores.component';
import { TableAuditoriasComponent } from './paginas/table-auditorias/table-auditorias.component';
import { CrearUsuarioComponent } from './ventanas/crear-usuario/crear-usuario.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TabUsuarioComponent } from './paginas/tab-usuario/tab-usuario.component';
import { CrearPersonalComponent } from './ventanas/crear-personal/crear-personal.component';
import { CrearUserpComponent } from './ventanas/crear-userp/crear-userp.component';
import { EditProductoComponent } from './ventanas/edit-producto/edit-producto.component';
import { EditProveedoresComponent } from './ventanas/edit-proveedores/edit-proveedores.component';
import { EditUsuarioComponent } from './ventanas/edit-usuario/edit-usuario.component';
import { CrearProductoComponent } from './ventanas/crear-producto/crear-producto.component';
import { CrearProveedoresComponent } from './ventanas/crear-proveedores/crear-proveedores.component';
import { CategoriaComponent } from './paginas/categoria/categoria.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    InformacionComponent,
    PruebaComponent,
    IndexComponent,
    CarritoComponent,
    NavAdminComponent,
    TableEmpleadosComponent,
    TableClientesComponent,
    TableProductosComponent,
    TableProveedoresComponent,
    TableAuditoriasComponent,
    CrearUsuarioComponent,
    TabUsuarioComponent,
    CrearPersonalComponent,
    CrearUserpComponent,
    EditProductoComponent,
    EditProveedoresComponent,
    EditUsuarioComponent,
    CrearProductoComponent,
    CrearProveedoresComponent,
    CategoriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
