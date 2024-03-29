import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    PokemonCardComponent,
    PaginationModule,
    FormsModule,
  ],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent {
  pokemonService = inject(PokemonService);
  pokemons: Pokemon[] = [];

  // Filtro
  types: string[] = [];
  selectedType = '';
  abilities: string[] = [];
  selectedAbility = '';

  // Paginacion
  totalItems = 0;
  itemsPerPage = 9;
  currentPage = 1;

  // Carga
  loading = false;

  ngOnInit() {
    this.pokemonService.getTypes().subscribe((types) => {
      this.types = types;
    });
    this.pokemonService.getAbilities().subscribe((abilities) => {
      this.abilities = abilities;
    });
    this.loadPokemons({
      page: this.currentPage,
      itemsPerPage: this.itemsPerPage,
    });
  }

  loadPokemons(event: PageChangedEvent) {
    this.loading = true;
    const offset = (event.page - 1) * this.itemsPerPage;
    this.pokemonService
      .getPokemons(
        offset,
        this.itemsPerPage,
        this.selectedType,
        this.selectedAbility
      )
      .subscribe((pokemons) => {
        this.pokemons = pokemons;
        this.loading = false;
      });
    this.pokemonService
      .getTotalPokemons(this.selectedType, this.selectedAbility)
      .subscribe({
        next: (total) => {
          this.totalItems = total;
          this.loading = false;
        },
        error: (err) => (this.loading = false),
      });
  }

  filterByType() {
    this.currentPage = 1;
    this.selectedAbility = '';
    this.loadPokemons({ page: 1, itemsPerPage: this.itemsPerPage });
  }

  filterByAbility() {
    this.currentPage = 1;
    this.selectedType = '';
    this.loadPokemons({ page: 1, itemsPerPage: this.itemsPerPage });
  }
}
