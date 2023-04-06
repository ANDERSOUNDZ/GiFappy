import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  
//View child obtiene referencias para objetos de html
//el "!" signo de operador en typescript se llama not null exception 
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;


  constructor (
    private gifServices: GifsService
  ){
  }

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0){
      return;
    }
    this.gifServices.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = "";
  }

}
