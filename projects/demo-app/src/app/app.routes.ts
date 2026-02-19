import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./Landing/landing').then((m) => m.Landing),
    pathMatch: 'full',
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'installation',
        loadComponent: () =>
          import('./pages/GettingStarted/Installation/installation').then(
            (m) => m.Installation,
          ),
      },
      {
        path: 'setup',
        loadComponent: () =>
          import('./pages/GettingStarted/Setup/setup').then((m) => m.Setup),
      },
      {
        path: 'mcp',
        loadComponent: () =>
          import('./pages/GettingStarted/Mcp/mcp').then((m) => m.Mcp),
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
  // Redirección de rutas no encontradas al Landing
  { path: '**', redirectTo: '' },
];
