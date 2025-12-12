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
  {
    path: 'organization-chart',
    loadComponent: () =>
      import('./view-organizationchart/view-organizationchart').then(
        (m) => m.ViewOrganizationChart,
      ),
  },
  {
    path: 'pick-list',
    loadComponent: () =>
      import('./view-pick-list/view-pick-list').then((m) => m.ViewPickList),
  },
  {
    path: 'view-dataview',
    loadComponent: () =>
      import('./view-dataview/view-dataview').then((m) => m.ViewDataView),
  },
  {
    path: 'order-list',
    loadComponent: () =>
      import('./view-order-list/view-order-list').then((m) => m.ViewOrderList),
  },
];
