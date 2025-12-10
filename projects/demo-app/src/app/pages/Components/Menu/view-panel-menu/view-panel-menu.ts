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
      icon: 'house',
    },
    {
      label: 'Usuarios',
      icon: 'users',
      children: [
        { label: 'Lista', icon: 'list' },
        { label: 'Crear', icon: 'plus' },
        { label: 'Reportes', disabled: true, icon: 'bar-chart-2' },
      ],
    },
    {
      label: 'Ajustes',
      icon: 'settings',
      children: [
        {
          label: 'General',
          icon: 'sliders',
          children: [
            {
              label: 'Perfil',
              icon: 'user',
            },
            {
              label: 'Preferencias',
              icon: 'heart',
            },
            {
              label: 'Seguridad',
              disabled: true,
              icon: 'shield',
            },
          ],
        },
        {
          label: 'Notificaciones',
          icon: 'bell',
        },
      ],
    },
    {
      label: 'Ayuda',
      icon: 'circle-help',
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
        icon: 'house'
      },
      {
        label: 'Usuarios',
        icon: 'users',
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
        icon: 'users',
        children: [
          { label: 'Lista', route: '/users/list', icon: 'list' },
          { label: 'Reportes', disabled: true, icon: 'bar-chart-2' }
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
  }
  onItemClick(event: MenuItemClickEvent): void {
    this.lastClickedItem = `${event.item.label} (Nivel ${event.level})`;
  }
  onItemExpand(event: { item: MenuItem; expanded: boolean }): void {
    this.lastExpandedItem = `${event.item.label} - ${event.expanded ? 'Expandido' : 'Contraído'}`;
  }
}
