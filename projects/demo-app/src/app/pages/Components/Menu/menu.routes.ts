import { Routes } from '@angular/router';

export const MENU_ROUTES: Routes = [
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
