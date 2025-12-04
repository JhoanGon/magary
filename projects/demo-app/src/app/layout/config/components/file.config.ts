import { NavigationItem } from '../../interface/sidebar.interface';

export const FILE_CONFIG: NavigationItem = {
  label: 'File',
  icon: 'fas fa-file',
  children: [
    {
      label: 'EmptyState',
      route: '/installation',
      icon: '',
    },
  ],
};
