import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryMegaMenu,
  MenuItem,
  MagaryTabs,
  MagaryTab,
  MagaryToastService,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type MegaMenuInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type MegaMenuOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'app-view-megamenu',
  standalone: true,
  imports: [
    CommonModule,
    MagaryMegaMenu,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-megamenu.html',
  styleUrl: './view-megamenu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewMegaMenu implements OnInit {
  private toastService = inject(MagaryToastService);
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  items: MenuItem[] = [];

  importRef = `import { MagaryMegaMenu, MenuItem } from 'ng-magary';`;

  htmlCode = `<magary-megamenu [model]="items" [orientation]="'horizontal'"></magary-megamenu>`;

  tsCode = `export class MyComponent {
      items: MenuItem[] = [
        {
          label: 'Fashion',
          icon: 'shirt',
          items: [
            [
              {
                label: 'Woman',
                items: [{ label: 'Woman Item' }, { label: 'Woman Item' }]
              },
              {
                label: 'Men',
                items: [{ label: 'Men Item' }, { label: 'Men Item' }]
              }
            ],
            [
              {
                label: 'Kids',
                items: [{ label: 'Kids Item' }, { label: 'Kids Item' }]
              }
            ]
          ]
        }
      ];
  }`;

  inputsConfig: MegaMenuInputRow[] = [
    {
      name: 'model',
      type: 'MenuItem[]',
      default: '[]',
      descriptionKey: 'components.menu.megamenu.apiInputs.model.desc',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      descriptionKey: 'components.menu.megamenu.apiInputs.orientation.desc',
    },
    {
      name: 'style',
      type: 'object',
      default: 'null',
      descriptionKey: 'components.menu.megamenu.apiInputs.style.desc',
    },
    {
      name: 'styleClass',
      type: 'string',
      default: "''",
      descriptionKey: 'components.menu.megamenu.apiInputs.styleClass.desc',
    },
  ];

  outputsConfig: MegaMenuOutputRow[] = [
    {
      name: 'command',
      type: '(event: { originalEvent: Event, item: MenuItem }) => void',
      descriptionKey: 'components.menu.megamenu.apiOutputs.command.desc',
    },
  ];

  ngOnInit() {
    this.items = [
      {
        label: this.t('components.menu.megamenu.items.videos'),
        icon: 'video',
        items: [
          {
            label: `${this.t('components.menu.megamenu.items.video')} 1`,
            items: [
              {
                label: `${this.t('components.menu.megamenu.items.video')} 1.1`,
                icon: 'play',
              },
              {
                label: `${this.t('components.menu.megamenu.items.video')} 1.2`,
                icon: 'play',
              },
            ],
          },
          {
            label: `${this.t('components.menu.megamenu.items.video')} 2`,
            items: [
              {
                label: `${this.t('components.menu.megamenu.items.video')} 2.1`,
                icon: 'play',
                command: () =>
                  this.showToast(`${this.t('components.menu.megamenu.items.video')} 2.1`),
              },
              {
                label: `${this.t('components.menu.megamenu.items.video')} 2.2`,
                icon: 'play',
              },
            ],
          },
        ],
      },
      {
        label: this.t('components.menu.megamenu.items.users'),
        icon: 'users',
        items: [
          {
            label: `${this.t('components.menu.megamenu.items.user')} 1`,
            items: [
              {
                label: `${this.t('components.menu.megamenu.items.user')} 1.1`,
                icon: 'user',
              },
              {
                label: `${this.t('components.menu.megamenu.items.user')} 1.2`,
                icon: 'user',
              },
            ],
          },
          {
            label: `${this.t('components.menu.megamenu.items.user')} 2`,
            items: [
              {
                label: `${this.t('components.menu.megamenu.items.user')} 2.1`,
                icon: 'user',
              },
              {
                label: `${this.t('components.menu.megamenu.items.user')} 2.2`,
                icon: 'user',
              },
            ],
          },
          {
            label: `${this.t('components.menu.megamenu.items.user')} 3`,
            items: [
              {
                label: `${this.t('components.menu.megamenu.items.user')} 3.1`,
                icon: 'user',
              },
              {
                label: `${this.t('components.menu.megamenu.items.user')} 3.2`,
                icon: 'user',
              },
            ],
          },
        ],
      },
      {
        label: this.t('components.menu.megamenu.items.events'),
        icon: 'calendar',
        items: [
          {
            label: `${this.t('components.menu.megamenu.items.event')} 1`,
            items: [
              {
                label: `${this.t('components.menu.megamenu.items.event')} 1.1`,
                icon: 'calendar-days',
              },
              {
                label: `${this.t('components.menu.megamenu.items.event')} 1.2`,
                icon: 'calendar-days',
              },
            ],
          },
          {
            label: `${this.t('components.menu.megamenu.items.event')} 2`,
            items: [
              {
                label: `${this.t('components.menu.megamenu.items.event')} 2.1`,
                icon: 'calendar-days',
              },
              {
                label: `${this.t('components.menu.megamenu.items.event')} 2.2`,
                icon: 'calendar-days',
              },
            ],
          },
        ],
      },
      {
        label: this.t('components.menu.megamenu.items.settings'),
        icon: 'settings',
        items: [
          {
            label: `${this.t('components.menu.megamenu.items.setting')} 1`,
            items: [
              {
                label: `${this.t('components.menu.megamenu.items.setting')} 1.1`,
                icon: 'settings-2',
              },
              {
                label: `${this.t('components.menu.megamenu.items.setting')} 1.2`,
                icon: 'settings-2',
              },
            ],
          },
        ],
      },
    ];
  }

  showToast(msg: string) {
    this.toastService.add({
      type: 'success',
      title: this.t('components.menu.megamenu.toast.title'),
      message: msg,
      duration: 3000,
    });
  }
}
