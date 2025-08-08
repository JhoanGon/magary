import { Component } from '@angular/core';
import {
  MagaryPanelmenu,
  MagaryTab,
  MagaryTabs,
  MenuItem,
  MenuItemClickEvent,
  MenuToggleEvent,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
@Component({
  selector: 'magary-view-panel-menu',
  imports: [MagaryPanelmenu, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-panel-menu.html',
  styleUrl: './view-panel-menu.scss',
})
export class ViewPanelMenu {
  importExample =
    "import { MagaryPanelmenu, MenuItem, MenuItemClickEvent } from 'ng-magary';";
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'fas fa-home',
    },
    {
      label: 'Usuarios',
      icon: 'fas fa-users',
      children: [
        { label: 'Lista', icon: 'fas fa-list' },
        { label: 'Crear', icon: 'fas fa-plus' },
        { label: 'Reportes', disabled: true, icon: 'fas fa-chart-bar' },
      ],
    },
    {
      label: 'Ajustes',
      icon: 'fas fa-cogs',
      children: [
        {
          label: 'General',
          icon: 'fas fa-sliders-h',
          children: [
            {
              label: 'Perfil',
              icon: 'fas fa-user',
            },
            {
              label: 'Preferencias',
              icon: 'fas fa-heart',
            },
            {
              label: 'Seguridad',
              disabled: true,
              icon: 'fas fa-shield-alt',
            },
          ],
        },
        {
          label: 'Notificaciones',
          icon: 'fas fa-bell',
        },
      ],
    },
    {
      label: 'Ayuda',
      icon: 'fas fa-question-circle',
    },
  ];
  lastClickedItem: string = 'Ninguno';
  lastToggleState: string = 'Abierto'; 
  lastExpandedItem: string = 'Ninguno';
  exampleMenuItemsHtml = `
    <magary-panelmenu
      [title]="'Menú Principal'"
      [items]="menuItems"
      [backgroundColor]="'#ffffff'"
      [textColor]="'#1f2937'"
      [hoverColor]="'#007bff'"
      [shadow]="2"
      [width]="'300px'"
    />`;
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
      }
    ];`;
  advancedHtmlExample = `
    <magary-panelmenu
      [title]="'Menú Avanzado'"
      [items]="menuItems"
      [allowMultipleExpanded]="false"
      [defaultOpen]="true"
      (menuToggle)="onMenuToggle($event)"
      (itemClick)="onItemClick($event)"
      (itemExpand)="onItemExpand($event)"
    />`;
  advancedTsExample = `
    menuItems: MenuItem[] = [
      {
        label: 'Usuarios',
        icon: 'fas fa-users',
        children: [
          { label: 'Lista', route: '/users/list', icon: 'fas fa-list' },
          { label: 'Reportes', disabled: true, icon: 'fas fa-chart-bar' }
        ]
      }
    ];`;
  eventsExample = `
    onMenuToggle(event: MenuToggleEvent): void {
      console.log('Menu:', event.isOpen ? 'Abierto' : 'Cerrado');
    }
    onItemClick(event: MenuItemClickEvent): void {
      console.log('Clicked:', event.item.label, 'Level:', event.level);
    }
    onItemExpand(event: { item: MenuItem; expanded: boolean }): void {
      console.log('Item:', event.item.label, 'Expanded:', event.expanded);
    }`;
  onMenuToggle(event: MenuToggleEvent): void {
    this.lastToggleState = event.isOpen ? 'Abierto' : 'Cerrado';
    console.log('Menu toggle:', event);
  }
  onItemClick(event: MenuItemClickEvent): void {
    this.lastClickedItem = `${event.item.label} (Nivel ${event.level})`;
    console.log('Item clicked:', event);
  }
  onItemExpand(event: { item: MenuItem; expanded: boolean }): void {
    this.lastExpandedItem = `${event.item.label} - ${event.expanded ? 'Expandido' : 'Contraído'}`;
    console.log('Item expand:', event);
  }
}
