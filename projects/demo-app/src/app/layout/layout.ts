import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from 'ng-magary';

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

@Component({
  selector: 'magary-layout',
  imports: [CommonModule, Sidebar, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  sidebarSections = [
    {
      title: 'Primeros Pasos',
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
    },
    {
      title: 'Componentes',
      items: [
        {
          label: 'Buttons',
          icon: '',
          children: [
            {
              label: 'Button',
              route: 'components/Button',
              icon: '',
            },
          ],
        },
        {
          label: 'Data',
          icon: '',
          children: [{}],
        },
        {
          label: 'File',
          icon: '',
          children: [{}],
        },
        {
          label: 'Form',
          icon: '',
          children: [
            {
              label: 'Cascade Select',
              route: '',
              icon: '',
            },
          ],
        },
        {
          label: 'Media',
          icon: '',
          children: [{}],
        },
        {
          label: 'Menu',
          icon: '',
          children: [
            {
              label: 'Panel Menu',
              route: 'components/Panel-Menu',
              icon: '',
            },
            {
              label: 'Sidebar',
              route: 'components/Sidebar',
              icon: '',
            },
          ],
        },
        {
          label: 'Messages',
          icon: '',
          children: [{}],
        },
        {
          label: 'Misc',
          icon: '',
          children: [
            {
              label: 'Avatar',
              route: 'components/Avatar',
              icon: '',
            },
          ],
        },
        {
          label: 'Overlay',
          icon: '',
          children: [{}],
        },
        {
          label: 'Panel',
          icon: '',
          children: [
            {
              label: 'Card',
              route: 'components/Card',
              icon: '',
            },
            {
              label: 'Tabs',
              route: 'components/Tabs',
              icon: '',
            },
          ],
        },
      ],
      hoverColor: '#10b981',
    },
    {
      title: 'Utilidades',
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
    },
  ];

  // Opción 2: Un solo menú grande
  // allMenuItems: MenuItem[] = [
  //   {
  //     label: 'Getting Started',
  //     icon: 'fas fa-rocket',
  //     children: [
  //       { label: 'Installation', route: '/installation' },
  //       { label: 'Setup', route: '/setup' },
  //     ],
  //   },
  //   {
  //     label: 'Components',
  //     icon: 'fas fa-puzzle-piece',
  //     children: [
  //       { label: 'Button', route: '/button' },
  //       { label: 'Card', route: '/card' },
  //       {
  //         label: 'Form Controls',
  //         children: [
  //           { label: 'Input', route: '/input' },
  //           { label: 'Select', route: '/select' },
  //           { label: 'Checkbox', route: '/checkbox' },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     label: 'Theming',
  //     route: '/theming',
  //     icon: 'fas fa-paint-brush',
  //   },
  // ];

  isSidebarOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.update((open) => !open);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  handleLogout() {
    console.log('Usuario cerrando sesión...');
    // Aquí iría la lógica de logout
    // Por ejemplo: this.authService.logout();
  }
}
