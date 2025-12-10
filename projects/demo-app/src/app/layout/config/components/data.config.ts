import { NavigationItem } from '../../interface/sidebar.interface';

export const DATA_CONFIG: NavigationItem = {
  label: 'Data',
  icon: 'database',
  children: [
    {
      label: 'Table',
      route: 'components/Table',
      icon: 'table',
    },
  ],
};
