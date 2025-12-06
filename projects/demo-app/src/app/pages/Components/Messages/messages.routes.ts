import { Routes } from '@angular/router';

export const MESSAGES_ROUTES: Routes = [
  {
    path: 'message',
    loadComponent: () =>
      import('./view-message/view-message').then((m) => m.ViewMessage),
  },
];
