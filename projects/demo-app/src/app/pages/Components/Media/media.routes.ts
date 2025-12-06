import { Routes } from '@angular/router';

export const MEDIA_ROUTES: Routes = [
  {
    path: 'image',
    loadComponent: () =>
      import('./view-image/view-image').then((m) => m.ViewImage),
  },
];
