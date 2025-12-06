import { NavigationItem } from '../../interface/sidebar.interface';

export const MEDIA_CONFIG: NavigationItem = {
  label: 'Media',
  icon: 'fas fa-image',
  children: [
    {
      label: 'Image',
      route: '/components/image',
      icon: '',
    },
  ],
};
