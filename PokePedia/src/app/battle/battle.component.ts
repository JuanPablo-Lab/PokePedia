import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  iconHome = "assets/img/HomeButton.png";
  iconVersus = "assets/img/IconoVs.png";
  iconNewBattle = "assets/img/NewBattle.png";

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.pokemonesRandomBatalla(2);
  }

  public pokemonesRandomBatalla(rep: number) {
    let id = 0;

    for (let i = 1; i <= rep; i++) {
      id = Math.round(Math.random() * 898);
      this.consultarPokemonBatalla(id.toString(), i);
    }
  }

  consultarPokemonBatalla(id: string, order: number) {
    this.dataService.getPokemones(id)
      .subscribe((pokemon: any) => {
        this.crearPokemonBatalla(pokemon, order);
      });
  }

  crearPokemonBatalla(pokemon: any, order: number) {
    let battle = document.getElementById("pokemonBattle");
    let card = battle.querySelector(`#pokemon-${order}`);
    let imagen = card.getElementsByTagName("img")[0];
    let footer = card.querySelector(`#cardFooter`);

    if (pokemon.sprites.other.dream_world.front_default != null) {
      imagen.setAttribute("src", pokemon.sprites.other.dream_world.front_default);
    } else {
      imagen.setAttribute("src", pokemon.sprites.front_default);
    }

    imagen.setAttribute("alt", pokemon.name);

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
}
