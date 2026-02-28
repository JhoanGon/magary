import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryMenubar,
  MenuItem,
  MagaryTabs,
  MagaryTab,
  MagaryToastService,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type MenubarInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type MenubarOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'app-view-menubar',
  standalone: true,
  imports: [
    CommonModule,
    MagaryMenubar,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-menubar.html',
  styleUrl: './view-menubar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewMenubar implements OnInit {
  private toastService: MagaryToastService = inject(MagaryToastService);
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  items: MenuItem[] = [];

  importRef = `import { MagaryMenubar } from 'ng-magary';`;

  basicHTML = `<magary-menubar [model]="items"></magary-menubar>`;

  basicTS = `export class MyComponent implements OnInit {
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'file',
                items: [
                    {
                        label: 'New',
                        icon: 'plus',
                        items: [
                            { label: 'Bookmark', icon: 'bookmark' },
                            { label: 'Video', icon: 'video' },
                        ]
                    },
                    {
                        label: 'Delete',
                        icon: 'trash',
                        command: () => this.toastService.add({ type: 'info', title: 'Deleted', message: 'Item deleted', duration: 3000 })
                    },
                    { separator: true },
                    {
                        label: 'Export',
                        icon: 'external-link',
                         command: () => this.toastService.add({ type: 'success', title: 'Exported', message: 'Data exported', duration: 3000 })
                    }
                ]
            }
        ];
    }
}`;

  inputsConfig: MenubarInputRow[] = [
    {
      name: 'model',
      type: 'MenuItem[]',
      default: '[]',
      descriptionKey: 'components.menu.menubar.apiInputs.model.desc',
    },
    {
      name: 'style',
      type: 'object',
      default: 'null',
      descriptionKey: 'components.menu.menubar.apiInputs.style.desc',
    },
    {
      name: 'styleClass',
      type: 'string',
      default: "''",
      descriptionKey: 'components.menu.menubar.apiInputs.styleClass.desc',
    },
  ];

  outputsConfig: MenubarOutputRow[] = [
    {
      name: 'command',
      type: '(event: { originalEvent: Event, item: MenuItem }) => void',
      descriptionKey: 'components.menu.menubar.apiOutputs.command.desc',
    },
  ];

  ngOnInit() {
    this.items = [
      {
        label: this.t('components.menu.menubar.items.file'),
        icon: 'file',
        items: [
          {
            label: this.t('components.menu.menubar.items.new'),
            icon: 'plus',
            items: [
              {
                label: this.t('components.menu.menubar.items.bookmark'),
                icon: 'bookmark',
              },
              { label: this.t('components.menu.menubar.items.video'), icon: 'video' },
            ],
          },
          {
            label: this.t('components.menu.menubar.items.delete'),
            icon: 'trash',
            command: () =>
              this.toastService.add({
                type: 'info',
                title: this.t('components.menu.menubar.toast.deleted.title'),
                message: this.t('components.menu.menubar.toast.deleted.message'),
                duration: 3000,
              }),
          },
          { separator: true },
          {
            label: this.t('components.menu.menubar.items.export'),
            icon: 'external-link',
            command: () =>
              this.toastService.add({
                type: 'success',
                title: this.t('components.menu.menubar.toast.exported.title'),
                message: this.t('components.menu.menubar.toast.exported.message'),
                duration: 3000,
              }),
          },
        ],
      },
      {
        label: this.t('components.menu.menubar.items.edit'),
        icon: 'pencil',
        items: [
          { label: this.t('components.menu.menubar.items.left'), icon: 'align-start-vertical' },
          { label: this.t('components.menu.menubar.items.right'), icon: 'align-end-vertical' },
          { label: this.t('components.menu.menubar.items.center'), icon: 'align-center-vertical' },
          {
            label: this.t('components.menu.menubar.items.justify'),
            icon: 'align-vertical-justify-center',
          },
        ],
      },
      {
        label: this.t('components.menu.menubar.items.users'),
        icon: 'user',
        items: [
          {
            label: this.t('components.menu.menubar.items.new'),
            icon: 'user-plus',
          },
          {
            label: this.t('components.menu.menubar.items.delete'),
            icon: 'user-minus',
          },
          {
            label: this.t('components.menu.menubar.items.search'),
            icon: 'users',
            items: [
              {
                label: this.t('components.menu.menubar.items.filter'),
                icon: 'funnel',
                items: [{ label: this.t('components.menu.menubar.items.print'), icon: 'printer' }],
              },
              {
                label: this.t('components.menu.menubar.items.list'),
                icon: 'list',
              },
            ],
          },
        ],
      },
      {
        label: this.t('components.menu.menubar.items.events'),
        icon: 'calendar',
        items: [
          {
            label: this.t('components.menu.menubar.items.edit'),
            icon: 'pencil',
            items: [
              { label: this.t('components.menu.menubar.items.save'), icon: 'save' },
              { label: this.t('components.menu.menubar.items.update'), icon: 'refresh-cw' },
            ],
          },
          {
            label: this.t('components.menu.menubar.items.archived'),
            icon: 'archive',
            items: [{ label: this.t('components.menu.menubar.items.remove'), icon: 'trash' }],
          },
        ],
      },
      {
        label: this.t('components.menu.menubar.items.quit'),
        icon: 'power',
      },
    ];
  }
}
