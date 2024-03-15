import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
}
