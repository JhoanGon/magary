import { Routes } from '@angular/router';

export const MENU_ROUTES: Routes = [
  {
    path: 'Breadcrumb',
    loadComponent: () =>
      import('./view-breadcrumb/view-breadcrumb').then((m) => m.ViewBreadcrumb),
  },
  {
    path: 'Steps',
    loadComponent: () =>
      import('./view-steps/view-steps').then((m) => m.ViewSteps),
  },
  {
    path: 'Panel-Menu',
    loadComponent: () =>
      import('./view-panel-menu/view-panel-menu').then((m) => m.ViewPanelMenu),
  },
  {
    path: 'Sidebar',
    loadComponent: () =>
      import('./view-sidebar/view-sidebar').then((m) => m.ViewSidebar),
  },
];
