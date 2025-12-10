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
    {
      label: 'Paginator',
      route: 'components/paginator',
      icon: 'list-minus',
    },
    {
      label: 'Tree',
      route: 'components/tree',
      icon: 'folder-tree',
    },
    {
      label: 'Timeline',
      route: 'components/timeline',
      icon: 'logs',
    },
  ],
};
