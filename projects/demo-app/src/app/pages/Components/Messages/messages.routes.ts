import { Routes } from '@angular/router';

export const MESSAGES_ROUTES: Routes = [
  {
    path: 'Toast',
    loadComponent: () =>
      import('./view-toast/view-toast').then((m) => m.ViewToast),
  },
  {
    path: 'message',
    loadComponent: () =>
      import('./view-message/view-message').then((m) => m.ViewMessage),
  },
];
