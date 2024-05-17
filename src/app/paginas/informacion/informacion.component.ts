import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent {
  @ViewChild('nosotros') miDivRef!: ElementRef;
  @ViewChild('productos') miDivRef1!: ElementRef;
  @ViewChild('contacto') miDivRef2!: ElementRef;
  constructor(private router:Router){}


  irInformacion(): void{
    this.router.navigate(['/informacion'])
  }
  irnosotros(): void{
    this.miDivRef.nativeElement.scrollIntoView({behavior: "smooth"});
  }
  irproductos(): void{
    this.miDivRef1.nativeElement.scrollIntoView({behavior: "smooth"});
  }
  ircontacto(): void{
    this.miDivRef2.nativeElement.scrollIntoView({bahavior: "smooth"})
  }

}
