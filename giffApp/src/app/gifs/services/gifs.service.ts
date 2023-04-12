import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  constructor() { }

  private _historial: string[] = [];
  private appiKey: string = '60Si5mOEPfUo9wVQ32kuZAYoOdx4wdKe';

  get historial (){
    return [...this._historial];
  }

  buscarGifs(query: string = ''){

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    console.log(this._historial);
  }

}
