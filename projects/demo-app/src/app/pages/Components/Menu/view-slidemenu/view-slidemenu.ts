import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagarySlideMenu,
  MenuItem,
  MagaryTabs,
  MagaryTab,
  MagaryToastService,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type SlideMenuInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type SlideMenuOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'app-view-slidemenu',
  standalone: true,
  imports: [
    CommonModule,
    MagarySlideMenu,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-slidemenu.html',
  styleUrl: './view-slidemenu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSlideMenu implements OnInit {
  private toastService = inject(MagaryToastService);
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  items: MenuItem[] = [];

  importRef = `import { MagarySlideMenu, MenuItem } from 'ng-magary';`;

  htmlCode = `<div style="width: 300px; height: 350px; position: relative;">
     <magary-slidemenu [model]="items" [style]="{'width':'100%', 'height':'100%'}"></magary-slidemenu>
</div>`;

  tsCode = `export class MyComponent {
      items = [
         {
             label: 'Users',
             icon: 'users',
             items: [
                 { label: 'New', icon: 'plus' },
                 { label: 'Delete', icon: 'trash' },
                 {
                     label: 'Search',
                     icon: 'search',
                     items: [
                         { label: 'Filter', icon: 'funnel' },
                         { label: 'List', icon: 'list' }
                     ]
                 }
             ]
         }
      ];
  }`;

  inputsConfig: SlideMenuInputRow[] = [
    {
      name: 'model',
      type: 'MenuItem[]',
      default: '[]',
      descriptionKey: 'components.menu.slidemenu.apiInputs.model.desc',
    },
    {
      name: 'menuWidth',
      type: 'number | string',
      default: '300',
      descriptionKey: 'components.menu.slidemenu.apiInputs.menuWidth.desc',
    },
    {
      name: 'viewportHeight',
      type: 'number | string',
      default: '400',
      descriptionKey: 'components.menu.slidemenu.apiInputs.viewportHeight.desc',
    },
    {
      name: 'style',
      type: 'object',
      default: 'null',
      descriptionKey: 'components.menu.slidemenu.apiInputs.style.desc',
    },
    {
      name: 'styleClass',
      type: 'string',
      default: "''",
      descriptionKey: 'components.menu.slidemenu.apiInputs.styleClass.desc',
    },
  ];

  outputsConfig: SlideMenuOutputRow[] = [
    {
      name: 'command',
      type: '(event) => void',
      descriptionKey: 'components.menu.slidemenu.apiOutputs.command.desc',
    },
  ];

  ngOnInit() {
    this.items = [
      {
        label: this.t('components.menu.slidemenu.items.files'),
        icon: 'file',
        items: [
          {
            label: this.t('components.menu.slidemenu.items.new'),
            icon: 'plus',
            items: [
              {
                label: this.t('components.menu.slidemenu.items.video'),
                icon: 'video',
                command: () =>
                  this.msg(this.t('components.menu.slidemenu.toast.videoCreated')),
              },
              {
                label: this.t('components.menu.slidemenu.items.audio'),
                icon: 'mic',
                command: () =>
                  this.msg(this.t('components.menu.slidemenu.toast.audioCreated')),
              },
              {
                label: this.t('components.menu.slidemenu.items.image'),
                icon: 'image',
                command: () =>
                  this.msg(this.t('components.menu.slidemenu.toast.imageCreated')),
              },
            ],
          },
          { label: this.t('components.menu.slidemenu.items.open'), icon: 'folder-open' },
          { label: this.t('components.menu.slidemenu.items.print'), icon: 'printer' },
        ],
      },
      {
        label: this.t('components.menu.slidemenu.items.edit'),
        icon: 'pencil',
        items: [
          { label: this.t('components.menu.slidemenu.items.undo'), icon: 'undo' },
          { label: this.t('components.menu.slidemenu.items.redo'), icon: 'redo' },
        ],
      },
      {
        label: this.t('components.menu.slidemenu.items.users'),
        icon: 'users',
        items: [
          {
            label: this.t('components.menu.slidemenu.items.search'),
            icon: 'search',
            items: [
              {
                label: this.t('components.menu.slidemenu.items.filter'),
                icon: 'funnel',
                items: [
                  {
                    label: this.t('components.menu.slidemenu.items.print'),
                    icon: 'printer',
                  },
                ],
              },
              {
                label: this.t('components.menu.slidemenu.items.list'),
                icon: 'list',
                command: () =>
                  this.msg(this.t('components.menu.slidemenu.toast.listView')),
              },
            ],
          },
        ],
      },
      {
        label: this.t('components.menu.slidemenu.items.calendar'),
        icon: 'calendar',
        items: [
          { label: this.t('components.menu.slidemenu.items.edit'), icon: 'pencil' },
          {
            label: this.t('components.menu.slidemenu.items.archived'),
            icon: 'archive',
          },
        ],
      },
    ];
  }

  msg(text: string) {
    this.toastService.add({
      type: 'success',
      title: this.t('components.menu.slidemenu.toast.title'),
      message: text,
      duration: 3000,
    });
  }
}
