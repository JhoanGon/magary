import { NavigationItem } from '../../interface/sidebar.interface';

export const MISC_CONFIG: NavigationItem = {
  label: 'Misc',
  icon: 'fas fa-cube',
  children: [
    {
      label: 'Avatar',
      route: 'components/Avatar',
      icon: 'fas fa-user-circle',
    },
    {
      label: 'Toast',
      route: 'components/Toast',
      icon: 'fas fa-bell',
    },
    {
      label: 'Skeleton',
      route: 'components/Skeleton',
      icon: 'fas fa-spinner',
    },
  ],
};
