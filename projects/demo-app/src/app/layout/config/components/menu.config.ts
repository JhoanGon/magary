import { NavigationItem } from '../../interface/sidebar.interface';

export const MENU_CONFIG: NavigationItem = {
  label: 'Menu',
  icon: 'menu',
  children: [
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
