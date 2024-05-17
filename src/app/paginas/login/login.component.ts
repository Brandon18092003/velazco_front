//@ts-ignore
import  Swal  from 'sweetalert2';
import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  

  correo: string = '';
  contra: string = '';

  @ViewChild('signInBtn') signInBtn!: ElementRef;
  @ViewChild('signUpBtn') signUpBtn!: ElementRef;
  @ViewChild('signInBtn2') signInBtn2!: ElementRef;
  @ViewChild('signUpBtn2') signUpBtn2!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  constructor(private renderer: Renderer2, private router: Router, private usuarioService:UsuarioService, private snack:MatSnackBar) { }

  public user = {
    username : '',
    password : '',
    nombre : '',
    apellido : '',
    email : '',
    telefono : ''
  }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }
    this.usuarioService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    )
  }

  login(){
    const loggedIn = this.usuarioService.login(this.correo, this.contra);
    if(loggedIn){
      console.log(loggedIn)
      Swal.fire('Credenciales correctas')
      this.router.navigate(['/inicio']);
    }else{
      this.snack.open("Credenciales incorrectas",'Ok',{
        duration : 3000
      });
    }
  }




  ngAfterViewInit(): void {
    this.renderer.listen(this.signInBtn.nativeElement, 'click', () => {
      this.renderer.removeClass(this.container.nativeElement, 'sign-up-mode');
    });

    this.renderer.listen(this.signUpBtn.nativeElement, 'click', () => {
      this.renderer.addClass(this.container.nativeElement, 'sign-up-mode');
    });

    this.renderer.listen(this.signInBtn2.nativeElement, 'click', () => {
      if (event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        this.renderer.removeClass(this.container.nativeElement, 'sign-up-mode2');
      }
    });

    this.renderer.listen(this.signUpBtn2.nativeElement, 'click', () => {
      if (event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        this.renderer.addClass(this.container.nativeElement, 'sign-up-mode2');
      }
    });
  }

  irInicio(): void {
    this.router.navigate(['/inicio', { mostrarBotonInicioSesion: true }]);
  }
}