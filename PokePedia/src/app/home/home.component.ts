import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  btnReload = "assets/img/ReloadButton.png";
  btnBattle = "assets/img/BattleButton.png";
  btnSearch = "assets/img//SearchByNameButton.png";

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.pokemonesRandom(4);
  }

  public pokemonesRandom(rep: number) {
    let id = 0;

    for (let i = 1; i <= rep; i++) {
      id = Math.round(Math.random() * 898);
      this.consultarPokemon(id.toString(), i);
    }
  }

  consultarPokemon(id: string, order: number) {
    this.dataService.getPokemones(id)
      .subscribe((pokemon: any) => {
        this.crearPokemon(pokemon, order);
      });
  }

  crearPokemon(pokemon: any, order: number) {
    let lista = document.getElementById("pokemonList");
    let item = lista.querySelector(`#pokemon-${order}`);
    let imagen = item.getElementsByTagName("img")[0];

    if (pokemon.sprites.other.dream_world.front_default != null) {
      imagen.setAttribute("src", pokemon.sprites.other.dream_world.front_default);
    } else {
      imagen.setAttribute("src", pokemon.sprites.front_default);
    }

    imagen.setAttribute("alt", pokemon.name);

    let nombre = item.getElementsByTagName("p")[0];
    nombre.textContent = pokemon.name;
  }
}
