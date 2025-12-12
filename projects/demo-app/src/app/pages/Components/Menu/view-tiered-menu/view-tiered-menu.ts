import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryTieredMenu, MagaryToast, MagaryToastService } from 'ng-magary';
import { MenuItem } from 'ng-magary';
import { MagaryTabs, MagaryTab } from 'ng-magary';
import { MagaryButton } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-view-tiered-menu',
  standalone: true,
  imports: [
    CommonModule,
    MagaryTieredMenu,
    MagaryTabs,
    MagaryTab,
    MagaryButton,
    Highlight,
    MagaryToast,
  ],
  templateUrl: './view-tiered-menu.html',
  styleUrl: './view-tiered-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTieredMenu {
  private toastService = inject(MagaryToastService);

  items = signal<MenuItem[]>([
    {
      label: 'File',
      icon: 'file',
      items: [
        {
          label: 'New',
          icon: 'plus',
          items: [
            {
              label: 'Document',
              icon: 'file-text',
              command: () =>
                this.toastService.add({
                  type: 'success',
                  title: 'New Document',
                  message: 'Created new document',
                }),
            },
            {
              label: 'Image',
              icon: 'image',
              command: () =>
                this.toastService.add({
                  type: 'success',
                  title: 'New Image',
                  message: 'Created new image',
                }),
            },
            {
              label: 'Video',
              icon: 'video',
              command: () =>
                this.toastService.add({
                  type: 'success',
                  title: 'New Video',
                  message: 'Created new video',
                }),
            },
          ],
        },
        {
          label: 'Open',
          icon: 'folder-open',
          command: () =>
            this.toastService.add({
              type: 'info',
              title: 'Open',
              message: 'Open file dialog',
            }),
        },
        { separator: true },
        {
          label: 'Print',
          icon: 'printer',
          command: () =>
            this.toastService.add({
              type: 'warning',
              title: 'Print',
              message: 'Printing document',
            }),
        },
      ],
    },
    {
      label: 'Edit',
      icon: 'pencil',
      items: [
        {
          label: 'Copy',
          icon: 'copy',
          command: () =>
            this.toastService.add({
              type: 'info',
              title: 'Copy',
              message: 'Copied to clipboard',
            }),
        },
        {
          label: 'Cut',
          icon: 'scissors',
          command: () =>
            this.toastService.add({
              type: 'info',
              title: 'Cut',
              message: 'Cut to clipboard',
            }),
        },
        {
          label: 'Paste',
          icon: 'clipboard',
          command: () =>
            this.toastService.add({
              type: 'info',
              title: 'Paste',
              message: 'Pasted from clipboard',
            }),
        },
      ],
    },
    {
      label: 'Help',
      icon: 'info',
      items: [
        {
          label: 'About',
          icon: 'info',
          command: () =>
            this.toastService.add({
              type: 'info',
              title: 'About',
              message: 'Magary UI v1.0',
            }),
        },
      ],
    },
  ]);

  inputs = [
    {
      name: 'model',
      type: 'MenuItem[]',
      default: '[]',
      description: 'An array of menu items.',
    },
    {
      name: 'popup',
      type: 'boolean',
      default: 'false',
      description: 'Defines if the menu is in popup mode.',
    },
    {
      name: 'style',
      type: 'object',
      default: 'null',
      description: 'Inline style of the component.',
    },
    {
      name: 'styleClass',
      type: 'string',
      default: 'null',
      description: 'Style class of the component.',
    },
  ];

  eventsConfig = [];

  menuItemConfig = [
    {
      name: 'label',
      type: 'string',
      description: 'Text to display for the menu item.',
    },
    {
      name: 'icon',
      type: 'string',
      description: 'Icon name (Lucide) to display.',
    },
    {
      name: 'items',
      type: 'MenuItem[]',
      description: 'Array of submenu items.',
    },
    {
      name: 'command',
      type: 'function',
      description: 'Callback to execute when the item is clicked.',
    },
    {
      name: 'url',
      type: 'string',
      description: 'External link to navigate to.',
    },
    {
      name: 'routerLink',
      type: 'any[] | string',
      description: 'Router link for internal navigation.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'If true, the item is disabled.',
    },
    {
      name: 'separator',
      type: 'boolean',
      description: 'If true, displays a separator instead of an item.',
    },
    {
      name: 'expanded',
      type: 'boolean',
      description: 'Visibility of the submenu.',
    },
  ];

  exampleInlineHTML = `<magary-tiered-menu [model]="items" />`;

  examplePopupHTML = `
<magary-button (buttonClick)="menu.toggle($event)" label="Show Menu"></magary-button>
<magary-tiered-menu #menu [model]="items" [popup]="true" />`;

  exampleTS = `
import { Component, signal, inject } from '@angular/core';
import { MenuItem, MagaryToastService } from 'ng-magary';

@Component({...})
export class MyComponent {
  private toastService = inject(MagaryToastService);

  items = signal<MenuItem[]>([
      {
          label: 'File',
          icon: 'file',
          items: [
              { 
                  label: 'New', 
                  icon: 'plus',
                  command: () => this.toastService.add({ type: 'success', title: 'New', message: 'Item clicked' }) 
              },
              { label: 'Open', icon: 'folder-open' }
          ]
      }
  ]);
}`;
}
