import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar, MagaryToast, MAGARY_VERSION } from 'ng-magary';
export interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  children?: MenuItem[];
}
export interface NavigationItem {
  label: string;
  route?: string;
  icon?: string;
  isCategory?: boolean;
  children?: NavigationItem[];
}
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'magary-layout',
  imports: [
    CommonModule,
    Sidebar,
    RouterOutlet,
    MagaryToast,
    ThemeSwitcherComponent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  version = MAGARY_VERSION;
  sidebarSections = [
    {
      title: 'Primeros Pasos',
      icon: 'fas fa-rocket',
      items: [
        {
          label: 'Instalación',
          route: '/installation',
          icon: 'fas fa-download',
        },
        {
          label: 'Configuración',
          route: '/setup',
          icon: 'fas fa-cog',
        },
      ],
      hoverColor: '#e34e4e',
    },
    {
      title: 'Componentes',
      icon: 'fas fa-cubes',
      items: [
        {
          label: 'Buttons',
          icon: 'fas fa-toggle-on',
          children: [
            {
              label: 'Button',
              route: 'components/Button',
              icon: 'fas fa-square',
            },
            {
              label: 'SpeedDial',
              route: 'components/SpeedDial',
              icon: 'fas fa-ellipsis-v',
            },
          ],
        },
        {
          label: 'Data',
          icon: 'fas fa-database',
          children: [{}],
        },
        {
          label: 'File',
          icon: 'fas fa-file',
          children: [{}],
        },
        {
          label: 'Form',
          icon: 'fas fa-edit',
          children: [
            {
              label: 'Cascade Select',
              route: 'components/Cascade-Select',
              icon: 'fas fa-list-ul',
            },
            {
              label: 'Checkbox',
              route: 'components/Checkbox',
              icon: 'fas fa-check-square',
            },
            {
              label: 'Input',
              route: 'components/Input',
              icon: 'fas fa-keyboard',
            },
            {
              label: 'Switch',
              route: 'components/Switch',
              icon: 'fas fa-toggle-on',
            },
          ],
        },
        {
          label: 'Media',
          icon: 'fas fa-image',
          children: [{}],
        },
        {
          label: 'Menu',
          icon: 'fas fa-bars',
          children: [
            {
              label: 'Panel Menu',
              route: 'components/Panel-Menu',
              icon: 'fas fa-list-alt',
            },
            {
              label: 'Sidebar',
              route: 'components/Sidebar',
              icon: 'fas fa-columns',
            },
          ],
        },
        {
          label: 'Messages',
          icon: 'fas fa-comment-alt',
          children: [{}],
        },
        {
          label: 'Misc',
          icon: 'fas fa-cube',
          children: [
            {
              label: 'Avatar',
              route: 'components/Avatar',
              icon: 'fas fa-user-circle',
            },
            {
              label: 'Toast',
              route: 'components/Toast',
              icon: 'fas fa-bell',
            },
          ],
        },
        {
          label: 'Overlay',
          icon: 'fas fa-layer-group',
          children: [{}],
        },
        {
          label: 'Panel',
          icon: 'fas fa-window-maximize',
          children: [
            {
              label: 'Card',
              route: 'components/Card',
              icon: 'fas fa-id-card',
            },
            {
              label: 'Tabs',
              route: 'components/Tabs',
              icon: 'fas fa-folder',
            },
          ],
        },
      ],
      hoverColor: '#e34e4e',
    },
    {
      title: 'Utilidades',
      icon: 'fas fa-tools',
      items: [
        {
          label: 'Theming',
          route: '/theming',
          icon: 'fas fa-paint-brush',
        },
        {
          label: 'Iconos',
          route: '/icons',
          icon: 'fas fa-icons',
        },
      ],
      hoverColor: '#e34e4e',
    },
  ];
  isSidebarOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.update((open) => !open);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  handleLogout() {
    console.log('Usuario cerrando sesión...');
  }
}
