import { Routes } from '@angular/router';

export const MISC_ROUTES: Routes = [
  {
    path: 'Avatar',
    loadComponent: () =>
      import('./view-avatar/view-avatar').then((m) => m.ViewAvatar),
  },
  {
    path: 'Toast',
    loadComponent: () =>
      import('./view-toast/view-toast').then((m) => m.ViewToast),
  },
  {
    path: 'Skeleton',
    loadComponent: () =>
      import('./view-skeleton/view-skeleton').then((m) => m.ViewSkeleton),
  },
];
