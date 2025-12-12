import { Routes } from '@angular/router';

export const BUTTONS_ROUTES: Routes = [
  {
    path: 'Button',
    loadComponent: () =>
      import('./view-button/view-button').then((m) => m.ViewButton),
  },
  {
    path: 'SpeedDial',
    loadComponent: () =>
      import('./view-speed-dial/view-speed-dial').then((m) => m.ViewSpeedDial),
  },
  {
    path: 'SplitButton',
    loadComponent: () =>
      import('./view-split-button/view-split-button').then(
        (m) => m.ViewSplitButton,
      ),
  },
];
