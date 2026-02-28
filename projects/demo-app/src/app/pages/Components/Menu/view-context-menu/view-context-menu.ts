import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryContextMenu } from 'ng-magary';
import { MagaryTab, MagaryTabs, MagaryToastService, MenuItem } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type ContextMenuInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type ContextMenuMenuItemRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

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
  private readonly toastService = inject(MagaryToastService);
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  items = signal<MenuItem[]>([]);

  constructor() {
    effect(() => {
      this.i18n.language();
      this.items.set(this.buildMenuItems());
    });
  }

  private buildMenuItems(): MenuItem[] {
    return [
      {
        label: this.t('components.menu.contextMenu.items.view'),
        icon: 'eye',
        items: [
          {
            label: this.t('components.menu.contextMenu.items.largeIcons'),
            icon: 'maximize',
            command: () =>
              this.toast(this.t('components.menu.contextMenu.toast.viewLargeIcons')),
          },
          {
            label: this.t('components.menu.contextMenu.items.list'),
            command: () =>
              this.toast(this.t('components.menu.contextMenu.toast.viewList')),
          },
        ],
      },
      { separator: true },
      {
        label: this.t('components.menu.contextMenu.items.sortBy'),
        icon: 'arrow-up-down',
        items: [
          {
            label: this.t('components.menu.contextMenu.items.name'),
            icon: 'a-large-small',
            command: () =>
              this.toast(this.t('components.menu.contextMenu.toast.sortedByName')),
          },
          {
            label: this.t('components.menu.contextMenu.items.date'),
            icon: 'calendar',
            command: () =>
              this.toast(this.t('components.menu.contextMenu.toast.sortedByDate')),
          },
        ],
      },
      { separator: true },
      {
        label: this.t('components.menu.contextMenu.items.refresh'),
        icon: 'refresh-ccw',
        command: () =>
          this.toast(this.t('components.menu.contextMenu.toast.refreshed')),
      },
      { separator: true },
      {
        label: this.t('components.menu.contextMenu.items.properties'),
        icon: 'settings-2',
        command: () =>
          this.toast(this.t('components.menu.contextMenu.toast.propertiesClicked')),
      },
    ];
  }

  private toast(msg: string) {
    this.toastService.add({
      type: 'info',
      title: this.t('components.menu.contextMenu.toast.title'),
      message: msg,
    });
  }

  inputs: ContextMenuInputRow[] = [
    {
      name: 'model',
      type: 'MenuItem[]',
      default: '[]',
      descriptionKey: 'components.menu.contextMenu.inputs.model.desc',
    },
    {
      name: 'global',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.menu.contextMenu.inputs.global.desc',
    },
    {
      name: 'target',
      type: 'ElementRef | string',
      default: 'null',
      descriptionKey: 'components.menu.contextMenu.inputs.target.desc',
    },
    {
      name: 'style',
      type: 'object',
      default: 'null',
      descriptionKey: 'components.menu.contextMenu.inputs.style.desc',
    },
    {
      name: 'styleClass',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.menu.contextMenu.inputs.styleClass.desc',
    },
  ];

  menuItemConfig: ContextMenuMenuItemRow[] = [
    {
      name: 'label',
      type: 'string',
      descriptionKey: 'components.menu.contextMenu.menuItem.label.desc',
    },
    {
      name: 'icon',
      type: 'string',
      descriptionKey: 'components.menu.contextMenu.menuItem.icon.desc',
    },
    {
      name: 'items',
      type: 'MenuItem[]',
      descriptionKey: 'components.menu.contextMenu.menuItem.items.desc',
    },
    {
      name: 'command',
      type: 'function',
      descriptionKey: 'components.menu.contextMenu.menuItem.command.desc',
    },
    {
      name: 'url',
      type: 'string',
      descriptionKey: 'components.menu.contextMenu.menuItem.url.desc',
    },
    {
      name: 'routerLink',
      type: '(string | number)[]',
      descriptionKey: 'components.menu.contextMenu.menuItem.routerLink.desc',
    },
    {
      name: 'disabled',
      type: 'boolean',
      descriptionKey: 'components.menu.contextMenu.menuItem.disabled.desc',
    },
    {
      name: 'separator',
      type: 'boolean',
      descriptionKey: 'components.menu.contextMenu.menuItem.separator.desc',
    },
    {
      name: 'expanded',
      type: 'boolean',
      descriptionKey: 'components.menu.contextMenu.menuItem.expanded.desc',
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
