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
    {
      label: 'Organization Chart',
      route: 'components/organization-chart',
      icon: 'network',
    },
    {
      label: 'PickList',
      route: 'components/pick-list',
      icon: 'arrow-right-left',
    },
    {
      label: 'OrderList',
      route: 'components/order-list',
      icon: 'list-ordered',
    },
  ],
};
