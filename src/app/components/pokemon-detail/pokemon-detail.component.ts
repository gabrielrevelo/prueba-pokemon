import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './pokemon-detail.component.html',
})
export class PokemonDetailComponent {
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  name: string | null = this.route.snapshot.paramMap.get('name');
  pokemon: Pokemon | null = null;
  loading = false;

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.pokemonService.getPokemonDetails(this.name!).subscribe({
        next: (pokemon) => {
          this.pokemon = pokemon;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
        },
      });
    }, 1000);
  }
}
