import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [RouterLink, CommonModule, PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent {
  pokemonService = inject(PokemonService);
  pokemons: Pokemon[] = [];

  ngOnInit() {
    this.pokemonService.getPokemons(0, 12).subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }
}
