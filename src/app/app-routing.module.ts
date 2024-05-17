import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { InformacionComponent } from './paginas/informacion/informacion.component';
import { PruebaComponent } from './paginas/prueba/prueba.component';
import { IndexComponent } from './paginas/index/index.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent},
  { path: 'login', component: LoginComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'inicio/:mostrarBotonInicioSesion', component: InicioComponent},
  { path: 'informacion', component: InformacionComponent},
  { path: 'prueba', component: PruebaComponent},
  { path: 'carrito', component: CarritoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
