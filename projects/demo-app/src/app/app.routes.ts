import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'components/Button', pathMatch: 'full' },
      {
        path: 'components/Button',
        loadComponent: () =>
          import('./pages/Buttons/view-button/view-button').then(
            (m) => m.ViewButton,
          ),
      },
      {
        path: 'components/SpeedDial',
        loadComponent: () =>
          import('./pages/Buttons/view-speed-dial/view-speed-dial').then(
            (m) => m.ViewSpeedDial,
          ),
      },
      {
        path: 'components/Input',
        loadComponent: () =>
          import('./pages/Form/view-input/view-input').then((m) => m.ViewInput),
      },
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
      {
        path: 'components/Avatar',
        loadComponent: () =>
          import('./pages/Misc/view-avatar/view-avatar').then(
            (m) => m.ViewAvatar,
          ),
      },
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
