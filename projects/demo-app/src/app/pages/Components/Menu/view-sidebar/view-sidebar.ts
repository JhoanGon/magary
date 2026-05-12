import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  MagarySidebar,
  MenuItem,
  MagaryTab,
  MagaryTabs,
  SidebarMenuItemClickEvent,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

type SidebarSectionDemo = {
  title: string;
  icon: string;
  iconClass?: string;
  items: MenuItem[];
};

type SidebarKeyPropRow = {
  property: string;
  usageKey: DocsTextKey;
};

type SidebarApiRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type SidebarOutputRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

type SidebarMenuPreview = {
  titleKey: DocsTextKey;
  descriptionKey: DocsTextKey;
  items: DocsTextKey[];
};

@Component({
  selector: 'magary-view-sidebar',
  standalone: true,
  imports: [MagarySidebar, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-sidebar.html',
  styleUrl: './view-sidebar.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSidebar {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  importExample =
    "import { MagarySidebar, MenuItem } from 'ng-magary';";

  logoutCount = 0;
  lastLogoutMode = '';
  private lastLogoutModeSource: 'none' | 'sections' | 'footer' = 'none';

  appTitleStyle = {
    background:
      'linear-gradient(135deg, var(--primary-400), var(--primary-700))',
    'background-clip': 'text',
    '-webkit-background-clip': 'text',
    '--sidebar-title-fill': 'transparent',
    '--sidebar-title-color': 'transparent',
    '--sidebar-title-font-style': 'normal',
  } as const;

  sectionsDemo: SidebarSectionDemo[] = [];
  menuDemo: MenuItem[] = [];
  footerMenuDemo: MenuItem[] = [];
  menuFiltersDemo = [
    { label: 'Favs', value: 'favorites' },
    { label: 'Apps', value: 'apps' },
  ];
  activeMenuFilter: string | null = 'favorites';
  selectedMenuItemId = 'home';
  selectedMenuItemLabel = '';
  selectedMenuPreview: SidebarMenuPreview = {
    titleKey: 'components.menu.sidebar.menu.shell.home.title',
    descriptionKey: 'components.menu.sidebar.menu.shell.home.desc',
    items: [
      'components.menu.sidebar.menu.shell.home.item1',
      'components.menu.sidebar.menu.shell.home.item2',
      'components.menu.sidebar.menu.shell.home.item3',
    ],
  };

  keyPropsRows: SidebarKeyPropRow[] = [
    {
      property: '<code>sections</code> / <code>menu</code>',
      usageKey: 'components.menu.sidebar.keyProps.rows.strategy',
    },
    {
      property: '<code>layoutMode</code>',
      usageKey: 'components.menu.sidebar.keyProps.rows.layout',
    },
    {
      property:
        '<code>rootStyleClass/rootStyle</code>, <code>headerStyleClass/headerStyle</code>, <code>contentStyleClass/contentStyle</code>, <code>userSectionStyleClass/userSectionStyle</code>',
      usageKey: 'components.menu.sidebar.keyProps.rows.zones',
    },
    {
      property:
        '<code>sidebarWidth</code>, <code>sidebarBorder</code>, <code>sidebarShadow</code>, <code>sidebarBackground</code> + <code>title*</code>',
      usageKey: 'components.menu.sidebar.keyProps.rows.appearance',
    },
    {
      property:
        '<code>menuFilters</code>, <code>activeMenuFilter</code>, <code>showMenuFilters</code>',
      usageKey: 'components.menu.sidebar.keyProps.rows.filters',
    },
    {
      property:
        '<code>showEmptyState</code> + <code>emptyState*</code>',
      usageKey: 'components.menu.sidebar.keyProps.rows.emptyState',
    },
    {
      property: '<code>collapsible</code> + <code>showToggle</code>',
      usageKey: 'components.menu.sidebar.keyProps.rows.collapse',
    },
    {
      property: '<code>showUserSection</code>',
      usageKey: 'components.menu.sidebar.keyProps.rows.userSection',
    },
    {
      property:
        '<code>showUserAvatar</code>, <code>showUserName</code>, <code>showUserEmail</code>',
      usageKey: 'components.menu.sidebar.keyProps.rows.userFields',
    },
    {
      property: '<code>showLogoutButton</code>',
      usageKey: 'components.menu.sidebar.keyProps.rows.logout',
    },
    {
      property: '<code>showBrandLogo</code> + <code>brandLogoPosition</code>',
      usageKey: 'components.menu.sidebar.keyProps.rows.brand',
    },
  ];

  apiRows: SidebarApiRow[] = [
    {
      name: 'sections',
      type: 'SidebarSection[]',
      default: '[]',
      descriptionKey: 'components.menu.sidebar.api.sections.desc',
    },
    {
      name: 'menu',
      type: 'MenuItem[]',
      default: '[]',
      descriptionKey: 'components.menu.sidebar.api.menu.desc',
    },
    {
      name: 'layoutMode',
      type: "'classic' | 'rail' | 'rail-labeled' | 'grid'",
      default: "'classic'",
      descriptionKey: 'components.menu.sidebar.api.layoutMode.desc',
    },
    {
      name: 'menuTitle',
      type: 'string',
      default: "'Menu'",
      descriptionKey: 'components.menu.sidebar.api.menuTitle.desc',
    },
    {
      name: 'menuFilters',
      type: '{ label: string; value: string }[]',
      default: '[]',
      descriptionKey: 'components.menu.sidebar.api.menuFilters.desc',
    },
    {
      name: 'activeMenuFilter',
      type: 'string | null',
      default: 'null',
      descriptionKey: 'components.menu.sidebar.api.activeMenuFilter.desc',
    },
    {
      name: 'showMenuFilters',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.sidebar.api.showMenuFilters.desc',
    },
    {
      name: 'menuFilterLabel',
      type: 'string',
      default: "'Sidebar menu category'",
      descriptionKey: 'components.menu.sidebar.api.menuFilterLabel.desc',
    },
    {
      name: 'gridColumns',
      type: 'number',
      default: '2',
      descriptionKey: 'components.menu.sidebar.api.gridColumns.desc',
    },
    {
      name: 'showEmptyState',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.sidebar.api.showEmptyState.desc',
    },
    {
      name: 'emptyStateTitle',
      type: 'string',
      default: "'No navigation items'",
      descriptionKey: 'components.menu.sidebar.api.emptyStateTitle.desc',
    },
    {
      name: 'emptyStateDescription',
      type: 'string',
      default: "'Add menu items or adjust the active filter.'",
      descriptionKey:
        'components.menu.sidebar.api.emptyStateDescription.desc',
    },
    {
      name: 'emptyStateIcon',
      type: 'string',
      default: "'panel-left-dashed'",
      descriptionKey: 'components.menu.sidebar.api.emptyStateIcon.desc',
    },
    {
      name: 'menuPanelStyleClass',
      type: 'string',
      default: "''",
      descriptionKey: 'components.menu.sidebar.api.menuPanelStyleClass.desc',
    },
    {
      name: 'menuPanelStyle',
      type: 'Record<string, unknown> | null',
      default: 'null',
      descriptionKey: 'components.menu.sidebar.api.menuPanelStyle.desc',
    },
    {
      name: 'menuPanelBorderRadius',
      type: 'string',
      default: "'0.5rem'",
      descriptionKey: 'components.menu.sidebar.api.menuPanelBorderRadius.desc',
    },
    {
      name: 'menuPanelShadow',
      type: 'number',
      default: '2',
      descriptionKey: 'components.menu.sidebar.api.menuPanelShadow.desc',
    },
    {
      name: 'menuActiveIndicator',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.sidebar.api.menuActiveIndicator.desc',
    },
    {
      name: 'rootStyleClass',
      type: 'string',
      default: "''",
      descriptionKey: 'components.menu.sidebar.api.rootStyleClass.desc',
    },
    {
      name: 'rootStyle',
      type: 'Record<string, unknown> | null',
      default: 'null',
      descriptionKey: 'components.menu.sidebar.api.rootStyle.desc',
    },
    {
      name: 'headerStyleClass',
      type: 'string',
      default: "''",
      descriptionKey: 'components.menu.sidebar.api.headerStyleClass.desc',
    },
    {
      name: 'headerStyle',
      type: 'Record<string, unknown> | null',
      default: 'null',
      descriptionKey: 'components.menu.sidebar.api.headerStyle.desc',
    },
    {
      name: 'contentStyleClass',
      type: 'string',
      default: "''",
      descriptionKey: 'components.menu.sidebar.api.contentStyleClass.desc',
    },
    {
      name: 'contentStyle',
      type: 'Record<string, unknown> | null',
      default: 'null',
      descriptionKey: 'components.menu.sidebar.api.contentStyle.desc',
    },
    {
      name: 'userSectionStyleClass',
      type: 'string',
      default: "''",
      descriptionKey: 'components.menu.sidebar.api.userSectionStyleClass.desc',
    },
    {
      name: 'userSectionStyle',
      type: 'Record<string, unknown> | null',
      default: 'null',
      descriptionKey: 'components.menu.sidebar.api.userSectionStyle.desc',
    },
    {
      name: 'sidebarWidth',
      type: 'string',
      default: "'280px'",
      descriptionKey: 'components.menu.sidebar.api.sidebarWidth.desc',
    },
    {
      name: 'sidebarCollapsedWidth',
      type: 'string',
      default: "'80px'",
      descriptionKey: 'components.menu.sidebar.api.sidebarCollapsedWidth.desc',
    },
    {
      name: 'sidebarBackground',
      type: 'string',
      default: "'var(--surface-0)'",
      descriptionKey: 'components.menu.sidebar.api.sidebarBackground.desc',
    },
    {
      name: 'sidebarBorder',
      type: 'string',
      default: "'1px solid var(--surface-200)'",
      descriptionKey: 'components.menu.sidebar.api.sidebarBorder.desc',
    },
    {
      name: 'sidebarShadow',
      type: 'string',
      default: "'var(--shadow-lg, ...)'",
      descriptionKey: 'components.menu.sidebar.api.sidebarShadow.desc',
    },
    {
      name: 'titleColor',
      type: 'string | undefined',
      default: 'undefined',
      descriptionKey: 'components.menu.sidebar.api.titleColor.desc',
    },
    {
      name: 'titleFontFamily',
      type: 'string | undefined',
      default: 'undefined',
      descriptionKey: 'components.menu.sidebar.api.titleFontFamily.desc',
    },
    {
      name: 'titleFontWeight',
      type: 'string | number | undefined',
      default: 'undefined',
      descriptionKey: 'components.menu.sidebar.api.titleFontWeight.desc',
    },
    {
      name: 'titleFontStyle',
      type: "'normal' | 'italic' | 'oblique'",
      default: "'normal'",
      descriptionKey: 'components.menu.sidebar.api.titleFontStyle.desc',
    },
    {
      name: 'titleSize',
      type: 'string | undefined',
      default: 'undefined',
      descriptionKey: 'components.menu.sidebar.api.titleSize.desc',
    },
    {
      name: 'showUserSection',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.menu.sidebar.api.showUserSection.desc',
    },
    {
      name: 'showUserAvatar',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.sidebar.api.showUserAvatar.desc',
    },
    {
      name: 'showUserName',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.sidebar.api.showUserName.desc',
    },
    {
      name: 'showUserEmail',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.sidebar.api.showUserEmail.desc',
    },
    {
      name: 'showLogoutButton',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.sidebar.api.showLogoutButton.desc',
    },
    {
      name: 'userName',
      type: 'string',
      default: "'John Doe'",
      descriptionKey: 'components.menu.sidebar.api.userName.desc',
    },
    {
      name: 'userEmail',
      type: 'string',
      default: "'user@example.com'",
      descriptionKey: 'components.menu.sidebar.api.userEmail.desc',
    },
    {
      name: 'avatarConfig',
      type: 'AvatarConfig',
      default: "{ type: 'label' }",
      descriptionKey: 'components.menu.sidebar.api.avatarConfig.desc',
    },
    {
      name: 'showLogo',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.sidebar.api.showLogo.desc',
    },
    {
      name: 'logoSrc',
      type: 'string',
      default: "'assets/logo.svg'",
      descriptionKey: 'components.menu.sidebar.api.logoSrc.desc',
    },
    {
      name: 'logoAlt',
      type: 'string',
      default: "'Logo'",
      descriptionKey: 'components.menu.sidebar.api.logoAlt.desc',
    },
    {
      name: 'appTitle',
      type: 'string',
      default: "'PRIMENG'",
      descriptionKey: 'components.menu.sidebar.api.appTitle.desc',
    },
    {
      name: 'brandRoute',
      type: 'string | readonly unknown[] | UrlTree | null',
      default: "'/'",
      descriptionKey: 'components.menu.sidebar.api.brandRoute.desc',
    },
    {
      name: 'showBrandLogo',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.menu.sidebar.api.showBrandLogo.desc',
    },
    {
      name: 'brandLogoPosition',
      type: "'top' | 'bottom' | 'center'",
      default: "'bottom'",
      descriptionKey: 'components.menu.sidebar.api.brandLogoPosition.desc',
    },
    {
      name: 'brandLogoAlt',
      type: 'string',
      default: "'Brand Logo'",
      descriptionKey: 'components.menu.sidebar.api.brandLogoAlt.desc',
    },
    {
      name: 'menuBackgroundColor',
      type: 'string',
      default: "'var(--surface-50)'",
      descriptionKey: 'components.menu.sidebar.api.menuBackgroundColor.desc',
    },
    {
      name: 'menuTextColor',
      type: 'string',
      default: "'var(--text-primary)'",
      descriptionKey: 'components.menu.sidebar.api.menuTextColor.desc',
    },
    {
      name: 'menuHoverColor',
      type: 'string',
      default: "'var(--surface-100)'",
      descriptionKey: 'components.menu.sidebar.api.menuHoverColor.desc',
    },
    {
      name: 'collapsible',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.sidebar.api.collapsible.desc',
    },
    {
      name: 'isCollapsed',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.menu.sidebar.api.isCollapsed.desc',
    },
    {
      name: 'showToggle',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.sidebar.api.showToggle.desc',
    },
    {
      name: 'expandButtonLabel',
      type: 'string',
      default: "'Expand sidebar'",
      descriptionKey: 'components.menu.sidebar.api.expandButtonLabel.desc',
    },
    {
      name: 'collapseButtonLabel',
      type: 'string',
      default: "'Collapse sidebar'",
      descriptionKey: 'components.menu.sidebar.api.collapseButtonLabel.desc',
    },
    {
      name: 'logoutLabel',
      type: 'string',
      default: "'Sign out'",
      descriptionKey: 'components.menu.sidebar.api.logoutLabel.desc',
    },
  ];

  outputsRows: SidebarOutputRow[] = [
    {
      name: 'isCollapsedChange',
      type: 'boolean',
      descriptionKey: 'components.menu.sidebar.outputs.isCollapsedChange.desc',
    },
    {
      name: 'onLogout',
      type: 'void',
      descriptionKey: 'components.menu.sidebar.outputs.onLogout.desc',
    },
    {
      name: 'closeSidebar',
      type: 'void',
      descriptionKey: 'components.menu.sidebar.outputs.closeSidebar.desc',
    },
    {
      name: 'menuToggle',
      type: 'SidebarMenuToggleEvent',
      descriptionKey: 'components.menu.sidebar.outputs.menuToggle.desc',
    },
    {
      name: 'menuItemClick',
      type: 'SidebarMenuItemClickEvent',
      descriptionKey: 'components.menu.sidebar.outputs.menuItemClick.desc',
    },
    {
      name: 'menuItemExpand',
      type: 'SidebarMenuItemExpandEvent',
      descriptionKey: 'components.menu.sidebar.outputs.menuItemExpand.desc',
    },
  ];

  structureItems: DocsTextKey[] = [
    'components.menu.sidebar.structure.item1',
    'components.menu.sidebar.structure.item2',
    'components.menu.sidebar.structure.item3',
  ];

  a11yItems: DocsTextKey[] = [
    'components.menu.sidebar.a11y.mobile',
    'components.menu.sidebar.a11y.navigation',
    'components.menu.sidebar.a11y.contrast',
    'components.menu.sidebar.a11y.density',
  ];

  sectionsHtmlExample = `
<magary-sidebar
  [sections]="sectionsDemo"
  [showLogo]="true"
  [logoSrc]="'assets/magary_logo.png'"
  [appTitle]="'Magary Docs'"
  [appTitleStyle]="appTitleStyle"
  [showUserSection]="true"
  [userName]="'Juan Perez'"
  [userEmail]="'juan@empresa.com'"
  [avatarConfig]="{
    type: 'label',
    label: 'JP',
    size: 'normal',
    shape: 'circle',
    badgeSeverity: 'success'
  }"
  (onLogout)="onLogout('sections')"
></magary-sidebar>`;

  sectionsTsExample = `
sectionsDemo: SidebarSectionDemo[] = [
  {
    title: 'General',
    icon: 'layout-dashboard',
    items: [
      { label: 'Dashboard', icon: 'house' },
      { label: 'Analytics', icon: 'chart-line' }
    ]
  },
  {
    title: 'Management',
    icon: 'users',
    items: [
      {
        label: 'Users',
        icon: 'users',
        children: [
          { label: 'List', icon: 'list' },
          { label: 'Create', icon: 'user-plus' }
        ]
      }
    ]
  }
];`;

  menuHtmlExample = `
<magary-sidebar
  [menu]="menuDemo"
  [layoutMode]="'rail-labeled'"
  [menuFilters]="menuFiltersDemo"
  [activeMenuFilter]="activeMenuFilter"
  [showMenuFilters]="true"
  [menuFilterLabel]="'Menu groups'"
  [menuTitle]="'Navigation'"
  [showLogo]="true"
  [logoSrc]="'assets/magary_logo.png'"
  [appTitle]="'Single Menu'"
  [appTitleStyle]="appTitleStyle"
  [sidebarWidth]="'132px'"
  [sidebarBorder]="'1px solid var(--surface-300)'"
  [sidebarShadow]="'none'"
  [titleFontStyle]="'normal'"
  [collapsible]="false"
  [showToggle]="false"
  [showBrandLogo]="true"
  [brandLogoSrc]="'assets/magary_logo.png'"
  [brandLogoPosition]="'bottom'"
  [showUserSection]="false"
  [menuBackgroundColor]="'var(--surface-200)'"
  [menuHoverColor]="'var(--surface-400)'"
  (menuItemClick)="onSidebarMenuItemClick($event)"
  (activeMenuFilterChange)="onActiveMenuFilterChange($event)"
></magary-sidebar>`;

  menuTsExample = `
activeMenuFilter: string | null = 'favorites';
selectedMenuItemId = 'home';

menuDemo: MenuItem[] = [
  { id: 'home', label: 'Home', icon: 'house', group: 'favorites', active: true },
  {
    id: 'catalog',
    label: 'Catalog',
    icon: 'package',
    group: 'apps',
    children: [
      { id: 'catalog-products', label: 'Products', icon: 'box', group: 'apps' },
      { id: 'catalog-categories', label: 'Categories', icon: 'folder-tree', group: 'apps' }
    ]
  },
  { id: 'clients', label: 'Clients', icon: 'users-round', group: 'favorites', badgeValue: 8, badgeSeverity: 'contrast' },
  { id: 'support', label: 'Support', icon: 'life-buoy', group: 'apps', emoji: '\u2728', badgeValue: 2, badgeSeverity: 'info' }
];

onSidebarMenuItemClick(event: SidebarMenuItemClickEvent): void {
  const itemId = event.item.id;
  if (!itemId) {
    return;
  }

  this.selectedMenuItemId = itemId;
  this.menuDemo = this.buildMenu();
  this.selectedMenuPreview = this.buildMenuPreview(itemId);
}`;

  footerHtmlExample = `
<magary-sidebar
  [menu]="menuDemo"
  [menuTitle]="'Account'"
  [showLogo]="true"
  [logoSrc]="'assets/magary_logo.png'"
  [appTitle]="'Profile'"
  [appTitleStyle]="appTitleStyle"
  [collapsible]="false"
  [showToggle]="false"
  [showUserSection]="true"
  [showUserAvatar]="false"
  [showUserName]="false"
  [showUserEmail]="false"
  [showLogoutButton]="true"
  (onLogout)="onLogout('footer')"
></magary-sidebar>`;

  footerTsExample = `
onLogout(mode: 'sections' | 'footer'): void {
  this.logoutCount += 1;
  this.lastLogoutMode = mode === 'sections' ? 'Sections' : 'Optional Footer';
}`;

  constructor() {
    effect(() => {
      this.i18n.language();
      this.sectionsDemo = this.buildSections();
      this.syncMenuPreviewState();
      this.footerMenuDemo = this.buildMenu('home');
      this.lastLogoutMode = this.resolveLogoutModeLabel(this.lastLogoutModeSource);
    });
  }

  private buildSections(): SidebarSectionDemo[] {
    return [
      {
        title: this.t('components.menu.sidebar.sectionsData.general'),
        icon: 'layout-dashboard',
        iconClass: 'lucide-pulse',
        items: [
          { label: this.t('components.menu.sidebar.sectionsData.dashboard'), icon: 'house' },
          { label: this.t('components.menu.sidebar.sectionsData.analytics'), icon: 'chart-line' },
          {
            label: this.t('components.menu.sidebar.sectionsData.reports'),
            icon: 'file-chart-column',
          },
        ],
      },
      {
        title: this.t('components.menu.sidebar.sectionsData.management'),
        icon: 'users',
        items: [
          {
            label: this.t('components.menu.sidebar.sectionsData.users'),
            icon: 'users',
            children: [
              { label: this.t('components.menu.sidebar.sectionsData.list'), icon: 'list' },
              {
                label: this.t('components.menu.sidebar.sectionsData.create'),
                icon: 'user-plus',
              },
            ],
          },
          { label: this.t('components.menu.sidebar.sectionsData.teams'), icon: 'layers' },
          {
            label: this.t('components.menu.sidebar.sectionsData.billing'),
            icon: 'credit-card',
            disabled: true,
          },
        ],
      },
      {
        title: this.t('components.menu.sidebar.sectionsData.settings'),
        icon: 'settings',
        items: [
          {
            label: this.t('components.menu.sidebar.sectionsData.preferences'),
            icon: 'sliders-horizontal',
          },
          {
            label: this.t('components.menu.sidebar.sectionsData.security'),
            icon: 'shield-check',
          },
        ],
      },
    ];
  }

  private buildMenu(selectedItemId = this.selectedMenuItemId): MenuItem[] {
    return this.applyActiveState(this.buildMenuDefinition(), selectedItemId);
  }

  private buildMenuDefinition(): MenuItem[] {
    return [
      {
        id: 'home',
        label: this.t('components.menu.sidebar.menuData.home'),
        icon: 'house',
        group: 'favorites',
      },
      {
        id: 'catalog',
        label: this.t('components.menu.sidebar.menuData.catalog'),
        icon: 'package',
        group: 'apps',
        children: [
          {
            id: 'catalog-products',
            label: this.t('components.menu.sidebar.menuData.products'),
            icon: 'box',
            group: 'apps',
          },
          {
            id: 'catalog-categories',
            label: this.t('components.menu.sidebar.menuData.categories'),
            icon: 'folder-tree',
            group: 'apps',
          },
        ],
      },
      {
        id: 'clients',
        label: this.t('components.menu.sidebar.menuData.clients'),
        icon: 'users-round',
        group: 'favorites',
        badgeValue: 8,
        badgeSeverity: 'contrast',
      },
      {
        id: 'support',
        label: this.t('components.menu.sidebar.menuData.support'),
        icon: 'life-buoy',
        group: 'apps',
        emoji: '\u2728',
        badgeValue: 2,
        badgeSeverity: 'info',
      },
    ];
  }

  private applyActiveState(items: MenuItem[], selectedItemId: string): MenuItem[] {
    return items.map((item) => {
      const nestedItems = item.items ?? item.children ?? [];
      const nextChildren = nestedItems.length
        ? this.applyActiveState(nestedItems, selectedItemId)
        : [];
      const hasActiveDescendant = nextChildren.some((child) => child.active);
      const isActive = item.id === selectedItemId || hasActiveDescendant;

      return {
        ...item,
        active: isActive,
        ...(item.items ? { items: nextChildren } : {}),
        ...(item.children ? { children: nextChildren } : {}),
      };
    });
  }

  private syncMenuPreviewState(): void {
    this.selectedMenuItemId = this.resolveVisibleMenuSelection(
      this.selectedMenuItemId,
      this.activeMenuFilter,
    );
    this.menuDemo = this.buildMenu();
    this.selectedMenuItemLabel = this.resolveMenuLabel(this.selectedMenuItemId);
    this.selectedMenuPreview = this.buildMenuPreview(this.selectedMenuItemId);
  }

  private resolveVisibleMenuSelection(
    currentItemId: string,
    activeFilter: string | null,
  ): string {
    const visibleItems = this.buildMenuDefinition()
      .filter((item) => !activeFilter || item.group === activeFilter)
      .map((item) => item.id)
      .filter((itemId): itemId is string => typeof itemId === 'string');

    if (visibleItems.includes(currentItemId)) {
      return currentItemId;
    }

    if (activeFilter === 'apps' && visibleItems.includes('catalog')) {
      return 'catalog';
    }

    if (activeFilter === 'favorites' && visibleItems.includes('home')) {
      return 'home';
    }

    return visibleItems[0] ?? currentItemId;
  }

  private resolveMenuLabel(itemId: string): string {
    const visit = (items: MenuItem[]): string | null => {
      for (const item of items) {
        if (item.id === itemId && item.label) {
          return item.label;
        }

        const nestedItems = item.items ?? item.children ?? [];
        const nestedLabel = nestedItems.length ? visit(nestedItems) : null;
        if (nestedLabel) {
          return nestedLabel;
        }
      }

      return null;
    };

    return visit(this.buildMenuDefinition()) ?? this.t('components.menu.sidebar.menuData.home');
  }

  private buildMenuPreview(itemId: string): SidebarMenuPreview {
    switch (itemId) {
      case 'catalog':
        return {
          titleKey: 'components.menu.sidebar.menu.shell.catalog.title',
          descriptionKey: 'components.menu.sidebar.menu.shell.catalog.desc',
          items: [
            'components.menu.sidebar.menu.shell.catalog.item1',
            'components.menu.sidebar.menu.shell.catalog.item2',
            'components.menu.sidebar.menu.shell.catalog.item3',
          ],
        };
      case 'clients':
        return {
          titleKey: 'components.menu.sidebar.menu.shell.clients.title',
          descriptionKey: 'components.menu.sidebar.menu.shell.clients.desc',
          items: [
            'components.menu.sidebar.menu.shell.clients.item1',
            'components.menu.sidebar.menu.shell.clients.item2',
            'components.menu.sidebar.menu.shell.clients.item3',
          ],
        };
      case 'support':
        return {
          titleKey: 'components.menu.sidebar.menu.shell.support.title',
          descriptionKey: 'components.menu.sidebar.menu.shell.support.desc',
          items: [
            'components.menu.sidebar.menu.shell.support.item1',
            'components.menu.sidebar.menu.shell.support.item2',
            'components.menu.sidebar.menu.shell.support.item3',
          ],
        };
      default:
        return {
          titleKey: 'components.menu.sidebar.menu.shell.home.title',
          descriptionKey: 'components.menu.sidebar.menu.shell.home.desc',
          items: [
            'components.menu.sidebar.menu.shell.home.item1',
            'components.menu.sidebar.menu.shell.home.item2',
            'components.menu.sidebar.menu.shell.home.item3',
          ],
        };
    }
  }

  onSidebarMenuItemClick(event: SidebarMenuItemClickEvent): void {
    const itemId = event.item.id;
    if (!itemId) {
      return;
    }

    this.selectedMenuItemId = itemId;
    this.syncMenuPreviewState();
  }

  onActiveMenuFilterChange(filter: string | null): void {
    this.activeMenuFilter = filter;
    this.syncMenuPreviewState();
  }

  private resolveLogoutModeLabel(mode: 'none' | 'sections' | 'footer'): string {
    if (mode === 'sections') {
      return this.t('components.menu.sidebar.logoutMode.sections');
    }

    if (mode === 'footer') {
      return this.t('components.menu.sidebar.logoutMode.footer');
    }

    return this.t('components.menu.sidebar.logoutMode.none');
  }

  onLogout(mode: 'sections' | 'footer'): void {
    this.logoutCount += 1;
    this.lastLogoutModeSource = mode;
    this.lastLogoutMode = this.resolveLogoutModeLabel(mode);
  }
}

