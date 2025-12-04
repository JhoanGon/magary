import { Routes } from '@angular/router';

export const FORM_ROUTES: Routes = [
  {
    path: 'Input',
    loadComponent: () =>
      import('./view-input/view-input').then((m) => m.ViewInput),
  },
  {
    path: 'Checkbox',
    loadComponent: () =>
      import('./view-checkbox/view-checkbox').then((m) => m.ViewCheckbox),
  },
  {
    path: 'Switch',
    loadComponent: () =>
      import('./view-switch/view-switch').then((m) => m.ViewSwitch),
  },
  {
    path: 'Cascade-Select',
    loadComponent: () =>
      import('./view-cascade-select/view-cascade-select').then(
        (m) => m.ViewCascadeSelect,
      ),
  },
];
