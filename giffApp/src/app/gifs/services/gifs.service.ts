import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  //Almacenar los gifs
  public gifList: Gif[] = [];

  private _tagHistory: string[] = [];
  private apiKey: string = '60Si5mOEPfUo9wVQ32kuZAYoOdx4wdKe';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Service activate!');
   }

  get tagHistory(){
    return [...this._tagHistory];
  }

  private organizeHistory (tag: string){
    tag = tag.toLowerCase();
    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter((oldtag) => oldtag !== tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this.tagHistory.splice(0,10);
    this.saveLocalStorage();
  }

  //Funcion Guardar en el local storage
  private saveLocalStorage():void {
    localStorage.setItem('history',JSON.stringify(this._tagHistory));
  }
  //Funcion cargar en el local Storage
  private loadLocalStorage():void{
    //consicion
    if(!localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);
    //no olvidar condicionales
    if(this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0])
  }

  searchTag(tag: string):void {
    if(tag.length == 0) return;
    this.organizeHistory(tag);
    //Creo los parametros para los valores de el api, es por buenas practicas de programacion
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`,{params})
    .subscribe(resp =>{
      this.gifList = resp.data;
      console.log({gifs: this.gifList});
    })
    ;
  }

}
