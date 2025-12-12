import { Routes } from '@angular/router';

export const PANEL_ROUTES: Routes = [
  {
    path: 'Card',
    loadComponent: () =>
      import('./view-card/view-card').then((m) => m.ViewCard),
  },
  {
    path: 'fieldset',
    loadComponent: () =>
      import('./view-fieldset/view-fieldset').then((m) => m.ViewFieldset),
  },
  {
    path: 'toolbar',
    loadComponent: () =>
      import('./view-toolbar/view-toolbar').then((m) => m.ViewToolbar),
  },
  {
    path: 'tabview',
    loadComponent: () => import('./view-tab/view-tab').then((m) => m.ViewTab),
  },
  {
    path: 'Accordion',
    loadComponent: () =>
      import('./view-accordion/view-accordion').then((m) => m.ViewAccordion),
  },
];
