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
      label: 'Skeleton',
      route: 'components/Skeleton',
      icon: 'loader',
    },
    {
      label: 'Divider',
      route: 'components/Divider',
      icon: 'minus',
    },
    {
      label: 'Tag',
      route: 'components/Tag',
      icon: 'tag',
    },
  ],
};
