import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryButton,
  MagaryTab,
  MagaryTabs,
  MagaryTieredMenu,
  MagaryToastService,
  MenuItem,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type TieredMenuInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type TieredMenuMenuItemRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

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
  ],
  templateUrl: './view-tiered-menu.html',
  styleUrl: './view-tiered-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTieredMenu {
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
        label: this.t('components.menu.tieredMenu.items.file'),
        icon: 'file',
        items: [
          {
            label: this.t('components.menu.tieredMenu.items.new'),
            icon: 'plus',
            items: [
              {
                label: this.t('components.menu.tieredMenu.items.document'),
                icon: 'file-text',
                command: () =>
                  this.toastService.add({
                    type: 'success',
                    title: this.t('components.menu.tieredMenu.toast.newDocumentTitle'),
                    message: this.t(
                      'components.menu.tieredMenu.toast.newDocumentMessage',
                    ),
                  }),
              },
              {
                label: this.t('components.menu.tieredMenu.items.image'),
                icon: 'image',
                command: () =>
                  this.toastService.add({
                    type: 'success',
                    title: this.t('components.menu.tieredMenu.toast.newImageTitle'),
                    message: this.t(
                      'components.menu.tieredMenu.toast.newImageMessage',
                    ),
                  }),
              },
              {
                label: this.t('components.menu.tieredMenu.items.video'),
                icon: 'video',
                command: () =>
                  this.toastService.add({
                    type: 'success',
                    title: this.t('components.menu.tieredMenu.toast.newVideoTitle'),
                    message: this.t(
                      'components.menu.tieredMenu.toast.newVideoMessage',
                    ),
                  }),
              },
            ],
          },
          {
            label: this.t('components.menu.tieredMenu.items.open'),
            icon: 'folder-open',
            command: () =>
              this.toastService.add({
                type: 'info',
                title: this.t('components.menu.tieredMenu.toast.openTitle'),
                message: this.t('components.menu.tieredMenu.toast.openMessage'),
              }),
          },
          { separator: true },
          {
            label: this.t('components.menu.tieredMenu.items.print'),
            icon: 'printer',
            command: () =>
              this.toastService.add({
                type: 'warning',
                title: this.t('components.menu.tieredMenu.toast.printTitle'),
                message: this.t('components.menu.tieredMenu.toast.printMessage'),
              }),
          },
        ],
      },
      {
        label: this.t('components.menu.tieredMenu.items.edit'),
        icon: 'pencil',
        items: [
          {
            label: this.t('components.menu.tieredMenu.items.copy'),
            icon: 'copy',
            command: () =>
              this.toastService.add({
                type: 'info',
                title: this.t('components.menu.tieredMenu.toast.copyTitle'),
                message: this.t('components.menu.tieredMenu.toast.copyMessage'),
              }),
          },
          {
            label: this.t('components.menu.tieredMenu.items.cut'),
            icon: 'scissors',
            command: () =>
              this.toastService.add({
                type: 'info',
                title: this.t('components.menu.tieredMenu.toast.cutTitle'),
                message: this.t('components.menu.tieredMenu.toast.cutMessage'),
              }),
          },
          {
            label: this.t('components.menu.tieredMenu.items.paste'),
            icon: 'clipboard',
            command: () =>
              this.toastService.add({
                type: 'info',
                title: this.t('components.menu.tieredMenu.toast.pasteTitle'),
                message: this.t('components.menu.tieredMenu.toast.pasteMessage'),
              }),
          },
        ],
      },
      {
        label: this.t('components.menu.tieredMenu.items.help'),
        icon: 'info',
        items: [
          {
            label: this.t('components.menu.tieredMenu.items.about'),
            icon: 'info',
            command: () =>
              this.toastService.add({
                type: 'info',
                title: this.t('components.menu.tieredMenu.toast.aboutTitle'),
                message: this.t('components.menu.tieredMenu.toast.aboutMessage'),
              }),
          },
        ],
      },
    ];
  }

  inputs: TieredMenuInputRow[] = [
    {
      name: 'model',
      type: 'MenuItem[]',
      default: '[]',
      descriptionKey: 'components.menu.tieredMenu.inputs.model.desc',
    },
    {
      name: 'popup',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.menu.tieredMenu.inputs.popup.desc',
    },
    {
      name: 'style',
      type: 'object',
      default: 'null',
      descriptionKey: 'components.menu.tieredMenu.inputs.style.desc',
    },
    {
      name: 'styleClass',
      type: 'string',
      default: 'null',
      descriptionKey: 'components.menu.tieredMenu.inputs.styleClass.desc',
    },
  ];

  menuItemConfig: TieredMenuMenuItemRow[] = [
    {
      name: 'label',
      type: 'string',
      descriptionKey: 'components.menu.tieredMenu.menuItem.label.desc',
    },
    {
      name: 'icon',
      type: 'string',
      descriptionKey: 'components.menu.tieredMenu.menuItem.icon.desc',
    },
    {
      name: 'items',
      type: 'MenuItem[]',
      descriptionKey: 'components.menu.tieredMenu.menuItem.items.desc',
    },
    {
      name: 'command',
      type: 'function',
      descriptionKey: 'components.menu.tieredMenu.menuItem.command.desc',
    },
    {
      name: 'url',
      type: 'string',
      descriptionKey: 'components.menu.tieredMenu.menuItem.url.desc',
    },
    {
      name: 'routerLink',
      type: '(string | number)[] | string',
      descriptionKey: 'components.menu.tieredMenu.menuItem.routerLink.desc',
    },
    {
      name: 'disabled',
      type: 'boolean',
      descriptionKey: 'components.menu.tieredMenu.menuItem.disabled.desc',
    },
    {
      name: 'separator',
      type: 'boolean',
      descriptionKey: 'components.menu.tieredMenu.menuItem.separator.desc',
    },
    {
      name: 'expanded',
      type: 'boolean',
      descriptionKey: 'components.menu.tieredMenu.menuItem.expanded.desc',
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
