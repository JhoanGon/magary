import { Routes } from '@angular/router';

export const COMPONENT_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Buttons/buttons.routes').then((m) => m.BUTTONS_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./Data/data.routes').then((m) => m.DATA_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./File/file.routes').then((m) => m.FILE_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./Form/form.routes').then((m) => m.FORM_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Media/media.routes').then((m) => m.MEDIA_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./Menu/menu.routes').then((m) => m.MENU_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Messages/messages.routes').then((m) => m.MESSAGES_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./Misc/misc.routes').then((m) => m.MISC_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Overlay/overlay.routes').then((m) => m.OVERLAY_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Panel/panel.routes').then((m) => m.PANEL_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./Grid/grid.routes').then((m) => m.GRID_ROUTES),
  },
];
