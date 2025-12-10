import { Routes } from '@angular/router';

export const GRID_ROUTES: Routes = [
  {
    path: 'view-grid',
    loadComponent: () =>
      import('./view-grid/view-grid').then((m) => m.ViewGrid),
  },
];
