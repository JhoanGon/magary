import { Routes } from '@angular/router';

export const PREMIUM_ROUTES: Routes = [
  {
    path: 'themes',
    loadComponent: () => import('./ThemesGallery/themes-gallery'),
  },
  {
    path: 'blocks',
    loadComponent: () => import('./blocks-gallery/blocks-gallery').then(m => m.BlocksGallery),
  },
];
