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
  {
    path: 'Divider',
    loadComponent: () =>
      import('./view-divider/view-divider').then((m) => m.ViewDivider),
  },
  {
    path: 'Tag',
    loadComponent: () => import('./view-tag/view-tag').then((m) => m.ViewTag),
  },
];
