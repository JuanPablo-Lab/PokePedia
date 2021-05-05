import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  pokeballOpen = "assets/img/PokeBallOpen.png";
  iconHome = "assets/img/HomeButton.png";
  defaultPokemon = "assets/img/Pikachu.svg";

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  obtenerConsulta(consulta: string) {
    let form = document.getElementById("form");
    let lista = document.getElementById("container");
    this.consultarPokemon(consulta.toLowerCase());
  }

  consultarPokemon(consulta: any) {
    this.dataService.getPokemones(consulta)
      .subscribe((pokemon: any) => {
        this.mostrarInfoPokemon(pokemon);     
      });
  }

  mostrarInfoPokemon(pokemon: any) {
    let search = document.getElementById("container");
    let card = search.querySelector(`#pokemon`);
    let imagen = document.getElementById("imgPokemon");
    let footer = card.querySelector(`#cardFooter`);

    if (pokemon.sprites.other.dream_world.front_default != null) {
      imagen.setAttribute("src", pokemon.sprites.other.dream_world.front_default);
    } else {
      imagen.setAttribute("src", pokemon.sprites.front_default);
    }

    let nombre = card.getElementsByTagName("h1")[0];
    nombre.textContent = pokemon.name;

    let vida = card.getElementsByTagName("p")[0];
    vida.textContent = pokemon.stats[0].base_stat + " Hp";

    let xp = card.getElementsByTagName("p")[1];
    xp.textContent = pokemon.base_experience + " Xp";

    let ataque = footer.getElementsByTagName("h3")[0];
    ataque.textContent = pokemon.stats[1].base_stat + " K";

    let especial = footer.getElementsByTagName("h3")[1];
    especial.textContent = pokemon.stats[3].base_stat + " K";

    let defensa = footer.getElementsByTagName("h3")[2];
    defensa.textContent = pokemon.stats[2].base_stat + " K";
  }

  mensajeError() {
    alert("Pokemon no encontrado, intenta nuevamente.");
  }
}
