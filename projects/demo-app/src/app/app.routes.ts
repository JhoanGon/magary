import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    // children: [
    //   { path: '', redirectTo: 'button', pathMatch: 'full' },
    //   { path: 'button', loadComponent: () => import('./pages/button-demo/button-demo.component').then(m => m.ButtonDemoComponent) },
    //   { path: 'avatar', loadComponent: () => import('./pages/avatar-demo/avatar-demo.component').then(m => m.AvatarDemoComponent) },
    //   { path: 'sidebar', loadComponent: () => import('./pages/sidebar-demo/sidebar-demo.component').then(m => m.SidebarDemoComponent) },
    //   // ...
    // ]
  },
];
