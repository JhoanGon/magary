import { NavigationItem } from '../../interface/sidebar.interface';

export const PANEL_CONFIG: NavigationItem = {
  label: 'Panel',
  icon: 'maximize',
  children: [
    {
      label: 'Card',
      route: 'components/Card',
      icon: 'id-card',
    },
    {
      label: 'Tabs',
      route: 'components/Tabs',
      icon: 'folder',
    },
    {
      label: 'Accordion',
      route: 'components/Accordion',
      icon: 'list',
    },
  ],
};
