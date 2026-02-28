import { Component, effect, inject } from '@angular/core';
import {
  Sidebar as MagarySidebar,
  MenuItem,
  MagaryTab,
  MagaryTabs,
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

@Component({
  selector: 'magary-view-sidebar',
  imports: [MagarySidebar, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-sidebar.html',
  styleUrl: './view-sidebar.scss',
})
export class ViewSidebar {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  importExample =
    "import { Sidebar as MagarySidebar, MenuItem } from 'ng-magary';";

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

  keyPropsRows: SidebarKeyPropRow[] = [
    {
      property: '<code>sections</code> / <code>menu</code>',
      usageKey: 'components.menu.sidebar.keyProps.rows.strategy',
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
      name: 'menuTitle',
      type: 'string',
      default: "'Menu'",
      descriptionKey: 'components.menu.sidebar.api.menuTitle.desc',
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
      name: 'appTitle',
      type: 'string',
      default: "'PRIMENG'",
      descriptionKey: 'components.menu.sidebar.api.appTitle.desc',
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
      name: 'showToggle',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.menu.sidebar.api.showToggle.desc',
    },
  ];

  outputsRows: SidebarOutputRow[] = [
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
  [menuTitle]="'Navigation'"
  [showLogo]="true"
  [logoSrc]="'assets/magary_logo.png'"
  [appTitle]="'Single Menu'"
  [appTitleStyle]="appTitleStyle"
  [collapsible]="false"
  [showToggle]="false"
  [showBrandLogo]="true"
  [brandLogoSrc]="'assets/magary_logo.png'"
  [brandLogoPosition]="'bottom'"
  [showUserSection]="false"
  [menuBackgroundColor]="'var(--surface-200)'"
  [menuHoverColor]="'var(--surface-400)'"
></magary-sidebar>`;

  menuTsExample = `
menuDemo: MenuItem[] = [
  { label: 'Home', icon: 'house' },
  {
    label: 'Catalog',
    icon: 'package',
    children: [
      { label: 'Products', icon: 'box' },
      { label: 'Categories', icon: 'folder-tree' }
    ]
  }
];`;

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
      this.menuDemo = this.buildMenu();
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

  private buildMenu(): MenuItem[] {
    return [
      {
        label: this.t('components.menu.sidebar.menuData.home'),
        icon: 'house',
      },
      {
        label: this.t('components.menu.sidebar.menuData.catalog'),
        icon: 'package',
        children: [
          { label: this.t('components.menu.sidebar.menuData.products'), icon: 'box' },
          {
            label: this.t('components.menu.sidebar.menuData.categories'),
            icon: 'folder-tree',
          },
        ],
      },
      {
        label: this.t('components.menu.sidebar.menuData.clients'),
        icon: 'users-round',
      },
      {
        label: this.t('components.menu.sidebar.menuData.support'),
        icon: 'life-buoy',
      },
    ];
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
