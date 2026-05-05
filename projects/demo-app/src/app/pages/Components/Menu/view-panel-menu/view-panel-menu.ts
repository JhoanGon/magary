import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import {
  MagaryPanelmenu,
  MagaryTab,
  MagaryTabs,
  MenuItem,
  MenuItemClickEvent,
  MenuToggleEvent,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type PanelMenuInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type PanelMenuOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

type PanelMenuA11yItem = {
  titleKey: DocsTextKey;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'magary-view-panel-menu',
  standalone: true,
  imports: [MagaryPanelmenu, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-panel-menu.html',
  styleUrl: './view-panel-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPanelMenu {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  importExample =
    "import { MagaryPanelmenu, MenuItem, MenuItemClickEvent } from 'ng-magary';";

  menuItems: MenuItem[] = [];
  lastClickedItem = '';
  lastToggleState = '';
  lastExpandedItem = '';
  previewTextColor = 'var(--text-primary)';
  previewHoverColor =
    'color-mix(in srgb, var(--primary-200) 24%, var(--surface-0) 76%)';
  previewBackground =
    'color-mix(in srgb, var(--surface-0) 88%, var(--primary-500) 12%)';
  previewPanelStyle = {
    '--panel-hover-text': 'var(--text-primary)',
    '--panel-active-bg':
      'color-mix(in srgb, var(--primary-500) 20%, var(--surface-0) 80%)',
    '--panel-active-text': 'var(--text-primary)',
    '--panel-item-border': 'var(--surface-300)',
  } as const;
  advancedHoverColor =
    'color-mix(in srgb, var(--primary-500) 30%, var(--surface-0) 70%)';
  advancedPanelStyle = {
    '--panel-hover-text': 'var(--text-primary)',
    '--panel-active-bg':
      'color-mix(in srgb, var(--primary-500) 24%, var(--surface-0) 76%)',
    '--panel-active-text': 'var(--text-primary)',
    '--panel-item-border': 'var(--surface-300)',
  } as const;

  inputsConfig: PanelMenuInputRow[] = [
    {
      name: 'title',
      type: 'string',
      default: "'Panel Menu'",
      descriptionKey: 'components.menu.panelMenu.apiInputs.title.desc',
    },
    {
      name: 'items',
      type: 'MenuItem[]',
      default: '[]',
      descriptionKey: 'components.menu.panelMenu.apiInputs.items.desc',
    },
    {
      name: 'icon',
      type: 'string | undefined',
      default: 'undefined',
      descriptionKey: 'components.menu.panelMenu.apiInputs.icon.desc',
    },
    {
      name: 'iconClass',
      type: 'string',
      default: "''",
      descriptionKey: 'components.menu.panelMenu.apiInputs.iconClass.desc',
    },
    {
      name: 'style',
      type: 'Record<string, unknown> | null',
      default: 'null',
      descriptionKey: 'components.menu.panelMenu.apiInputs.style.desc',
    },
    {
      name: 'styleClass',
      type: 'string',
      default: "''",
      descriptionKey: 'components.menu.panelMenu.apiInputs.styleClass.desc',
    },
    {
      name: 'backgroundColor',
      type: 'string',
      default: "'var(--surface-0)'",
      descriptionKey:
        'components.menu.panelMenu.apiInputs.backgroundColor.desc',
    },
    {
      name: 'textColor',
      type: 'string',
      default: "'var(--text-primary)'",
      descriptionKey: 'components.menu.panelMenu.apiInputs.textColor.desc',
    },
    {
      name: 'hoverColor',
      type: 'string',
      default: "'var(--surface-100)'",
      descriptionKey: 'components.menu.panelMenu.apiInputs.hoverColor.desc',
    },
    {
      name: 'borderRadius',
      type: 'string',
      default: "'8px'",
      descriptionKey: 'components.menu.panelMenu.apiInputs.borderRadius.desc',
    },
    {
      name: 'shadow',
      type: 'number',
      default: '0',
      descriptionKey: 'components.menu.panelMenu.apiInputs.shadow.desc',
    },
    {
      name: 'width',
      type: 'string',
      default: "'100%'",
      descriptionKey: 'components.menu.panelMenu.apiInputs.width.desc',
    },
    {
      name: 'allowMultipleExpanded',
      type: 'boolean',
      default: 'false',
      descriptionKey:
        'components.menu.panelMenu.apiInputs.allowMultipleExpanded.desc',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.menu.panelMenu.apiInputs.defaultOpen.desc',
    },
    {
      name: 'collapsed',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.menu.panelMenu.apiInputs.collapsed.desc',
    },
    {
      name: 'mode',
      type: "'accordion' | 'list' | 'rail-icons' | 'rail-labeled' | 'grid'",
      default: "'accordion'",
      descriptionKey: 'components.menu.panelMenu.apiInputs.mode.desc',
    },
    {
      name: 'showHeader',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.panelMenu.apiInputs.showHeader.desc',
    },
    {
      name: 'showItemLabels',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.panelMenu.apiInputs.showItemLabels.desc',
    },
    {
      name: 'gridColumns',
      type: 'number',
      default: '2',
      descriptionKey: 'components.menu.panelMenu.apiInputs.gridColumns.desc',
    },
    {
      name: 'activeIndicator',
      type: 'boolean',
      default: 'true',
      descriptionKey:
        'components.menu.panelMenu.apiInputs.activeIndicator.desc',
    },
    {
      name: 'navigationLabel',
      type: 'string',
      default: "''",
      descriptionKey:
        'components.menu.panelMenu.apiInputs.navigationLabel.desc',
    },
  ];

  outputsConfig: PanelMenuOutputRow[] = [
    {
      name: 'menuToggle',
      type: 'MenuToggleEvent',
      descriptionKey: 'components.menu.panelMenu.apiOutputs.menuToggle.desc',
    },
    {
      name: 'itemClick',
      type: 'MenuItemClickEvent',
      descriptionKey: 'components.menu.panelMenu.apiOutputs.itemClick.desc',
    },
    {
      name: 'itemExpand',
      type: 'item: MenuItem; expanded: boolean',
      descriptionKey: 'components.menu.panelMenu.apiOutputs.itemExpand.desc',
    },
    {
      name: 'expandSidebar',
      type: 'void',
      descriptionKey: 'components.menu.panelMenu.apiOutputs.expandSidebar.desc',
    },
  ];

  structureItems: DocsTextKey[] = [
    'components.menu.panelMenu.structure.item1',
    'components.menu.panelMenu.structure.item2',
    'components.menu.panelMenu.structure.item3',
  ];

  a11yItems: PanelMenuA11yItem[] = [
    {
      titleKey: 'components.menu.panelMenu.a11y.keyboard.title',
      descriptionKey: 'components.menu.panelMenu.a11y.keyboard.desc',
    },
    {
      titleKey: 'components.menu.panelMenu.a11y.visibility.title',
      descriptionKey: 'components.menu.panelMenu.a11y.visibility.desc',
    },
    {
      titleKey: 'components.menu.panelMenu.a11y.semantic.title',
      descriptionKey: 'components.menu.panelMenu.a11y.semantic.desc',
    },
  ];

  exampleMenuItemsHtml = `
    <magary-panelmenu
      [title]="'Main Menu'"
      [items]="menuItems"
      [backgroundColor]="'var(--surface-0)'"
      [textColor]="'var(--text-primary)'"
      [hoverColor]="'var(--surface-100)'"
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
        label: 'Users',
        icon: 'users',
        children: [
          { label: 'List', route: '/users/list' },
          { label: 'Create', route: '/users/create' }
        ]
      }
    ];`;
  advancedHtmlExample = `
    <magary-panelmenu
      [title]="'Advanced Menu'"
      [items]="menuItems"
      [icon]="'layers'"
      [styleClass]="'my-panel'"
      [backgroundColor]="'var(--surface-0)'"
      [textColor]="'var(--text-primary)'"
      [hoverColor]="'color-mix(in srgb, var(--primary-500) 30%, var(--surface-0) 70%)'"
      [style]="{
        '--panel-hover-text': 'var(--text-primary)',
        '--panel-active-bg': 'color-mix(in srgb, var(--primary-500) 24%, var(--surface-0) 76%)',
        '--panel-active-text': 'var(--text-primary)',
        '--panel-item-border': 'var(--surface-300)'
      }"
      [mode]="'accordion'"
      [navigationLabel]="'Advanced navigation'"
      [allowMultipleExpanded]="false"
      [defaultOpen]="true"
      (menuToggle)="onMenuToggle($event)"
      (itemClick)="onItemClick($event)"
      (itemExpand)="onItemExpand($event)"
      (expandSidebar)="onExpandSidebar()"
    ></magary-panelmenu>`;
  advancedTsExample = `
    menuItems: MenuItem[] = [
      { label: 'Pinned', separator: true },
      { label: 'Dashboard', icon: 'house', active: true },
      { label: 'Drafts', icon: 'file-text', badgeValue: 8, badgeSeverity: 'contrast' },
      {
        label: 'Docs',
        icon: 'book-open',
        url: 'https://magary.dev',
        target: '_blank'
      },
      {
        label: 'Team',
        icon: 'users',
        children: [
          {
            label: 'Workspace',
            icon: 'briefcase-business',
            children: [
              { label: 'List', route: '/users/list', icon: 'list' },
              { label: 'Permissions', icon: 'shield-check' }
            ]
          },
          { label: 'Reports', disabled: true, icon: 'chart-no-axes-column' }
        ]
      },
      {
        label: 'Refresh',
        icon: 'refresh-cw',
        command: ({ item }) => console.log('Run command for', item.label)
      },
      { label: 'Celebrations', emoji: '🎉' }
    ];`;
  layoutModesHtmlExample = `
    <magary-panelmenu
      [title]="'Accordion'"
      [items]="menuItems"
      [mode]="'accordion'"
      [navigationLabel]="'Accordion navigation'"
      [defaultOpen]="true"
      [backgroundColor]="'var(--surface-0)'"
      [textColor]="'var(--text-primary)'"
      [hoverColor]="'var(--surface-100)'"
      [style]="{
        '--panel-hover-text': 'var(--text-primary)',
        '--panel-active-bg': 'var(--surface-100)',
        '--panel-active-text': 'var(--text-primary)'
      }"
    ></magary-panelmenu>
    <magary-panelmenu
      [title]="'List'"
      [items]="menuItems"
      [mode]="'list'"
      [navigationLabel]="'List navigation'"
      [showHeader]="false"
      [backgroundColor]="'var(--surface-0)'"
      [textColor]="'var(--text-primary)'"
      [hoverColor]="'var(--surface-100)'"
      [style]="{
        '--panel-hover-text': 'var(--text-primary)',
        '--panel-active-bg': 'var(--surface-100)',
        '--panel-active-text': 'var(--text-primary)'
      }"
    ></magary-panelmenu>
    <magary-panelmenu
      [title]="'Rail'"
      [items]="menuItems"
      [mode]="'rail-icons'"
      [navigationLabel]="'Rail navigation'"
      [showHeader]="false"
      [showItemLabels]="false"
      [backgroundColor]="'var(--surface-0)'"
      [textColor]="'var(--text-primary)'"
      [hoverColor]="'var(--surface-100)'"
      [style]="{
        '--panel-hover-text': 'var(--text-primary)',
        '--panel-active-bg': 'var(--surface-100)',
        '--panel-active-text': 'var(--text-primary)'
      }"
    ></magary-panelmenu>
    <magary-panelmenu
      [title]="'Grid'"
      [items]="menuItems"
      [mode]="'grid'"
      [navigationLabel]="'Grid navigation'"
      [showHeader]="false"
      [gridColumns]="2"
      [backgroundColor]="'var(--surface-0)'"
      [textColor]="'var(--text-primary)'"
      [hoverColor]="'var(--surface-100)'"
      [style]="{
        '--panel-hover-text': 'var(--text-primary)',
        '--panel-active-bg': 'var(--surface-100)',
        '--panel-active-text': 'var(--text-primary)',
        '--panel-item-border': 'var(--surface-200)'
      }"
    ></magary-panelmenu>`;
  eventsExample = `
    onMenuToggle(event: MenuToggleEvent): void {
      console.log('Menu:', event.isOpen ? 'Open' : 'Closed');
    }
    onItemClick(event: MenuItemClickEvent): void {
      console.log('Clicked:', event.item.label, 'Level:', event.level);
    }
    onItemExpand(event: { item: MenuItem; expanded: boolean }): void {
      console.log('Item:', event.item.label, 'Expanded:', event.expanded);
    }
    onExpandSidebar(): void {
      console.log('Requested sidebar expansion');
    }`;

  constructor() {
    effect(() => {
      this.i18n.language();
      this.menuItems = this.buildMenuItems();
      this.lastClickedItem = this.t('components.menu.panelMenu.status.none');
      this.lastExpandedItem = this.t('components.menu.panelMenu.status.none');
      this.lastToggleState = this.t('components.menu.panelMenu.status.open');
    });
  }

  private buildMenuItems(): MenuItem[] {
    return [
      {
        label: this.t('components.menu.panelMenu.items.dashboard'),
        icon: 'house',
      },
      {
        label: this.t('components.menu.panelMenu.items.users'),
        icon: 'users',
        children: [
          {
            label: this.t('components.menu.panelMenu.items.list'),
            icon: 'list',
          },
          {
            label: this.t('components.menu.panelMenu.items.create'),
            icon: 'plus',
            badgeValue: 2,
            badgeSeverity: 'info',
          },
          {
            label: this.t('components.menu.panelMenu.items.reports'),
            disabled: true,
            icon: 'chart-no-axes-column',
          },
        ],
      },
      {
        label: this.t('components.menu.panelMenu.items.settings'),
        icon: 'settings',
        children: [
          {
            label: this.t('components.menu.panelMenu.items.general'),
            icon: 'sliders-vertical',
            children: [
              {
                label: this.t('components.menu.panelMenu.items.profile'),
                icon: 'user',
                children: [
                  {
                    label: this.t('components.menu.panelMenu.items.tokens'),
                    icon: 'key-round',
                  },
                  {
                    label: this.t('components.menu.panelMenu.items.activity'),
                    icon: 'history',
                  },
                ],
              },
              {
                label: this.t('components.menu.panelMenu.items.preferences'),
                icon: 'heart',
              },
              {
                label: this.t('components.menu.panelMenu.items.security'),
                disabled: true,
                icon: 'shield',
              },
            ],
          },
          {
            label: this.t('components.menu.panelMenu.items.notifications'),
            icon: 'bell',
          },
        ],
      },
      {
        label: this.t('components.menu.panelMenu.items.help'),
        icon: 'circle-question-mark',
        emoji: '💡',
      },
    ];
  }

  onMenuToggle(event: MenuToggleEvent): void {
    this.lastToggleState = event.isOpen
      ? this.t('components.menu.panelMenu.status.open')
      : this.t('components.menu.panelMenu.status.closed');
  }

  onItemClick(event: MenuItemClickEvent): void {
    this.lastClickedItem = `${event.item.label} (${this.t('components.menu.panelMenu.status.level')} ${event.level})`;
  }

  onItemExpand(event: { item: MenuItem; expanded: boolean }): void {
    this.lastExpandedItem = `${event.item.label} - ${event.expanded ? this.t('components.menu.panelMenu.status.expanded') : this.t('components.menu.panelMenu.status.collapsed')}`;
  }

  onExpandSidebar(): void {
    this.lastToggleState = this.t('components.menu.panelMenu.status.open');
  }
}
