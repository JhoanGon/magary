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
    {
      label: 'Galleria',
      route: '/components/view-galleria',
      icon: 'images',
    },
    // TODO: Carousel temporarily hidden due to pending bug fixes
    // {
    //   label: 'Carousel',
    //   route: '/components/view-carousel',
    //   icon: 'gallery-horizontal-end',
    // },
  ],
};
