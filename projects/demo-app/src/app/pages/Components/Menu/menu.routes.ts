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
  {
    path: 'ContextMenu',
    loadComponent: () =>
      import('./view-context-menu/view-context-menu').then(
        (m) => m.ViewContextMenu,
      ),
  },
  {
    path: 'TieredMenu',
    loadComponent: () =>
      import('./view-tiered-menu/view-tiered-menu').then(
        (m) => m.ViewTieredMenu,
      ),
  },
  {
    path: 'Menubar',
    loadComponent: () =>
      import('./view-menubar/view-menubar').then((m) => m.ViewMenubar),
  },
  {
    path: 'MegaMenu',
    loadComponent: () =>
      import('./view-megamenu/view-megamenu').then((m) => m.ViewMegaMenu),
  },
  {
    path: 'SlideMenu',
    loadComponent: () =>
      import('./view-slidemenu/view-slidemenu').then((m) => m.ViewSlideMenu),
  },
];
