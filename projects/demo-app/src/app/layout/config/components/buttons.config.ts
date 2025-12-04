import { NavigationItem } from '../../interface/sidebar.interface';

export const BUTTONS_CONFIG: NavigationItem = {
  label: 'Buttons',
  icon: 'fas fa-toggle-on',
  children: [
    {
      label: 'Button',
      route: 'components/Button',
      icon: 'fas fa-square',
    },
    {
      label: 'SpeedDial',
      route: 'components/SpeedDial',
      icon: 'fas fa-ellipsis-v',
    },
  ],
};
