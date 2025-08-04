import { Component } from '@angular/core';
import { MagaryPanelmenu, MagaryTab, MagaryTabs, MenuItem } from 'ng-magary';

@Component({
  selector: 'magary-view-panel-menu',
  imports: [MagaryPanelmenu, MagaryTabs, MagaryTab],
  templateUrl: './view-panel-menu.html',
  styleUrl: './view-panel-menu.scss',
})
export class ViewPanelMenu {
  importExample = "import { MagaryCard } from 'ng-magary';";

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'fas fa-home',
    },
    {
      label: 'Usuarios',
      icon: 'fas fa-users',
      children: [
        { label: 'Lista', route: '/users/list' },
        { label: 'Crear', route: '/users/create' },
      ],
    },
    {
      label: 'Ajustes',
      icon: 'fas fa-cogs',
      children: [
        {
          label: 'General',
          children: [
            { label: 'Perfil', route: '/settings/profile' },
            { label: 'Preferencias', route: '/settings/preferences' },
          ],
        },
      ],
    },
  ];

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
