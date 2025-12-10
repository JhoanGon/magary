import { Routes } from '@angular/router';

export const MISC_ROUTES: Routes = [
  {
    path: 'Avatar',
    loadComponent: () =>
      import('./view-avatar/view-avatar').then((m) => m.ViewAvatar),
  },
  {
    path: 'Skeleton',
    loadComponent: () =>
      import('./view-skeleton/view-skeleton').then((m) => m.ViewSkeleton),
  },
];
