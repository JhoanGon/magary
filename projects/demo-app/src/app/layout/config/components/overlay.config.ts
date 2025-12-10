import { NavigationItem } from '../../interface/sidebar.interface';

export const OVERLAY_CONFIG: NavigationItem = {
  label: 'Overlay',
  icon: 'layers',
  children: [
    {
      label: 'Dialog',
      route: '/components/dialog',
      icon: 'maximize-2',
    },
  ],
};
