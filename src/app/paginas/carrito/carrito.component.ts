import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  constructor(private router:Router, private inicioComponent:InicioComponent){}
  irInicio(): void{
    this.inicioComponent.toggleCarrito();
  }
}
