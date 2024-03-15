import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { PokemonApiResponse, Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  http = inject(HttpClient);

  getPokemons(offset: number, limit: number): Observable<Pokemon[]> {
    const url = `${this.baseUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<PokemonApiResponse>(url).pipe(
      map((response: PokemonApiResponse) =>
        response.results.map((pokemonResult: Pokemon) =>
          this.getPokemonDetails(pokemonResult.name)
        )
      ),
      mergeMap((pokemonObservables: Observable<Pokemon>[]) =>
        forkJoin(pokemonObservables)
      )
    );
  }

  getPokemonDetails(name: string): Observable<Pokemon> {
    const url = `${this.baseUrl}/${name}`;
    return this.http.get<Pokemon>(url);
  }
}