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
];
