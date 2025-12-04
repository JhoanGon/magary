import { NavigationItem } from '../../interface/sidebar.interface';

export const PANEL_CONFIG: NavigationItem = {
  label: 'Panel',
  icon: 'fas fa-window-maximize',
  children: [
    {
      label: 'Card',
      route: 'components/Card',
      icon: 'fas fa-id-card',
    },
    {
      label: 'Tabs',
      route: 'components/Tabs',
      icon: 'fas fa-folder',
    },
  ],
};
