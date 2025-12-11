import { Routes } from '@angular/router';

export const PANEL_ROUTES: Routes = [
  {
    path: 'Card',
    loadComponent: () =>
      import('./view-card/view-card').then((m) => m.ViewCard),
  },
  {
    path: 'Tabs',
    loadComponent: () => import('./view-tab/view-tab').then((m) => m.ViewTab),
  },
  {
    path: 'Accordion',
    loadComponent: () =>
      import('./view-accordion/view-accordion').then((m) => m.ViewAccordion),
  },
];
