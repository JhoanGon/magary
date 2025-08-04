import { Component } from '@angular/core';
import { MagaryAvatar } from 'ng-magary';

@Component({
  selector: 'magary-view-avatar',
  imports: [MagaryAvatar],
  templateUrl: './view-avatar.html',
  styleUrl: './view-avatar.scss',
})
export class ViewAvatar {
  importExample = "import { MagaryAvatar } from 'ng-magary';";

  exampleMenuItems = `
menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: 'fas fa-home'
  },
  {
    label: 'Usuarios',
    icon: 'fas fa-users',
    children: [
      { label: 'Lista', route: '/users/list' },
      { label: 'Crear', route: '/users/create' }
    ]
  },
  {
    label: 'Ajustes',
    icon: 'fas fa-cogs',
    children: [
      {
        label: 'General',
        children: [
          { label: 'Perfil', route: '/settings/profile' },
          { label: 'Preferencias', route: '/settings/preferences' }
        ]
      }
    ]
  }
];`;
}
