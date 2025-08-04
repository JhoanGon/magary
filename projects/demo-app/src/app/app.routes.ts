import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      // Redirección por defecto a la página de botones
      { path: '', redirectTo: 'components/Button', pathMatch: 'full' },

      // --- Rutas para la categoría 'Buttons' ---
      {
        path: 'components/Button',
        loadComponent: () =>
          import('./pages/Buttons/view-button/view-button').then(
            (m) => m.ViewButton,
          ),
      },
      // --- Rutas para la categoría 'Data' ---
      // --- Rutas para la categoría 'File' ---
      // --- Rutas para la categoría 'Form' ---
      // --- Rutas para la categoría 'Media' ---
      // --- Rutas para la categoría 'Menu' ---
      {
        path: 'components/Panel-Menu',
        loadComponent: () =>
          import('./pages/Menu/view-panel-menu/view-panel-menu').then(
            (m) => m.ViewPanelMenu,
          ),
      },
      {
        path: 'components/Sidebar',
        loadComponent: () =>
          import('./pages/Menu/view-sidebar/view-sidebar').then(
            (m) => m.ViewSidebar,
          ),
      },
      // --- Rutas para la categoría 'Messages' ---
      // --- Rutas para la categoría 'Misc' ---
      {
        path: 'components/Avatar',
        loadComponent: () =>
          import('./pages/Misc/view-avatar/view-avatar').then(
            (m) => m.ViewAvatar,
          ),
      },
      // --- Rutas para la categoría 'Overlay' ---
      // --- Rutas para la categoría 'Panel' ---
      {
        path: 'components/Card',
        loadComponent: () =>
          import('./pages/Panel/view-card/view-card').then((m) => m.ViewCard),
      },
      {
        path: 'components/Tabs',
        loadComponent: () =>
          import('./pages/Panel/view-tab/view-tab').then((m) => m.ViewTab),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
