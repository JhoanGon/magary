import { Component } from '@angular/core';
import {
  Sidebar as MagarySidebar,
  MenuItem,
  MagaryTab,
  MagaryTabs,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

type SidebarSectionDemo = {
  title: string;
  icon: string;
  iconClass?: string;
  items: MenuItem[];
};

@Component({
  selector: 'magary-view-sidebar',
  imports: [MagarySidebar, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-sidebar.html',
  styleUrl: './view-sidebar.scss',
})
export class ViewSidebar {
  importExample =
    "import { Sidebar as MagarySidebar, MenuItem } from 'ng-magary';";

  logoutCount = 0;
  lastLogoutMode = 'Sin eventos';

  appTitleStyle = {
    background:
      'linear-gradient(135deg, var(--primary-400), var(--primary-700))',
    'background-clip': 'text',
    '-webkit-background-clip': 'text',
    '--sidebar-title-fill': 'transparent',
    '--sidebar-title-color': 'transparent',
    '--sidebar-title-font-style': 'normal',
  } as const;

  sectionsDemo: SidebarSectionDemo[] = [
    {
      title: 'General',
      icon: 'layout-dashboard',
      iconClass: 'lucide-pulse',
      items: [
        { label: 'Dashboard', icon: 'house' },
        { label: 'Analytics', icon: 'chart-line' },
        { label: 'Reportes', icon: 'file-chart-column' },
      ],
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
            { label: 'Create', icon: 'user-plus' },
          ],
        },
        { label: 'Teams', icon: 'layers' },
        { label: 'Billing', icon: 'credit-card', disabled: true },
      ],
    },
    {
      title: 'Settings',
      icon: 'settings',
      items: [
        { label: 'Preferences', icon: 'sliders-horizontal' },
        { label: 'Security', icon: 'shield-check' },
      ],
    },
  ];

  menuDemo: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'house',
    },
    {
      label: 'Catalogo',
      icon: 'package',
      children: [
        { label: 'Productos', icon: 'box' },
        { label: 'Categorias', icon: 'folder-tree' },
      ],
    },
    {
      label: 'Clientes',
      icon: 'users-round',
    },
    {
      label: 'Soporte',
      icon: 'life-buoy',
    },
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
  [menuTitle]="'Navegacion'"
  [showLogo]="true"
  [logoSrc]="'assets/magary_logo.png'"
  [appTitle]="'Menu Unico'"
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
  { label: 'Inicio', icon: 'house' },
  {
    label: 'Catalogo',
    icon: 'package',
    children: [
      { label: 'Productos', icon: 'box' },
      { label: 'Categorias', icon: 'folder-tree' }
    ]
  }
];`;

  footerHtmlExample = `
<magary-sidebar
  [menu]="menuDemo"
  [menuTitle]="'Cuenta'"
  [showLogo]="true"
  [logoSrc]="'assets/magary_logo.png'"
  [appTitle]="'Perfil'"
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
  this.lastLogoutMode = mode === 'sections' ? 'Secciones' : 'Footer opcional';
}`;

  onLogout(mode: 'sections' | 'footer'): void {
    this.logoutCount += 1;
    this.lastLogoutMode = mode === 'sections' ? 'Secciones' : 'Footer opcional';
  }
}
