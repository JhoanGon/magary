import { NavigationItem } from '../../interface/sidebar.interface';

export const MENU_CONFIG: NavigationItem = {
  label: 'Menu',
  icon: 'fas fa-bars',
  children: [
    {
      label: 'Panel Menu',
      route: 'components/Panel-Menu',
      icon: 'fas fa-list-alt',
    },
    {
      label: 'Sidebar',
      route: 'components/Sidebar',
      icon: 'fas fa-columns',
    },
  ],
};
