import { Routes } from '@angular/router';

export const OVERLAY_ROUTES: Routes = [
  {
    path: 'Dialog',
    loadComponent: () =>
      import('./view-dialog/view-dialog').then((m) => m.ViewDialog),
  },
  {
    path: 'Tooltip',
    loadComponent: () =>
      import('./view-tooltip/view-tooltip').then((m) => m.ViewTooltip),
  },
  {
    path: 'ConfirmDialog',
    loadComponent: () =>
      import('./view-confirm-dialog/view-confirm-dialog').then(
        (m) => m.ViewConfirmDialog,
      ),
  },
  {
    path: 'OverlayPanel',
    loadComponent: () =>
      import('./view-overlaypanel/view-overlaypanel').then(
        (m) => m.ViewOverlayPanel,
      ),
  },
];
