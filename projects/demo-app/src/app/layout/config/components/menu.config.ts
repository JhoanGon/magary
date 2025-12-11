import { NavigationItem } from '../../interface/sidebar.interface';

export const MENU_CONFIG: NavigationItem = {
  label: 'Menu',
  icon: 'menu',
  children: [
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
  ],
};
