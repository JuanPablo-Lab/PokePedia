import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(
    private http: HttpClient
  ) { }

  //Get Pokemons
  getPokemones(value: string){
    return this.http.get(this.baseUrl + `pokemon/${value}`);
  }
}