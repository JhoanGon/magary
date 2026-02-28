import { Component, effect, inject } from '@angular/core';
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
  imports: [MagaryPanelmenu, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-panel-menu.html',
  styleUrl: './view-panel-menu.scss',
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
      name: 'backgroundColor',
      type: 'string',
      default: "'#f9fafb'",
      descriptionKey: 'components.menu.panelMenu.apiInputs.backgroundColor.desc',
    },
    {
      name: 'textColor',
      type: 'string',
      default: "'#1f2937'",
      descriptionKey: 'components.menu.panelMenu.apiInputs.textColor.desc',
    },
    {
      name: 'hoverColor',
      type: 'string',
      default: "'#007bff'",
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
      [allowMultipleExpanded]="false"
      [defaultOpen]="true"
      (menuToggle)="onMenuToggle($event)"
      (itemClick)="onItemClick($event)"
      (itemExpand)="onItemExpand($event)"
    ></magary-panelmenu>`;
  advancedTsExample = `
    menuItems: MenuItem[] = [
      {
        label: 'Users',
        icon: 'users',
        children: [
          { label: 'List', route: '/users/list', icon: 'list' },
          { label: 'Reports', disabled: true, icon: 'chart-no-axes-column' }
        ]
      }
    ];`;
  eventsExample = `
    onMenuToggle(event: MenuToggleEvent): void {
      console.log('Menu:', event.isOpen ? 'Open' : 'Closed');
    }
    onItemClick(event: MenuItemClickEvent): void {
      console.log('Clicked:', event.item.label, 'Level:', event.level);
    }
    onItemExpand(event: { item: MenuItem; expanded: boolean }): void {
      console.log('Item:', event.item.label, 'Expanded:', event.expanded);
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
          { label: this.t('components.menu.panelMenu.items.list'), icon: 'list' },
          { label: this.t('components.menu.panelMenu.items.create'), icon: 'plus' },
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
}
