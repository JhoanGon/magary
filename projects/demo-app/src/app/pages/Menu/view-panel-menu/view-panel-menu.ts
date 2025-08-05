import { Component } from '@angular/core';
import { MagaryPanelmenu, MagaryTab, MagaryTabs, MenuItem } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'magary-view-panel-menu',
  imports: [MagaryPanelmenu, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-panel-menu.html',
  styleUrl: './view-panel-menu.scss',
})
export class ViewPanelMenu {
  importExample = "import { MagarySpeedDial } from 'ng-magary';";

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

  exampleMenuItemsHtml = `
    <magary-panelmenu
      [title]="'Menú Principal'"
      [items]="menuItems"
      [backgroundColor]="'#ffffff'"
      [textColor]="'#1f2937'"
      [hoverColor]="'#007bff'"
      [shadow]="2"
      [width]="'300px'"
      >
    </magary-panelmenu>`;

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
