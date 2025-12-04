import { Routes } from '@angular/router';

export const FILE_ROUTES: Routes = [
  {
    path: 'Upload',
    loadComponent: () =>
      import('./view-upload/view-upload').then((m) => m.ViewUpload),
  },
];
