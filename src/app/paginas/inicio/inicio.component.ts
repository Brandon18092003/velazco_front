import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

  mostrarBotonInicioSesion : boolean = true;
  menuAbierto: boolean = false;
  administrarAbierto: boolean = false;
  perfilAbierto: boolean = false;
  

  constructor(private activaterouter:ActivatedRoute, private router:Router, private userService: UsuarioService){}

  n: number = 0;
  time_to_hidden_menu: number = 1200;

  ngOnInit(): void {
    this.activaterouter.params.subscribe(params => {
      this.mostrarBotonInicioSesion = params['mostrarBotonInicioSesion'] === 'true';
    });
  }

  mostrarOpcionesUsuario(): void{
    this.mostrarBotonInicioSesion = false
  }

  irLogin(): void{
    this.router.navigate(['/login'])
  }

  irInformacion(): void{
    this.router.navigate(['/informacion'])
  }
  
  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  toggleAdministrar(): void {
    this.router.navigate(['nav']);
  }

  togglePerfil(): void {
  }

}
