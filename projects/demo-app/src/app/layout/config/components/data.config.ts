import { NavigationItem } from '../../interface/sidebar.interface';

export const DATA_CONFIG: NavigationItem = {
  label: 'Data',
  icon: 'fas fa-database',
  children: [
    {
      label: 'Table',
      route: 'components/Table',
      icon: 'fas fa-table',
    },
  ],
};
