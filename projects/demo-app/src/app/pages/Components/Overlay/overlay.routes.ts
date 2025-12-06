import { Routes } from '@angular/router';

export const OVERLAY_ROUTES: Routes = [
  {
    path: 'dialog',
    loadComponent: () =>
      import('./view-dialog/view-dialog').then((m) => m.ViewDialog),
  },
];
