import { Routes } from '@angular/router';

export const DATA_ROUTES: Routes = [
  {
    path: 'Table',
    loadComponent: () =>
      import('./view-table/view-table').then((m) => m.ViewTable),
  },
];
