import { NavigationItem } from '../../interface/sidebar.interface';

export const MISC_CONFIG: NavigationItem = {
  label: 'Misc',
  icon: 'box',
  children: [
    {
      label: 'Avatar',
      route: 'components/Avatar',
      icon: 'circle-user',
    },
    {
      label: 'Toast',
      route: 'components/Toast',
      icon: 'bell',
    },
    {
      label: 'Skeleton',
      route: 'components/Skeleton',
      icon: 'loader',
    },
  ],
};
