import { NavigationItem } from '../../interface/sidebar.interface';

export const PANEL_CONFIG: NavigationItem = {
  label: 'Panel',
  icon: 'maximize',
  children: [
    {
      label: 'Card',
      icon: 'id-card',
      route: '/components/card',
    },
    {
      label: 'Fieldset',
      icon: 'credit-card',
      route: '/components/fieldset',
    },
    {
      label: 'Toolbar',
      icon: 'minus',
      route: '/components/toolbar',
    },
    {
      label: 'TabView',
      route: '/components/tabview',
      icon: 'folder',
    },
    {
      label: 'Accordion',
      route: '/components/Accordion',
      icon: 'list',
    },
  ],
};
