import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./components/pokemon-list/pokemon-list.component').then(
        (m) => m.PokemonListComponent
      ),
  },
  {
    path: 'detail/:name',
    loadComponent: () =>
      import('./components/pokemon-detail/pokemon-detail.component').then(
        (m) => m.PokemonDetailComponent
      ),
  }
];
