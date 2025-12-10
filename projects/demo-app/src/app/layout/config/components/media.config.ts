import { NavigationItem } from '../../interface/sidebar.interface';

export const MEDIA_CONFIG: NavigationItem = {
  label: 'Media',
  icon: 'image',
  children: [
    {
      label: 'Image',
      route: '/components/image',
      icon: 'image',
    },
  ],
};
