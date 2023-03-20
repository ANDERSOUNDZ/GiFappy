import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  
//View child obtiene referencias para objetos de html
//el "!" signo de operador en typescript se llama not null exception 
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    console.log(valor);

    this.txtBuscar.nativeElement.value = "";
  }

}
