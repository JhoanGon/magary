import { NavigationItem } from '../../interface/sidebar.interface';

export const MENU_CONFIG: NavigationItem = {
  label: 'Menu',
  icon: 'menu',
  children: [
    {
      label: 'Context Menu',
      route: 'components/ContextMenu',
      icon: 'mouse-pointer-click', // or similar
    },
    {
      label: 'Breadcrumb',
      route: 'components/Breadcrumb',
      icon: 'chevron-right',
    },
    {
      label: 'Steps',
      route: 'components/Steps',
      icon: 'list-ordered',
    },
    {
      label: 'Panel Menu',
      route: 'components/Panel-Menu',
      icon: 'list',
    },
    {
      label: 'Sidebar',
      route: 'components/Sidebar',
      icon: 'panel-left-dashed',
    },
    {
      label: 'Tiered Menu',
      route: 'components/TieredMenu',
      icon: 'layers',
    },
    {
      label: 'Menubar',
      route: 'components/Menubar',
      icon: 'panel-top-open',
    },
    {
      label: 'MegaMenu',
      route: 'components/MegaMenu',
      icon: 'layout-grid',
    },
    {
      label: 'SlideMenu',
      route: 'components/SlideMenu',
      icon: 'smartphone', // or 'menu-square'
    },
  ],
};
