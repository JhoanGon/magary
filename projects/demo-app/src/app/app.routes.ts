import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'installation', pathMatch: 'full' },
      {
        path: 'installation',
        loadComponent: () =>
          import('./pages/Installation/installation').then(
            (m) => m.Installation,
          ),
      },
      {
        path: 'components',
        loadChildren: () =>
          import('./pages/Components/components.routes').then(
            (m) => m.COMPONENT_ROUTES,
          ),
      },
      {
        path: 'theming',
        loadComponent: () =>
          import('./pages/Utilities/view-theming/view-theming').then(
            (m) => m.ViewTheming,
          ),
      },
      {
        path: 'icons',
        loadComponent: () =>
          import('./pages/Utilities/view-icons/view-icons').then(
            (m) => m.ViewIcons,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'installation' },
];
