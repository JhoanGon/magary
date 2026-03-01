import { Routes } from '@angular/router';

export const PREMIUM_ROUTES: Routes = [
  {
    path: 'themes',
    loadComponent: () => import('./ThemesGallery/themes-gallery'),
  },
];
