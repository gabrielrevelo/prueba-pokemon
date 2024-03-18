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
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  pokemonService = inject(PokemonService);
  pokemons: Pokemon[] = [];

  // Filtro
  types: string[] = [];
  selectedType = '';

  // Paginacion
  totalItems = 0;
  itemsPerPage = 9;
  currentPage = 1;

  ngOnInit() {
    this.pokemonService.getTypes().subscribe((types) => {
      this.types = types;
    });
    this.loadPokemons({
      page: this.currentPage,
      itemsPerPage: this.itemsPerPage,
    });
  }

  loadPokemons(event: PageChangedEvent) {
    const offset = (event.page - 1) * this.itemsPerPage;
    this.pokemonService
      .getPokemons(offset, this.itemsPerPage, this.selectedType)
      .subscribe((pokemons) => {
        this.pokemons = pokemons;
      });
    this.pokemonService
      .getTotalPokemons(this.selectedType)
      .subscribe((total) => {
        this.totalItems = total;
      });
  }

  filterByType() {
    this.currentPage = 1;
    this.loadPokemons({ page: 1, itemsPerPage: this.itemsPerPage });
  }
}
