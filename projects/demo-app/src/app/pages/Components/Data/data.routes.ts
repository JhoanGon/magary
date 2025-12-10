import { Routes } from '@angular/router';

export const DATA_ROUTES: Routes = [
  {
    path: 'Table',
    loadComponent: () =>
      import('./view-table/view-table').then((m) => m.ViewTable),
  },
  {
    path: 'paginator',
    loadComponent: () =>
      import('./view-paginator/view-paginator').then((m) => m.ViewPaginator),
  },
  {
    path: 'tree',
    loadComponent: () =>
      import('./view-tree/view-tree').then((m) => m.ViewTree),
  },
  {
    path: 'timeline',
    loadComponent: () =>
      import('./view-timeline/view-timeline').then((m) => m.ViewTimeline),
  },
];
