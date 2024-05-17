import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  

  constructor(private activaterouter:ActivatedRoute, private router:Router){}

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

  toggleAdministrar(event: Event): void {
    event.preventDefault();
    this.administrarAbierto = !this.administrarAbierto;
    // Cerramos el menú de perfil si está abierto
    if (this.perfilAbierto) {
      this.perfilAbierto = false;
    }
  }

  togglePerfil(event: Event): void {
    event.preventDefault();
    this.perfilAbierto = !this.perfilAbierto;
    // Cerramos el menú de administrar si está abierto
    if (this.administrarAbierto) {
      this.administrarAbierto = false;
    }
  }

  dropdown_open(): void {
    if (this.n % 2 === 0) {
      (document.querySelector(".cont_back_menu") as HTMLElement).className =
        "cont_back_menu active";
      (document.getElementById("svg_icon") as HTMLElement).style.top = "0px";
    } else {
      (document.querySelector(".cont_back_menu") as HTMLElement).className =
        "cont_back_menu inactive";
      setTimeout(() => {
        (document.querySelector(".cont_back_menu") as HTMLElement).className =
          "cont_back_menu div_hidde";
        (document.getElementById("svg_icon") as HTMLElement).style.top = "-13px";
      }, this.time_to_hidden_menu);
    }
    this.n++;
  }
}
