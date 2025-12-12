import { NavigationItem } from '../../interface/sidebar.interface';

export const BUTTONS_CONFIG: NavigationItem = {
  label: 'Buttons',
  icon: 'toggle-right',
  children: [
    {
      label: 'Button',
      route: 'components/Button',
      icon: 'square',
    },
    {
      label: 'SpeedDial',
      route: 'components/SpeedDial',
      icon: 'ellipsis-vertical',
    },
    {
      label: 'SplitButton',
      route: 'components/SplitButton',
      icon: 'mouse-pointer-click',
    },
  ],
};
