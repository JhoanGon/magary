import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryContextMenu } from 'ng-magary';
import { MenuItem, MagaryToastService } from 'ng-magary';
import { MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-view-context-menu',
  standalone: true,
  imports: [
    CommonModule,
    MagaryContextMenu,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-context-menu.html',
  styleUrl: './view-context-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewContextMenu {
  private toastService = inject(MagaryToastService);

  // Model for the context menu
  items = signal<MenuItem[]>([
    {
      label: 'View',
      icon: 'eye',
      items: [
        {
          label: 'Large Icons',
          icon: 'maximize',
          command: () => this.toast('View changed to Large Icons'),
        },
        {
          label: 'List', // No icon
          command: () => this.toast('View changed to List'),
        },
      ],
    },
    { separator: true },
    {
      label: 'Sort By',
      icon: 'arrow-up-down',
      items: [
        {
          label: 'Name',
          icon: 'a-large-small',
          command: () => this.toast('Sorted by Name'),
        },
        {
          label: 'Date',
          icon: 'calendar',
          command: () => this.toast('Sorted by Date'),
        },
      ],
    },
    { separator: true },
    {
      label: 'Refresh',
      icon: 'refresh-ccw',
      command: () => this.toast('Refreshed'),
    },
    { separator: true },
    {
      label: 'Properties',
      icon: 'settings-2',
      command: () => this.toast('Properties clicked'),
    },
  ]);

  toast(msg: string) {
    this.toastService.add({
      type: 'info',
      title: 'Context Menu',
      message: msg,
    });
  }

  inputs = [
    {
      name: 'model',
      type: 'MenuItem[]',
      default: '[]',
      description: 'Array de elementos del menú.',
    },
    {
      name: 'global',
      type: 'boolean',
      default: 'false',
      description: 'Adjunta el menú al evento de context menu del documento.',
    },
    {
      name: 'target',
      type: 'ElementRef | string',
      default: 'null',
      description: 'Adjunta el menú a un elemento específico.',
    },
    {
      name: 'style',
      type: 'object',
      default: 'null',
      description: 'Estilo en línea del componente.',
    },
    {
      name: 'styleClass',
      type: 'string',
      default: 'null',
      description: 'Clase de estilo del componente.',
    },
  ];

  menuItemConfig = [
    { name: 'label', type: 'string', description: 'Texto a mostrar.' },
    { name: 'icon', type: 'string', description: 'Nombre del icono (Lucide).' },
    {
      name: 'items',
      type: 'MenuItem[]',
      description: 'Elementos del submenú.',
    },
    {
      name: 'command',
      type: 'function',
      description: 'Callback al hacer clic.',
    },
    { name: 'url', type: 'string', description: 'Enlace externo.' },
    {
      name: 'routerLink',
      type: '(string | number)[]',
      description: 'Enlace del router.',
    },
    { name: 'disabled', type: 'boolean', description: 'Estado deshabilitado.' },
    { name: 'separator', type: 'boolean', description: 'Línea separadora.' },
    {
      name: 'expanded',
      type: 'boolean',
      description: 'Visibilidad del submenú.',
    },
  ];

  exampleTargetHTML = `
<div class="target-area">
    Right Click Me
</div>
<magary-context-menu [target]="'.target-area'" [model]="items" />`;

  exampleTS = `
import { Component, signal, inject } from '@angular/core';
import { MenuItem, MagaryToastService } from 'ng-magary';

@Component({...})
export class MyComponent {
  private toastService = inject(MagaryToastService);

  items = signal<MenuItem[]>([
     { 
         label: 'View', 
         icon: 'eye',
         command: () => this.toastService.add({ type: 'info', title: 'View', message: 'View clicked' })
     }
  ]);
}`;
}
