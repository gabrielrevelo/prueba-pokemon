import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { ApiResponse, Pokemon, Type } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  http = inject(HttpClient);

  getPokemons(
    offset: number,
    limit: number,
    type: string
  ): Observable<Pokemon[]> {
    if (type) {
      return this.getPokemonsByType(offset, limit, type);
    }
    const url = `${this.baseUrl}/pokemon/?offset=${offset}&limit=${limit}`;
    return this.http.get<ApiResponse>(url).pipe(
      map((response: ApiResponse) =>
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
    const url = `${this.baseUrl}/pokemon/${name}`;
    return this.http.get<Pokemon>(url);
  }

  getTypes(): Observable<string[]> {
    const url = `${this.baseUrl}/type`;
    return this.http
      .get<any>(url)
      .pipe(
        map((response: any) => response.results.map((type: Type) => type.name))
      );
  }

  getPokemonsByType(
    offset: number,
    limit: number,
    type: string
  ): Observable<Pokemon[]> {
    const url = `${this.baseUrl}/type/${type}`;
    return this.http.get(url).pipe(
      map((response: any) =>
        response.pokemon
          .slice(offset, offset + limit)
          .map((pokemon: any) => this.getPokemonDetails(pokemon.pokemon.name))
      ),
      mergeMap((pokemonObservables: Observable<Pokemon>[]) =>
        forkJoin(pokemonObservables)
      )
    );
  }

  getTotalPokemons(type: string): Observable<number> {
    if (type) {
      console.log('type', type);
      const url = `${this.baseUrl}/type/${type}`;
      return this.http.get(url).pipe(map((response: any) => response.pokemon.length));
    }
    const url = `${this.baseUrl}/pokemon/?offset=0&limit=1`;
    return this.http
      .get<ApiResponse>(url)
      .pipe(map((response: ApiResponse) => response.count));
  }
}
