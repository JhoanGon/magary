import { Routes } from '@angular/router';

export const MEDIA_ROUTES: Routes = [
  {
    path: 'image',
    loadComponent: () =>
      import('./view-image/view-image').then((m) => m.ViewImage),
  },
  {
    path: 'view-galleria',
    loadComponent: () =>
      import('./view-galleria/view-galleria').then((m) => m.ViewGalleria),
  },
  // TODO: Carousel temporarily hidden due to pending bug fixes
  // {
  //   path: 'view-carousel',
  //   loadComponent: () =>
  //     import('./view-carousel/view-carousel').then((m) => m.ViewCarousel),
  // },
];
